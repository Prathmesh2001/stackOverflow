import './App.css';
import './css/styles.css';
import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route, Link
} from 'react-router-dom';
import ChangeText from './components/ChangeText';
import ToDo from './components/ToDo';
import Login from './components/Login';

function App() {

  return (
    <>
      <div className="App">
        
          <BrowserRouter>

            <nav>
              <Link to="" className='text-dark mx-3'>Texty</Link>
              <Link to="/toDo" className='text-dark mx-3'>To Do</Link>
            </nav>

            <Routes>
              <Route path="" element={<ChangeText />} />
              <Route path="/toDo" element={<ToDo />} />
              <Route path="login" element={<Login/>} />
            </Routes>
          </BrowserRouter>

      </div>
    </>
  );
}

export default App;
