import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useUser } from '../../hooks/useUser.js';
import { usePets } from '../../hooks/usePets.js';

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
          <NavLink to={`/pets/${pet.id}`}>
            <img src={`${pet.breed}.png`}></img>
            {pet.name}
          </NavLink>
        </h1>
      ))}
    </div>
  );
}
