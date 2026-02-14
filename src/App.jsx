import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginCard from './components/LoginCard'
import Dashboard from './components/Dashboard'
import CreatePost from './components/CreatePost'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import AdminPage from './components/AdminPage'
import NoticesPage from './components/NoticesPage'
import './App.css'

function App() {
  // Authentication temporarily disabled for development - any login will work
  const [token, setToken] = useState(localStorage.getItem('access_token'));

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  return (
    <Router>
      <div className="app">
        <main>
          <Routes>
            <Route
              path="/"
              element={token ? <Dashboard /> : <LoginCard onLogin={handleLogin} />}
            />
            <Route
              path="/login"
              element={token ? <Navigate to="/" /> : <LoginCard onLogin={handleLogin} />}
            />
            <Route
              path="/create-post"
              element={token ? <CreatePost /> : <Navigate to="/" />}
            />
            <Route
              path="/profile"
              element={token ? <Profile /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/edit"
              element={token ? <EditProfile /> : <Navigate to="/" />}
            />
            <Route
              path="/admin"
              element={token ? <AdminPage /> : <Navigate to="/" />}
            />
            <Route
              path="/notices"
              element={token ? <NoticesPage /> : <Navigate to="/" />}
            />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
