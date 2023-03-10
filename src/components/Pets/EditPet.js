import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { addOwner, updatePet } from '../../services/pets.js';
import PetForm from './PetForm.js';
import usePet from '../../hooks/usePet.js';
import useOwners from '../../hooks/useOwners.js';
import { deleteOwner } from '../../services/owners.js';
import './EditPet.css';

export default function EditPet() {
  const { id } = useParams();
  const { detail, setError } = usePet(id);
  const history = useHistory();

  const handleSubmit = async (name, breed, emergency_contact, vet, notes) => {
    try {
      await updatePet(detail.id, name, breed, emergency_contact, vet, notes);
      history.push('/pets');
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
    await deleteOwner(petId, deletedOwner.user_id);
    setOwners(owners.filter((owner) => owner.user_id !== deletedOwner.user_id));
  };

  return (
    <div>
      <h2>{detail.name}</h2>
      <div>
        <PetForm key={detail.name} {...detail} submitHandler={handleSubmit} />
      </div>
      <h2>Owners</h2>
      <div className="owners">
        <ul className="owners-list">
          {owners.map((owner) => (
            <li key={owner.email}>
              <span>{owner.email}</span>
              <Button size="small" onClick={async () => await handleDelete(detail.id, owner)}>
                X
              </Button>
            </li>
          ))}
        </ul>
        <TextField
          helperText="Add an Owner"
          label="New Owner"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />

        <Button size="small" variant="contained" onClick={() => handleOwner()}>
          +
        </Button>
      </div>
    </div>
  );
}
