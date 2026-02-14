import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import api from '../api';
import './Dashboard.css';

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [notices, setNotices] = useState([]);
    const [activeUsers, setActiveUsers] = useState({ count: 0, users: [] });
    const [currentUser, setCurrentUser] = useState(null); // Added currentUser state
    const [loading, setLoading] = useState(true);
    const [suggestionText, setSuggestionText] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postsRes, suggestionsRes, noticesRes, activeUsersRes, currentUserRes] = await Promise.all([
                    api.get('/posts/'),
                    api.get('/suggestions/'),
                    api.get('/notices/'),
                    api.get('/users/active_users/'),
                    api.get('/users/me/') // Fetch current user data
                ]);

                setPosts(postsRes.data);
                setSuggestions(suggestionsRes.data);
                setNotices(noticesRes.data.length > 0 ? noticesRes.data : [
                    {
                        id: 1,
                        title: "System Update",
                        content: "New project management tools are now live for all teams.",
                        created_at: new Date().toISOString()
                    }
                ]);
                setActiveUsers(activeUsersRes.data);
                setCurrentUser(currentUserRes.data); // Set current user data
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                // Set fallback notice for demo
                setNotices([
                    {
                        id: 1,
                        title: "System Update",
                        content: "New project management tools are now live for all teams.",
                        created_at: new Date().toISOString()
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSuggestionSubmit = async () => {
        if (!suggestionText.trim()) return;

        try {
            await api.post('/suggestions/', {
                content: suggestionText,
                category: 'general',
                is_anonymous: true
            });
            setSuggestionText('');
            alert('Suggestion sent anonymously!');
            // Refresh suggestions list
            const res = await api.get('/suggestions/');
            setSuggestions(res.data);
        } catch (error) {
            console.error("Error sending suggestion:", error);
            alert('Failed to send suggestion.');
        }
    };

    if (loading) {
        return <div className="dashboard-loading">Loading your workspace...</div>;
    }

    return (
        <div className="dashboard">
            <Navbar />
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <div className="feed-section">
                        {notices.length > 0 && (
                            <div className="system-banner">
                                <div className="banner-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                                    </svg>
                                </div>
                                <div className="banner-content">
                                    <h3>{notices[0].title}</h3>
                                    <p>{notices[0].content}</p>
                                </div>
                                <Link to="/notices" className="btn-banner">View Details</Link>
                            </div>
                        )}

                        <div className="feed-filters">
                            <button className="filter-btn active">All Posts</button>
                            <button className="filter-btn">General</button>
                            <button className="filter-btn">Blog</button>
                            <div className="filter-spacer"></div>
                            <button className="filter-sort">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="21" y1="10" x2="3" y2="10"></line>
                                    <line x1="21" y1="6" x2="3" y2="6"></line>
                                    <line x1="21" y1="14" x2="3" y2="14"></line>
                                    <line x1="21" y1="18" x2="3" y2="18"></line>
                                </svg>
                                Latest First
                            </button>
                        </div>

                        <div className="feed-posts">
                            {posts.length > 0 ? posts.map(post => (
                                <div key={post.id} className="post-card">
                                    <div className="post-header">
                                        <img
                                            src={post.author?.profile_picture || `https://ui-avatars.com/api/?name=${post.author?.username || 'U'}&background=random`}
                                            alt={post.author?.username}
                                            className="avatar"
                                        />
                                        <div className="post-meta">
                                            <h4>{post.author?.username || 'Unknown User'}</h4>
                                            <span>{post.category?.toUpperCase()} • {new Date(post.created_at).toLocaleString()}</span>
                                        </div>
                                        <button className="btn-more">•••</button>
                                    </div>
                                    <div className="post-body">
                                        <h4>{post.title}</h4>
                                        <p>{post.content}</p>
                                    </div>
                                    <div className="post-actions">
                                        <button className="action-btn">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                            {post.likes_count || 0}
                                        </button>
                                        <button className="action-btn">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                            {post.comments_count || 0}
                                        </button>
                                        <div className="spacer"></div>
                                        <button className="action-btn">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                                        </button>
                                    </div>
                                </div>
                            )) : (
                                <div className="no-posts">No posts found in your feed.</div>
                            )}
                        </div>
                    </div>

                    <div className="sidebar-section">
                        <div className="sidebar-widget suggestion-box">
                            <div className="widget-header">
                                <span className="widget-icon">💡</span>
                                <h4>Suggestion Box</h4>
                            </div>
                            <p>Share your thoughts anonymously with the leadership team.</p>
                            <textarea
                                placeholder="What's on your mind? (Anonymous)"
                                value={suggestionText}
                                onChange={(e) => setSuggestionText(e.target.value)}
                            ></textarea>
                            <button className="btn-orange" onClick={handleSuggestionSubmit}>Send Anonymously</button>
                        </div>

                        <div className="sidebar-widget trending-widget">
                            <h4>Recent Suggestions</h4>
                            {suggestions.slice(0, 3).map(suggestion => (
                                <div key={suggestion.id} className="trending-item">
                                    <span className="tag">{suggestion.category.toUpperCase()}</span>
                                    <h5>{suggestion.content.length > 50 ? suggestion.content.substring(0, 50) + '...' : suggestion.content}</h5>
                                    <span>{new Date(suggestion.created_at).toLocaleDateString()}</span>
                                </div>
                            ))}
                            {suggestions.length === 0 && <p className="empty-widget">No suggestions yet.</p>}
                        </div>

                        <div className="sidebar-widget colleagues-widget">
                            <h4>Active Colleagues</h4>
                            <div className="avatar-group">
                                {activeUsers.users && activeUsers.users.map(user => (
                                    <img
                                        key={user.id}
                                        src={user.profile_picture}
                                        alt={user.username}
                                        title={user.username}
                                    />
                                ))}
                                {activeUsers.count > 4 && (
                                    <div className="avatar-more">+{activeUsers.count - 4}</div>
                                )}
                                {(!activeUsers.users || activeUsers.users.length === 0) && (
                                    <div className="no-users">No active users</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
