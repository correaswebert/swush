import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Context from 'store/context';

const useFetch = (url, data) => {
  const { globalState } = useContext(Context);

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const jwt = globalState.jwt;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.post(url, { jwt, ...data });
        setResponse(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { loading, data: response, error };
};

export default useFetch;
