import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import usePet from '../../hooks/usePet.js';
import useOwners from '../../hooks/useOwners.js';

export default function PetCard() {
  const { id } = useParams();
  const { detail } = usePet(id);
  const { owners } = useOwners(id);

  return (
    <div>
      <h2>{detail.name}</h2>
      <p>Breed: {detail.breed}</p>
      <p>Vet: {detail.vet}</p>
      <p>Emergency Contact #: {detail.emergency_contact}</p>
      <p>Notes: {detail.notes}</p>
      <h2>Owners</h2>
      {owners.map((owner) => (
        <div key={owner.email}>
          <p>{owner.email}</p>
        </div>
      ))}
      <NavLink to={`/pets/edit/${id}`}>Edit Pet</NavLink>
    </div>
  );
}
