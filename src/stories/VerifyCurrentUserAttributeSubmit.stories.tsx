import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useVerifyCurrentUserAttributeSubmit } from '../hooks/useVerifyCurrentUserAttributeSubmit';
import { authStateAtom } from '../recoil/atoms';
import { CogreactWrapper } from './CogreactWrapper';

type Props = {};

export const VerifyCurrentUserAttributeSubmit: React.VFC<Props> = ({}) => {
  return <VerifyCurrentUserAttributeSubmitForm />;
};

const VerifyCurrentUserAttributeSubmitForm = () => {
  const authState = useRecoilValue(authStateAtom);
  const { verifyCurrentUserAttributeSubmit, loading, error } = useVerifyCurrentUserAttributeSubmit();

  const [code, setCode] = useState('');

  const handleClick = () => {
    verifyCurrentUserAttributeSubmit('email', code);
  };

  return (
    <CogreactWrapper>
      <h1>VerifyCurrentUserAttributeSubmit</h1>
      <p>AuthStatus: {authState.authStatus}</p>
      {error && <p style={{ backgroundColor: '#fee2e2' }}>{error}</p>}
      <div>
        <input type="text" placeholder="code" value={code} onChange={(e) => setCode(e.currentTarget.value)} />
        <button onClick={handleClick}>Verify Current User Attribute Submit</button>
      </div>
    </CogreactWrapper>
  );
};

export default {
  title: 'VerifyCurrentUserAttributeSubmit',
  component: VerifyCurrentUserAttributeSubmit,
};
