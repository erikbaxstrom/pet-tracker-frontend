import { useContext } from 'react';
import { UserContext } from '../context/UserContext.js';
import { authUser } from '../services/auth.js';

export function useUser() {
  const { user, setUser, error, loading } = useContext(UserContext);
  // tie in loading state here
  const logInUser = async (email, password, type) => {
    const user = await authUser(email, password, type);
    setUser(user);
  };

  return { user, setUser, logInUser, error, loading };
}
