import { atom } from 'recoil';
import { CogreactOptions } from '../components/Cogreact';
import { AuthState } from '../types';
import { RecoilKey } from './keys';

export const authStateAtom = atom<AuthState>({
  key: RecoilKey.AUTH_STATE,
  default: {
    authStatus: 'LOADING',
    roles: [],
    cognitoUserForCompletePassword: undefined
  },
});

export const cogreactOptionsAtom = atom<CogreactOptions>({
  key: RecoilKey.COGREACT_CONFIG,
  default: {
    loadingComponent: <p>Loading...</p>,
    signInPath: '/signin',
    completeNewPasswordPath: '/complete-new-password',
    verifyEmailPath: '/verify-email',
    redirectToPreviousPath: true,
    defaultSignInSucceededPath: '/',
  },
});
