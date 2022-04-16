import { Auth } from 'aws-amplify';
import { ResponseResult } from '../types';
import useHttpStatus from './useHttpStatus';

type UseForgotPasswordArgs = {
  onCompleted?: (result: ResponseResult) => void;
};

export const useForgotPassword = (args?: UseForgotPasswordArgs) => {
  const { loading, setLoading, error, setError } = useHttpStatus();

  /**
   * @param username username または username alias (email, preferred_username等)が使用可能
   */
  const forgotPassword = async (username: string) => {
    try {
      setLoading(true);
      await Auth.forgotPassword(username);

      args?.onCompleted && args?.onCompleted('success');
    } catch (error: any) {
      switch (error.code) {
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

  return { forgotPassword, loading, error };
};
