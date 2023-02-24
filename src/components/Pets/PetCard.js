import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePets } from '../../hooks/usePet.js';
import { fetchPetById } from '../../services/pets.js';

export default function PetCard() {
  const { id } = useParams();
  const { setDetail, detail, setError } = usePets();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPetById(id);
        setDetail(data);
      } catch (e) {
        setError(e.message);
      }
    };
    fetchData();
  }, [id, setError, setDetail]);

  return (
    <div>
      <h2>{detail.name}</h2>
      <p>{detail.breed}</p>
      <p>{detail.vet}</p>
      <p>{detail.emergencyContact}</p>
      <p>{detail.notes}</p>
    </div>
  );
}
