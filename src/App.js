import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

import Home from './containers/home';
import Login from './containers/login';
import Signup from './containers/signup';
import Verify from './containers/verify';
import Activate from './containers/activate';
import ResetPassword from './containers/resetpassword';
import ResetPasswordConfirm from './containers/resetpasswordconfirm';
import EditUser from './containers/edit';
import DeleteUser from './containers/delete';
import Layout from './hocs/layout';
import UsersData from './containers/usersdata';
import { Provider } from 'react-redux';
import store from './store';




const App = () =>(
  <Provider store={store}>
    
    <Router>
    
      <Layout>
    
        <Switch>
    
            <Route exact path='/' component = {Home} />
          
            <Route exact path='/home' component = {Home} />
    
            <Route exact path='/login' component = {Login} />
    
            <Route exact path='/signup' component = {Signup} />

            <Route exact path='/verify' component = {Verify} />

            <Route exact path='/users/data' component = {UsersData} />

            <Route exact path='/users/data/edit' component = {EditUser} />

            <Route exact path='/users/data/delete' component = {DeleteUser} />

            <Route exact path='/activate/:uid/:token' component = {Activate} />
    
            <Route exact path='/reset-password' component = {ResetPassword} />
    
            <Route exact path='/password/reset/confirm/:uid/:token' component = {ResetPasswordConfirm} />
    
        </Switch>
    
      </Layout>
    
    </Router>
  
  </Provider>
);

export default App;