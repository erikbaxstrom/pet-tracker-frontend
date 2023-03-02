import { useState, useEffect } from 'react';
import { fetchOwners } from '../services/owners.js';

export default function useOwners(id) {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOwners(id);
        setOwners(data);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id, setOwners]);

  return { owners, setOwners, error, loading };
}
