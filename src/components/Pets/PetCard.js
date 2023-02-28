import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
// import { usePets } from '../../hooks/usePets.js';
// import { fetchPetById } from '../../services/pets.js';
import usePet from '../../hooks/usePet.js';
import { addOwner } from '../../services/pets.js';
import useOwner from '../../hooks/useOwner.js';

export default function PetCard({ email = '' }) {
  const { id } = useParams();
  const { detail } = usePet(id);
  const [emailInput, setEmailInput] = useState(email);
  const { setOwner } = useOwner([]);
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

  const handleOwner = async () => {
    try {
      const newOwner = await addOwner(detail.id, emailInput);
      setOwner((prevOwners) => [...prevOwners, newOwner]);
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div>
      <h2>Detail: {detail.name}</h2>
      <p>Breed: {detail.breed}</p>
      <p>Vet: {detail.vet}</p>
      <p>Emergency Contact #: {detail.emergency_contact}</p>
      <p>Notes: {detail.notes}</p>
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
