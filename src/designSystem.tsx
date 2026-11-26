import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/600.css'
import { ColorFoundation } from './components/ColorFoundation'
import { TypographyFoundation } from './components/TypographyFoundation'
import './tokens/tokens.css'
import './components/App.css'
import './components/ColorFoundation.css'
import './components/DesignSystemResponsive.css'
import './components/TypographyFoundation.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

const Foundation = /^\/designsystem\/foundation\/typography(?:\.html|\/)?$/.test(window.location.pathname)
  ? TypographyFoundation
  : ColorFoundation

createRoot(root).render(<StrictMode><Foundation /></StrictMode>)
