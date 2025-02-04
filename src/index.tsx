import { Hono } from 'hono';
import { MASTODON_XML, MATRIX_JSON } from './constants';
import { Html } from './components/Html';

export default new Hono<{ Bindings: CloudflareBindings; }>({ strict: false })
  .get('/.well-known/matrix/server', async c => c.json(MATRIX_JSON))
  .get('/.well-known/host-meta', async c => {
    c.res.headers.append('Content-Type', 'application/xml');
    return c.newResponse(MASTODON_XML);
  })
  .get('/', c => c.html(<Html />));
