// NPM PACKAGE IMPORTS
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Random } from "random-js";
import { nanoid } from 'nanoid';

// LOCAL IMPORTS
import { addMoreQuestions } from '../../store/questions';
import { randomIcon } from '../../utils';



export default function Authorized() {
  const history = useHistory();
  const dispatch = useDispatch();
  const questionsState = useSelector((state) => state.questions);
  const user = useSelector((state) => state.session.user);
  const { noResults, allQuestions, getMoreQuestions } = questionsState;
  const [questionsList, setQuestionsList] = useState(allQuestions);

  useEffect(() => {
    if (!noResults) {
      setQuestionsList([...questionsList, ...getMoreQuestions])
    }
  }, [questionsState]);

  const navToQuestion = (questionUrl) => {
    return () => {
      history.push(`/question/${questionUrl}`);
    };
  };

  const listQuestions = () => {
    return (
      <>
        {
          questionsList.map((question) => (
            <div key={`${nanoid(5)}`} className='q-l-c'>
              <p>Answer - Recommended for you</p>
              <div
                key={`${question.id}-${nanoid(4)}`}
                className='q-l-c-h'
              >
                {randomIcon()}
                <div className='q-l-c-p'>
                  <p className='q-l-c-p-u'>{question.Answers[0]?.User.username}</p>
                  <p className='q-l-c-p-d'>{question.Answers[0]?.createdAt}</p>
                </div>
              </div>
              <div
                onClick={navToQuestion(question.questionUrl)}
                className='q-l-c-t'
              >
                {question.title}</div>
              <div className='q-l-c-a'>{question.Answers[0]?.content}</div>
            </div>
          ))
        }
      </>
    );
  };

  const postQuestion = () => {
    history.push('/post/question');
  };

  const nextPage = () => {
    dispatch(addMoreQuestions(allQuestions.length));
  };

  return (
    <div className='a-m-p'>
      <div className='a-m-p-h' onClick={postQuestion}>
        <div className='a-m-p-p'>
          {randomIcon()}
          <p>{user.username}</p>
        </div>
        <p>What's your question?</p>
      </div>
      {listQuestions()}
      <button className='a-m-p-b' onClick={nextPage}>More</button>
    </div>
  );
}
