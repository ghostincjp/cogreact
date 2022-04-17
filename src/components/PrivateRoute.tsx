import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { useCogreactConfig } from '../hooks/useCogreactConfig';

export const PrivateRoute: React.FC = () => {
  const { authStatus } = useAuthStatus();
  const { loadingComponent, signInPath, verifyEmailPath, completeNewPasswordPath } = useCogreactConfig();
  const location = useLocation();

  switch (authStatus) {
    case 'LOADING':
      return loadingComponent;
    case 'SIGNED_OUT':
      return <Navigate to={signInPath} state={{ from: location.pathname }} />;
    case 'REQUIRE_COMPLETE_NEW_PASSWORD':
      return <Navigate to={completeNewPasswordPath} state={{ from: location.pathname }} />;
    case 'REQUIRE_EMAIL_VERIFICATION':
      return <Navigate to={verifyEmailPath} state={{ from: location.pathname }} />;
    case 'REQUIRE_SIGN_UP_CONFIRMATION':
      return <Navigate to={signInPath} state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};
