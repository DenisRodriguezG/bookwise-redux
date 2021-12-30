import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Error from './components/Error';
import Home  from './components/Home'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <Routes>
           <Route path="/" element={<Login/>}/>
           <Route path="/register" element={<Register/>}/>
           <Route path="/login" element={<Navigate to="/" replace/>}/>
           <Route path="*" element={<Error/>}/>
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
