import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();

  return (
    <div>
      <label>Name</label>
      <input
        type="text"
        value={nameInput}
        placeholder="Name..."
        onChange={(e) => setNameInput(e.target.value)}
        required
      />
      <label>Breed</label>
      <select value={breedInput} onChange={(e) => setBreedInput(e.target.value)} required>
        <option disabled value="" selected hidden>
          Choose...
        </option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="pineCone">Pine Cone</option>
      </select>
      <label>Emergency Contact</label>
      <input
        type="text"
        value={emergencyContactInput}
        placeholder="Name/Phone..."
        onChange={(e) => setEmergencyContactInput(e.target.value)}
      />
      <label>Vet</label>
      <input
        type="text"
        value={vetInput}
        placeholder="Name/Phone..."
        onChange={(e) => setVetInput(e.target.value)}
      />
      <label>Notes</label>
      <textarea value={notesInput} onChange={(e) => setNotesInput(e.target.value)} />
      <button
        onClick={() => {
          submitHandler(nameInput, breedInput, emergencyContactInput, vetInput, notesInput);
        }}
      >
        Save
      </button>
      <button onClick={history.goBack}>Cancel</button>
    </div>
  );
}
