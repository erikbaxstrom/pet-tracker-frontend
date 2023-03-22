import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { addOwner, updatePet } from '../../services/pets.js';
import PetForm from './PetForm.js';
import './PetForm.css';
import usePet from '../../hooks/usePet.js';
import useOwners from '../../hooks/useOwners.js';
import { deleteOwner } from '../../services/owners.js';
import './EditPet.css';

export default function EditPet() {
  const { id } = useParams();
  const { detail, error } = usePet(id);
  const history = useHistory();
  const [userError, setUserError] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const { owners, setOwners } = useOwners(id);

  const handleSubmit = async (name, breed, emergency_contact, vet, notes) => {
    try {
      await updatePet(id, name, breed, emergency_contact, vet, notes);
      history.push('/pets');
    } catch (e) {
      setUserError(e.message);
    }
  };

  if (error) {
    history.push('/not-found/');
  }

  const handleOwner = async (e) => {
    e.preventDefault();
    try {
      const newOwner = await addOwner(id, emailInput);
      // console.log('newOwner', newOwner);
      if (newOwner.error) {
        // console.log('newOwner.error:', newOwner.error);
        setUserError(newOwner.error);
        return;
      }
      setUserError('');
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
      {/* <h2 className="scaleUp">{detail.name}</h2> */}
      <div>
        <PetForm key={detail.name} {...detail} submitHandler={handleSubmit} />
      </div>
      <h2 className="scaleUp">Owners</h2>
      <div className="owners scaleUp">
        <ul className="owners-list">
          {owners.map((owner) => (
            <li key={owner.email}>
              <span>{owner.email}</span>
              <Button size="small" onClick={async () => await handleDelete(id, owner)}>
                X
              </Button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleOwner}>
          <TextField
            helperText={userError !== '' ? userError : ''}
            error={userError !== '' ? true : false}
            label="New Owner"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            required
            type="email"
          />

          <Button size="small" variant="contained" type="submit">
            +
          </Button>
        </form>
      </div>
    </div>
  );
}
