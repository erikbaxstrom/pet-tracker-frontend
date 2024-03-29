import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { usePets } from '../../hooks/usePets.js';
import './PetList.css';
import { useTasks } from '../../hooks/useTasks.js';
import {
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { addTask, deleteTask, updateTask } from '../../services/tasks.js';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers';

export default function PetList() {
  const { pets, loading } = usePets();
  const { tasks, setError, setTasks } = useTasks();

  const [taskDescriptionInput, setTaskDescriptionInput] = useState('');
  const [taskPetInput, setTaskPetInput] = useState('');
  const [taskTimeInput, setTaskTimeInput] = useState(dayjs());

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-container">
          <img className="loading-img" src="/loading-state.gif" />
        </div>
      </div>
    );
  }

  if (!localStorage.token) {
    return <Redirect to="/auth/sign-in" />;
  }

  const handleDeleteTask = async (taskToDelete) => {
    try {
      await deleteTask(taskToDelete.id);
      setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const newTask = await addTask({
        petId: taskPetInput,
        description: taskDescriptionInput,
        time: taskTimeInput,
        is_complete: false,
      });
      newTask.pet_name = pets.find((pet) => pet.id === taskPetInput).name;
      const newTaskList = [...tasks];
      const insertIndex = newTaskList.findIndex((obj) => obj.time > newTask.time);
      newTaskList.splice(insertIndex === -1 ? newTaskList.length : insertIndex, 0, newTask);
      setTasks(newTaskList);
      setTaskDescriptionInput('');
      setTaskTimeInput(dayjs());
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleComplete = async (taskToUpdate) => {
    let indexToUpdate = null;
    const updatedTasks = tasks.map((task, index) => {
      if (task.id === taskToUpdate.id) {
        task.is_complete = !task.is_complete;
        indexToUpdate = index;
      }
      return task;
    });
    try {
      await updateTask(tasks[indexToUpdate]);
      setTasks(updatedTasks);
    } catch (e) {
      setError(e.message);
    }
  };

  const formatDate = (utcDate) => {
    const localDate = new Date(utcDate).toLocaleString();
    return localDate;
  };

  return (
    <>
      <h2 className="scaleUp">My Pets</h2>
      <div className="pet-list scaleUp">
        {pets.map((pet) => (
          <div className="pet-card" key={pet.id}>
            <NavLink
              style={{ textDecoration: 'none', color: 'black' }}
              className="card-details"
              to={`/pets/${pet.id}`}
            >
              <img src={`${pet.breed}.png`}></img>
              <h3>{pet.name}</h3>
            </NavLink>
          </div>
        ))}
      </div>
      <h2 className="scaleUp">Tasks</h2>
      <div className="task-list scaleUp">
        <form className="task-form" onSubmit={handleAddTask}>
          <TextField
            helperText="Add Task"
            label="New Task"
            value={taskDescriptionInput}
            onChange={(e) => setTaskDescriptionInput(e.target.value)}
            required
          />
          <DateTimePicker
            value={taskTimeInput}
            onChange={(e) => {
              setTaskTimeInput(e);
            }}
          />
          <Select value={taskPetInput} onChange={(e) => setTaskPetInput(e.target.value)} required>
            {pets.map((pet) => (
              <MenuItem key={pet.id} value={pet.id}>
                {pet.name}
              </MenuItem>
            ))}
          </Select>
          <Button size="small" variant="contained" type="submit">
            +
          </Button>
        </form>
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
                  <b>When</b>
                </TableCell>
                <TableCell>
                  <b>Complete</b>
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
                  <TableCell>{formatDate(task.time)}</TableCell>
                  <TableCell>
                    <Button onClick={async () => await handleComplete(task)}>
                      {task.is_complete ? 'Completed' : '✅'}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={async () => await handleDeleteTask(task)}>X</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
