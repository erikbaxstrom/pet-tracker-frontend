import { createContext, useEffect, useState } from 'react';
import { getUser } from '../services/auth.js';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUser();
        setUser(data);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, error, setError, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
