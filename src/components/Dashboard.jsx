import React from 'react';
import Navbar from './Navbar';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Navbar />
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <div className="feed-section">
                        <div className="system-banner">
                            <div className="banner-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                </svg>
                            </div>
                            <div className="banner-content">
                                <h3>System Update</h3>
                                <p>New project management tools are now live for all teams.</p>
                            </div>
                            <button className="btn-banner">View Details</button>
                        </div>

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
                            {/* Post 1 */}
                            <div className="post-card">
                                <div className="post-header">
                                    <img src="https://ui-avatars.com/api/?name=Alex+Rivers&background=random" alt="Alex Rivers" className="avatar" />
                                    <div className="post-meta">
                                        <h4>Alex Rivers</h4>
                                        <span>Senior Developer • 2 hours ago</span>
                                    </div>
                                    <button className="btn-more">•••</button>
                                </div>
                                <div className="post-body">
                                    <p>Just finished migrating our primary database to the new architecture. We're seeing a 40% improvement in query latency. Check out the documentation in the Engineering folder! 🚀</p>
                                </div>
                                <div className="post-actions">
                                    <button className="action-btn">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                        24
                                    </button>
                                    <button className="action-btn">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                        8
                                    </button>
                                    <div className="spacer"></div>
                                    <button className="action-btn">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                                    </button>
                                </div>
                            </div>

                            {/* Post 2 */}
                            <div className="post-card">
                                <div className="post-header">
                                    <div className="avatar-group-icon">M</div>
                                    <div className="post-meta">
                                        <h4>Marketing Team</h4>
                                        <span>Announcement • 5 hours ago</span>
                                    </div>
                                </div>
                                <div className="post-body">
                                    <p>Sneak peek at our new brand identity guidelines! We're leaning into the Cyan/Teal vibes more than ever. What do you think?</p>
                                    <div className="post-media-placeholder">
                                        <span>NEW BRAND</span>
                                    </div>
                                </div>
                                <div className="post-actions">
                                    <button className="action-btn">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                        156
                                    </button>
                                    <button className="action-btn">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                        42
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sidebar-section">
                        <div className="sidebar-widget suggestion-box">
                            <div className="widget-header">
                                <span className="widget-icon">💡</span>
                                <h4>Suggestion Box</h4>
                            </div>
                            <p>Share your thoughts anonymously with the leadership team.</p>
                            <textarea placeholder="What's on your mind? (Anonymous)"></textarea>
                            <button className="btn-orange">Send Anonymously</button>
                        </div>

                        <div className="sidebar-widget trending-widget">
                            <h4>Trending in Tech</h4>
                            <div className="trending-item">
                                <span className="tag">PRODUCTIVITY</span>
                                <h5>How to master the new project tools</h5>
                                <span>12 posts today</span>
                            </div>
                            <div className="trending-item">
                                <span className="tag">ENGINEERING</span>
                                <h5>Architecture review: Q4 updates</h5>
                                <span>8 posts today</span>
                            </div>
                            <div className="trending-item">
                                <span className="tag">EVENTS</span>
                                <h5>Virtual Town Hall - This Friday</h5>
                                <span>Announcement</span>
                            </div>
                        </div>

                        <div className="sidebar-widget colleagues-widget">
                            <h4>Active Colleagues</h4>
                            <div className="avatar-group">
                                <img src="https://ui-avatars.com/api/?name=User+A&background=random" />
                                <img src="https://ui-avatars.com/api/?name=User+B&background=random" />
                                <img src="https://ui-avatars.com/api/?name=User+C&background=random" />
                                <div className="avatar-more">+12</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
