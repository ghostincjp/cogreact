import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useUpdateUserAttributes } from '../hooks/useUpdateUserAttributes';
import { authStateAtom } from '../recoil/atoms';
import { CogreactWrapper } from './CogreactWrapper';

type Props = {};

export const UpdateUserAttributes: React.VFC<Props> = ({}) => {
  return <UpdateUserAttributesForm />;
};

const UpdateUserAttributesForm = () => {
  const authState = useRecoilValue(authStateAtom);
  const { updateUserAttributes, loading, error } = useUpdateUserAttributes();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [givenName, setGivenName] = useState('');

  const handleClick = () => {
    updateUserAttributes({ email, name, family_name: familyName, given_name: givenName });
  };

  return (
    <CogreactWrapper>
      <h1>UpdateUserAttributes</h1>
      <p>AuthStatus: {authState.authStatus}</p>
      {error && <p style={{ backgroundColor: '#fee2e2' }}>{error}</p>}
      <div>
        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
        <input
          type="text"
          placeholder="familyName"
          value={familyName}
          onChange={(e) => setFamilyName(e.currentTarget.value)}
        />
        <input
          type="text"
          placeholder="givenName"
          value={givenName}
          onChange={(e) => setGivenName(e.currentTarget.value)}
        />
        <button onClick={handleClick}>Update User Attribute</button>
      </div>
    </CogreactWrapper>
  );
};

export default {
  title: 'UpdateUserAttributes',
  component: UpdateUserAttributes,
};
