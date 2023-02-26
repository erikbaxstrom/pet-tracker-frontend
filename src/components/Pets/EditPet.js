import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { updatePet } from '../../services/pets.js';
import PetForm from './PetForm.js';
import usePet from '../../hooks/usePet.js';

export default function EditPet() {
  const { id } = useParams();
  const history = useHistory();
  const { detail, setError } = usePet(id);

  const handleSubmit = async (name, breed, emergency_contact, vet, notes) => {
    try {
      await updatePet(detail.id, name, breed, emergency_contact, vet, notes);
      history.push('/pets');
    } catch (e) {
      setError(e.message);
    }
  };
  return <PetForm {...detail} submitHandler={handleSubmit} />;
}
