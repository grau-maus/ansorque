// NPM PACKAGE IMPORTS
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router';

// LOCAL IMPORTS
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/login'>
            <LoginFormPage />
          </Route>
          <Route exact path='/signup'>
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
