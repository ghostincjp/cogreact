import { Amplify } from 'aws-amplify';
import React, { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { authStateAtom, cogreactOptionsAtom } from '../recoil/atoms';
import { getInitialAuthStatus, getUserAttributes, getUserRoles } from '../utils/utils';

type CogreactConfig = {
  children: React.ReactNode;
  AuthConfig: {
    region: string;
    identityPoolId: string;
    userPoolId: string;
    userPoolWebClientId: string;
  };
  S3Config?: {
    bucket: string;
    region: string;
  };
} & Partial<CogreactOptions>;

export type CogreactOptions = {
  loadingComponent: React.ReactElement<any, any> | null;
  signInPath: string;
  completeNewPasswordPath: string;
  verifyEmailPath: string;
  redirectToPreviousPath: boolean;
  defaultSignInSucceededPath: string;
};

export const Cogreact: React.FC<CogreactConfig> = ({
  children,
  AuthConfig,
  S3Config,
  loadingComponent,
  signInPath,
  completeNewPasswordPath,
  verifyEmailPath,
  redirectToPreviousPath,
  defaultSignInSucceededPath,
}) => {
  const [authState, setAuthState] = useRecoilState(authStateAtom);
  const [cogreactConfig, setCogreactConfig] = useRecoilState(cogreactOptionsAtom);
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) return;

    Amplify.configure({
      Auth: AuthConfig,
      Storage: {
        AWSS3: S3Config,
      },
    });

    setCogreactConfig((state) => ({
      ...state,
      ...(loadingComponent != undefined && { loadingComponent }),
      ...(signInPath && { signInPath }),
      ...(completeNewPasswordPath && { completeNewPasswordPath }),
      ...(verifyEmailPath && { verifyEmailPath }),
      ...(redirectToPreviousPath && { redirectToPreviousPath }),
      ...(defaultSignInSucceededPath && { defaultSignInSucceededPath }),
    }));

    initAuthStatus();

    didMount.current = true;
  }, []);

  useEffect(() => {
    if (authState.authStatus === 'LOADING' || authState.authStatus === 'SIGNED_OUT') return;
    fetchUserAttributes();
    fetchUserRoles();
  }, [authState.authStatus, authState.email]);

  const initAuthStatus = async () => {
    const authStatus = await getInitialAuthStatus();
    setAuthState({ ...authState, authStatus });
  };

  const fetchUserAttributes = async () => {
    const attributes = await getUserAttributes();

    if (!attributes) return;

    setAuthState({ ...authState, ...attributes });
  };

  const fetchUserRoles = async () => {
    const roles = await getUserRoles();
    setAuthState({ ...authState, roles });
  };

  if (authState.authStatus === 'LOADING') return cogreactConfig.loadingComponent;

  return <>{children}</>;
};
