import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';



const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();

  dispatch(setUser(data.user));

  return response;
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();

  dispatch(setUser(data.user));

  return response;
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();

  dispatch(setUser(data.user));

  return response;
};

export const demoLogin = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential: 'Demo-lition',
      password: 'password',
    }),
  });
  const data = await response.json();

  dispatch(setUser(data.user));

  return response;
};

const initialState = {
  user: null
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

// user state example:
// const someState = {
//   user: {
//   id: 0,
//   email: 'test@test.com',
//   username: 'test_user',
//   createdAt: new Date(),
//   updatedAt: new Date()
//   }
// }


const sessionReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;

      return newState;

    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;

      return newState;

    default:
      return state;
  }
};



export default sessionReducer;
