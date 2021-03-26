// NPM PACKAGE IMPORTS
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { nanoid } from 'nanoid';

// LOCAL IMPORTS
import { signup } from '../../store/session';
import './SignupForm.css';



const SignupFormPage = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.session.user);
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [passwordError, setPasswordError] = useState('');

  if (userState) {
    return (
      <Redirect to='/' />
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      dispatch(signup({ username, email, password }))
        .catch(async (res) => {
          const data = await res.json();

          setPasswordError('');

          if (data && data.errors) setErrors(data.errors);
        });
    } else {
      return setPasswordError('Passwords must match')
    }
  };

  return (
    <section className='signup-form'>
      <h2 className='signup-form-header'>Sign Up</h2>
      {errors &&
        errors.map((e) => {
          return (
            <div
              className='signup-form-errors'
              key={nanoid(5)}
            >{e}</div>
          );
        })}
      <form
        className='signup-form-container'
        onSubmit={handleSubmit}
      >
        <label htmlFor='username'>Username:</label>
        <input
          id='username'
          type='text'
          placeholder='username'
          required
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label htmlFor='email'>Email:</label>
        <input
          id='email'
          type='text'
          placeholder='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='password'>Password:</label>
        <input
          id='password'
          type='password'
          placeholder='password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor='confirmPassword'>Confirm password:</label>
        <input
          id='confirmPassword'
          type='password'
          placeholder='confirmPassword'
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {passwordError &&
          <div className='signup-form-container-confirm-password'>{passwordError}</div>
        }
        <button
          className='signup-form-container-button'
          type='submit'
        >Sign Up</button>
      </form>
    </section>
  );
};






export default SignupFormPage;
