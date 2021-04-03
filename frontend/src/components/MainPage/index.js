// NPM PACKAGE IMPORTS
import { useSelector } from 'react-redux';

// LOCAL IMPORTS
import Authorized from './Authorized';
import Unauthorized from './Unauthorized';
import './Main.css';



const MainPage = () => {
  const userState = useSelector((state) => state.session.user);

  return (
    <>
      {userState &&
        <Authorized />}
      {!userState &&
        <Unauthorized />}
    </>
  );
};






export default MainPage;
