import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { useUser } from '../../hooks/useUser.js';
import { signOut } from '../../services/auth.js';
import { Button, Menu, MenuItem } from '@mui/material';
import './Nav.css';
import { NavLink } from 'react-router-dom';

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
      <div className="nav-button">
        {user && (
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <>
                <Button size="large" variant="contained" {...bindTrigger(popupState)}>
                  Menu
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={popupState.close} component={NavLink} to="/pets/new">
                    Add a Pet
                  </MenuItem>
                  <MenuItem onClick={popupState.close} component={NavLink} to="/pets">
                    My Pets
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </PopupState>
        )}
      </div>
    </nav>
  );
}
