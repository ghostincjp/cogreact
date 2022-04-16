import { Auth } from 'aws-amplify';
import { useSetRecoilState } from 'recoil';
import { authStateAtom } from '../recoil/atoms';
import { ResponseResult } from '../types';
import { registeredEmail } from './../utils/utils';
import useHttpStatus from './useHttpStatus';

export type Attributes = {
  email?: string;
  preferred_username?: string;
  family_name?: string;
  given_name?: string;
  name?: string;
};

type UseUpdateUserAttributesArgs = {
  onCompleted?: (result: ResponseResult) => void;
};

export const useUpdateUserAttributes = (args?: UseUpdateUserAttributesArgs) => {
  const setAuthState = useSetRecoilState(authStateAtom);
  const { loading, setLoading, error, setError } = useHttpStatus();

  const updateUserAttributes = async (attributes: Attributes) => {
    if (attributes.email) {
      const currentEmail = await registeredEmail();
      if (attributes.email === currentEmail) {
        return;
      }
    }

    try {
      setLoading(true);
      const cognitoUser = await Auth.currentAuthenticatedUser();

      await Auth.updateUserAttributes(cognitoUser, attributes);

      if (attributes.email) {
        setAuthState((state) => ({ ...state, authStatus: 'REQUIRE_EMAIL_VERIFICATION' }));
        return;
      }

      setAuthState((state) => ({ ...state, attributes }));

      args?.onCompleted && args?.onCompleted('success');
    } catch (error: any) {
      switch (error.code) {
        case 'InvalidParameterException':
          // phone_number が E.164 number convention でないなど各属性が Cognito 側で正しくパースできない場合（バリデーションエラー）に起こる。
          setError('入力したユーザー情報が不正です');
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

  return { updateUserAttributes, loading, error };
};
