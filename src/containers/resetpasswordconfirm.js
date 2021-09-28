// useState for saving pass username ....
import React,{useState} from 'react';
import { Link,Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { reset_password_confirm } from '../actions/auth';
 
const ResetPasswordConfirm = ({match,reset_password_confirm}) =>{
    const [reqestSent,setReqestSent] = useState(false);
    const [formData,setFormData]  = useState({
        new_password : '',
        re_new_password:''
    });

    // Structure
    const {new_password,re_new_password} = formData;
  
    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});
    
    const onSubmit = e => {
        // preventing browser from default action
        e.preventDefault();

        const uid = match.params.uid;
        const token = match.params.token;
        
        if(new_password === re_new_password){
        reset_password_confirm(uid,token,new_password,re_new_password)
        setReqestSent(true)
        }
    };

    // Redirecting user to home page if they are authenticated
    if (reqestSent){
        return <Redirect to='/' />
    }

// form 
    return (
        <div className='container mt-5'>
            <form onSubmit={e => onSubmit(e)}>
                <h1>Reset Password</h1>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='New Password'
                        name='new_password'
                        value={new_password}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm  Password'
                        name='re_new_password'
                        value={re_new_password}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>

                <button className='btn btn-primary' type='submit'>Reset Password</button>
            </form>
        </div>
    );
};

export default connect(null,{ reset_password_confirm })(ResetPasswordConfirm);