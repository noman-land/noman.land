import { Context } from 'hono';
import { MASTODON_DOMAIN, MASTODON_USER } from '../constants';

export const mastodonRedirect = async (c: Context) => {
  const url = new URL(c.req.url);
  url.hostname = MASTODON_DOMAIN;
  url.searchParams.append('resource', `acct:${MASTODON_USER}@${MASTODON_DOMAIN}`);
  return c.redirect(url);
};
