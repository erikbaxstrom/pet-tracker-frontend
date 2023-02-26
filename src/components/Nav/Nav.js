import { useUser } from '../../hooks/useUser.js';
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
            <div>
              <a href="/pets/new">Add a Pet</a>
              <br />
              <a href="/pets">My Pets</a>
            </div>
            <div>Hello {user.email}</div>
            <button onClick={handleLogout}>Sign Out</button>
          </>
        )}
      </div>
    </nav>
  );
}
