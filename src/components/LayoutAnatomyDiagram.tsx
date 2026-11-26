const sidebarRegions = ['Logo', 'Context card', 'Search ⌘K', 'Main menu', 'Shelves', 'Storage card', 'Footer']

export function LayoutAnatomyDiagram() {
  return <div className="layout-schematic" role="group" aria-label="Inventory Dashboard shell schematic">
    <ul className="layout-schematic-sidebar" aria-label="Sidebar regions">
      {sidebarRegions.map(region => <li className="layout-block" key={region}>{region}</li>)}
    </ul>
    <div className="layout-schematic-panel" role="group" aria-label="Main panel">
      <div className="layout-schematic-nav">Top navigation · breadcrumb + actions</div>
      <div className="layout-schematic-content">
        <div className="layout-block">Page title bar</div>
        <div className="layout-grid layout-grid--4">
          {[1, 2, 3, 4].map(card => <div className="layout-block layout-block--short" key={card}>Overview card</div>)}
        </div>
        <div className="layout-block layout-block--tall">Section · 3-column card grid + table</div>
        <div className="layout-grid layout-grid--split">
          <div className="layout-block layout-block--tall">Activity · 2/3</div>
          <div className="layout-block layout-block--tall">Shipments · 1/3</div>
        </div>
        <div className="layout-block layout-block--table">Section · full-width table</div>
      </div>
    </div>
  </div>
}
