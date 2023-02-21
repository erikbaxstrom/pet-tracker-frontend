import './App.css';
import Nav from './components/Nav/Nav.js';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Auth from './components/Auth/Auth.js';
import { useUser } from './context/UserContext.js';
import PetList from './components/Pets/PetList.js';

function App() {
  const { user } = useUser();
  const history = useHistory();
  if (!user) {
    history.push('/auth/sign-in');
    // return;
  }

  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path="/auth/:type" component={Auth} />
        <Route exact path="/pets" component={PetList}>
          {/* <>{user && <Redirect to="/" />}</> */}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
