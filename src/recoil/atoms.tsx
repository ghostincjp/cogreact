import React from 'react';
import { atom } from 'recoil';
import { CogreactOptions } from '../components/Cogreact';
import { AuthState } from '../types';
import { RecoilKey } from './keys';

export const authStateAtom = atom<AuthState>({
  key: RecoilKey.AUTH_STATE,
  default: {
    authStatus: 'LOADING',
    roles: [],
  },
});

export const cognitoUserForCompletePasswordAtom = atom<any>({
  key: RecoilKey.COGNITO_USER_FOR_COMPLETE_PASSWORD,
  default: undefined,
  // Avoid TypeError: Cannot freeze
  // See more: https://github.com/facebookexperimental/Recoil/issues/406#issuecomment-650364700
  dangerouslyAllowMutability: true,
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
