import React from 'react';
import { useRecoilValue } from 'recoil';
import { useSignOut } from '../hooks/useSignOut';
import { authStateAtom } from '../recoil/atoms';
import { CogreactWrapper } from './CogreactWrapper';

type Props = {};

export const SignOut: React.VFC<Props> = ({}) => {
  return <SignOutForm />;
};

const SignOutForm = () => {
  const authState = useRecoilValue(authStateAtom);
  const { signOut, loading, error } = useSignOut();

  const handleClick = () => {
    signOut();
  };

  return (
    <CogreactWrapper>
      <h1>SignOut</h1>
      <p>AuthStatus: {authState.authStatus}</p>
      {error && <p style={{ backgroundColor: '#fee2e2' }}>{error}</p>}
      <div>
        <button onClick={handleClick}>Sign out</button>
      </div>
    </CogreactWrapper>
  );
};

export default {
  title: 'SignOut',
  component: SignOut,
};
