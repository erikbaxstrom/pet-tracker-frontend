import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useUser } from '../../hooks/useUser.js';
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
        <h1 key={pet.id}>
          <NavLink to={`/pets/${pet.id}`}>{pet.name}</NavLink>
        </h1>
      ))}
    </div>
  );
}
