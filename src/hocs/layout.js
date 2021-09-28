import React,{useEffect} from 'react';
import Navbar from '../components/navbar';
import { connect } from 'react-redux';
import { checkAuthentication,load_user } from '../actions/auth';
const Layout = (props) =>{
    useEffect(() => {
        props.checkAuthentication();
        props.load_user();
    },[]);
    return(
        <div>
            <Navbar />
            {props.children}
        </div>
    );
}
export default connect(null,{checkAuthentication,load_user})(Layout);