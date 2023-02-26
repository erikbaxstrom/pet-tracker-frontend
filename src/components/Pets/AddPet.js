import React from 'react';
import { useHistory } from 'react-router-dom';
import { addPet } from '../../services/pets.js';
import PetForm from './PetForm.js';
import { usePets } from '../../hooks/usePets.js';

export default function AddPet() {
  const history = useHistory();
  const { setPets } = usePets();
  const handleSubmit = async (name, breed, emergency_contact, vet, notes) => {
    try {
      const newPet = await addPet(name, breed, emergency_contact, vet, notes);
      setPets((prevPets) => [...prevPets, newPet]);
      history.push('/pets');
    } catch (e) {
      console.error(e.message);
    }
  };
  return <PetForm submitHandler={handleSubmit} />;
}
