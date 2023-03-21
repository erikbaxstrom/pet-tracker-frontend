import { Button } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div id="not-found">
      <h2>Page Not Found</h2>
      <img src="lost-in-box.png" />
      <Button variant="contained" component={NavLink} to="/">
        Take me Home
      </Button>
    </div>
  );
}
