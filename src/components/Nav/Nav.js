import { useUser } from '../../context/UserContext.js';
import { signOut } from '../../services/auth.js';

export default function Nav() {
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <nav>
      <div>
        {user && (
          <>
            <div>Hello {user.email}</div>
            <button onClick={handleLogout}>Sign Out</button>
          </>
        )}
      </div>
    </nav>
  );
}
