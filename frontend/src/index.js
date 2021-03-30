// NPM IMPORTS
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// LOCAL IMPORTS
import './index.css';
import App from './App';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
import * as questionsActions from './store/questions';


const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.questionsActions = questionsActions;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);



// RUN FOLLOWING CODE WITHIN FRONTEND BROWSER CONSOLE WINDOW:-----------------------------------------------------------------------------------------
// TESTING CUSTOM 'csrfFetch' WITH CSRF (SHOULD RECEIVE OBJECT WITH KEY OF 'requestBody' WITH VALUE AS OBJECT THAT WAS PASSED INTO THE REQUEST):
// window.csrfFetch('/api/test', {
//   method: 'POST',
//   body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
// }).then(res => res.json()).then(data => console.log(data));

// TESTING 'sessionActions' FROM './store/session.js':
// store.dispatch(sessionActions.'<insert action creator function with required arguments>');
