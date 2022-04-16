import { atom } from 'recoil';
import { CogreactConfig } from '../components/Cogreact';
import { AuthState } from '../types';
import { RecoilKey } from './keys';

export const authStateAtom = atom<AuthState>({
  key: RecoilKey.AUTH_STATE,
  default: {
    authStatus: 'LOADING',
    roles: [],
  },
});

export const cogreactConfigAtom = atom<CogreactConfig>({
  key: RecoilKey.COGREACT_CONFIG,
  default: {
    loadingComponent: <p>Loading...</p>,
    loginPath: '/login',
    completeNewPasswordPath: '/complete-new-password',
    verifyEmailPath: '/verify-email',
    redirectToPreviousPath: true,
    defaultLoginSucceededPath: '/',
  },
});
