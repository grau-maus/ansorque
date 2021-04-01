// NPM PACKAGE IMPORTS
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { nanoid } from 'nanoid';
import dateFormat from 'dateformat';

// LOCAL IMPORTS
import { singleQuestion } from '../../store/questions';
import './SingleQuestion.css';



export default function SingleQuestionPage() {
  const dispatch = useDispatch();
  const { url } = useParams();
  const allQuestions = useSelector((state) => state.questions.allQuestions);
  const regExQuery = new RegExp(url);
  const mainQuestion = allQuestions?.filter((question) => question.questionUrl.search(regExQuery) > -1)[0];
  const answerList = mainQuestion?.Answers;


  const listQuestion = () => {
    return (
      <>
        { answerList?.map((answer) => (
          <div className='single-question-page-answer-container' key={`answer-container-${nanoid(4)}`}>
            <div className='single-question-page-answer-header'>
              <i key={`profile-${nanoid(4)}`} className="fas fa-user-astronaut"></i>
              <div key={`${nanoid(4)}`}>
                <div className='single-question-page-answer-user' key={`username-${nanoid(4)}`}>{answer.User.username}</div>
                <div className='single-question-page-answer-date' key={`updated-${nanoid(4)}`}>{`Answered ${dateFormat(answer.createdAt)}`}</div>
              </div>
            </div>
            <div key={`content-${nanoid(4)}`}>{answer.content}</div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className='single-question-page'>
      <div className='single-question-page-header'>
        <div className='single-question-page-header-title'>{mainQuestion?.title}</div>
        <div className='single-question-page-header-num-answer'>
          <i className="far fa-comment-dots"></i>
          {` ${mainQuestion?.Answers?.length}`} Answers
        </div>
      </div>
      <div className='single-question-page-answers'>
        {answerList ? listQuestion() : (
          <div>No answers yet!</div>
        )}
      </div>
    </div>
  );
}
