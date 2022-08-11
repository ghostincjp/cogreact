import { Auth } from '@aws-amplify/auth';
import { useSetRecoilState } from 'recoil';
import { authStateAtom } from '../recoil/atoms';
import useHttpStatus from './useHttpStatus';

export const useSignOut = () => {
  const setAuthState = useSetRecoilState(authStateAtom);
  const { loading, setLoading, error, setError } = useHttpStatus();

  const signOut = async ({ global }: { global: boolean } = { global: false }) => {
    try {
      setLoading(true);
      await Auth.signOut({ global });
      setAuthState((state) => ({ ...state, authStatus: 'SIGNED_OUT' }));
    } catch (error: any) {
      setError('ログアウトに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return { signOut, loading, error };
};
