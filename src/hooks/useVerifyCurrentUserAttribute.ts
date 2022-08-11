import { Auth } from '@aws-amplify/auth';
import { ResponseResult } from '../types';
import useHttpStatus from './useHttpStatus';

export type VerifyAttribute = 'email' | 'phone_number';

type UseVerifyCurrentUserAttributes = {
  onCompleted?: (result: ResponseResult) => void;
};

export const useVerifyCurrentUserAttributes = (args?: UseVerifyCurrentUserAttributes) => {
  const { loading, setLoading, error, setError } = useHttpStatus();

  const verifyCurrentUserAttribute = async (verifyAttribute: VerifyAttribute) => {
    try {
      setLoading(true);
      await Auth.verifyCurrentUserAttribute(verifyAttribute);

      args?.onCompleted && args?.onCompleted('success');
    } catch (error: any) {
      switch (error.code) {
        case 'NotAuthorizedException':
          // ユーザーが無効化された場合に起こる。
          setError('アカウントが無効化されています');
          break;
        case 'UserNotFoundException':
          // ユーザーがユーザープールに存在しない場合に起こる。
          setError('アカウントが存在しません');
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

  return { verifyCurrentUserAttribute, loading, error };
};
