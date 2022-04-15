import { Amplify } from 'aws-amplify';
import React, { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { authStateAtom } from '../recoil/atoms';
import { getInitialAuthStatus, getUserAttributes, getUserRoles } from '../utils/utils';

type Props = {
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
};

export const Cogreact: React.FC<Props> = ({ children, AuthConfig, S3Config }) => {
  const [authState, setAuthState] = useRecoilState(authStateAtom);
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) return;

    Amplify.configure({
      Auth: AuthConfig,
      Storage: {
        AWSS3: S3Config,
      },
    });

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

  if (authState.authStatus === 'LOADING') return <p>Loading...</p>;

  return <>{children}</>;
};
