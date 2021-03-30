// NPM PACKAGE IMPORTS
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// LOCAL IMPORTS
import ProfileButton from './ProfileButton';
import './Navigation.css';



function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [search, setSearch] = useState('');

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <ProfileButton />
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    history.push(`/questions/${search}`);
  };

  return (
    <div className='nav-container'>
      <NavLink exact to="/"
        className='nav-container-home'
      >
        Anorq
      </NavLink>
      <form
        className='nav-container-search-bar'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          placeholder='Search for questions'
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      {isLoaded && sessionLinks}
    </div>
  );
}






export default Navigation;
