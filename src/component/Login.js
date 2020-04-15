import React, { useState } from 'react';
import auth from '../firebase'

const Login = ({ setSession }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        try {
            const response = await auth.signInWithEmailAndPassword(username, password);
            const { user } = response;

            setSession({
                isLoggedIn: true,
                currentUser: user
            });
        } catch (error) {
            setSession({
                isLoggedIn: false,
                errorMassage: error.errorMassage
            });
        }
    }
    const handleRegister = async () => {
        try {
            const response = await auth.createUserWithEmailAndPassword(username, password);
            const { user } = response;

            setSession({
                isLoggedIn: true,
                currentUser: user
            });
        } catch (error) {
            setSession({
                isLoggedIn: false,
                errorMassage: error.errorMassage
            });
        }
    }
    const handleUsername = event => {
        setUsername(event.target.value)
    }
    const handlePassword = event => {
        setPassword(event.target.value)
    }
    return (
        <section className="section container">
        <div className="columns is-centered">
          <div className="column is-half">
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input className="input" type="email" name="email" onChange={handleUsername} />
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input className="input" type="password" name="password" onChange={handlePassword} />
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-link" onClick={handleLogin} >Sign In</button>
                </div>
                <div className="control">
                  <button className="button is-link" onClick={handleRegister} >Register</button>
                </div>
              </div>
          </div>
        </div>
      </section>
    )
}

export default Login;