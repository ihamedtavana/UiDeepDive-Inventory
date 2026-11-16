"""Build CSS variables from the checked-in Figma variable snapshot."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
data = json.loads((ROOT / 'figma-variables.json').read_text(encoding='utf-8'))
prefixes = {
    'Global Tokens': 'global', 'Brand Tokens': 'brand', 'Neutral Tokens': 'neutral',
    '⚙️ Semantic Spacing': 'semantic-spacing', '⚙️ Semantic Radius': 'semantic-radius',
    '⚙️ Semantic Typography': 'semantic-typography', '⭐️ Component Tokens': 'component',
    '⚙️ Semantic Colors': 'semantic-colors', '⚙️ Semantic Elevation': 'semantic-elevation',
}
collections = {c['id']: c for c in data['collections']}
variables = {v['id']: v for v in data['variables']}

def slug(name):
    return re.sub(r'-+', '-', re.sub(r'[^a-zA-Z0-9_-]+', '-', name)).strip('-').lower()

def css_name(v):
    return '--' + prefixes[collections[v['collectionId']]['name']] + '-' + slug(v['name'])

names = [css_name(v) for v in variables.values()]
if len(names) != len(set(names)):
    raise ValueError('CSS token name collision; inspect the original Figma names')

def format_value(v, value):
    if isinstance(value, dict) and value.get('type') == 'VARIABLE_ALIAS':
        target = variables.get(value['id'])
        if target is None:
            raise ValueError(f"Missing alias target {value['id']} for {v['name']}")
        if target['type'] != v['type']:
            raise ValueError(f"Alias type mismatch for {v['name']}")
        return f'var({css_name(target)})'
    if v['type'] == 'COLOR':
        def n(x): return format(x, '.8g')
        return f"color(srgb {n(value['r'])} {n(value['g'])} {n(value['b'])} / {n(value.get('a', 1))})"
    if v['type'] == 'FLOAT':
        return format(value, '.8g')
    if v['type'] == 'STRING':
        return json.dumps(value, ensure_ascii=False)
    raise ValueError(f"Unsupported type {v['type']} for {v['name']}")

lines = ['/* Generated from figma-variables.json by build.py. Do not edit. */',
         '/* Numeric values are unitless; apply the appropriate CSS unit at the point of use. */', ':root {']
for collection in data['collections']:
    lines.append(f"  /* {collection['name']} */")
    for v in data['variables']:
        if v['collectionId'] != collection['id']:
            continue
        value = v['valuesByMode'][collection['defaultModeId']]
        lines.append(f'  {css_name(v)}: {format_value(v, value)};')
lines.append('}')
(ROOT.parent / 'src' / 'tokens' / 'tokens.css').write_text('\n'.join(lines) + '\n', encoding='utf-8')
print(f'Built {len(names)} CSS variables from {len(collections)} collections.')
