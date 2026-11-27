import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/600.css'
import { AuthDocumentation } from './components/AuthDocumentation'
import { BadgeDocumentation } from './components/BadgeDocumentation'
import { BinPickerDocumentation } from './components/BinPickerDocumentation'
import { ButtonDocumentation } from './components/ButtonDocumentation'
import { CalloutDocumentation } from './components/CalloutDocumentation'
import { ColorFoundation } from './components/ColorFoundation'
import { DropdownDocumentation } from './components/DropdownDocumentation'
import { IconographyFoundation } from './components/IconographyFoundation'
import { InputFieldDocumentation } from './components/InputFieldDocumentation'
import { LayoutFoundation } from './components/LayoutFoundation'
import { MapDocumentation } from './components/MapDocumentation'
import { PaginationDocumentation } from './components/PaginationDocumentation'
import { ProgressBarDocumentation } from './components/ProgressBarDocumentation'
import { QuantityStepperDocumentation } from './components/QuantityStepperDocumentation'
import { RadiusFoundation } from './components/RadiusFoundation'
import { SearchDocumentation } from './components/SearchDocumentation'
import { SectionCardDocumentation } from './components/SectionCardDocumentation'
import { ShadowFoundation } from './components/ShadowFoundation'
import { ShelfBinCardDocumentation } from './components/ShelfBinCardDocumentation'
import { SpacingFoundation } from './components/SpacingFoundation'
import { StockBoxDocumentation } from './components/StockBoxDocumentation'
import { TabDocumentation } from './components/TabDocumentation'
import { TableDocumentation } from './components/TableDocumentation'
import { TypographyFoundation } from './components/TypographyFoundation'
import { WarehouseListCardDocumentation } from './components/WarehouseListCardDocumentation'
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
import './components/BadgeDocumentation.css'
import './components/TabDocumentation.css'
import './components/SearchDocumentation.css'
import './components/SectionCardDocumentation.css'
import './components/TableDocumentation.css'
import './components/PaginationDocumentation.css'
import './components/ProgressBarDocumentation.css'
import './components/InputFieldDocumentation.css'
import './components/QuantityStepperDocumentation.css'
import './components/CalloutDocumentation.css'
import './components/BinPickerDocumentation.css'
import './components/StockBoxDocumentation.css'
import './components/ShelfBinCardDocumentation.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

const pages = new Map([
  ['/designsystem/components/auth', AuthDocumentation],
  ['/designsystem/components/badge', BadgeDocumentation],
  ['/designsystem/components/bin-picker', BinPickerDocumentation],
  ['/designsystem/components/button', ButtonDocumentation],
  ['/designsystem/components/callout', CalloutDocumentation],
  ['/designsystem/components/dropdown', DropdownDocumentation],
  ['/designsystem/components/map', MapDocumentation],
  ['/designsystem/components/pagination', PaginationDocumentation],
  ['/designsystem/components/progress-bar', ProgressBarDocumentation],
  ['/designsystem/components/input-field', InputFieldDocumentation],
  ['/designsystem/components/quantity-stepper', QuantityStepperDocumentation],
  ['/designsystem/components/search', SearchDocumentation],
  ['/designsystem/components/section-card', SectionCardDocumentation],
  ['/designsystem/components/shelf-bin-card', ShelfBinCardDocumentation],
  ['/designsystem/components/stock-box', StockBoxDocumentation],
  ['/designsystem/components/tab', TabDocumentation],
  ['/designsystem/components/table', TableDocumentation],
  ['/designsystem/components/warehouse-list-card', WarehouseListCardDocumentation],
  ['/designsystem/foundation/iconography', IconographyFoundation],
  ['/designsystem/foundation/layout', LayoutFoundation],
  ['/designsystem/foundation/radius', RadiusFoundation],
  ['/designsystem/foundation/shadow', ShadowFoundation],
  ['/designsystem/foundation/spacing', SpacingFoundation],
  ['/designsystem/foundation/typography', TypographyFoundation],
])
const Page = pages.get(window.location.pathname.replace(/(?:\.html|\/)$/, '')) ?? ColorFoundation

createRoot(root).render(<StrictMode><Page /></StrictMode>)
