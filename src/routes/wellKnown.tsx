import { Hono } from 'hono';
import { MASTODON_DOMAIN, MASTODON_USER, MATRIX_JSON } from '../constants';

export const wellKnown = new Hono<{ Bindings: Bindings; }>({ strict: false })
  .get('/matrix/server', async c => c.json(MATRIX_JSON))
  .on('GET', ['/host-meta*', '/webfinger*', '/nodeinfo*'], async c => {
    return c.redirect(`https://${MASTODON_DOMAIN}${c.req.path}?resource=acct:${MASTODON_USER}@${MASTODON_DOMAIN}`);
  });
