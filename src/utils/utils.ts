import { Auth } from 'aws-amplify';
import { ROLES, RoleType } from '../types';

export const hasValidEmail = async () => {
  try {
    const userInfo = await Auth.currentUserInfo();
    return !!userInfo?.attributes?.email_verified;
  } catch (error) {
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
  } catch (error) {
    return false;
  }
};

export const getUserAttributes = async () => {
  try {
    const userInfo = await Auth.currentUserInfo();
    return userInfo?.attributes;
  } catch (error) {
    return {};
  }
};

export const getInitialAuthStatus = async () => {
  // sessionなし　＝　ログイン情報なし（SIGNED_OUT）
  try {
    await Auth.currentSession();
  } catch (error) {
    return 'SIGNED_OUT';
  }

  // email検証なし
  if (!(await hasValidEmail())) {
    return 'REQUIRE_EMAIL_VERIFICATION';
  }

  return 'SIGNED_IN';
};

export const getUserRoles = async (): Promise<RoleType[]> => {
  const currentSession = await Auth.currentSession();
  const roles: string[] = currentSession.getIdToken().payload['cognito:groups'] ?? [];

  return roles.filter(isRole);
};

export const isRole = (str: any): str is RoleType => {
  if (ROLES.includes(str)) {
    return true;
  }
  return false;
};
