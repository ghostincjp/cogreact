import { Auth } from '@aws-amplify/auth';
import { useSetRecoilState } from 'recoil';
import { authStateAtom } from '../recoil/atoms';
import { hasValidEmail } from '../utils/utils';
import useHttpStatus from './useHttpStatus';

export const useSignIn = () => {
  const setAuthState = useSetRecoilState(authStateAtom);
  const { loading, setLoading, error, setError } = useHttpStatus();

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    try {
      setLoading(true);
      const cognitoUser = await Auth.signIn({
        username: email,
        password,
      });

      if (cognitoUser?.signInUserSession == null) {
        setAuthState((state) => ({
          ...state,
          cognitoUserForCompletePassword: cognitoUser,
          authStatus: 'REQUIRE_COMPLETE_NEW_PASSWORD',
        }));
        return;
      }

      if (!(await hasValidEmail())) {
        setAuthState((state) => ({ ...state, authStatus: 'REQUIRE_EMAIL_VERIFICATION' }));
        return;
      }

      setAuthState((state) => ({ ...state, authStatus: 'SIGNED_IN' }));
      setError('');
    } catch (error: any) {
      switch (error.code) {
        case 'UserNotFoundException':
          setError('ユーザーが存在しません');
          break;
        case 'NotAuthorizedException':
          // 誤ったパスワードを入力した場合に起こる。
          // 注) パスワードを間違え続けた場合にも起こり、 error.message が 'Password attempts exceeded' になる。
          // ! id/passミスの場合も、ユーザーがdisabledの場合もこのエラーになる。判定したい場合はmessageの中身を見る必要がある
          setError('ユーザー名／パスワードに誤りがあります');
          break;
        case 'UserNotConfirmedException':
          setError('メールアドレスの認証が完了していません');
          setAuthState((state) => ({ ...state, authStatus: 'REQUIRE_SIGN_UP_CONFIRMATION' }));
          break;
        default:
          setError('ログインに失敗しました');
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading, error };
};
