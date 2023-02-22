import { useEffect, useState } from 'react';
import { fetchPets } from '../services/pets.js';

export function usePets() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPets();
        setPets(data);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { pets, setPets, error, loading };
}
