import { useEffect, useState } from 'react';
import { fetchPets } from '../services/pets.js';

export function usePets() {
  const [pets, setPets] = useState([]);
  const [detail, setDetail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        const data = await fetchPets();
        setPets(data);
      } catch (e) {
        setError(e.message);

        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { pets, setPets, error, loading, detail, setDetail };
}
