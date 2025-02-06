import { Hono } from 'hono';
import { jsxRenderer } from "hono/jsx-renderer";

import { Counter } from "./client/Counter";
import { Html } from './components/Html';
import { wellKnown } from './routes/wellKnown';

export type AppType = typeof app;

const app = new Hono<{ Bindings: Bindings; }>({ strict: false })
  .route('/.well-known/', wellKnown)
  .use(
    jsxRenderer(
      ({ children }) => <Html>{children}</Html>,
      { docType: true }
    )
  )
  .get('/', c => c.render(<Counter />));

export default app;