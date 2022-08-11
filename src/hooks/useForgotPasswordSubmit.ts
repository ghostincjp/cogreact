import { Auth } from '@aws-amplify/auth';
import { ResponseResult } from '../types';
import useHttpStatus from './useHttpStatus';

type UseForgotPasswordSubmitArgs = {
  onCompleted?: (result: ResponseResult) => void;
};

export const useForgotPasswordSubmit = (args?: UseForgotPasswordSubmitArgs) => {
  const { loading, setLoading, error, setError } = useHttpStatus();

  /**
   * @param username username または username alias (email, preferred_username等)が使用可能
   */
  const forgotPasswordSubmit = async (username: string, code: string, newPassword: string) => {
    try {
      setLoading(true);
      await Auth.forgotPasswordSubmit(username, code, newPassword);

      args?.onCompleted && args?.onCompleted('success');
    } catch (error: any) {
      switch (error.code) {
        case 'CodeMismatchException':
          // 無効なコードが入力された場合に起こる。
          // 注) username が存在しない・無効化されている場合にも起こる。
          setError('認証コードが無効です');
          break;
        case 'LimitExceededException':
          // コードを間違え続けた場合に起こる。
          setError('認証コードを連続で間違えたため入力が無効です');
          break;
        case 'ExpiredCodeException':
          // コードが期限切れ（1時間をオーバー）した場合に起こる。
          // 注) Auth.forgotPassword() によってコードがリクエストされていない場合にも起こる。
          setError('認証コードの有効期限が切れています');
          break;
        case 'InvalidPasswordException':
          // ユーザープールのポリシーで設定したパスワードの強度を満たさない場合に起こる。
          setError('パスワードが条件を満たしていません');
          break;
        case 'InvalidParameterException':
          // password が6文字未満など Cognito 側で正しくパースできない場合（バリデーションエラー）に起こる。
          setError('入力が不正です');
          break;
        default:
          setError('エラーが発生しました');
      }
      args?.onCompleted && args?.onCompleted('error');
    } finally {
      setLoading(false);
    }
  };

  return { forgotPasswordSubmit, loading, error };
};
