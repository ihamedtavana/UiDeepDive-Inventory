import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/600.css'
import { ColorFoundation } from './components/ColorFoundation'
import { RadiusFoundation } from './components/RadiusFoundation'
import { SpacingFoundation } from './components/SpacingFoundation'
import { TypographyFoundation } from './components/TypographyFoundation'
import './tokens/tokens.css'
import './components/App.css'
import './components/ColorFoundation.css'
import './components/DesignSystemResponsive.css'
import './components/TypographyFoundation.css'
import './components/SpacingFoundation.css'
import './components/RadiusFoundation.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

const foundations = new Map([
  ['/designsystem/foundation/radius', RadiusFoundation],
  ['/designsystem/foundation/spacing', SpacingFoundation],
  ['/designsystem/foundation/typography', TypographyFoundation],
])
const Foundation = foundations.get(window.location.pathname.replace(/(?:\.html|\/)$/, '')) ?? ColorFoundation

createRoot(root).render(<StrictMode><Foundation /></StrictMode>)
