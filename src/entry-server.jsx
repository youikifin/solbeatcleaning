/* Build-time server entry — used only by scripts/prerender.mjs to render
   each route to static HTML. LLM crawlers and other non-JS readers get
   the full page content in the raw HTML; the browser then hydrates it. */
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App.jsx'

export function render(url) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )
}
