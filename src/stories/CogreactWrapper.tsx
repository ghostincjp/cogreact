import React from 'react';
import { Cogreact } from '../components/Cogreact';

const region = process.env.REGION;
const identityPoolId = process.env.IDENTITY_POOL_ID;
const userPoolId = process.env.USER_POOL_ID;
const userPoolWebClientId = process.env.USER_POOL_WEB_CLIENT_ID;
const bucket = process.env.BUCKET;

if (!region || !identityPoolId || !userPoolId || !userPoolWebClientId) {
  throw new Error('Please set environment variables.');
}

type Props = {
  children: React.ReactNode;
};

export const CogreactWrapper: React.FC<Props> = ({ children }) => {
  return (
    <Cogreact
      AuthConfig={{
        region,
        identityPoolId,
        userPoolId,
        userPoolWebClientId,
      }}
      S3Config={bucket ? { region, bucket } : undefined}
    >
      {children}
    </Cogreact>
  );
};
