import { useState } from 'react';
import { client } from '@passwordless-id/webauthn';
import { deleteRegistration, getChallenge, submitAuthentication, submitRegistration } from './api';

export const useWebAuthn = () => {
  const [authed, setAuthed] = useState(false);
  const [userId, setUserId] = useState<string | null>(() => {
    return localStorage.getItem('user-id');
  });

  const register = () => {
    getChallenge().then(async ({ challenge, sessionId }) => {
      const registration = await client.register({
        attestation: false,
        challenge,
        // discoverable: 'discouraged',
        user: { name: '' },
        userVerification: 'preferred',
      });
      const { credential } = await submitRegistration({
        sessionId,
        registration,
      });
      setUserId(credential.id);
      localStorage.setItem('user-id', credential.id);
    });
  };

  const logIn = () => {
    getChallenge().then(async ({ challenge, sessionId }) => {
      const authentication = await client.authenticate({
        allowCredentials: [userId!],
        challenge,
        userVerification: 'preferred',
      });
      await submitAuthentication({ sessionId, authentication });
      setAuthed(true);
    });
  };

  const logOut = () => {
    setAuthed(false);
  };

  const deleteAccount = async () => {
    getChallenge().then(async ({ challenge, sessionId }) => {
      const authentication = await client.authenticate({
        allowCredentials: [userId!],
        challenge,
        userVerification: 'preferred',
      });
      logOut();
      setUserId(null);
      localStorage.removeItem('user-id');
      await deleteRegistration({
        sessionId,
        authentication,
      });
    });
  };

  return {
    authed,
    userId,
    register,
    logIn,
    logOut,
    deleteAccount,
  };
};
