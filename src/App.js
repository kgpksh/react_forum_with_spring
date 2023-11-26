import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './header/Header';
import Signup from './member/Signup';
import Login from './member/Login';

function App() {  
  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <body className='body'>
          <Routes>
            <Route exact path = '/member/signup' element={<Signup></Signup>}></Route>
            <Route exact path = '/member/login' element = {<Login></Login>}></Route>
          </Routes>
        </body>
      </div>
    </BrowserRouter>
  );
}

export default App;
