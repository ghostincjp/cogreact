import { createCognitoResource } from './resources/cognito';

const { userPool, identityPool, userPoolClient } = createCognitoResource();

export const userPoolId = userPool.id;
export const identityPoolId = identityPool.id;
export const userPoolClientId = userPoolClient.id;
