import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/600.css'
import { ColorFoundation } from './components/ColorFoundation'
import './tokens/tokens.css'
import './components/App.css'
import './components/ColorFoundation.css'
import './components/DesignSystemResponsive.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

createRoot(root).render(<StrictMode><ColorFoundation /></StrictMode>)
