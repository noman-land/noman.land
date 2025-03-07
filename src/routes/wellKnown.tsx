import { Hono } from 'hono';
import { MATRIX_JSON } from '../constants';
import { mastodonRedirect } from '../utils/mastadonRedirect';

export const wellKnown = new Hono<{ Bindings: Bindings; }>({ strict: false })
  .get('/matrix/server', async c => c.json(MATRIX_JSON))
  .on('GET', ['/host-meta*', '/webfinger*', '/nodeinfo*'], mastodonRedirect);
