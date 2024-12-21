import { useCallback, useState } from 'react';
import { client } from '@passwordless-id/webauthn';
import { v7 as uuid } from 'uuid';
import { deleteRegistration, getChallenge, submitAuthentication, submitRegistration } from './api';

export const useWebAuthn = () => {
  const [authed, setAuthed] = useState(false);
  const [userId, setUserId] = useState<string | null>(() => {
    return localStorage.getItem('user-id');
  });

  const register = useCallback(() => {
    getChallenge().then(async ({ challenge, sessionId }) => {
      const registration = await client.register({
        attestation: false,
        challenge,
        discoverable: 'required',
        user: { name: uuid() },
        userVerification: 'required',
      });
      const { credential } = await submitRegistration({
        sessionId,
        registration,
      });
      setUserId(credential.id);
      localStorage.setItem('user-id', credential.id);
    });
  }, []);

  const logIn = useCallback(() => {
    getChallenge().then(async ({ challenge, sessionId }) => {
      const authentication = await client.authenticate({
        allowCredentials: [userId!],
        challenge,
        userVerification: 'required',
      });
      await submitAuthentication({ sessionId, authentication });
      setAuthed(true);
    });
  }, [userId]);

  const logOut = useCallback(() => {
    setAuthed(false);
  }, []);

  const deleteAccount = useCallback(() => {
    getChallenge().then(async ({ challenge, sessionId }) => {
      const authentication = await client.authenticate({
        allowCredentials: [userId!],
        challenge,
        userVerification: 'required',
      });
      logOut();
      setUserId(null);
      localStorage.removeItem('user-id');
      await deleteRegistration({
        sessionId,
        authentication,
      });
    });
  }, [userId, logOut]);

  return {
    authed,
    userId,
    register,
    logIn,
    logOut,
    deleteAccount,
  };
};
