import { csrfFetch } from './csrf'

const GET_QUESTIONS = 'questions/getQuestions';
const GET_ONE_QUESTION = 'questions/getOneQuestion';



const getQuestions = (questions) => {
  return {
    type: GET_QUESTIONS,
    payload: questions
  };
};

const getOneQuestion = (question) => {
  return {
    type: GET_ONE_QUESTION,
    payload: question
  };
};



export const searchQuestion = (query) => async (dispatch) => {
  const response = await csrfFetch(`/api/questions/${query}`);
  const data = await response.json();

  dispatch(getQuestions(data.questions));

  return response;
};

export const singleQuestion = (questionUrl) => async (dispatch) => {
  const response = await csrfFetch(`/api/questions/single/${questionUrl}`);
  const data = await response.json();

  dispatch(getOneQuestion(data.question));

  return response;
};



// initial state with a property of 'questionsList'
// just so we don't key into object like so:
// "state.questions.questions", just to display a list of questions
const initialState = {
  questionsList: null
};



const questionsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    // we don't want previous state's results, so we're overwriting the old state with a new one
    case GET_QUESTIONS:
      newState = {};
      newState.questionsList = action.payload;

      return newState;

    case GET_ONE_QUESTION:
      newState = Object.assign({}, state);
      newState.mainQuestion = action.payload;

      return newState;

    default:
      return state;
  }
};



export default questionsReducer;
