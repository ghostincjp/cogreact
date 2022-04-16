import { Auth } from 'aws-amplify';
import { useSetRecoilState } from 'recoil';
import { authStateAtom } from '../recoil/atoms';
import { ResponseResult } from '../types';
import useHttpStatus from './useHttpStatus';

type Attributes = {
  email?: string;
  preferred_username?: string;
};

type UseChangePasswordArgs = {
  onCompleted?: (result: ResponseResult) => void;
};

export const useChangePassword = (args?: UseChangePasswordArgs) => {
  const setAuthState = useSetRecoilState(authStateAtom);
  const { loading, setLoading, error, setError } = useHttpStatus();

  const changePassword = async (password: string, newPassword: string) => {
    try {
      setLoading(true);
      const cognitoUser = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(cognitoUser, password, newPassword);

      args?.onCompleted && args.onCompleted('success');
    } catch (error: any) {
      switch (error.code) {
        case 'NotAuthorizedException':
          // oldPassword が誤っている場合に起こる。
          setError('現在のパスワードが誤っています');
          break;
        case 'LimitExceededException':
          // oldPassword を間違え続けた場合に起こる。
          setError('パスワード変更の試行回数が制限を超えました。時間を置いて再度実行してください。');
          break;
        case 'InvalidPasswordException':
          // ユーザープールのポリシーで設定したパスワードの強度を満たさない場合に起こる。
          setError('パスワードの要件を満たしていません');
          break;
        case 'InvalidParameterException':
          // password が6文字未満など Cognito側で正しくパースできない場合（バリデーションエラー）に起こる。
          setError('パスワードの値が不正です');
          break;
        default:
          // その他のエラー
          setError('エラーが発生しました');
          break;
      }
      args?.onCompleted && args?.onCompleted('error');
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading, error };
};
