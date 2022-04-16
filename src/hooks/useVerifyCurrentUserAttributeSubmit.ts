import { Auth } from 'aws-amplify';
import { useSetRecoilState } from 'recoil';
import { authStateAtom } from '../recoil/atoms';
import { ResponseResult } from '../types';
import useHttpStatus from './useHttpStatus';
import { VerifyAttribute } from './useVerifyCurrentUserAttribute';

type UseVerifyCurrentUserAttributeSubmit = {
  onCompleted?: (result: ResponseResult) => void;
};

export const useVerifyCurrentUserAttributeSubmit = (args?: UseVerifyCurrentUserAttributeSubmit) => {
  const setAuthState = useSetRecoilState(authStateAtom);
  const { loading, setLoading, error, setError } = useHttpStatus();

  const verifyCurrentUserAttributeSubmit = async (verifyAttribute: VerifyAttribute, code: string) => {
    try {
      setLoading(true);
      await Auth.verifyCurrentUserAttributeSubmit(verifyAttribute, code);

      setAuthState((state) => ({ ...state, authStatus: 'SIGNED_IN' }));

      args?.onCompleted && args?.onCompleted('success');
    } catch (error: any) {
      switch (error.code) {
        case 'CodeMismatchException':
          // 無効なコードが入力された場合に起こる。
          setError('入力されたコードは無効です');
          break;
        case 'LimitExceededException':
          // コードを間違え続けた場合に起こる。
          setError('認証コードの試行回数上限を超えました。時間をおいて再度お試しください。');
          break;
        case 'ExpiredCodeException':
          // コードが期限切れ（24時間をオーバー）した場合に起こる。
          setError('入力されたコードの有効期限が切れています');
          break;
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

  return { verifyCurrentUserAttributeSubmit, loading, error };
};
