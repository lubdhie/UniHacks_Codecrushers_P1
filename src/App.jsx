import { useState } from 'react'
import Navbar from './components/Navbar'
import LoginCard from './components/LoginCard'
import './App.css'

function App() {
  return (
    <div className="app">
      <main>
        <LoginCard />
      </main>
    </div>
  )
}

export default App
