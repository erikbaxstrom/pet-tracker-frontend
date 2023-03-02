import './App.css';
import Nav from './components/Nav/Nav.js';
import { Route, Switch } from 'react-router-dom';
import Auth from './components/Auth/Auth.js';
import PetList from './components/Pets/PetList.js';
// import PetForm from './components/Pets/PetForm.js';
import PetCard from './components/Pets/PetCard.js';
import AddPet from './components/Pets/AddPet.js';
import EditPet from './components/Pets/EditPet.js';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material';

const themeLight = createTheme({
  palette: {
    primary: {
      main: '#C9FFE2',
    },
    background: {
      default: '#C9C5BA',
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={themeLight}>
        <CssBaseline />
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/auth/:type" component={Auth} />
            <Route exact path="/pets/new" component={AddPet} />
            <Route exact path="/pets/edit/:id" component={EditPet} />
            <Route exact path="/pets" component={PetList} />
            <Route exact path="/pets/:id" component={PetCard} />
            <Route exact path="/" component={Auth} />
          </Switch>
          <footer>
            <a href="https://www.flaticon.com/free-icons/" title="icons">
              Pet icons by Flaticon
            </a>
          </footer>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
