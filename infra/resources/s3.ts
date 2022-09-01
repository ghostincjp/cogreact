import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

const project = pulumi.getProject();
const stack = pulumi.getStack();

export const createS3Resource = () => {
  const bucket = new aws.s3.Bucket(`${project}-${stack}-cogreact-bucket`, {
    corsRules: [
      {
        allowedHeaders: ['*'],
        allowedMethods: ['PUT', 'POST', 'DELETE', 'GET'],
        allowedOrigins: ['*'],
      },
    ],
  });

  new aws.s3.BucketPolicy(`${project}-${stack}-cdn-bucket-policy`, {
    bucket: bucket.id,
    policy: {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: '*',
          Action: 's3:GetObject',
          Resource: pulumi.interpolate`${bucket.arn}/*`,
        },
      ],
    },
  });

  new aws.s3.BucketPublicAccessBlock(`${project}-${stack}-image-bucket-public-access-block`, {
    bucket: bucket.id,
    blockPublicAcls: false,
    blockPublicPolicy: false,
    ignorePublicAcls: false,
    restrictPublicBuckets: false,
  });

  return { bucket };
};
