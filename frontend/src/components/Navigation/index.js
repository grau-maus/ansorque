// NPM PACKAGE IMPORTS
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

// LOCAL IMPORTS
import ProfileButton from './ProfileButton';
import './Navigation.css';



function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

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

  return (
    <div className='nav-container'>
      <NavLink exact to="/"
        className='nav-container-home'
      >Home</NavLink>
      {isLoaded && sessionLinks}
    </div>
  );
}






export default Navigation;
