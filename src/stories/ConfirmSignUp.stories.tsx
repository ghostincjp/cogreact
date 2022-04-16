import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useConfirmSignUp } from '../hooks/useConfirmSignUp';
import { authStateAtom } from '../recoil/atoms';
import { CogreactWrapper } from './CogreactWrapper';

type Props = {};

export const ConfirmSignUp: React.VFC<Props> = ({}) => {
  return <ConfirmSignUpForm />;
};

const ConfirmSignUpForm = () => {
  const authState = useRecoilValue(authStateAtom);
  const { confirmSignUp, loading, error } = useConfirmSignUp();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const handleClick = () => {
    confirmSignUp({ email, code });
  };

  return (
    <CogreactWrapper>
      <h1>ConfirmSignUp</h1>
      <p>AuthStatus: {authState.authStatus}</p>
      {error && <p style={{ backgroundColor: '#fee2e2' }}>{error}</p>}
      <div>
        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        <input type="text" placeholder="code" value={code} onChange={(e) => setCode(e.currentTarget.value)} />
        <button onClick={handleClick}>Confirm sign up</button>
      </div>
    </CogreactWrapper>
  );
};

export default {
  title: 'ConfirmSignUp',
  component: ConfirmSignUp,
};
