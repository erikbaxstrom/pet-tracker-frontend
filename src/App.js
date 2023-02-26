import './App.css';
import Nav from './components/Nav/Nav.js';
import { Route, Switch } from 'react-router-dom';
import Auth from './components/Auth/Auth.js';
import PetList from './components/Pets/PetList.js';
// import PetForm from './components/Pets/PetForm.js';
import PetCard from './components/Pets/PetCard.js';
import AddPet from './components/Pets/AddPet.js';
import EditPet from './components/Pets/EditPet.js';

function App() {
  return (
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
    </div>
  );
}

export default App;
