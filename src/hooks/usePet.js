import { useEffect, useState } from 'react';
import { fetchPetById } from '../services/pets.js';

export default function usePet(id) {
  const [detail, setDetail] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPetById(id);
        console.log('data here', data);
        if (data.error) {
          setError(data.error);
          setDetail({});
          setLoading(true);
        } else {
          setDetail(data);
        }
      } catch (e) {
        setError(e.message);
      }
      setTimeout(() => {
        setLoading(false);
      }, 700);
    };
    fetchData();
  }, [id]);

  return { detail, setDetail, loading, setLoading, error, setError };
}
