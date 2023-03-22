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
        const data = await fetchPets();
        setPets(data);
      } catch (e) {
        setError(e.message);
      }
      setTimeout(() => {
        setLoading(false);
      }, 700);
    };
    fetchData();
  }, []);

  return { pets, setPets, error, loading, detail, setDetail };
}
