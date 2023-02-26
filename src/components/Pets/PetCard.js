import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
// import { usePets } from '../../hooks/usePets.js';
// import { fetchPetById } from '../../services/pets.js';
import usePet from '../../hooks/usePet.js';

export default function PetCard() {
  const { id } = useParams();
  const { detail } = usePet(id);
  // const { setDetail, detail, setError } = usePets();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchPetById(id);
  //       console.log('data', data);
  //       setDetail(data);
  //     } catch (e) {
  //       setError(e.message);
  //     }
  //   };
  //   fetchData();
  // }, [id, setError, setDetail]);

  return (
    <div>
      <h2>{detail.name}</h2>
      <p>{detail.breed}</p>
      <p>{detail.vet}</p>
      <p>{detail.emergency_contact}</p>
      <p>{detail.notes}</p>
      <NavLink to={`/pets/edit/${id}`}>Edit Pet</NavLink>
    </div>
  );
}
