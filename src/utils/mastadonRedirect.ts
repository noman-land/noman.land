import { Context } from 'hono';
import { MASTODON_DOMAIN, MASTODON_USER } from '../constants';

export const mastodonRedirect = async (c: Context) => {
  const url = new URL(`https://${MASTODON_DOMAIN}${c.req.path}`);
  for (const [k, v] of Object.entries(c.req.query())) {
    url.searchParams.append(k, v);
  }
  url.searchParams.append('resource', `acct:${MASTODON_USER}@${MASTODON_DOMAIN}`);
  return c.redirect(url);
};
