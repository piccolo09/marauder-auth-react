import React from 'react';
import {Link} from 'react-router-dom'

const Home = () =>(
  <div className = "container">
    <div class="jumbotron mt-5">
      <h1 class="display-4">Hello, world!</h1>
      <p class="lead">This is a simple auth system.</p>
      <hr class="my-4"/>
      <p>Login to access the content</p>
      <p class="lead">
        <Link class="btn btn-primary btn-lg" to="/login" role="button">Login</Link>
      </p>
    </div>
  </div>
); 
export default Home;