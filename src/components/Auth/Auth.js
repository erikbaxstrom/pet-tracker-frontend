import React, { useState } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser.js';

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
    <div className="auth-container">
      <div className="sign-in-sign-out">
        <NavLink to="/auth/sign-in">Sign-in</NavLink>
        <NavLink to="/auth/sign-up">Sign-up</NavLink>
      </div>
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
      <div>
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
  );
}
