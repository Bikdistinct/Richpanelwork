import React, {useState} from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import './login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password,
      });

      // Handle success, e.g. store user token and redirect to another page
      console.log('Login successful', response.data);
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      toast.success('Logged in successfully');
      navigate('/')
    } catch (error) {
      // Handle error, e.g. show error message to user
      console.error('Login failed', error.response.data.message);
      toast.error('Login failed');
    }
  };

  return (
    <div className='login'>
        <div className='logincard'>
            <h2 className='heading'>Login to your account</h2>
            <form className='loginform' onSubmit={handleLogin}>
                <label className='email'>Email</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label className='password'>Password</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
               <div className='checkRem'>
                <input type='checkbox' id='remember'/>
                <label for='remember'>Remember me</label>
                </div>
                <div className='signupBtn' onClick={handleLogin} >Login</div>
                <div className='loginLink'>New to MyApp? <Link to="/signup">Sign Up</Link></div>
            </form>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Login