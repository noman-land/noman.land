import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';

import { Home } from './client/Home';
import { Html } from './components/Html';
import { wellKnown } from './routes/wellKnown';

export type AppType = typeof app;

const app = new Hono<{ Bindings: Bindings }>({ strict: false })
  .route('/.well-known/', wellKnown)
  .use(jsxRenderer(({ children }) => <Html>{children}</Html>, { docType: true }))
  .get('/', c => c.render(<Home />));

export default app;
