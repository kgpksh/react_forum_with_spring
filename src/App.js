import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [testMsg, setTestMsg] = useState('')
  useEffect(() => {
    fetch('/member/test')
    .then(res => res.text())
    .then(msg => setTestMsg(msg))
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{testMsg}</p>
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
