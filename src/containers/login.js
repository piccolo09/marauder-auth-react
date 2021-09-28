// useState for saving pass email ....
import React,{useState} from 'react';
import { Link,Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { login } from '../actions/auth';
 
const Login = ({login,isAuthenticated}) =>{
    const [formData,setFormData]  = useState({
        email : '',
        password : ''
    });

    // Structure
    const {email,password} = formData;
    // e.target.name(email,passs) e.target.value(input value)
    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});
    
    const onSubmit = e => {
        // preventing browser from default action
        e.preventDefault();

        login(email,password)

    };

    // Redirecting user to home page if they are authenticated
    if (isAuthenticated){
        return <Redirect to='/users/data' />
    }

// Login form 
    return (
        <div className='container mt-5'>
            <h1>Sign In</h1>
            <p>Sign into your Account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        // minLength='6'
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Login</button>
            </form>
            <br />
            <p className='mt-3'>
                Don't have an account? <Link to='/signup'>Sign Up</Link>
            </p>
            <p className='mt-3'>
                Forgot your Password? <Link to='/reset-password'>Reset Password</Link>
            </p>
        </div>
    );
};

const mapStateToProps = state =>({ 
    isAuthenticated : state.auth.isAuthenticated
});
export default connect(mapStateToProps,{ login })(Login);
