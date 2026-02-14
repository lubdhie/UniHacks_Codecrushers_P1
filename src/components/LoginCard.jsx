import React, { useState } from 'react';
import api from '../api';
import './LoginCard.css';

const LoginCard = ({ onLogin }) => {
    const [activeTab, setActiveTab] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate a small delay for better UX
        setTimeout(() => {
            try {
                // Backend authentication temporarily disabled
                // Just set dummy tokens and redirect to dashboard
                const dummyToken = 'dev-token-' + Date.now();
                localStorage.setItem('access_token', dummyToken);
                localStorage.setItem('refresh_token', dummyToken);
                onLogin(dummyToken);

                /* 
                // Original backend integration (commented out for development)
                if (activeTab === 'login') {
                    const response = await api.post('/login/', {
                        username: formData.username || formData.email,
                        password: formData.password
                    });

                    const { access, refresh } = response.data;
                    localStorage.setItem('access_token', access);
                    localStorage.setItem('refresh_token', refresh);
                    onLogin(access);
                } else {
                    await api.post('/register/', {
                        username: formData.username,
                        email: formData.email,
                        password: formData.password,
                        role: 'USER'
                    });

                    const loginResponse = await api.post('/login/', {
                        username: formData.username,
                        password: formData.password
                    });

                    const { access, refresh } = loginResponse.data;
                    localStorage.setItem('access_token', access);
                    localStorage.setItem('refresh_token', refresh);
                    onLogin(access);
                }
                */
            } catch (err) {
                console.error('Auth error:', err);
                const errorMessage = err.response?.data?.detail
                    || err.response?.data?.non_field_errors?.[0]
                    || err.response?.data?.username?.[0]
                    || err.response?.data?.email?.[0]
                    || err.response?.data?.password?.[0]
                    || 'Authentication failed. Please check your credentials.';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        }, 800); // Small delay to show loading state
    };

    return (
        <div className="login-page-wrapper">
            {/* Logo in top left */}
            <div className="login-logo">
                <div className="logo-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2AB1C5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                    </svg>
                </div>
                <span className="logo-text">InnerCircle</span>
            </div>

            <div className="login-container">
                <div className="login-card">
                    {/* Tabs */}
                    <div className="login-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                            onClick={() => setActiveTab('login')}
                        >
                            Login
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
                            onClick={() => setActiveTab('signup')}
                        >
                            Signup
                        </button>
                    </div>

                    {/* Header */}
                    <div className="login-header">
                        <h2>Welcome back</h2>
                        <p>Enter your workspace credentials to continue.</p>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        {error && <div className="error-message">{error}</div>}

                        {/* Email/Username Field */}
                        <div className="form-group">
                            <label>EMAIL ADDRESS</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    name={activeTab === 'login' ? 'email' : 'username'}
                                    placeholder="name@company.com"
                                    className="form-input"
                                    value={activeTab === 'login' ? formData.email : formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Email field for signup */}
                        {activeTab === 'signup' && (
                            <div className="form-group">
                                <label>EMAIL ADDRESS</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                        </svg>
                                    </span>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="name@company.com"
                                        className="form-input"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {/* Password Field */}
                        <div className="form-group">
                            <div className="label-row">
                                <label>PASSWORD</label>
                                {activeTab === 'login' && (
                                    <a href="#" className="forgot-password">Forgot password?</a>
                                )}
                            </div>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    className="form-input"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                            <line x1="1" y1="1" x2="23" y2="23"></line>
                                        </svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn-submit" disabled={loading}>
                            {loading ? 'Processing...' : (
                                <>
                                    Sign In
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </>
                            )}
                        </button>

                        <div className="divider">OR CONTINUE WITH</div>

                        <div className="social-login">
                            <button type="button" className="btn-social">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Google
                            </button>
                            <button type="button" className="btn-social">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                GitHub
                            </button>
                        </div>

                        <div className="signup-link">
                            New to TechFlow? <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('signup'); }}>Join our community</a> for free and start building.
                        </div>
                    </form>

                    {/* Footer Links */}
                    <div className="login-footer">
                        <a href="#">HELP CENTER</a>
                        <a href="#">PRIVACY POLICY</a>
                        <a href="#">TERMS OF SERVICE</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginCard;
