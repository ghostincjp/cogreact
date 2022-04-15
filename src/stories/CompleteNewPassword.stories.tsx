import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useCompleteNewPassword } from '../hooks/useCompleteNewPassword';
import { authStateAtom } from '../recoil/atoms';
import { CogreactWrapper } from './CogreactWrapper';

type Props = {};

export const CompleteNewPassword: React.VFC<Props> = ({}) => {
  return <CompleteNewPasswordForm />;
};

const CompleteNewPasswordForm = () => {
  const authState = useRecoilValue(authStateAtom);
  const { completeNewPassword, loading, error } = useCompleteNewPassword();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleClick = () => {
    completeNewPassword(newPassword, { email });
  };

  return (
    <CogreactWrapper>
      <h1>CompleteNewPassword</h1>
      <p>AuthStatus: {authState.authStatus}</p>
      {error && <p style={{ backgroundColor: '#fee2e2' }}>{error}</p>}
      <div>
        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        <input
          type="text"
          placeholder="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.currentTarget.value)}
        />
        <button onClick={handleClick}>Sign In</button>
      </div>
    </CogreactWrapper>
  );
};

export default {
  title: 'CompleteNewPassword',
  component: CompleteNewPassword,
};
