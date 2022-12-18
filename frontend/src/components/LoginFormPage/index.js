// NPM PACKAGE IMPORTS
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { nanoid } from "nanoid";

// LOCAL IMPORTS
import { login, demoLogin } from "../../store/session";
import { retryDemoLogin } from "../../utils";
import "./LoginForm.css";

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoadingDemoUser, setIsLoadingDemoUser] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  if (userState) {
    return <Redirect to="/"></Redirect>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoadingUser(true);

    let retries = 0;
    let response;
    const dispatchLogin = setInterval(async () => {
      if (retries < 5 && (!response || response.status !== 200)) {
        response = await dispatch(login({ credential, password })).catch(
          async (res) => {
            const data = await res.json();

            if (data && data.errors) {
              setIsLoadingUser(false);
              setErrors(data.errors);
              clearInterval(dispatchLogin);
            }
          }
        );

        retries += 1;
      } else {
        clearInterval(dispatchLogin);
      }
    }, 500);
  };

  const handleDemoLogin = () => {
    setIsLoadingDemoUser(true);
    retryDemoLogin(dispatch, demoLogin, setIsLoadingDemoUser);
  };

  return (
    <section className="login-form">
      <h2 className="login-form-header">Login</h2>
      {errors &&
        errors.map((e) => {
          return (
            <div className="login-form-errors" key={nanoid(5)}>
              {e}
            </div>
          );
        })}
      <form className="login-form-container" onSubmit={handleSubmit}>
        <label htmlFor="credential">Username / Email:</label>
        <input
          id="credential"
          type="text"
          placeholder="username / email"
          required
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
        />
        <label htmlFor="password-login">Password:</label>
        <input
          id="password-login"
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="login-form-container-button"
          type="submit"
          disabled={isLoadingDemoUser || isLoadingUser}
        >
          {isLoadingUser ? "Loading" : "Login"}
        </button>
      </form>
      <button
        className="login-form-container-demo"
        onClick={handleDemoLogin}
        disabled={isLoadingDemoUser || isLoadingUser}
      >
        {isLoadingDemoUser ? "Loading" : "Demo Login"}
      </button>
    </section>
  );
};

export default LoginFormPage;
