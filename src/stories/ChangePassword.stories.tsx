import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useChangePassword } from '../hooks/useChangePassword';
import { authStateAtom } from '../recoil/atoms';
import { CogreactWrapper } from './CogreactWrapper';

type Props = {};

export const ChangePassword: React.VFC<Props> = ({}) => {
  return <ChangePasswordForm />;
};

const ChangePasswordForm = () => {
  const authState = useRecoilValue(authStateAtom);
  const { changePassword, loading, error } = useChangePassword();

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleClick = () => {
    changePassword(password, newPassword);
  };

  return (
    <CogreactWrapper>
      <h1>ChangePassword</h1>
      <p>AuthStatus: {authState.authStatus}</p>
      {error && <p style={{ backgroundColor: '#fee2e2' }}>{error}</p>}
      <div>
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <input
          type="text"
          placeholder="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.currentTarget.value)}
        />

        <button onClick={handleClick}>Change Password</button>
      </div>
    </CogreactWrapper>
  );
};

export default {
  title: 'ChangePassword',
  component: ChangePassword,
};
