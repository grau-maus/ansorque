import { Switch, Route } from 'react-router';
import LoginFormPage from './components/LoginFormPage';

function App() {
  return (
    <Switch>
      <Route exact path='/login'>
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;
