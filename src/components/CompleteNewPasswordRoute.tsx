import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { useCogreactConfig } from '../hooks/useCogreactConfig';

export const CompleteNewPasswordRoute: React.FC = () => {
  const { authStatus } = useAuthStatus();
  const {
    loadingComponent,
    loginPath,
    verifyEmailPath,
    completeNewPasswordPath,
    redirectToPreviousPath,
    defaultLoginSucceededPath,
  } = useCogreactConfig();
  const { state } = useLocation() as { state: { from?: string } };

  switch (authStatus) {
    case 'LOADING':
      return loadingComponent;
    case 'SIGNED_IN':
      return <Navigate to={redirectToPreviousPath && state?.from ? state.from : defaultLoginSucceededPath} />;
    case 'SIGNED_OUT':
      return <Navigate to={loginPath} />;
    case 'REQUIRE_EMAIL_VERIFICATION':
      return <Navigate to={verifyEmailPath} />;
    case 'REQUIRE_SIGN_UP_CONFIRMATION':
      return <Navigate to={loginPath} />;
  }

  return <Outlet />;
};
