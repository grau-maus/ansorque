import SignupFormPage from '../SignupFormPage';
import LoginFormPage from '../LoginFormPage';

export default function Unauthorized() {
  return (
    <div className='unauth-user-main'>
      <h1>Ansorque</h1>
      <p>A question and answer web app!</p>
      <div className='unauth-user-main-container'>
        <SignupFormPage />
        <LoginFormPage />
      </div>
    </div>
  );
}
