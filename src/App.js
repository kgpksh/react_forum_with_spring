import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './header/Header';
import Signup from './member/Signup';
import Login from './member/Login';
import PostList from './main/PostList';
import PostEdit from './main/PostEdit';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CategoryContext = createContext()

function App() {
  const [categories, setCategories] = useState([])
    useEffect(() => {
        axios.get('/category/categoryList')
        .then(res => {
            const categoryList = res.data.map(element => element['category'])
            return categoryList;
        })
        .then(categoryList => {
            setCategories(categoryList)
        })
    }, [])

  return (
    <BrowserRouter>
      <CategoryContext.Provider value={{categories}}>
      <div className="App">
          <Header></Header>
          <body className='body'>
            <Routes>
              <Route exact path = '/member/signup' element={<Signup></Signup>}></Route>
              <Route exact path = '/member/login' element = {<Login></Login>}></Route>
              <Route exact path = '/' element = {<PostList></PostList>}></Route>
              <Route exact path = '/post' element = {<PostList></PostList>}></Route>
              <Route exact path = '/post/edit' element = {<PostEdit></PostEdit>}></Route>
            </Routes>
          </body>
        </div>
      </CategoryContext.Provider>
    </BrowserRouter>
  );
}

export default App;
