// useState for saving pass username ....
import React,{useState} from 'react';
import { Link,Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { reset_password } from '../actions/auth';
 
const ResetPassword = ({reset_password}) =>{
    const [reqestSent,setReqestSent] = useState(false);

    const [formData,setFormData]  = useState({
        email : ''
    });

    // Structure
    const {email} = formData;
    // e.target.name(username,passs) e.target.value(input value)
    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});
    
    const onSubmit = e => {
        // preventing browser from default action
        e.preventDefault();

        reset_password(email)
        setReqestSent(true)
    };

    // Redirecting user to home page if they are authenticated
    if (reqestSent){
        return <Redirect to='/' />
    }

// form 
    return (
        <div className='container mt-5'>
            <h1>Password Reset Requests </h1>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Reset Password</button>
            </form>
        </div>
    );
};

export default connect(null,{ reset_password })(ResetPassword);
