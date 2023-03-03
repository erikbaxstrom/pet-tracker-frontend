import { Button, MenuItem, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './PetForm.css';

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
    <div className="form">
      <div className="form-container">
        <TextField
          helperText="Please enter a name"
          id="email-input"
          label="Name"
          variant="filled"
          defaultValue={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          required
        />

        {/* <input
        type="text"
        value={nameInput}
        placeholder="Name..."
        onChange={(e) => setNameInput(e.target.value)}
        required
      /> */}

        <TextField
          helperText="Please select a breed"
          id="breed-select"
          label="Breed"
          variant="filled"
          value={breedInput}
          onChange={(e) => setBreedInput(e.target.value)}
          required
          open
          select
        >
          <MenuItem value="dog">Dog</MenuItem>
          <MenuItem value="cat">Cat</MenuItem>
          <MenuItem value="pineCone">Pine Cone</MenuItem>
        </TextField>
        {/* <label>Breed</label>

<select value={breedInput} onChange={(e) => setBreedInput(e.target.value)} required>
        <option disabled value="" selected hidden>
        Choose...
        </option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="pineCone">Pine Cone</option>
      </select> */}

        <TextField
          helperText="Please enter a phone number"
          id="emergency-contact-input"
          label="Emergency Contact"
          variant="filled"
          defaultValue={emergencyContactInput}
          onChange={(e) => setEmergencyContactInput(e.target.value)}
          required
        />

        {/*       
      <label>Emergency Contact</label>
      <input
      type="text"
      value={emergencyContactInput}
      placeholder="Name/Phone..."
      onChange={(e) => setEmergencyContactInput(e.target.value)}
      /> */}

        <TextField
          helperText="Please enter a Vet Clinic"
          id="vet-input"
          label="Vet clinic"
          variant="filled"
          defaultValue={vetInput}
          onChange={(e) => setVetInput(e.target.value)}
          required
        />
        {/* <input
        type="text"
        value={vetInput}
        placeholder="Name/Phone..."
        onChange={(e) => setVetInput(e.target.value)}
      /> */}
        <TextField
          helperText="enter additional info here"
          id="notes-input"
          label="Notes"
          variant="filled"
          defaultValue={notesInput}
          onChange={(e) => setNotesInput(e.target.value)}
          required
          multiline
        />
        <div className="button-container">
          <Button
            variant="contained"
            size="medium"
            onClick={() => {
              submitHandler(nameInput, breedInput, emergencyContactInput, vetInput, notesInput);
            }}
          >
            Save
          </Button>

          <button onClick={history.goBack}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
