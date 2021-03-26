// NPM PACKAGE IMPORTS
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { nanoid } from 'nanoid';

// LOCAL IMPORTS
import { login } from '../../store/session';



const LoginFormPage = () => {
  const dispatch = useDispatch();
  let userState = useSelector((state) => state.session.user);
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
    <section>
      <h2>Login</h2>
      {errors &&
        errors.map((e) => {
          return (
            <div key={nanoid(5)}>{e}</div>
          );
        })}
      <form onSubmit={handleSubmit}>
        <label htmlFor='credential'>Username / Email:</label>
        <input
          name='credential'
          type='text'
          placeholder='username / email'
          required
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
        />
        <label htmlFor='password'>Password:</label>
        <input
          name='password'
          type='password'
          placeholder='password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Login</button>
      </form>
    </section>
  );
};






export default LoginFormPage;
