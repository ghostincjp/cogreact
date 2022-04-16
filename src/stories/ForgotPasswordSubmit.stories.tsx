import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useForgotPasswordSubmit } from '../hooks/useForgotPasswordSubmit';
import { authStateAtom } from '../recoil/atoms';
import { CogreactWrapper } from './CogreactWrapper';

type Props = {};

export const ForgotPasswordSubmit: React.VFC<Props> = ({}) => {
  return <ForgotPasswordSubmitForm />;
};

const ForgotPasswordSubmitForm = () => {
  const authState = useRecoilValue(authStateAtom);
  const { forgotPasswordSubmit, loading, error } = useForgotPasswordSubmit();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [code, setCode] = useState('');

  const handleClick = () => {
    forgotPasswordSubmit(email, code, newPassword);
  };

  return (
    <CogreactWrapper>
      <h1>ForgotPasswordSubmit</h1>
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
        <input type="text" placeholder="code" value={code} onChange={(e) => setCode(e.currentTarget.value)} />
        <button onClick={handleClick}>Forgot Password Submit</button>
      </div>
    </CogreactWrapper>
  );
};

export default {
  title: 'ForgotPasswordSubmit',
  component: ForgotPasswordSubmit,
};
