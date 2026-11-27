import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/600.css'
import { BadgeDocumentation } from './components/BadgeDocumentation'
import { ButtonDocumentation } from './components/ButtonDocumentation'
import { ColorFoundation } from './components/ColorFoundation'
import { IconographyFoundation } from './components/IconographyFoundation'
import { InputFieldDocumentation } from './components/InputFieldDocumentation'
import { LayoutFoundation } from './components/LayoutFoundation'
import { PaginationDocumentation } from './components/PaginationDocumentation'
import { ProgressBarDocumentation } from './components/ProgressBarDocumentation'
import { RadiusFoundation } from './components/RadiusFoundation'
import { SearchDocumentation } from './components/SearchDocumentation'
import { SectionCardDocumentation } from './components/SectionCardDocumentation'
import { ShadowFoundation } from './components/ShadowFoundation'
import { SpacingFoundation } from './components/SpacingFoundation'
import { TabDocumentation } from './components/TabDocumentation'
import { TableDocumentation } from './components/TableDocumentation'
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
import './components/BadgeDocumentation.css'
import './components/TabDocumentation.css'
import './components/SearchDocumentation.css'
import './components/SectionCardDocumentation.css'
import './components/TableDocumentation.css'
import './components/PaginationDocumentation.css'
import './components/ProgressBarDocumentation.css'
import './components/InputFieldDocumentation.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

const pages = new Map([
  ['/designsystem/components/badge', BadgeDocumentation],
  ['/designsystem/components/button', ButtonDocumentation],
  ['/designsystem/components/pagination', PaginationDocumentation],
  ['/designsystem/components/progress-bar', ProgressBarDocumentation],
  ['/designsystem/components/input-field', InputFieldDocumentation],
  ['/designsystem/components/search', SearchDocumentation],
  ['/designsystem/components/section-card', SectionCardDocumentation],
  ['/designsystem/components/tab', TabDocumentation],
  ['/designsystem/components/table', TableDocumentation],
  ['/designsystem/foundation/iconography', IconographyFoundation],
  ['/designsystem/foundation/layout', LayoutFoundation],
  ['/designsystem/foundation/radius', RadiusFoundation],
  ['/designsystem/foundation/shadow', ShadowFoundation],
  ['/designsystem/foundation/spacing', SpacingFoundation],
  ['/designsystem/foundation/typography', TypographyFoundation],
])
const Page = pages.get(window.location.pathname.replace(/(?:\.html|\/)$/, '')) ?? ColorFoundation

createRoot(root).render(<StrictMode><Page /></StrictMode>)
