import { useRecoilValue } from 'recoil';
import { authStateAtom } from '../recoil/atoms';

export const useAuthStatus = () => {
  const authState = useRecoilValue(authStateAtom);
  return { authStatus: authState.authStatus };
};
