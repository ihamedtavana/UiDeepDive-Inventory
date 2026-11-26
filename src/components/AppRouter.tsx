import { useCallback, useEffect, useState } from 'react'
import { App } from './App'
import { warehouseById } from './warehouseCatalog'
import { AuthExperience, authPaths } from './AuthExperience'
export function AppRouter() {
  const [path, setPath] = useState(window.location.pathname.replace(/\/$/, '') || '/')
  const navigate = useCallback((next: string, isReplace = false) => { if (window.location.pathname !== next) { if (isReplace) window.history.replaceState(null, '', next); else window.history.pushState(null, '', next) } setPath(next) }, [])
  useEffect(() => { const pop = () => setPath(window.location.pathname.replace(/\/$/, '') || '/'); window.addEventListener('popstate', pop); const key = (e: KeyboardEvent) => { if (e.key === 'Tab') document.documentElement.dataset.focusMode = 'keyboard' }; const pointer = () => { delete document.documentElement.dataset.focusMode }; document.addEventListener('keydown', key, true); document.addEventListener('pointerdown', pointer, true); return () => { window.removeEventListener('popstate', pop); document.removeEventListener('keydown', key, true); document.removeEventListener('pointerdown', pointer, true) } }, [])
  useEffect(() => { if (path === '/signin') navigate('/login', true); if (path === '/signup') navigate('/register', true) }, [path, navigate])
  if (path === '/' || path === '/dashboard' || path === '/switch-warehouse' || (/^\/warehouses\/[^/]+\/(dashboard|switch)$/.test(path) && warehouseById(path.split('/')[2]))) return <App path={path === '/switch-warehouse' ? '/warehouses/nyc/switch' : path} onNavigate={navigate} />
  if (authPaths.includes(path)) return <AuthExperience path={path} onNavigate={navigate} />
  return <main className="auth-page"><div><h1>Page not found</h1><a href="/login">Go to Sign In</a></div></main>
}
