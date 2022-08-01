import { useCallback, useState } from 'react';

interface RequestConfig {
  url: string;
  method?: string;
  headers?: { [key: string]: string };
  body?: { [key: string]: string };
  noJson?: boolean;
}

type ApplyData = (arg: any) => void;

const useHttp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | string>(false);

  const sendRequest = useCallback(
    async (requestConfig: RequestConfig, applyData: ApplyData) => {
      setIsLoading(true);
      setError(false);

      const options = {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      };

      try {
        const response = await fetch(requestConfig.url, options);
        if (!response.ok) {
          throw new Error('Request failed!');
        }
        const blob = requestConfig.noJson === true;
        const data = blob ? await response.blob() : await response.json();
        applyData(data);
      } catch (err) {
        if (typeof err === 'string') {
          setError(err);
        } else if (err instanceof Error && err.message) {
          setError(err.message);
        } else {
          setError('Request error');
        }
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
