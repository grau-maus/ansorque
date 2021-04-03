// NPM PACKAGE IMPORTS
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

// LOCAL IMPORTS
import { queryQuestion, clearQueryResults } from '../../store/questions';
import './SearchQuestion.css';



export default function SearchQuestionPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const questionsState = useSelector((state) => state.questions);
  const { noResults, searchResults } = questionsState;
  const { query } = useParams();
  const [questionsList, setQuestionsList] = useState([]);

  useEffect(() => {
    dispatch(clearQueryResults());
    setQuestionsList([]);
    dispatch(queryQuestion(query));
  }, [query, dispatch]);

  useEffect(() => {
    if (!noResults) {
      setQuestionsList([...questionsList, ...searchResults]);
    }
  }, [questionsState]);

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

  const noMoreResults = () => {
    if (searchResults.length < 1) {
      return null;
    }

    return (
      <p>That's all the results for '{query}'!</p>
    );
  };

  function nextPage () {
    dispatch(queryQuestion(query, questionsList.length));
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
      {searchResults?.length > 1 ? listQuestions() : noQuestions()}
      {!noResults ? (<button className='questions-list-more' onClick={nextPage}>More</button>) : noMoreResults()}
    </div>
  );
}
