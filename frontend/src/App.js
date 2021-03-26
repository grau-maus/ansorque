// NPM PACKAGE IMPORTS
import { Switch, Route } from 'react-router';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// LOCAL IMPORTS
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <Switch>
      <Route exact path='/login'>
        <LoginFormPage />
      </Route>
      <Route exact path='/signup'>
        <SignupFormPage />
      </Route>
    </Switch>
  );
}

export default App;
