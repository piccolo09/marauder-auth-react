import axios from 'axios'
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAIL,
    LOGOUT,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    USER_EDIT_SUCCESS,
    USER_EDIT_FAIL, 
} from './types';

export const checkAuthentication = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({ token:localStorage.getItem('access')});

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URl}/auth/jwt/verify/`, body, config)

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATION_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATION_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATION_FAIL
            });
        }

    } else {
        dispatch({
            type: AUTHENTICATION_FAIL
        })
    }
}

export const load_user = () => async dispatch => {

    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`, //auth token
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URl}/auth/users/me/`, config);

            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data  //Access and refresh tokes
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        // If we dont have access token in local storage
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

// login function 
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URl}/auth/jwt/create/`, body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data  //Access and refresh tokes
        });

        dispatch(load_user()); //to load user with login     
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
        })
    }
};

export const signup = (email,username,password,re_password,address) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email,username,password,re_password,address});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URl}/auth/users/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data  //Access and refresh tokes
        });     
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        })
    }
};

export const verify = (uid,token) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({uid,token});

    try {
        await axios.post(`${process.env.REACT_APP_API_URl}/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });     
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL,
        })
    }
}; 

export const reset_password = (email) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const body = JSON.stringify({email});

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URl}/auth/users/reset_password/`, body, config);

        dispatch({
            type:PASSWORD_RESET_SUCCESS
        });
    }catch(err){
        dispatch({
            type:PASSWORD_RESET_FAIL
        });
    }

};

export const reset_password_confirm = (uid,token,new_password,re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({uid,token,new_password,re_new_password});

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URl}/auth/users/reset_password_confirm/`,body,config);

        dispatch({
            type:PASSWORD_RESET_CONFIRM_SUCCESS
        });
    }catch(err){
        dispatch({
            type:PASSWORD_RESET_CONFIRM_FAIL
        });
    }
};


export const edit_user = (username=false,address=false) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const obj = {
        // username: username,
        // address: address
      }
    if(username !== false)
    {
        obj.username =username; 
    }
    if(address !== false){ 
        obj.address =address; 
    }
    if(username === false && address === false)
    {
        console.log('Nothing to update')
    }

    console.log(obj)
    const body = JSON.stringify({obj});    


    try{
        const res = await axios.patch(`${process.env.REACT_APP_API_URl}/auth/users/me/`, body, config);

        dispatch({
            type:USER_EDIT_SUCCESS
        });
    }catch(err){
        dispatch({
            type:USER_EDIT_FAIL
        });
    }

};


export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};