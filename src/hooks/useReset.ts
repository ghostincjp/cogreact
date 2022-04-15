import { useResetRecoilState } from 'recoil';
import { authStateAtom } from '../recoil/atoms';

export const useReset = () => {
  const reset = useResetRecoilState(authStateAtom);

  return { reset };
};
