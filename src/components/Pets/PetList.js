import React from 'react';
import { Redirect } from 'react-router-dom';
import { useUser } from '../../context/UserContext.js';
import PetForm from './PetForm.js';

export default function PetList() {
  const { user } = useUser();
  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }
  return (
    <div>
      PetList
      <PetForm />
    </div>
  );
}
