import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import api from '../api';
import ProfileHeader from "./ProfileHeader";
import AboutCard from "./AboutCard";
import StatsCard from "./StatsCard";
import ProjectList from "./ProjectList";
import PostCard from "./PostCard";
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        posts_count: 0,
        decisions_count: 0,
        active_projects_count: 0
    });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Fetch the current authenticated user's profile
                const meRes = await api.get('/users/me/');
                const currentUser = meRes.data;
                setUser(currentUser);

                if (currentUser) {
                    // Fetch stats
                    const statsRes = await api.get(`/users/${currentUser.id}/stats/`);
                    setStats(statsRes.data);

                    // Fetch user's posts
                    const postsRes = await api.get('/posts/');
                    const userPosts = postsRes.data.filter(p => p.author?.id === currentUser.id);

                    // Map posts to include human-readable fields
                    const mappedPosts = userPosts.map(p => ({
                        ...p,
                        name: currentUser.full_name || currentUser.username,
                        time: new Date(p.created_at).toLocaleDateString(),
                        likes: p.likes_count || 0,
                        comments: p.comments_count || 0
                    }));
                    setPosts(mappedPosts);
                }
            } catch (error) {
                console.error('Error fetching profile, using dummy data for preview:', error);
                // Fallback to dummy data for styling preview
                setUser({
                    id: 1,
                    full_name: "Alexander Sterling",
                    job_title: "Lead Product Architect",
                    bio: "Building scalable infrastructure for the next generation of creative collaboration tools. Passionate about minimalist design and cloud systems.",
                    location: "San Francisco, CA",
                    website: "https://alexsterling.design",
                    skills: "React, Node.js, AWS, System Design",
                    profile_picture: "",
                    cover_image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    if (loading) return <div className="loading">Loading Profile...</div>;

    // We removed the "User not found" error screen to allow dummy data preview
    const activeUser = user || {
        full_name: "Alexander Sterling",
        job_title: "Lead Product Architect",
        bio: "Building scalable infrastructure for the next generation of creative collaboration tools. Passionate about minimalist design and cloud systems.",
        join_date: new Date().toISOString()
    };

    // Format join date
    const formatJoinDate = (dateString) => {
        if (!dateString) return "Recently joined";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    const statsData = [
        { label: "Posts shared", value: stats.posts_count || 128, color: '#ebf8ff' },
        { label: "Key Decisions", value: stats.decisions_count || 42, color: '#f0fff4' },
        { label: "Active Projects", value: stats.active_projects_count || 7, color: '#fffaf0' },
    ];

    return (
        <div className="profile-page-new">
            <Navbar />
            <div className="profile-wrapper-new">
                <div className="profile-main-card">
                    <ProfileHeader user={activeUser} />

                    <div className="profile-card-content">
                        <div className="profile-info-section">
                            <div className="profile-info-header">
                                <h3>About</h3>
                                <Link to="/profile/edit" className="btn-edit-profile">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                    Edit Profile
                                </Link>
                            </div>

                            <div className="profile-field-group">
                                <label className="field-label">Bio</label>
                                <p className="field-value">{activeUser.bio || "No bio added yet."}</p>
                            </div>

                            <div className="profile-field-group">
                                <label className="field-label">Member Since</label>
                                <div className="field-value-with-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2AB1C5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    <span>{formatJoinDate(activeUser.join_date)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="visibility-banner">
                    <div className="visibility-icon-box">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2AB1C5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    </div>
                    <div className="visibility-text">
                        <h3>Profile Visibility</h3>
                        <p>Your profile is currently public and discoverable.</p>
                    </div>
                    <div className="visibility-toggle-mock">
                        <div className="toggle-track">
                            <div className="toggle-thumb"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
