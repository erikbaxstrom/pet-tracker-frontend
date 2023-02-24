import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { usePets } from '../../hooks/usePet.js';
import { updatePet } from '../../services/pets.js';

export default function EditPet() {
  const { id } = useParams();
  const history = useHistory();
  const { detail, loading, setLoading, error, setError } = usePets(id);

  const handleSubmit = async (name, breed, emergency_contact, vet, notes) => {
    try {
      await updatePet(detail.id, name, breed, emergency_contact, vet, notes);
      history.push('/pets');
    } catch (e) {
      setError(e.message);
    }
  };
  return <div>EditPet</div>;
}
