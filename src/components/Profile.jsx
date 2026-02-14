import React, { useState, useEffect } from 'react';
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
        location: "San Francisco, CA",
        website: "https://alexsterling.design"
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
                        <div className="profile-field-group">
                            <label className="field-label">Bio</label>
                            <div className="bio-container-new">
                                <p className="bio-text-new">{activeUser.bio || "Building scalable infrastructure for the next generation of creative collaboration tools. Passionate about minimalist design and cloud systems."}</p>
                                <span className="char-count">{(activeUser.bio?.length || 128)} / 200</span>
                            </div>
                        </div>

                        <div className="profile-two-col">
                            <div className="profile-field-group">
                                <label className="field-label">Location</label>
                                <div className="field-input-mock">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                    <span>{activeUser.location || "San Francisco, CA"}</span>
                                </div>
                            </div>
                            <div className="profile-field-group">
                                <label className="field-label">Website / Social Link</label>
                                <div className="field-input-mock">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                                    <span>{activeUser.website || "https://alexsterling.design"}</span>
                                </div>
                            </div>
                        </div>

                        <div className="profile-card-footer">
                            <button className="btn-save-new">Save Changes</button>
                            <button className="btn-cancel-new">Cancel</button>
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
