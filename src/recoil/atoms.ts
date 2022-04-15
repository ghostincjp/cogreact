import { atom } from 'recoil';
import { AuthState } from '../types';
import { RecoilKey } from './keys';

export const authStateAtom = atom<AuthState>({
  key: RecoilKey.AUTH_STATE,
  default: {
    authStatus: 'LOADING',
    roles: [],
  },
});
