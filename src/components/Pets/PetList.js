import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useUser } from '../../hooks/useUser.js';
import { usePets } from '../../hooks/usePets.js';
import './PetList.css';

export default function PetList() {
  const { pets } = usePets();
  const { user } = useUser();
  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }
  return (
    <div className="pet-list">
      {pets.map((pet) => (
        <div className="pet-card" key={pet.id}>
          <NavLink
            style={{ textDecoration: 'none', color: 'black' }}
            className="card-details"
            to={`/pets/${pet.id}`}
          >
            <img src={`${pet.breed}.png`}></img>
            <h3>{pet.name}</h3>
          </NavLink>
        </div>
      ))}
    </div>
  );
}
