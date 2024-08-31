import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo.png';
import axios from 'axios';
import { registerRoute } from '../utils/apiRoutes';
import './Register.css'; // Import the CSS file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
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
    confirmpassword: ""
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
    if (!username || !email || !password || !confirmpassword) {
      toast.error("No field should be empty", StyledToast);
      return false;
    }
    if (password !== confirmpassword) {
      toast.error("Password and confirm password must be the same", StyledToast);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidate()) {
      const { email, username, password } = values;
      try {
        const { data } = await axios.post(registerRoute, {
          username,
          email,
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
        <input
          type='password'
          placeholder='Confirm-Password'
          name='confirmpassword'
          onChange={handleChange}
        />
        <button type='submit'>Let's Chat</button>
        <span>
          Already have an account? <Link to='/login'>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
