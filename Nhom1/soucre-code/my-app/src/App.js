import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { useState, useEffect } from 'react'
import cookies from 'react-cookies';
function App() {
  const token = cookies.load('_csrf');
  console.log(token)
  useEffect(() => {
    let bodyFormdata = new FormData();
    const config = {
      headers: { "Content-Type": "multipart/form-data" }
    }
    bodyFormdata.append('content', 'con mèo biết nói tiếng người http://localhost:3002');
    // axios.delete(
    //   'http://localhost:3004/posts/309',
    //   { withCredentials: true },
    //   config
    // )
    axios.post(
      'http://socialbook:3004/posts',
      bodyFormdata,
      { withCredentials: true },
      config
    )
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
