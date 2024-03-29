import { Auth } from '@aws-amplify/auth';

export const hasValidEmail = async () => {
  try {
    const userInfo = await Auth.currentUserInfo();
    return !!userInfo?.attributes?.email_verified;
  } catch (error: any) {
    return false;
  }
};

export const registeredEmail = async () => {
  try {
    const userInfo = await Auth.currentUserInfo();
    if (userInfo?.attributes?.email == undefined || userInfo.attributes.email === false) {
      return false;
    }
    return userInfo.attributes.email;
  } catch (error: any) {
    return false;
  }
};

export const getUserAttributes = async () => {
  try {
    const userInfo = await Auth.currentUserInfo();
    return userInfo?.attributes;
  } catch (error: any) {
    return {};
  }
};

export const getInitialAuthStatus = async () => {
  // sessionなし　＝　ログイン情報なし（SIGNED_OUT）
  try {
    await Auth.currentSession();
  } catch (error: any) {
    return 'SIGNED_OUT';
  }

  // email検証なし
  if (!(await hasValidEmail())) {
    return 'REQUIRE_EMAIL_VERIFICATION';
  }

  return 'SIGNED_IN';
};

export const getUserRoles = async (): Promise<string[]> => {
  const currentSession = await Auth.currentSession();
  const roles: string[] = currentSession.getIdToken().payload['cognito:groups'] ?? [];

  return roles;
};
