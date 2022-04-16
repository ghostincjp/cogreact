import React from 'react';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { useUserInfo } from '../hooks/useUserInfo';
import { CogreactWrapper } from './CogreactWrapper';

type Props = {};

export const Info: React.VFC<Props> = ({}) => {
  return <InfoForm />;
};

const InfoForm = () => {
  const { authStatus } = useAuthStatus();
  const attributes = useUserInfo();

  return (
    <CogreactWrapper>
      <h1>SignUp</h1>
      <p>AuthStatus: {authStatus} </p>
      <p>Attributes: {JSON.stringify(attributes)} </p>
    </CogreactWrapper>
  );
};

export default {
  title: 'Info',
  component: Info,
};
