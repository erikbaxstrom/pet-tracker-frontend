import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import usePet from '../../hooks/usePet.js';
import useOwners from '../../hooks/useOwners.js';
import './PetCard.css';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useTasks } from '../../hooks/useTasks.js';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { addTask } from '../../services/tasks.js';

export default function PetCard() {
  const { id } = useParams();
  const { detail } = usePet(id);
  const { owners } = useOwners(id);
  const { tasks, setTasks } = useTasks();

  const [taskDescriptionInput, setTaskDescriptionInput] = useState('');
  const [taskTimeInput, setTaskTimeInput] = useState(dayjs());

  const handleDeleteTask = (task) => {
    console.log('deleting', task);
  };

  const handleAddTask = async () => {
    try {
      // call service
      const newTask = await addTask(id, {
        description: taskDescriptionInput,
        time: taskTimeInput,
        is_complete: false,
      });
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTaskDescriptionInput('');
      setTaskTimeInput(dayjs());
    } catch (e) {
      console.error(e.message);
    }
    //reset inputs
  };

  return (
    <div className="detail">
      <div className="detail-container">
        <h2>{detail.name}</h2>
        <TableContainer>
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Details</b>
                </TableCell>
                <TableCell>
                  <b>Pet info</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Breed:</TableCell>
                <TableCell>{detail.breed}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Vet:</TableCell>
                <TableCell>{detail.vet}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Emergency Contact #:</TableCell>
                <TableCell>{detail.emergency_contact}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Notes:</TableCell>
                <TableCell>{detail.notes}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Owners:</TableCell>
                <TableCell>
                  {/* <List>
                  {owners.map((owner) => (
                    <ListItem key={owner.email}>
                    <ListItemText>{owner.email}</ListItemText>
                    </ListItem>
                    ))}
                  </List> */}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {owners.map((owner) => (
          <div key={owner.email}>
            <p>{owner.email}</p>
          </div>
        ))}
        <Button variant="contained" size="medium" component={NavLink} to={`/pets/edit/${id}`}>
          Edit Pet
        </Button>
      </div>
      {/* <h2>Tasks</h2>
      <div className="task-list">
        <TableContainer>
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Pet</b>
                </TableCell>
                <TableCell>
                  <b>Task</b>
                </TableCell>
                <TableCell>
                  <b>Time</b>
                </TableCell>
                <TableCell>
                  <b>Delete</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.pet_name}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.time}</TableCell>
                  <TableCell>
                    <Button onClick={async () => await handleDeleteTask(task)}>X</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TextField
          helperText="Add Task"
          label="New Task"
          value={taskDescriptionInput}
          onChange={(e) => setTaskDescriptionInput(e.target.value)}
        />
        <DateTimePicker value={taskTimeInput} onChange={(e) => setTaskTimeInput(e)} />
        <Button size="small" variant="contained" onClick={() => handleAddTask()}>
          +
        </Button>
      </div> */}
    </div>
  );
}
