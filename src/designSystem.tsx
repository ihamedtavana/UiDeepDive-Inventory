import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/600.css'
import { ButtonDocumentation } from './components/ButtonDocumentation'
import { ColorFoundation } from './components/ColorFoundation'
import { IconographyFoundation } from './components/IconographyFoundation'
import { LayoutFoundation } from './components/LayoutFoundation'
import { RadiusFoundation } from './components/RadiusFoundation'
import { ShadowFoundation } from './components/ShadowFoundation'
import { SpacingFoundation } from './components/SpacingFoundation'
import { TypographyFoundation } from './components/TypographyFoundation'
import './tokens/tokens.css'
import './components/App.css'
import './components/ColorFoundation.css'
import './components/DesignSystemResponsive.css'
import './components/TypographyFoundation.css'
import './components/SpacingFoundation.css'
import './components/RadiusFoundation.css'
import './components/ShadowFoundation.css'
import './components/LayoutFoundation.css'
import './components/IconographyFoundation.css'
import './components/ButtonDocumentation.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

const pages = new Map([
  ['/designsystem/components/button', ButtonDocumentation],
  ['/designsystem/foundation/iconography', IconographyFoundation],
  ['/designsystem/foundation/layout', LayoutFoundation],
  ['/designsystem/foundation/radius', RadiusFoundation],
  ['/designsystem/foundation/shadow', ShadowFoundation],
  ['/designsystem/foundation/spacing', SpacingFoundation],
  ['/designsystem/foundation/typography', TypographyFoundation],
])
const Page = pages.get(window.location.pathname.replace(/(?:\.html|\/)$/, '')) ?? ColorFoundation

createRoot(root).render(<StrictMode><Page /></StrictMode>)
