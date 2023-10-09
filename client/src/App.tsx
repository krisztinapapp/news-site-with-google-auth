import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import EditPost from './components/EditPost';
import './App.css';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/edit/:id' element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
