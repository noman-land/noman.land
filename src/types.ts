import {
  AuthenticationJSON,
  RegistrationJSON,
} from '@passwordless-id/webauthn/dist/esm/types';

export interface ChallengeSession {
  sessionId: string;
  challenge: string;
}

export interface RegistrationBody {
  sessionId: string;
  registration: RegistrationJSON;
}

export interface AuthenticationBody {
  sessionId: string;
  authentication: AuthenticationJSON;
}
