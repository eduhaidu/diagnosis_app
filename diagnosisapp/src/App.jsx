import { useState } from 'react'
import './App.css'
import Home from './pages/Home.jsx'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Appointments from './pages/Appointments.jsx';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> //Directs user to Home page when they visit the root URL
        <Route path="/login" element={<Login />} /> //Directs user to Login page when they visit the /login URL
        <Route path="/register" element={<Register />} /> //Directs user to Register page when they visit the /register URL
        <Route path="/dashboard" element={<Dashboard />} /> //Directs user to Dashboard page when they visit the /dashboard URL
        <Route path="/appointments" element={<Appointments />} /> //Directs user to Appointments page when they visit the /appointments URL
      </Routes>
    </Router>
  );
}

export default App
