import { Switch, Route } from 'react-router';
import LoginFormPage from './components/LoginFormPage';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
    </Switch>
  );
}

export default App;
