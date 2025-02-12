import { Hono } from 'hono';
import { MATRIX_JSON } from '../constants';

export const wellKnown = new Hono<{ Bindings: Bindings }>({ strict: false })
  .get('/matrix/server', async c => c.json(MATRIX_JSON))
  .on('GET', ['/host-meta/:path?', '/webfinger/:path?', '/nodeinfo/:path?'], async c => {
    return c.redirect(`https://mastodon.noman.land${c.req.path}`);
  });
