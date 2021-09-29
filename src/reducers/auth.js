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
    USER_DELETED_SUCCESS,
    USER_DELETED_FAIL,

}from '../actions/types';



const initialState = {
            // Cheaking local storage for tokens 
        access: localStorage.getItem('access'),
        refresh: localStorage.getItem('refresh'),
        isAuthenticated: null,
        user: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case AUTHENTICATION_SUCCESS:
            return{
                ...state,
                isAuthenticated : true
            }
        case LOGIN_SUCCESS:
        case USER_EDIT_SUCCESS:
            localStorage.setItem('access',payload.access);
            return{
                   ...state,
                   isAuthenticated:true,
                   access:payload.access,
                   refresh:payload.refresh  
            }
        case USER_LOADED_SUCCESS:
            return{
                ...state,
                user:payload
            }
        case AUTHENTICATION_FAIL:
            return{
                    ...state,
                    isAuthenticated :false 
                }   
        case USER_LOADED_FAIL:
            return{
                ...state,
                user:null  
            }
        case LOGIN_FAIL:
        case LOGOUT:
        case SIGNUP_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return{
                ...state,
                isAuthenticated:false,
                access:null,
                refresh:null,
                user:null 
            }
        case PASSWORD_RESET_SUCCESS:    
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
        case USER_EDIT_FAIL:
        case USER_DELETED_FAIL:
        case USER_DELETED_SUCCESS:
            return{
                ...state
            }
        case SIGNUP_SUCCESS:
            return{
                ...state,
                isAuthenticated:false
            }
        default:
            return state        
    }   
};