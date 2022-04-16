import { Auth } from 'aws-amplify';
import { useSetRecoilState } from 'recoil';
import { authStateAtom } from '../recoil/atoms';
import useHttpStatus from './useHttpStatus';

type ResendSignUpArgs = {
  email: string;
};

export const useResendSignUp = () => {
  const setAuthState = useSetRecoilState(authStateAtom);
  const { loading, setLoading, error, setError } = useHttpStatus();

  const resendSignUp = async ({ email }: ResendSignUpArgs) => {
    try {
      setLoading(true);

      await Auth.resendSignUp(email);

      setAuthState((state) => ({ ...state, authStatus: 'REQUIRE_SIGN_UP_CONFIRMATION' }));
      setError('');
    } catch (error: any) {
      switch (error.code) {
        case 'CodeDeliveryFailureException':
          // 認証コードの送信に失敗した場合に起こる。
          setError('認証コードの再発行に失敗しました');
          break;
        default:
          setError('再送処理に失敗しました');
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return { resendSignUp, loading, error };
};
