// NPM PACKAGE IMPORTS
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

// LOCAL IMPORTS
import { randomIcon } from '../../utils';
import './PostQuestion.css';

export default function PostQuestionPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <section className='p-q-p'>
      <form
        className='p-q-p-f'
        onSubmit={handleSubmit}
      >
        <div className='p-q-p-h'>
          {randomIcon()}
          <p className='p-q-p-u'>username asked</p>
        </div>
        <input
          type='text'
          placeholder='Start your question with "HOW", "WHAT", "WHY", etc...'
          required
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <div
          className='p-q-p-c'
          onClick={goBack}
        >Cancel</div>
        <button
          type='submit'
        >Add Question</button>
      </form>
    </section>
  );
}
