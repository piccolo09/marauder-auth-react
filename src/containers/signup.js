// useState for saving pass username ....
import React,{useState} from 'react';
import { Link,Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { signup } from '../actions/auth';
 
const Signup = ({signup,isAuthenticated}) =>{
    const [accountCreated , setAccountCreated]= useState(false)
    const [formData,setFormData]  = useState({
        email :'',
        username : '',
        address:'',
        password : '',
        re_password:''

    });

    // Structure
    const {email,username,password,re_password,address} = formData;
    // e.target.name(username,passs) e.target.value(input value)
    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});
    
    const onSubmit = e => {
        // preventing browser from default action
        e.preventDefault();

        if(password === re_password){
        signup(email,username,password,re_password,address)
        setAccountCreated(true)
        }

    };

    if (isAuthenticated){
        return <Redirect to='/' />
    }
    if (accountCreated){
        return<Redirect to='/verify' />
    }

    // Signup form 
    return (
        <div className='container mt-5'>
            <h1>Sign Up</h1>
            <p>Create your Account</p>
            <form onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Username*'
                        name='username'
                        value={username}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email*'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Address'
                        name='address'
                        value={address}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password*'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        // minLength='6'
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm Password*'
                        name='re_password'
                        value={re_password}
                        onChange={e => onChange(e)}
                        // minLength='6'
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Register</button>
            </form>
            <br />
            <p className='mt-3'>
                Already Have an account? <Link to='/login'>Login</Link>
            </p>
        </div>
    );
};

const mapStateToProps = state =>({ 
    isAuthenticated : state.auth.isAuthenticated
});
export default connect(mapStateToProps,{ signup })(Signup);
