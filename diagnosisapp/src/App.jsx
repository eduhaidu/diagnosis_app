import { useState } from 'react'
import './App.css'
import Home from './pages/Home.jsx'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> //Directs user to Home page when they visit the root URL
        <Route path="/login" element={<Login />} /> //Directs user to Login page when they visit the /login URL
        <Route path="/register" element={<Register />} /> //Directs user to Register page when they visit the /register URL
      </Routes>
    </Router>
  );
}

export default App
