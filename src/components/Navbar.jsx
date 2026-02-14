import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../api';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get('/users/me/');
                setUser(res.data);
            } catch (error) {
                console.error('Error fetching user in navbar:', error);
            }
        };
        fetchUser();
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-left">
                    <Link to="/" className="navbar-brand">
                        <div className="brand-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" fill="#2AB1C5" />
                                <path d="M12 7V17M12 7L8 11M12 7L16 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="brand-name">InnerCircle</span>
                    </Link>

                    <div className="navbar-search">
                        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <input type="text" placeholder="Search projects or people..." />
                    </div>
                </div>

                <div className="navbar-right">
                    <ul className="navbar-links">
                        <li>
                            <Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/projects" className={`navbar-link ${location.pathname === '/projects' ? 'active' : ''}`}>
                                Projects
                            </Link>
                        </li>
                        <li>
                            <Link to="/notices" className={`navbar-link ${location.pathname === '/notices' ? 'active' : ''}`}>
                                Notices
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin" className={`navbar-link ${location.pathname === '/admin' ? 'active' : ''}`}>
                                Admin
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile" className={`navbar-link ${location.pathname.startsWith('/profile') ? 'active' : ''}`}>
                                Profile
                            </Link>
                        </li>
                    </ul>

                    <div className="navbar-actions">
                        <Link to="/create-post" className="btn-create-post">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Create Post
                        </Link>
                        <button className="btn-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                            </svg>
                        </button>
                        <Link to="/profile">
                            <img
                                src={user?.profile_picture || `https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=random`}
                                alt="User"
                                className="user-avatar"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
