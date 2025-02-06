import { Hono } from 'hono';
import { MASTODON_XML, MATRIX_JSON } from '../constants';

export const wellKnown = new Hono<{ Bindings: Bindings; }>({ strict: false })
  .get('/matrix/server', async c => c.json(MATRIX_JSON))
  .get('/host-meta', async c => {
    c.res.headers.append('Content-Type', 'application/xml');
    return c.newResponse(MASTODON_XML);
  });