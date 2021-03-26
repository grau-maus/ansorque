// NPM PACKAGE IMPORTS
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// LOCAL IMPORTS
import { logout } from '../../store/session';



function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logoutUser = (e) => {
    e.preventDefault();

    dispatch(logout());
  };

  const loggedInUser = () => {
    return (
      <ul className="profile-dropdown">
        <li>{user.username}</li>
        <li>{user.email}</li>
        <li>
          <button onClick={logoutUser}>Log Out</button>
        </li>
      </ul>
    );
  };

  const userLogIn = () => {
    history.push('/login');
  };

  const userSignUp = () => {
    history.push('/signup');
  };

  const loggedOutUser = () => {
    return (
      <ul className="profile-dropdown">
        <li>
          <button onClick={userLogIn}>Login</button>
        </li>
        <li>
          <button onClick={userSignUp}>Sign up</button>
        </li>
      </ul>
    );
  };

  return (
    <>
      <div
        className='nav-container-dropdown'
      >
        <i
          onClick={openMenu}
          className="fas fa-bars"
        ></i>
      </div>
      {user ? (showMenu ? loggedInUser() : null) : (showMenu ? loggedOutUser() : null)}
    </>
  );
}






export default ProfileButton;
