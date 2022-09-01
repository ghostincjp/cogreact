import { Storage } from '@aws-amplify/storage';
import React, { useState } from 'react';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { useUserInfo } from '../hooks/useUserInfo';
import { CogreactWrapper } from './CogreactWrapper';

type Props = {};

export const Upload: React.VFC<Props> = ({}) => {
  return <UploadForm />;
};

const UploadForm = () => {
  const { authStatus } = useAuthStatus();
  const attributes = useUserInfo();
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    setFile(file);
  };

  const handleClick = async () => {
    try {
      Storage.configure({
        bucket: 'cogreact-dev-cogreact-bucket-8d4b4e4',
        region: 'ap-northeast-1',
      });
      await Storage.put('test', file, {});
      alert('Uploaded');
    } catch (error) {
      console.error(error);
      alert('Failed to upload file');
    }
  };

  return (
    <CogreactWrapper>
      <h1>Upload</h1>
      <p>AuthStatus: {authStatus} </p>
      <p>Attributes: {JSON.stringify(attributes)} </p>

      {authStatus === 'SIGNED_IN' ? (
        <div>
          <input type="file" name="file" placeholder="file" onChange={handleChange} />
          <button onClick={handleClick}>Upload</button>
        </div>
      ) : (
        <p>Please sign in before uploading</p>
      )}
    </CogreactWrapper>
  );
};

export default {
  title: 'Upload',
  component: Upload,
};
