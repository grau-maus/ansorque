import { csrfFetch } from './csrf';



const GET_QUESTIONS = 'questions/getQuestions';
const GET_MORE_QUESTIONS = 'questions/getMoreQuestions';
const FIND_QUESTIONS = 'questions/findQuestions';
const CLEAR_QUERY = 'questions/clearQuery';



const getQuestions = (questions) => {
  return {
    type: GET_QUESTIONS,
    payload: questions
  };
};

const getMoreQuestions = (questions) => {
  return {
    type: GET_MORE_QUESTIONS,
    payload: questions
  };
};

const findQuestions = (questions) => {
  return {
    type: FIND_QUESTIONS,
    payload: questions
  };
};

const clearQuery = () => {
  return {
    type: CLEAR_QUERY
  };
};



export const getAllQuestions = () => async (dispatch) => {
  const response = await csrfFetch('/api/questions/');
  const data = await response.json();

  dispatch(getQuestions(data.questions));

  return response;
};

export const addMoreQuestions = (currentLength) => async (dispatch) => {
  const response = await csrfFetch(`/api/questions/${currentLength}`);
  const data = await response.json();

  dispatch(getMoreQuestions(data.questions));

  return response;
};

export const queryQuestion = (query, nextPage) => async (dispatch) => {
  let response;

  if (!nextPage) {
    response = await csrfFetch(`/api/questions/search/${query}`);
  } else {
    response = await csrfFetch(`/api/questions/search/${query}/${nextPage}`);
  }

  const data = await response.json();

  dispatch(findQuestions(data.questions));

  return response;
};

export const clearQueryResults = () => async (dispatch) => {
  dispatch(clearQuery());

  return;
};



// initial state with a property of 'allQuestions'
// just so we don't key into object like so:
// "state.questions.questions", just to display a list of questions
const initialState = {
  allQuestions: [],
  searchResults: [],
  noResults: false
};



const questionsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case GET_QUESTIONS:
      newState = Object.assign({}, state);
      newState.allQuestions = action.payload;

      return newState;

    case GET_MORE_QUESTIONS:
      newState = Object.assign({}, state);

      if (action.payload[0] === 'no results') {
        newState.noResults = true;
      } else {
        newState.allQuestions.push(...action.payload);
        newState.noResults = false;
      }

      return newState;

    case FIND_QUESTIONS:
      newState = Object.assign({}, state);

      if (action.payload[0] === 'no results') {
        newState.noResults = true;
      } else {
        newState.searchResults.push(...action.payload);
        newState.noResults = false;
      }

      return newState;

    case CLEAR_QUERY:
      newState = Object.assign({}, state);
      newState.searchResults = null;
      newState.searchResults = [];

      return newState;

    default:
      return state;
  }
};



export default questionsReducer;
