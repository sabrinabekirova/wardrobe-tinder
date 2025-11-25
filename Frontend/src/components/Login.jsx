import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
    // Store user info
    localStorage.setItem('user', JSON.stringify(credentialResponse));
    onLoginSuccess(credentialResponse);
    navigate('/');
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Wardrobe Tinder</h1>
        <p>Sign in to manage your wardrobe</p>
        <div className="google-login-wrapper">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
