import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useSignIn } from '../hooks/useSignIn';
import { authStateAtom } from '../recoil/atoms';
import { CogreactWrapper } from './CogreactWrapper';

type Props = {};

export const SignIn: React.VFC<Props> = ({}) => {
  return <SignInForm />;
};

const SignInForm = () => {
  const authState = useRecoilValue(authStateAtom);
  const { signIn, loading, error } = useSignIn();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleClick = () => {
    signIn({ email, password });
  };

  return (
    <CogreactWrapper>
      <h1>SignIn</h1>
      <p>AuthStatus: {authState.authStatus}</p>
      {error && <p style={{ backgroundColor: '#fee2e2' }}>{error}</p>}
      <div>
        <input
          type="text"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <button onClick={handleClick}>Sign In</button>
      </div>
    </CogreactWrapper>
  );
};

export default {
  title: 'SignIn',
  component: SignIn,
};
