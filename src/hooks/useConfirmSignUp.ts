import { Auth } from 'aws-amplify';
import { useSetRecoilState } from 'recoil';
import { authStateAtom } from '../recoil/atoms';
import useHttpStatus from './useHttpStatus';

type confirmSignUpArgs = {
  email: string;
  code: string;
};

export const useConfirmSignUp = () => {
  const setAuthState = useSetRecoilState(authStateAtom);
  const { loading, setLoading, error, setError } = useHttpStatus();

  const confirmSignUp = async ({ email, code }: confirmSignUpArgs) => {
    try {
      setLoading(true);

      await Auth.confirmSignUp(email, code);

      setAuthState((state) => ({ ...state, authStatus: 'SIGNED_OUT' }));
      setError('');
    } catch (error: any) {
      switch (error.code) {
        case 'CodeMismatchException':
          // 無効なコードが入力された場合に起こる。
          setError('無効なコードです');
          break;
        case 'LimitExceededException':
          // コードを間違え続けた場合に起こる。
          setError('認証コードの失敗が規定回数を超えました。時間をおいてお試しください。');
          break;
        case 'ExpiredCodeException':
          // コードが期限切れ（24時間をオーバー）した場合に起こる。
          // 注) username が存在しない・無効化されている場合にも起こる。
          setError('認証コードの有効期限が切れています');
          break;
        case 'NotAuthorizedException':
          // 既にステータスが CONFIRMED になっている場合に起こる。
          setError('既に認証コードが入力済みです');
          break;
        case 'CodeDeliveryFailureException':
          // 認証コードの送信に失敗した場合に起こる。
          setError('認証コードの送信に失敗しました');
          break;
        default:
          // その他のエラー
          setError('認証コードの確認に失敗しました');
          break;
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { confirmSignUp, loading, error };
};
