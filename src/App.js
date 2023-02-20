import './App.css';
import Nav from './components/Nav/Nav.js';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from './components/Auth/Auth.js';
import { useUser } from './context/UserContext.js';

function App() {
  const { user } = useUser();
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path="/auth/:type" component={Auth} />
        <Route exact path="/">
          <>
            {user && <Redirect to="/" />}
            {!user && <Redirect to="/auth/sign-in" />}
          </>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
