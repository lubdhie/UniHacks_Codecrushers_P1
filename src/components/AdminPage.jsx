import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './AdminPage.css';
import api from '../api';

const AdminPage = () => {
    const [notices, setNotices] = useState([]);
    const [suggestions, setSuggestions] = useState([
        {
            id: 'FEED-829',
            text: "Could we consider implementing a 4-day work week trial during the summer months?",
            time: "2h ago",
            status: "new"
        },
        {
            id: 'FEED-827',
            text: "The temperature in the engineering wing is consistently too cold. Can we adjust the HVAC?",
            time: "Yesterday",
            status: "new"
        },
        {
            id: 'FEED-825',
            text: "Request for more healthy snack options in the breakroom.",
            time: "Oct 23",
            status: "reviewed"
        }
    ]);

    const [noticeHeadline, setNoticeHeadline] = useState('');
    const [noticeContent, setNoticeContent] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch notices from backend on component mount
    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const response = await api.get('/notices/');
            setNotices(response.data);
        } catch (error) {
            console.error("Error fetching notices:", error);
            // Fallback to dummy data if backend is unavailable
            setNotices([
                {
                    id: 1,
                    title: "Mandatory Security Update: VPN Configuration",
                    content: "All employees must update their GlobalProtect VPN client to version 6.2 by Friday. Failure to update may result in loss of access to internal dev servers.",
                    created_at: new Date().toISOString(),
                },
                {
                    id: 2,
                    title: "New Perks Program: Mental Health Wednesdays",
                    content: "Starting next week, every third Wednesday of the month is a 'No Meetings' day to focus on deep work and well-being.",
                    created_at: new Date(Date.now() - 86400000).toISOString(),
                }
            ]);
        }
    };

    const handlePublishNotice = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/notices/create/', {
                title: noticeHeadline,
                content: noticeContent,
            });

            // Add the new notice to the top of the list
            setNotices([response.data, ...notices]);
            setNoticeHeadline('');
            setNoticeContent('');
            alert('Notice published successfully!');
        } catch (error) {
            console.error("Error publishing notice:", error);
            setError(error.response?.data?.detail || 'Failed to publish notice. Please try again.');

            // Mock update for preview if backend fails
            const newNotice = {
                id: Date.now(),
                title: noticeHeadline,
                content: noticeContent,
                created_at: new Date().toISOString(),
            };
            setNotices([newNotice, ...notices]);
            setNoticeHeadline('');
            setNoticeContent('');
        } finally {
            setLoading(false);
        }
    };

    // Helper function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="admin-page-container">
            <Navbar />
            <div className="admin-content-wrapper">
                <main className="admin-main">
                    {/* Post New Announcement Section */}
                    <section className="notice-creator-card">
                        <div className="card-header-with-icon">
                            <div className="megaphone-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2AB1C5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                            </div>
                            <h3>Post New Announcement</h3>
                            <span className="draft-status">Draft saved 2m ago</span>
                        </div>
                        <form className="notice-form" onSubmit={handlePublishNotice}>
                            {error && (
                                <div style={{
                                    backgroundColor: '#fff5f5',
                                    border: '1px solid #feb2b2',
                                    color: '#c53030',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    marginBottom: '16px',
                                    fontSize: '0.9rem'
                                }}>
                                    {error}
                                </div>
                            )}
                            <input
                                type="text"
                                placeholder="Notice Headline (e.g., Q3 Town Hall Meeting)"
                                className="headline-input"
                                value={noticeHeadline}
                                onChange={(e) => setNoticeHeadline(e.target.value)}
                                required
                            />
                            <textarea
                                placeholder="Write the content of your notice here..."
                                className="content-textarea"
                                value={noticeContent}
                                onChange={(e) => setNoticeContent(e.target.value)}
                                required
                            />
                            <div className="form-footer">
                                <div className="form-tools-left">
                                    <div className="priority-selector">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                                        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                            <option value="High">Priority: High</option>
                                            <option value="Medium">Priority: Medium</option>
                                            <option value="Low">Priority: Low</option>
                                        </select>
                                    </div>
                                    <button type="button" className="tool-btn">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                                        Attach Files
                                    </button>
                                    <button type="button" className="tool-btn">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                        Schedule
                                    </button>
                                </div>
                                <div className="form-actions-right">
                                    <button type="button" className="discard-btn" onClick={() => { setNoticeHeadline(''); setNoticeContent(''); setError(''); }}>Discard</button>
                                    <button type="submit" className="publish-btn" disabled={loading}>
                                        {loading ? 'Publishing...' : 'Publish Notice'}
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </section>

                    {/* Active Notice Board Section */}
                    <section className="notice-board">
                        <div className="section-header-row">
                            <h3>Active Notice Board</h3>
                            <div className="filter-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                            </div>
                        </div>
                        <div className="notice-list">
                            {notices.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '40px', color: '#a0aec0' }}>
                                    <p>No notices yet. Create your first announcement!</p>
                                </div>
                            ) : (
                                notices.map(notice => (
                                    <div key={notice.id} className="notice-card">
                                        <div className="priority-line medium"></div>
                                        <div className="notice-card-content">
                                            <div className="notice-meta">
                                                <span className="priority-tag medium">ANNOUNCEMENT</span>
                                                <span className="posted-time">Posted {formatDate(notice.created_at)}</span>
                                            </div>
                                            <h4>{notice.title}</h4>
                                            <p>{notice.content}</p>
                                            <div className="view-footer">
                                                <div className="viewers">
                                                    <div className="avatar-stack">
                                                        <div className="small-avatar">JD</div>
                                                        <div className="small-avatar">AS</div>
                                                    </div>
                                                    <span>Visible to all employees</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                </main>

                <aside className="admin-sidebar">
                    {/* Overview Card */}
                    <div className="sidebar-card overview-card">
                        <h3>Overview</h3>
                        <div className="stats-grid">
                            <div className="stat-box">
                                <span className="stat-value">12</span>
                                <span className="stat-label">ACTIVE NOTICES</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-value">3</span>
                                <span className="stat-label">NEW FEEDBACK</span>
                            </div>
                        </div>
                    </div>

                    {/* Suggestion Hub Card */}
                    <div className="sidebar-card suggestion-hub">
                        <div className="card-header">
                            <div className="header-left">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2AB1C5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                <h3>Suggestion Hub</h3>
                            </div>
                            <span className="badge">3 NEW</span>
                        </div>
                        <div className="suggestion-list">
                            {suggestions.map(s => (
                                <div key={s.id} className="suggestion-item">
                                    <div className="item-meta">
                                        <span className="item-id">#{s.id}</span>
                                        <span className="item-time">{s.time}</span>
                                    </div>
                                    <p className="suggestion-text">"{s.text}"</p>
                                    {s.status === 'new' ? (
                                        <div className="item-actions">
                                            <button className="review-btn">Review</button>
                                            <button className="more-btn">...</button>
                                        </div>
                                    ) : (
                                        <div className="item-status">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#48BB78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            <span>Marked as Reviewed</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button className="view-all-btn">VIEW ALL FEEDBACK</button>
                    </div>

                    {/* Admin Controls Card */}
                    <div className="sidebar-card admin-controls">
                        <h3>ADMIN CONTROLS</h3>
                        <div className="control-list">
                            <div className="control-item">
                                <div className="control-left">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                                    <span>Analytics</span>
                                </div>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                            <div className="control-item">
                                <div className="control-left">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                                    <span>Board Settings</span>
                                </div>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                            <div className="control-item">
                                <div className="control-left">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    <span>Permissions</span>
                                </div>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default AdminPage;
