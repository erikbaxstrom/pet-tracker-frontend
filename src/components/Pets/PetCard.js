import { NavLink, useHistory, useParams } from 'react-router-dom';
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
} from '@mui/material';

export default function PetCard() {
  const history = useHistory();
  const { id } = useParams();
  const { detail, error, loading } = usePet(id);
  const { owners } = useOwners(id);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-container">
          <img className="loading-img" src="/loading-state.gif" />
        </div>
      </div>
    );
  }

  if (error) {
    history.push('/not-found/');
  }

  return (
    <div className="detail">
      <div className="detail-container scaleUp">
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
    </div>
  );
}
