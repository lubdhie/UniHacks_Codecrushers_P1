import { useState } from 'react'
import Navbar from './components/Navbar'
import LoginCard from './components/LoginCard'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  return (
    <div className="app">
      <main>
        {isAuthenticated ? (
          <Dashboard />
        ) : (
          <LoginCard onLogin={handleLogin} />
        )}
      </main>
    </div>
  )
}

export default App
