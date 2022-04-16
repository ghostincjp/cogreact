import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useResendSignUp } from '../hooks/useResendSignUp';
import { authStateAtom } from '../recoil/atoms';
import { CogreactWrapper } from './CogreactWrapper';

type Props = {};

export const ResendSignUp: React.VFC<Props> = ({}) => {
  return <ResendSignUpForm />;
};

const ResendSignUpForm = () => {
  const authState = useRecoilValue(authStateAtom);
  const { resendSignUp, loading, error } = useResendSignUp();

  const [email, setEmail] = useState('');

  const handleClick = () => {
    resendSignUp({ email });
  };

  return (
    <CogreactWrapper>
      <h1>ResendSignUp</h1>
      <p>AuthStatus: {authState.authStatus}</p>
      {error && <p style={{ backgroundColor: '#fee2e2' }}>{error}</p>}
      <div>
        <input
          type="text"
          placeholder="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <button onClick={handleClick}>Resend Sign Up</button>
      </div>
    </CogreactWrapper>
  );
};

export default {
  title: 'ResendSignUp',
  component: ResendSignUp,
};
