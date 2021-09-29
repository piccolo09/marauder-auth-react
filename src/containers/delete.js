import React,{useState} from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { delete_user } from '../actions/auth';
 
const DeleteUser = ({delete_user}) =>{
    const [reqestSent,setReqestSent] = useState(false);
    const [formData,setFormData]  = useState({
        id:'',
    });

    // Structure
    const {id} = formData;
  
    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});
    
    const onSubmit = e => {
        // preventing browser from default action
        e.preventDefault();

        console.log(id)

        delete_user(id)
        setReqestSent(true)
    };

    // Redirecting user to home page if they are authenticated
    if (reqestSent){
        return <Redirect to='/user/data' />
    }

// form 
    return (
        <div className='container mt-5'>
            <form onSubmit={e => onSubmit(e)}>
                <h1>Edit User<p>(Note:Empty Data will not be UPDATED)</p></h1>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Enter id'
                        name='id'
                        value={id}
                        onChange={e => onChange(e)}
                    />
                </div>
                <button className='btn btn-primary' type='submit' >Confirm Delete</button>
            </form>
        </div>
    );
};

const mapStateToProps = state =>({ 
    isAuthenticated : state.auth.isAuthenticated
});

export default connect(mapStateToProps,{ delete_user })(DeleteUser);