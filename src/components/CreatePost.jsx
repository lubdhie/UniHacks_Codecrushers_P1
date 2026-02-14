import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import api from '../api';
import './CreatePost.css';

const CreatePost = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'blog',
        visibility: 'public'
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        title: false,
        content: false
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: false
            });
        }
    };

    const handlePublish = async () => {
        const newErrors = {
            title: !formData.title.trim(),
            content: !formData.content.trim()
        };

        if (newErrors.title || newErrors.content) {
            setErrors(newErrors);
            alert('Please fill in both title and content.');
            return;
        }

        setLoading(true);
        try {
            await api.post('/posts/', {
                title: formData.title,
                content: formData.content,
                category: formData.category
            });
            alert('Post published successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error publishing post:', error);
            alert('Failed to publish post. Please make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const wordCount = formData.content.trim().split(/\s+/).filter(word => word !== '').length;

    return (
        <div className="create-post-page">
            <Navbar />
            <div className="create-post-container">
                <div className="create-post-header">
                    <h2>Create New Post</h2>
                    <p>Share your technical vision with the global startup ecosystem.</p>
                </div>

                <div className="create-post-card">
                    <div className="card-top-bar">
                        <div className="form-field">
                            <label>Category & Tags</label>
                            <div className="select-wrapper">
                                <select name="category" value={formData.category} onChange={handleChange}>
                                    <option value="blog">Blog</option>
                                    <option value="general">General</option>
                                    <option value="engineering">Engineering</option>
                                    <option value="announcement">Announcement</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-field">
                            <label>Visibility</label>
                            <div className="select-wrapper">
                                <select name="visibility" value={formData.visibility} onChange={handleChange}>
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                    <option value="team">My Team</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="card-content">
                        <input
                            type="text"
                            name="title"
                            className={`title-input ${errors.title ? 'error' : ''}`}
                            placeholder="Enter a catchy headline..."
                            value={formData.title}
                            onChange={handleChange}
                        />
                        <textarea
                            name="content"
                            className={`content-textarea ${errors.content ? 'error' : ''}`}
                            placeholder="Write your thoughts, technical insights, or company updates here..."
                            value={formData.content}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="card-bottom-bar">
                        <div className="rich-tools">
                            <button className="tool-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                            </button>
                            <button className="tool-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                            </button>
                            <button className="tool-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                            </button>
                            <span className="word-count">{wordCount} words</span>
                        </div>
                        <div className="action-btns">
                            <button className="btn-ai">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>
                                AI Persona
                            </button>
                            <button className="btn-publish" onClick={handlePublish} disabled={loading}>
                                {loading ? 'Publishing...' : 'Publish Post'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="info-cards">
                    <div className="info-card">
                        <div className="info-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        </div>
                        <div className="info-text">
                            <h4>Be Concise</h4>
                            <p>Tech readers prefer data-driven insights over fluff.</p>
                        </div>
                    </div>
                    <div className="info-card">
                        <div className="info-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        </div>
                        <div className="info-text">
                            <h4>Tag Experts</h4>
                            <p>Mention relevant builders to increase reach.</p>
                        </div>
                    </div>
                    <div className="info-card">
                        <div className="info-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                        </div>
                        <div className="info-text">
                            <h4>Use AI</h4>
                            <p>Let our AI refine your technical explanations.</p>
                        </div>
                    </div>
                </div>

                <footer className="create-post-footer">
                    <div className="footer-icons">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                    </div>
                    <p className="footer-copy">© 2024 TechStartup Inc. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default CreatePost;
