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
      console.log(1);
      const registration = await client.register({
        attestation: false,
        challenge,
        discoverable: 'preferred',
        user: { name: 'NO WAY' },
        userVerification: 'preferred',
      });
      console.log(2);
      const { credential } = await submitRegistration({
        sessionId,
        registration,
      });
      console.log(3);
      setUserId(credential.id);
      console.log(4);
      localStorage.setItem('user-id', credential.id);
      console.log(5);
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
