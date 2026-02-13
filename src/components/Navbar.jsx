import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="navbar-brand">
          <div className="brand-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </div>
          <span>Quick Reference</span>
        </a>
      </div>

      <ul className="navbar-links">
        <li><a href="/" className="navbar-link">Home</a></li>
        <li><a href="/projects" className="navbar-link">Projects</a></li>
        <li><a href="/notices" className="navbar-link">Notices</a></li>
      </ul>

      <div className="navbar-actions">
        <button className="btn-create-post">Create Post</button>
        <button className="btn-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </button>
        <img src="https://ui-avatars.com/api/?name=User&background=random" alt="User" className="user-avatar" />
      </div>
    </nav>
  );
};

export default Navbar;
