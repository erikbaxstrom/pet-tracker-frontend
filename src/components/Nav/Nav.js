import { useUser } from '../../hooks/useUser.js';
import { signOut } from '../../services/auth.js';
import { Backdrop, Button, ButtonGroup } from '@mui/material';
import './Nav.css';
import { NavLink } from 'react-router-dom';

import { useState } from 'react';

export default function Nav() {
  const { user, setUser } = useUser();
  const [navigating, setNavigating] = useState(false);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    try {
      await signOut();
      setUser(null);
    } catch (e) {
      console.error(e.message);
    }
  };

  if (navigating) {
    setTimeout(() => {
      setNavigating(false);
    }, 400);
  }

  return (
    <nav>
      <div className="nav-button">
        {user && (
          // <PopupState variant="popover" popupId="demo-popup-menu">
          //   {(popupState) => (
          //     <>
          //       <Button size="large" variant="contained" {...bindTrigger(popupState)}>
          //         Menu
          //       </Button>
          //       <Menu {...bindMenu(popupState)}>
          //         <MenuItem onClick={popupState.close} component={NavLink} to="/pets/new">
          //           Add a Pet
          //         </MenuItem>
          //         <MenuItem onClick={popupState.close} component={NavLink} to="/pets">
          //           My Pets
          //         </MenuItem>
          //         <MenuItem onClick={handleLogout}>Logout</MenuItem>
          //       </Menu>
          //     </>
          //   )}
          // </PopupState>

          <ButtonGroup variant="contained">
            <Button component={NavLink} to="/pets" onClick={() => setNavigating(true)}>
              My Pets
            </Button>
            <Button component={NavLink} to="/pets/new" onClick={() => setNavigating(true)}>
              Add a Pet
            </Button>
            <Button onClick={handleLogout}>Log Out</Button>
          </ButtonGroup>
        )}
        {navigating}
        <Backdrop open={navigating} sx={{ backgroundColor: 'white', zIndex: '1300' }}>
          <img src="Dog.png" />
        </Backdrop>
      </div>
    </nav>
  );
}

{
  /* <ButtonGroup variant="contained">
<Button component={NavLink} to="/pets">
  My Pets
</Button>
<Button component={NavLink} to=to="/pets/new">
  Add a Pet
</Button>
</ButtonGroup> */
}
