// NPM PACKAGE IMPORTS
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router';

// LOCAL IMPORTS
import MainPage from './components/MainPage';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import SingleQuestionPage from './components/SingleQuestionPage';
import SearchQuestionPage from './components/SearchQuestionPage';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import * as questionsActions from './store/questions';

function App() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(questionsActions.getAllQuestions());
  }, [dispatch]);

  return (
    <>
      {userState && <Navigation isLoaded={isLoaded} />}
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <MainPage />
          </Route>
          <Route exact path='/login'>
            <LoginFormPage />
          </Route>
          <Route exact path='/signup'>
            <SignupFormPage />
          </Route>
          <Route exact path='/question/:url'>
            {!userState && <Navigation isLoaded={isLoaded} />}
            <SingleQuestionPage />
          </Route>
          <Route exact path='/questions/:query'>
            {!userState && <Navigation isLoaded={isLoaded} />}
            <SearchQuestionPage />
          </Route>
          <Route>
            {!userState && <Navigation isLoaded={isLoaded} />}
            <p>Page not found</p>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
