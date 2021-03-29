import SignupFormPage from '../SignupFormPage';
import LoginFormPage from '../LoginFormPage';

export default function Unauthorized() {
  return (
    <div className='unauth-user-main'>
      <h1>Anorq</h1>
      <p>Flashy description here. (It's a Quora clone!)</p>
      <div className='unauth-user-main-container'>
        <SignupFormPage />
        <LoginFormPage />
      </div>
    </div>
  );
}
