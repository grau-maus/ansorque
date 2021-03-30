// NPM PACKAGE IMPORTS
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { nanoid } from 'nanoid';

// LOCAL IMPORTS
import { login } from '../../store/session';
import Authorized from './Authorized';
import Unauthorized from './Unauthorized';
import './Main.css';



const MainPage = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.session.user);
  const [questions, setQuestions] = useState([]);

  const fetchMoreData = () => {
    setTimeout(async () => {

    }, 1500);
  };

  return (
    <>
      {userState &&
        <div>welcome {JSON.stringify(userState)}</div>}
      {!userState &&
        <Unauthorized />}
    </>
  );
};






export default MainPage;
