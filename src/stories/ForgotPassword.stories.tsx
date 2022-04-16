import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useForgotPassword } from '../hooks/useForgotPassword';
import { authStateAtom } from '../recoil/atoms';
import { CogreactWrapper } from './CogreactWrapper';

type Props = {};

export const ForgotPassword: React.VFC<Props> = ({}) => {
  return <ForgotPasswordForm />;
};

const ForgotPasswordForm = () => {
  const authState = useRecoilValue(authStateAtom);
  const { forgotPassword, loading, error } = useForgotPassword();

  const [email, setEmail] = useState('');

  const handleClick = () => {
    forgotPassword(email);
  };

  return (
    <CogreactWrapper>
      <h1>ForgotPassword</h1>
      <p>AuthStatus: {authState.authStatus}</p>
      {error && <p style={{ backgroundColor: '#fee2e2' }}>{error}</p>}
      <div>
        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        <button onClick={handleClick}>Forgot Password</button>
      </div>
    </CogreactWrapper>
  );
};

export default {
  title: 'ForgotPassword',
  component: ForgotPassword,
};
