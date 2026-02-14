import React, { useState, useEffect } from 'react';
import api from '../api';
import './NoticeBoard.css';

const NoticeBoard = () => {
    const [latestNotice, setLatestNotice] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLatestNotice();
    }, []);

    const fetchLatestNotice = async () => {
        try {
            const response = await api.get('/notices/latest/');
            if (response.data && !response.data.message) {
                setLatestNotice(response.data);
            }
        } catch (error) {
            console.error("Error fetching latest notice:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="notice-board-widget">
                <div className="notice-header">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff7e33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                    </svg>
                    <h3>System Update</h3>
                </div>
                <p className="notice-loading">Loading...</p>
            </div>
        );
    }

    if (!latestNotice) {
        return null; // Don't show anything if no notice
    }

    return (
        <div className="notice-board-widget">
            <div className="notice-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff7e33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
                <h3>{latestNotice.title}</h3>
            </div>
            <p className="notice-content">{latestNotice.content}</p>
            <button className="view-details-btn">View Details</button>
        </div>
    );
};

export default NoticeBoard;
