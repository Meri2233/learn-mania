import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  let navigate = useNavigate();
  //let [errorMsg,setErrorMsg] = useState();

  let signUp = (e) => {
    let data = new FormData(e.target);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "name": data.get('username'),
      "email": data.get('email'),
      "password": data.get('password'),
      "confirmPassword": data.get('confirmpassword')
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8000/auth/signup", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        navigate('/login');
      })
      .catch(error => console.log('error', error));
  }
  return (
    <div className="signup">
      <h3 className='title'>Create your Account</h3>
      <p>Create your teacher account to post questions</p>
      <form onSubmit={(e) => {
        e.preventDefault();
        signUp(e)
      }}>
        <div className="formsection">
          <label className='tag' htmlFor="email">Email</label><br />
          <input type="email" name='email' className='email' placeholder="holland4jake@gmail.com" />
        </div>
        <div className="formsection">
          <label htmlFor="username">Username</label><br />
          <input type="text" name='username' className='username' placeholder="Jake Holland" />
        </div>
        <div className="formsection">
          <label htmlFor="password">Password</label><br />
          <input type="password" name='password' className='password' placeholder="********" />
        </div>
        <div className="error"></div>
        <div className="formsection">
          <label htmlFor="confirmpassword">Confirm Password</label><br />
          <input type="password" name='confirmpassword' className='confirmpassword' placeholder="********" />
        </div>
        <div className="error"></div>
        <p>Already Joined As Teacher? <Link style={{ textDecoration: 'none', color: "rgb(62,218,130)" }} to="/login">Click here</Link> to login.</p>
        <button className='signupsubmit' type='submit'>Create your account</button>
      </form>
    </div>
  )
}
