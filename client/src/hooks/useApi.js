import { useState, useCallback } from 'react';

export default function useApi(initialData = null){
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = useCallback(async (fn, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fn(...args);
      setData(res);
      setLoading(false);
      return res;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, []);

  return { data, setData, loading, error, run };
}
