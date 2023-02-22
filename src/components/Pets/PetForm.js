import React, { useState } from 'react';
import { addPet } from '../../services/pets.js';

export default function PetForm() {
  //   name = '',
  //   breed = '',
  //   emergency_contact = '',
  //   vet = '',
  //   notes = ''
  const [nameInput, setNameInput] = useState('');
  const [breedInput, setBreedInput] = useState('');
  const [emergencyContactInput, setEmergencyContactInput] = useState('');
  const [vetInput, setVetInput] = useState('');
  const [notesInput, setNotesInput] = useState('');

  const handleNewPet = async () => {
    try {
      await addPet(nameInput, breedInput, emergencyContactInput, vetInput, notesInput);
      // redirect to pet list
    } catch (e) {
      console.error(e.message);
    }
  };

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
      <button onClick={handleNewPet}>Submit</button>
    </div>
  );
}