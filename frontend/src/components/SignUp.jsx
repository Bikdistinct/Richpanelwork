import React, {useState,useEffect} from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import './login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/user/signup', {
        name,
        email,
        password,
      });

      // Handle success, e.g. redirect to another page
      console.log('Signup successful', response.data);
      toast.success('Sign Up successfully');
      navigate("/login");
    } catch (error) {
      // Handle error, e.g. show error message to user
      console.error('Signup failed', error.response.data.message);
      toast.error('Signup failed');
    }
  };

  return (
    <div className='login'>
        <div className='logincard signup'>
            <h2 className='heading'>Create Account</h2>
            <form className='loginform' onSubmit={handleSignup}>
                <label className='name'>Name</label>
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                <label className='email'>Email</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label className='password'>Password</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
               <div className='checkRem'>
                <input type='checkbox' id='remember'/>
                <label for='remember'>Remember me</label>
                </div>
                <div className='signupBtn' onClick={handleSignup}>Sign Up</div>
                <div className='loginLink'>Already have an account? <Link to="/login">Login</Link></div>
            </form>
        </div>
    </div>
  )
}

export default Signup