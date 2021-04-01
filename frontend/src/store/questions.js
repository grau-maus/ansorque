import { csrfFetch } from './csrf'



const GET_QUESTIONS = 'questions/getQuestions';



const getQuestions = (questions) => {
  return {
    type: GET_QUESTIONS,
    payload: questions
  };
};



export const getAllQuestions = () => async (dispatch) => {
  const response = await csrfFetch('/api/questions/');
  const data = await response.json();

  dispatch(getQuestions(data.questions));

  return response;
};



// initial state with a property of 'allQuestions'
// just so we don't key into object like so:
// "state.questions.questions", just to display a list of questions
const initialState = {
  allQuestions: null,
};



const questionsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case GET_QUESTIONS:
      newState = Object.assign({}, state);
      newState.allQuestions = action.payload;

      return newState;

    default:
      return state;
  }
};



export default questionsReducer;
