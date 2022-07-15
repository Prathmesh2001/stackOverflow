import './App.css';
import './css/styles.css';
import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import ToDo from './components/ToDo';
import Login from './components/Login';

function App() {

  return (
    <>
      <div className="App">
        
          <BrowserRouter>
           <Navbar/>
            <Routes>
              <Route path="/toDo" element={<ToDo />} />
              <Route path="" element={<Login/>} />
            </Routes>
          </BrowserRouter>

      </div>
    </>
  );
}

export default App;
