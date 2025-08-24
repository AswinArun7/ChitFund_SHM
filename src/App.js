import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import CreateChitFund from './components/CreateChitFund';
import ChitFundDetails from './components/ChitFundDetails';
import Profile from './components/Profile';

function App() {
  const [user, setUser] = useState(null);
  const [chitFunds, setChitFunds] = useState([]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addChitFund = (newChitFund) => {
    setChitFunds([...chitFunds, { ...newChitFund, id: Date.now() }]);
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        <div className="container">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Dashboard user={user} chitFunds={chitFunds} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} 
            />
            <Route 
              path="/register" 
              element={user ? <Navigate to="/" /> : <Register onLogin={handleLogin} />} 
            />
            <Route 
              path="/create-chitfund" 
              element={user ? <CreateChitFund onAddChitFund={addChitFund} user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/chitfund/:id" 
              element={user ? <ChitFundDetails chitFunds={chitFunds} user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/profile" 
              element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
