import React, { useState } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser.js';
import './auth.css';

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
      <div className="authBackground">
        <div className="auth-container">
          <div className="email-container">
            <label>Email</label>
            <input
              className="input"
              type="email"
              placeholder="email@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password-container">
            <label>Password</label>
            <input
              className="input"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button onClick={submitAuth}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}
