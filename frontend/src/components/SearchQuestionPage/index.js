// NPM PACKAGE IMPORTS
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

// LOCAL IMPORTS
import { searchQuestion } from '../../store/questions';
import './SearchQuestion.css';



export default function SearchQuestionPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  // get the list / array of questions relating to the query from 'useEffect' function
  const questionsList = useSelector((state) => state.questions.questionsList);

  // get the ':query' from the url
  // see '/src/App.js' for the url path
  const { query } = useParams();


  // useEffect function to run the searchQuestion function ONCE when component renders
  // will run again if it detects a change with 'query'
  useEffect(() => {
    dispatch(searchQuestion(query));
  }, [dispatch, query]);

  // helper function to display the list of questions related to the query
  const listQuestions = () => {
    return (
      <>
        {questionsList.map((question) => (
          <div
            key={`${question.id}-${nanoid(4)}`}
            className='questions-list-questions-div'
          >
            {question.title}
          </div>
        ))}
      </>
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
        className='questions-list-results-text'
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
