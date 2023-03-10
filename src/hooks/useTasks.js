import { useEffect, useState } from 'react';
import { fetchTasks } from '../services/tasks.js';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { tasks, setTasks, error, setError, loading };
}
