import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { useCogreactConfig } from '../hooks/useCogreactConfig';

export const SignInRoute: React.FC = () => {
  const { authStatus } = useAuthStatus();
  const {
    loadingComponent,
    signInPath,
    verifyEmailPath,
    completeNewPasswordPath,
    redirectToPreviousPath,
    defaultSignInSucceededPath,
  } = useCogreactConfig();
  const { state } = useLocation() as { state: { from?: string } };

  switch (authStatus) {
    case 'LOADING':
      return loadingComponent;
    case 'SIGNED_IN':
      return <Navigate to={redirectToPreviousPath && state?.from ? state.from : defaultSignInSucceededPath} />;
    case 'REQUIRE_COMPLETE_NEW_PASSWORD':
      return <Navigate to={completeNewPasswordPath} />;
    case 'REQUIRE_EMAIL_VERIFICATION':
      return <Navigate to={verifyEmailPath} />;
    case 'REQUIRE_SIGN_UP_CONFIRMATION':
      return <Navigate to={signInPath} />;
  }

  return <Outlet />;
};
