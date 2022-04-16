import { useState } from 'react';
const useHttpStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  return { loading, setLoading, error, setError };
};

export default useHttpStatus;
