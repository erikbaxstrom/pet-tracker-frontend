import React, { useState } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser.js';
import './auth.css';
import { Button, ButtonGroup, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, logInUser } = useUser();
  const { type } = useParams();

  if (user) {
    return <Redirect to="/pets" />;
  }

  const submitAuth = async () => {
    try {
      await logInUser(email, password, type);
    } catch (e) {
      console.error(e);
    }
  };

  const startDemo = async () => {
    try {
      await logInUser('demo@demo.com', 'demodemo', 'sign-in');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <header className="authHeader">
        <ToggleButtonGroup exclusive>
          <ToggleButton
            value="sign-in"
            sx={{
              '&.Mui-selected': {
                backgroundColor: '#C9FFE2',
                color: 'rgba(0, 0, 0, 0.87)',
              },
              '&.Mui-selected:hover': {
                backgroundColor: '#C9FFE2',
                color: 'rgba(0, 0, 0, 0.87)',
              },
            }}
            selected={type === 'sign-in' ? true : false}
            color="primary"
            component={NavLink}
            to="/auth/sign-in"
          >
            Sign-in
          </ToggleButton>
          <ToggleButton
            value="sign-up"
            sx={{
              '&.Mui-selected': {
                backgroundColor: '#C9FFE2',
                color: 'rgba(0, 0, 0, 0.87)',
              },
              '&.Mui-selected:hover': {
                backgroundColor: '#C9FFE2',
                color: 'rgba(0, 0, 0, 0.87)',
              },
            }}
            variant="filled"
            selected={type === 'sign-up' ? true : false}
            color="primary"
            component={NavLink}
            to="/auth/sign-up"
          >
            Sign-up
          </ToggleButton>
        </ToggleButtonGroup>
        <Button variant="contained" onClick={startDemo}>
          Start Demo
        </Button>
      </header>
      <div className="auth-background">
        <div className="auth-container">
          <div className="email-container">
            <TextField
              helperText="Please enter your email"
              id="email-input"
              label="Email"
              variant="filled"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password-container">
            <TextField
              helperText="Please enter your password"
              id="password-input"
              type="password"
              label="Password"
              variant="filled"
              color="primary"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Button variant="contained" size="large" onClick={submitAuth}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
