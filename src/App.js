import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './header/Header';
import { useEffect } from 'react';
import Signup from './member/Signup';

function App() {
  // 임시 로그인 구현
  useEffect(() => {
    localStorage.setItem('isLogin', false)
  }, [])
  
  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <body className='body'>
          <Routes>
            <Route exact path='/member/signup' element={<Signup></Signup>}></Route>
          </Routes>
        </body>
      </div>
    </BrowserRouter>
  );
}

export default App;
