import { Auth } from '@aws-amplify/auth';
import { useRecoilState } from 'recoil';
import { authStateAtom } from '../recoil/atoms';
import { ResponseResult } from '../types';
import { hasValidEmail } from '../utils/utils';
import useHttpStatus from './useHttpStatus';

type UseCompleteNewPasswordArgs = {
  onCompleted?: (result: ResponseResult) => void;
};

export type CognitoRequiredAttributes = {
  email?: string;
  preferred_username?: string;
};

export const useCompleteNewPassword = (args?: UseCompleteNewPasswordArgs) => {
  const [authState, setAuthState] = useRecoilState(authStateAtom);
  const { loading, setLoading, error, setError } = useHttpStatus();

  const completeNewPassword = async (newPassword: string, requiredAttributes?: CognitoRequiredAttributes) => {
    try {
      if (!authState.cognitoUserForCompletePassword) {
        setError('新規パスワードの登録前に仮パスワードでログインを行ってください');
        return;
      }

      setLoading(true);
      await Auth.completeNewPassword(authState.cognitoUserForCompletePassword, newPassword, requiredAttributes);

      args?.onCompleted && args?.onCompleted('success');

      if (!(await hasValidEmail())) {
        setAuthState((state) => ({ ...state, authStatus: 'REQUIRE_EMAIL_VERIFICATION' }));
        return;
      }

      setAuthState((state) => ({ ...state, authStatus: 'SIGNED_IN' }));
    } catch (error: any) {
      switch (error.code) {
        case 'NotAuthorizedException':
          // 誤ったパスワードを入力した場合に起こる。
          // 注) パスワードを間違え続けた場合にも起こり、 error.message が 'Password attempts exceeded' になる。
          setError('パスワードに誤りがあります');
          break;
        default:
          setError('パスワードの設定に失敗しました');
          break;
      }
      args?.onCompleted && args?.onCompleted('error');
    } finally {
      setLoading(false);
    }
  };

  return { completeNewPassword, loading, error };
};
