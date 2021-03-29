// NPM PACKAGE IMPORTS
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { nanoid } from 'nanoid';

// LOCAL IMPORTS
import { login } from '../../store/session';
import './LoginForm.css';



const LoginFormPage = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (userState) {
    return (
      <Redirect to='/'></Redirect>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login({ credential, password })).catch(async (res) => {
      const data = await res.json();

      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <section className='login-form'>
      <h2 className='login-form-header'>Login</h2>
      {errors &&
        errors.map((e) => {
          return (
            <div
              className='login-form-errors'
              key={nanoid(5)}
            >{e}</div>
          );
        })}
      <form
        className='login-form-container'
        onSubmit={handleSubmit}
      >
        <label htmlFor='credential'>Username / Email:</label>
        <input
          id='credential'
          type='text'
          placeholder='username / email'
          required
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
        />
        <label htmlFor='password-login'>Password:</label>
        <input
          id='password-login'
          type='password'
          placeholder='password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className='login-form-container-button'
          type='submit'
        >Login</button>
      </form>
    </section>
  );
};






export default LoginFormPage;
