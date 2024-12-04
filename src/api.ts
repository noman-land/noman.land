import {
  AuthenticationBody,
  ChallengeSession,
  RegistrationBody,
} from './types';
import {
  AuthenticationInfo,
  RegistrationInfo,
} from '@passwordless-id/webauthn/dist/esm/types';
import { AUTHENTICATE_URL, CHALLENGE_URL, REGISTER_URL } from './constants';

export const getChallenge = async () => {
  const options = {
    method: 'POST',
  };
  return fetch(CHALLENGE_URL, options).then<ChallengeSession>(response =>
    response.json()
  );
};

export const submitRegistration = async (body: RegistrationBody) => {
  const options = {
    method: 'PUT',
    body: JSON.stringify(body),
  };
  return fetch(REGISTER_URL, options).then<RegistrationInfo>(response =>
    response.json()
  );
};

export const submitAuthentication = async (body: AuthenticationBody) => {
  const options = {
    method: 'PUT',
    body: JSON.stringify(body),
  };
  return fetch(AUTHENTICATE_URL, options).then<AuthenticationInfo>(response =>
    response.json()
  );
};

export const deleteRegistration = async (body: AuthenticationBody) => {
  const options = {
    method: 'DELETE',
    body: JSON.stringify(body),
  };
  return fetch(REGISTER_URL, options);
};
