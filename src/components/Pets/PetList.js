import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useUser } from '../../hooks/useUser.js';
import { usePets } from '../../hooks/usePets.js';
import './PetList.css';
import { useTasks } from '../../hooks/useTasks.js';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { updateTask } from '../../services/tasks.js';

export default function PetList() {
  const { pets } = usePets();
  const { user } = useUser();
  const { tasks, setError, setTasks } = useTasks();
  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }

  const handleComplete = async (taskToUpdate) => {
    let indexToUpdate = null;
    const updatedTasks = tasks.map((task, index) => {
      if (task.id === taskToUpdate.id) {
        task.is_complete = !task.is_complete;
        indexToUpdate = index;
        return task;
      }
    });
    try {
      await updateTask(tasks[indexToUpdate]);
    } catch (e) {
      setError(e.message);
    }
    // set state / push changes to db
    setTasks(updatedTasks);
  };

  return (
    <>
      <div className="pet-list">
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
                  <b>Complete</b>
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
                    <Button onClick={async () => await handleComplete(task)}>
                      {task.is_complete ? 'Completed' : '✅'}
                    </Button>
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
