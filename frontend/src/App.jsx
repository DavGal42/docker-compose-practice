// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './components/User.jsx';
import UserList from './components/UserList.jsx';


function App() {
  return (
    <Router>   
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/:id" element={<User />} />
        </Routes>    
    </Router>
  );
}

export default App;
