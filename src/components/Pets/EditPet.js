import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { addOwner, updatePet } from '../../services/pets.js';
import PetForm from './PetForm.js';
import usePet from '../../hooks/usePet.js';
import useOwners from '../../hooks/useOwners.js';
import { deleteOwner } from '../../services/owners.js';

export default function EditPet() {
  const { id } = useParams();
  const { detail, setError } = usePet(id);

  const handleSubmit = async (name, breed, emergency_contact, vet, notes) => {
    try {
      await updatePet(detail.id, name, breed, emergency_contact, vet, notes);
    } catch (e) {
      setError(e.message);
    }
  };

  const [emailInput, setEmailInput] = useState('');
  const { owners, setOwners } = useOwners(id);

  const handleOwner = async () => {
    try {
      const newOwner = await addOwner(detail.id, emailInput);
      setOwners((prevOwners) => [...prevOwners, newOwner]);
      setEmailInput('');
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
      <h2>{detail.name}</h2>
      <div>
        <PetForm key={detail.name} {...detail} submitHandler={handleSubmit} />
      </div>
      <div>
        <h2>Owners</h2>
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
      </div>
    </div>
  );
}
