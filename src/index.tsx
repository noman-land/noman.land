import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';

import { Home } from './client/Home';
import { Html } from './components/Html';
import { wellKnown } from './routes/wellKnown';
import { MASTODON_DOMAIN, MASTODON_USER } from './constants';

export type AppType = typeof app;

const app = new Hono<{ Bindings: Bindings; }>({ strict: false })
  .route('/.well-known/', wellKnown)
  .on('GET', ['/authorize_interaction*'], async c => {
    const url = new URL(`https://${MASTODON_DOMAIN}${c.req.path}`);
    url.searchParams.append('resource', `acct:${MASTODON_USER}@${MASTODON_DOMAIN}`);
    return c.redirect(url);
  })
  .use(jsxRenderer(({ children }) => <Html>{children}</Html>, { docType: true }))
  .get('/', c => c.render(<Home />));

export default app;
