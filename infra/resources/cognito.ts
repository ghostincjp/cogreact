import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

const project = pulumi.getProject();
const stack = pulumi.getStack();

/**
 * Cognito
 */
export const createCognitoResource = (bucket: aws.s3.Bucket) => {
  const userPool = new aws.cognito.UserPool(`${project}-${stack}-user-pool`, {
    usernameAttributes: ['email'],
    passwordPolicy: {
      minimumLength: 8,
      requireNumbers: true,
      requireLowercase: true,
      temporaryPasswordValidityDays: 30,
    },
    autoVerifiedAttributes: ['email'],
    adminCreateUserConfig: {
      allowAdminCreateUserOnly: false,
    },
    accountRecoverySetting: { recoveryMechanisms: [{ name: 'verified_email', priority: 1 }] },
  });

  const userPoolDomain = new aws.cognito.UserPoolDomain(`${project}-${stack}-user-pool-domain`, {
    userPoolId: userPool.id,
    domain: `${project}-${stack}`,
  });

  const userPoolClient = new aws.cognito.UserPoolClient(`${project}-${stack}-user-pool-client`, {
    userPoolId: userPool.id,
    idTokenValidity: stack === 'dev' ? 24 : 1,
    accessTokenValidity: stack === 'dev' ? 24 : 1,
    refreshTokenValidity: 7,
    generateSecret: false,
  });

  const identityPool = new aws.cognito.IdentityPool(`${project}-${stack}-identity-pool`, {
    identityPoolName: `${project}-${stack}-identity-pool`,
    allowUnauthenticatedIdentities: false,
    cognitoIdentityProviders: [
      {
        clientId: userPoolClient.id,
        providerName: userPool.endpoint,
        serverSideTokenCheck: false,
      },
    ],
  });

  const cognitoAssumeRolePolicy: aws.iam.PolicyDocument = {
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: { Federated: 'cognito-identity.amazonaws.com' },
        Action: 'sts:AssumeRoleWithWebIdentity',
        Condition: {
          StringEquals: {
            'cognito-identity.amazonaws.com:aud': identityPool.id,
          },
        },
      },
    ],
  };

  // Admin Role
  const adminRole = new aws.iam.Role(`${project}-${stack}-admin-role`, {
    assumeRolePolicy: cognitoAssumeRolePolicy,
  });

  // Group
  new aws.cognito.UserGroup(`${project}-${stack}-admin-group`, {
    userPoolId: userPool.id,
    name: 'Admin',
    precedence: 1,
    roleArn: adminRole.arn,
  });
  const adminPolicy: aws.iam.PolicyDocument = {
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Action: ['s3:PutObject'],
        Resource: [
          pulumi.interpolate`arn:aws:s3:::${bucket.bucket}`,
          pulumi.interpolate`arn:aws:s3:::${bucket.bucket}/*`,
        ],
      },
    ],
  };
  new aws.iam.RolePolicy(`${project}-${stack}-admin-role-policy`, {
    role: adminRole,
    policy: adminPolicy,
  });

  new aws.cognito.UserGroup(`${project}-${stack}-operator-group`, {
    userPoolId: userPool.id,
    name: 'General',
    precedence: 2,
  });

  const authenticatedRole = new aws.iam.Role(`${project}-${stack}-authenticated-role`, {
    assumeRolePolicy: cognitoAssumeRolePolicy,
  });

  const unauthenticatedRole = new aws.iam.Role(`${project}-${stack}-unauthenticated-role`, {
    assumeRolePolicy: cognitoAssumeRolePolicy,
  });

  const identityPoolRoleAttachment = new aws.cognito.IdentityPoolRoleAttachment(
    `${project}-${stack}-identity-pool-role-attachment`,
    {
      identityPoolId: identityPool.id,
      roleMappings: [
        {
          identityProvider: pulumi.interpolate`cognito-idp.ap-northeast-1.amazonaws.com/${userPool.id}:${userPoolClient.id}`,
          ambiguousRoleResolution: 'AuthenticatedRole',
          type: 'Token',
        },
      ],
      roles: {
        authenticated: authenticatedRole.arn,
        unauthenticated: unauthenticatedRole.arn,
      },
    },
  );

  return {
    userPool,
    userPoolDomain,
    userPoolClient,
    identityPool,
  };
};
