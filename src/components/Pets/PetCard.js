import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
// import { usePets } from '../../hooks/usePets.js';
// import { fetchPetById } from '../../services/pets.js';
import usePet from '../../hooks/usePet.js';
import { addOwner, deleteOwner } from '../../services/owners.js';
// import useOwners from '../../hooks/useOwners.js';
// import OwnerList from './OwnerList.js';
import useOwners from '../../hooks/useOwners.js';

export default function PetCard({ email = '' }) {
  const { id } = useParams();
  const { detail } = usePet(id);
  const [emailInput, setEmailInput] = useState(email);
  const { owners, setOwners } = useOwners(id);
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
      setOwners((prevOwners) => [...prevOwners, newOwner]);
    } catch (e) {
      console.error(e.message);
    }
  };

  console.log('first owner', owners[0]);

  return (
    <div>
      <h2>Detail: {detail.name}</h2>
      <p>Breed: {detail.breed}</p>
      <p>Vet: {detail.vet}</p>
      <p>Emergency Contact #: {detail.emergency_contact}</p>
      <p>Notes: {detail.notes}</p>
      {owners.map((owner) => (
        <div key={owner.email}>
          <p>{owner.email}</p>
          <button onClick={async () => await deleteOwner(detail.id, owner.user_id)}>X</button>
        </div>
      ))}

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
