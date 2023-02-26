import React, { useState } from 'react';
// import { addPet } from '../../services/pets.js';
// import { usePets } from '../../hooks/usePet.js';
// import { useHistory } from 'react-router-dom';

export default function PetForm({
  name = '',
  breed = '',
  emergency_contact = '',
  vet = '',
  notes = '',
  submitHandler,
}) {
  const [nameInput, setNameInput] = useState(name);
  const [breedInput, setBreedInput] = useState(breed);
  const [emergencyContactInput, setEmergencyContactInput] = useState(emergency_contact);
  const [vetInput, setVetInput] = useState(vet);
  const [notesInput, setNotesInput] = useState(notes);
  // const { setPets } = usePets('');
  // const history = useHistory();

  // const handleNewPet = async () => {
  //   try {
  //     const newPet = await addPet(
  //       nameInput,
  //       breedInput,
  //       emergencyContactInput,
  //       vetInput,
  //       notesInput
  //     );
  //     // redirect to pet list
  //     //adds new pet to state
  //     setPets((prevPets) => [...prevPets, newPet]);
  //     history.push('/');
  //   } catch (e) {
  //     console.error(e.message);
  //   }
  // };

  return (
    <div>
      <label>Name</label>
      <input type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
      <label>Breed</label>
      <select value={breedInput} onChange={(e) => setBreedInput(e.target.value)}>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="pineCone">Pine Cone</option>
      </select>
      <label>Emergency Contact</label>
      <input
        type="text"
        value={emergencyContactInput}
        onChange={(e) => setEmergencyContactInput(e.target.value)}
      />
      <label>Vet</label>
      <input type="text" value={vetInput} onChange={(e) => setVetInput(e.target.value)} />
      <label>Notes</label>
      <textarea value={notesInput} onChange={(e) => setNotesInput(e.target.value)} />
      <button
        onClick={() => {
          submitHandler(nameInput, breedInput, emergencyContactInput, vetInput, notesInput);
        }}
      >
        Submit
      </button>
    </div>
  );
}
