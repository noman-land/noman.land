import { Hono } from 'hono';
import { MATRIX_JSON } from '../constants';

const MASTODON_DOMAIN = 'mastodon.noman.land';
const MASTODON_USER = 'noman';

export const wellKnown = new Hono<{ Bindings: Bindings; }>({ strict: false })
  .get('/matrix/server', async c => c.json(MATRIX_JSON))
  .on('GET', ['/host-meta*', '/webfinger*', '/nodeinfo*', '/authorize_interaction*'], async c => {
    return c.redirect(`https://${MASTODON_DOMAIN}${c.req.path}?resource=acct:${MASTODON_USER}@${MASTODON_DOMAIN}`);
  });
