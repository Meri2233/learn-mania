import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    let navigate = useNavigate();

    let login = (e) => {
        let data = new FormData(e.target);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": data.get('email'),
            "password": data.get('password')
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8000/auth/login", requestOptions)
            .then(response => response.text())
            .then(result => {
                let tokens = JSON.parse(result);
                localStorage.setItem('access_token',tokens.accessToken);
                localStorage.setItem('refresh_token',tokens.refreshToken);
                console.log(tokens);
                navigate('/dashboard');
            })
            .catch(error => console.log('error', error));
    }
    return (
        <div className="login">
            <h3>Login to your account</h3>
            <form onSubmit={(e) => {
                e.preventDefault();
                login(e)
            }}>
                <div className="formsection">
                    <label className='tag' htmlFor="email">Email</label><br />
                    <input type="email" name='email' className='email' placeholder="holland4jake@gmail.com" />
                </div>
                <div className="formsection">
                    <label htmlFor="password">Password</label><br />
                    <input type="password" name='password' className='password' placeholder="********" />
                </div>
                <p>Not created your teacher account? <Link to="/signup">Signup</Link> instead.</p>
                <button className='signupsubmit' type='submit'>Login</button>
            </form>
        </div>
    )
}
