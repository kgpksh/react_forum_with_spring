import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './header/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
      </div>
    </BrowserRouter>
  );
}

export default App;
