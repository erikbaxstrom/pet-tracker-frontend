import React, { useState } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser.js';
import './auth.css';
import { Button, ButtonGroup, TextField } from '@mui/material';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, logInUser, error, setError } = useUser();
  const { type } = useParams();

  if (user) {
    return <Redirect to="/pets" />;
  }

  const submitAuth = async () => {
    try {
      await logInUser(email, password, type);
    } catch (e) {
      console.error(e);
      setError(e);
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
        <ButtonGroup variant="contained">
          <Button component={NavLink} to="/auth/sign-in">
            Sign-in
          </Button>
          <Button component={NavLink} to="/auth/sign-up">
            Sign-up
          </Button>
        </ButtonGroup>
        <Button variant="contained" onClick={startDemo}>
          Start Demo
        </Button>
      </header>
      <div className="auth-background">
        <div className="auth-container">
          <div className="email-container">
            <TextField
              helperText={error === 'Invalid email' ? error : ''}
              error={error === 'Invalid email' ? true : false}
              id="email-input"
              label="Email"
              variant="filled"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password-container">
            <TextField
              helperText={error === 'Invalid password' ? error : ''}
              error={error === 'Invalid password' ? true : false}
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
