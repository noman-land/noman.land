const DOMAIN = 'noman.land';

const isDeployed = window.location.hostname === DOMAIN;

const API_URL = isDeployed
  ? `https://api.${DOMAIN}`
  : `http://${window.location.hostname}:9042`;

export const CHALLENGE_URL = `${API_URL}/webauthn/v1/challenge`;
export const REGISTER_URL = `${API_URL}/webauthn/v1/register`;
export const AUTHENTICATE_URL = `${API_URL}/webauthn/v1/authenticate`;
