// NPM PACKAGE IMPORTS
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

// LOCAL IMPORTS
import { searchQuestion } from '../../store/questions';
import './SearchQuestion.css';



export default function SearchQuestionPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  // get the list / array of questions from the current 'questions' state
  const allQuestions = useSelector((state) => state.questions.allQuestions);

  // get the ':query' from the url
  // see '/src/App.js' for the url path
  const { query } = useParams();
  const regExQuery = new RegExp(query);
  const questionsList = allQuestions?.filter((question) => question.title.search(regExQuery) > -1);

  // navigate to the specific question with the associated 'questionUrl' property in the question object
  const navToQuestion = (questionUrl) => {
    return () => {
      history.push(`/question/${questionUrl}`);
    };
  };

  // helper function to display the list of questions related to the query
  const listQuestions = () => {
    return (
      <div className='questions-list-questions-container'>
        {questionsList.map((question) => (
          <div
            key={`${question.id}-${nanoid(4)}`}
            className='questions-list-questions-div'
          >
            <span
              className='questions-list-title'
              onClick={navToQuestion(question?.questionUrl)}
            >
            {question.title}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // helper function to display no results based on query
  const noQuestions = () => {
    return (
      <p>We couldn't find any results for '{query}'.</p>
    );
  };

  return (
    <div className='questions-list-container'>
      <div
        className='questions-list-results-header'
      >
        <span
          className='questions-list-results-for'
        >
          Results for {' '}
        </span>
        <span
          className='questions-list-results-query'
        >
          {query}
        </span>
      </div>
      {questionsList?.length ? listQuestions() : noQuestions()}
    </div>
  );
}
