import { Auth } from 'aws-amplify';
import { useSetRecoilState } from 'recoil';
import { authStateAtom } from '../recoil/atoms';
import useHttpStatus from './useHttpStatus';

type SignUpArgs = {
  email: string;
  password: string;
  attributes: { [key: string]: string };
};

export const useSignUp = () => {
  const setAuthState = useSetRecoilState(authStateAtom);
  const { loading, setLoading, error, setError } = useHttpStatus();

  const signUp = async ({ email, password, attributes }: SignUpArgs) => {
    try {
      setLoading(true);

      await Auth.signUp({
        username: email,
        password,
        attributes,
      });

      setAuthState((state) => ({ ...state, authStatus: 'REQUIRE_SIGN_UP_CONFIRMATION' }));
      // dispatch({ type: 'SIGN_UP_SUCCEEDED' });
      setError('');
    } catch (error: any) {
      switch (error?.code) {
        // ユーザープール内に既に同じ username が存在する場合に起こる。
        case 'UsernameExistsException':
          setError('ユーザーが既に存在しています');
          break;
        case 'InvalidPasswordException':
          // ユーザープールのポリシーで設定したパスワードの強度を満たさない場合に起こる。
          setError('パスワードがポリシーを満たしていません');
          break;
        case 'InvalidParameterException':
          // 必要な属性が足りない場合や、入力された各項目が Cognito 側で正しくパースできない場合（バリデーションエラー）に起こる。
          // password が6文字未満の場合はバリデーションエラーでこちらのエラーコードが返ってくる。
          setError('登録内容に問題があります');
          break;
        default:
          setError('登録に失敗しました');
          break;
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { signUp, loading, error };
};
