import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import api from '../api';
import './NoticesPage.css';

const NoticesPage = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const response = await api.get('/notices/');
            setNotices(response.data);
        } catch (error) {
            console.error("Error fetching notices:", error);
            // Fallback to dummy data
            setNotices([
                {
                    id: 1,
                    title: "System Update",
                    content: "New project management tools are now live for all teams.",
                    created_at: new Date().toISOString(),
                },
                {
                    id: 2,
                    title: "Office Hours Change",
                    content: "Starting next week, office hours will be 9 AM - 6 PM.",
                    created_at: new Date(Date.now() - 86400000).toISOString(),
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

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
        <div className="notices-page">
            <Navbar />
            <div className="notices-container">
                <div className="notices-header">
                    <h1>Company Notices</h1>
                    <p>Stay updated with the latest announcements from leadership</p>
                </div>

                {loading ? (
                    <div className="notices-loading">
                        <p>Loading notices...</p>
                    </div>
                ) : notices.length === 0 ? (
                    <div className="notices-empty">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#cbd5e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                        </svg>
                        <h3>No notices yet</h3>
                        <p>Check back later for updates from your team</p>
                    </div>
                ) : (
                    <div className="notices-list">
                        {notices.map((notice, index) => (
                            <div key={notice.id} className={`notice-item ${index === 0 ? 'latest' : ''}`}>
                                <div className="notice-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                                    </svg>
                                </div>
                                <div className="notice-content">
                                    <div className="notice-header-row">
                                        <h3>{notice.title}</h3>
                                        <span className="notice-time">{formatDate(notice.created_at)}</span>
                                    </div>
                                    <p>{notice.content}</p>
                                    {index === 0 && <span className="new-badge">NEW</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NoticesPage;
