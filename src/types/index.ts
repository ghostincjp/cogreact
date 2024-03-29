import { Attributes } from '../hooks/useUpdateUserAttributes';

export type AuthStatus =
  | 'LOADING'
  | 'SIGNED_IN'
  | 'SIGNED_OUT'
  | 'REQUIRE_COMPLETE_NEW_PASSWORD'
  | 'REQUIRE_SIGN_UP_CONFIRMATION'
  | 'REQUIRE_EMAIL_VERIFICATION';

export type ResponseResult = 'success' | 'error';

export type AuthState = {
  authStatus: AuthStatus;
  roles: string[];
} & Attributes;
