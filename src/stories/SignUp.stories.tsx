import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useSignUp } from '../hooks/useSignUp';
import { authStateAtom } from '../recoil/atoms';
import { CogreactWrapper } from './CogreactWrapper';

type Props = {};

export const SignUp: React.VFC<Props> = ({}) => {
  return <SignUpForm />;
};

const SignUpForm = () => {
  const authState = useRecoilValue(authStateAtom);
  const { signUp, loading, error } = useSignUp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleClick = () => {
    signUp({ email, password, attributes: { name: name } });
  };

  return (
    <CogreactWrapper>
      <h1>SignUp</h1>
      <p>AuthStatus: {authState.authStatus}</p>
      {error && <p style={{ backgroundColor: '#fee2e2' }}>{error}</p>}
      <div>
        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
        <button onClick={handleClick}>Sign Up</button>
      </div>
    </CogreactWrapper>
  );
};

export default {
  title: 'SignUp',
  component: SignUp,
};
