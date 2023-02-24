import React from 'react';
import { useHistory } from 'react-router-dom';
import { addPet } from '../../services/pets.js';
import PetForm from './PetForm.js';

export default function AddPet() {
  const history = useHistory();
  const handleSubmit = async (name, breed, emergency_contact, vet, notes) => {
    try {
      await addPet(name, breed, emergency_contact, vet, notes);
      history.push('/pets');
    } catch (e) {
      console.error(e.message);
    }
  };
  return <PetForm submitHandler={handleSubmit} />;
}
