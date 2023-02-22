import React from 'react';
import { Redirect } from 'react-router-dom';
import { useUser } from '../../context/UserContext.js';
import PetForm from './PetForm.js';
import { usePets } from '../../hooks/usePet.js';
// import PetCard from './PetCard.js';

export default function PetList() {
  const { pets } = usePets();
  const { user } = useUser();
  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }
  return (
    <div>
      {pets.map((pet) => (
        <h1 key={pet.id}>{pet.name}</h1>
      ))}
      <PetForm />
    </div>
  );
}
