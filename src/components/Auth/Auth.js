import React, { useState } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser.js';
import './auth.css';
import { Button, TextField } from '@mui/material';

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

  return (
    <>
      <header className="authHeader">
        <div className="auth-img"></div>
        <div className="sign-in-sign-out">
          <NavLink to="/auth/sign-in" className="signInLink">
            Sign-in
          </NavLink>
          <NavLink to="/auth/sign-up" className="signUpLink">
            Sign-up
          </NavLink>
        </div>
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
            {/* <input
              className="input"
              type="email"
              placeholder="email@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> */}
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
            {/* <input
              className="input"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> */}
          </div>
          <div>
            <Button variant="contained" size="large" onClick={submitAuth}>
              Submit
            </Button>
            {/* <button onClick={submitAuth}>Submit</button> */}
          </div>
        </div>
      </div>
    </>
  );
}
