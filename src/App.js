import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import auth from './firebase';
import Login from './component/Login';

function App() {
  const [session, setSession] = useState({
    isLoggedIn: false,
    currentUser: null,
    errorMessage: null
  });
  useEffect(() => {
    const handleAuth = auth.onAuthStateChanged(user => {
      if(user){
        setSession({
          isLoggedIn: true,
          currentUser: user
        });
      }
    });

    return () => {
      handleAuth(); 
    }
  }, [])
  const handleLogout = () => {
    auth.signOut().then(response => {
      setSession({
        isLoggedIn: false,
        currentUser: null
      });
    });
  }
  return (
    <div className="App">

      {
        session.isLoggedIn ? (<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          HELLO!, {session.currentUser && session.currentUser.email}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a><br></br> <button type="button" onClick={handleLogout}>Logout</button>
      </header>) : (<Login setSession={setSession} />)
      }
      
    </div>
  );
}

export default App;
