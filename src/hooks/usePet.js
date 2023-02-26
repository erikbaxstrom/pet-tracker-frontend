import { useEffect, useState } from 'react';
import { fetchPetById } from '../services/pets.js';

export default function usePet(id) {
  const [detail, setDetail] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchPetById(id);
        // console.log('data', data);
        setDetail(data);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return { detail, setDetail, loading, setLoading, error, setError };
}
