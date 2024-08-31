import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo.png';
import axios from 'axios';
import { loginRoute, registerRoute } from '../utils/apiRoutes';
import './Register.css'; // Import the CSS file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const navigate = useNavigate();
  const StyledToast = {
    position: "bottom-center",
    autoClose: 10000,
    pauseOnHover: true,
    theme: "dark",
  };

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) // Fixed env variable typo
      navigate('/');
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidate = () => {
    const { password, confirmpassword, username, email } = values;
    if (!username || !email || !password ) {
      toast.error("No field should be empty", StyledToast);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidate()) {
      const { email, username, password } = values;
      try {
        const { data } = await axios.post(loginRoute, {
          username,
          password,
        });
        if (data.status === true) {
          toast.success("Registration Successful", StyledToast);
          navigate('/'); // Redirect to homepage or dashboard after successful registration
        } else {
          toast.error(data.message, StyledToast);
        }
      } catch (error) {
        toast.error("Something went wrong", StyledToast);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='heading'>
          <img src={Logo} alt='logo' height='200px' width='200px' />
          <h2>ChitChat</h2>
        </div>
        <input
          type='text'
          placeholder='Username'
          name='username'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='Email-ID'
          name='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          onChange={handleChange}
        />
        <button type='submit'>Let's Chat</button>
        <span>
          Don't have an account?<Link to='/register'>Register</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
