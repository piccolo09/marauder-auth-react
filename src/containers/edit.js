import React,{useState} from 'react';
import { Link,Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { edit_user } from '../actions/auth';
 
const EditUser = ({edit_user}) =>{
    const [reqestSent,setReqestSent] = useState(false);
    const [formData,setFormData]  = useState({
        username : '',
        address:''
    });

    // Structure
    const {username,address} = formData;
  
    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});
    
    const onSubmit = e => {
        // preventing browser from default action
        e.preventDefault();
        
        edit_user(username,address)
        setReqestSent(true)

    };

    // Redirecting user to home page if they are authenticated
    if (reqestSent){
        return <Redirect to='/users/data' />
    }

// form 
    return (
        <div className='container mt-5'>
            <form onSubmit={e => onSubmit(e)}>
                <h1>Edit User</h1>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='New Username'
                        name='username'
                        value={username}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='New Address'
                        name='address'
                        value={address}
                        onChange={e => onChange(e)}
                    />
                </div>

                <button className='btn btn-primary' type='submit'>Confirm Change</button>
            </form>
        </div>
    );
};

const mapStateToProps = state =>({ 
    isAuthenticated : state.auth.isAuthenticated
});

export default connect(mapStateToProps,{ edit_user })(EditUser);