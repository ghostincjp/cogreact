import { createCognitoResource } from './resources/cognito';
import { createS3Resource } from './resources/s3';

const { bucket } = createS3Resource();
const { userPool, identityPool, userPoolClient } = createCognitoResource(bucket);

export const bucketName = bucket.id;
export const userPoolId = userPool.id;
export const identityPoolId = identityPool.id;
export const userPoolClientId = userPoolClient.id;
