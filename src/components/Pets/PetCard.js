import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import usePet from '../../hooks/usePet.js';
import { addOwner, deleteOwner } from '../../services/owners.js';
import useOwners from '../../hooks/useOwners.js';

export default function PetCard({ email = '' }) {
  const { id } = useParams();
  const { detail } = usePet(id);
  const [emailInput, setEmailInput] = useState(email);
  const { owners, setOwners } = useOwners(id);

  const handleOwner = async () => {
    try {
      const newOwner = await addOwner(detail.id, emailInput);
      setOwners((prevOwners) => [...prevOwners, newOwner]);
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleDelete = async (petId, deletedOwner) => {
    setOwners(owners.filter((owner) => owner.user_id !== deletedOwner.user_id));
    await deleteOwner(petId, deletedOwner.user_id);
  };

  return (
    <div>
      <h2>Detail: {detail.name}</h2>
      <p>Breed: {detail.breed}</p>
      <p>Vet: {detail.vet}</p>
      <p>Emergency Contact #: {detail.emergency_contact}</p>
      <p>Notes: {detail.notes}</p>
      {owners.map((owner) => (
        <div key={owner.email}>
          <p>{owner.email}</p>
          <button onClick={async () => await handleDelete(detail.id, owner)}>X</button>
        </div>
      ))}

      <input
        className="input"
        type="email"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
      />
      <button onClick={() => handleOwner()}>+</button>
      <NavLink to={`/pets/edit/${id}`}>Edit Pet</NavLink>
    </div>
  );
}
