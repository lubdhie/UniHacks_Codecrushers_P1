
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import api from '../api';
import './EditProfile.css';

const EditProfile = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name: '',
        job_title: '',
        location: '',
        bio: '',
        website: '',
        profile_picture: '',
        cover_image: '',
        is_visible: true
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch current user profile
                const meRes = await api.get('/users/me/');
                const user = meRes.data;
                if (user) {
                    setUserId(user.id);
                    setFormData({
                        full_name: user.full_name || '',
                        job_title: user.job_title || '',
                        location: user.location || '',
                        bio: user.bio || '',
                        website: user.website || '',
                        profile_picture: user.profile_picture || '',
                        cover_image: user.cover_image || '',
                        is_visible: user.is_visible !== false
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!userId) return;

        setSaving(true);
        try {
            await api.patch(`/users/${userId}/`, formData);
            alert('Profile updated successfully!');
            navigate('/profile');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please check if backend is migrated.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="loading">Loading Profile Data...</div>;

    return (
        <div className="edit-profile-page">
            <Navbar />
            <div className="edit-profile-container">
                <div className="edit-header">
                    <h2>Edit Profile</h2>
                    <p>Manage your public presence and professional identity.</p>
                </div>

                <div className="edit-profile-card">
                    <form className="edit-form" onSubmit={handleSave}>
                        <div className="form-row">
                            <div className="edit-form-group">
                                <label>Profile Picture URL</label>
                                <input
                                    type="url"
                                    name="profile_picture"
                                    className="edit-input"
                                    placeholder="https://example.com/photo.jpg"
                                    value={formData.profile_picture}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="edit-form-group">
                                <label>Cover Image URL</label>
                                <input
                                    type="url"
                                    name="cover_image"
                                    className="edit-input"
                                    placeholder="https://example.com/cover.jpg"
                                    value={formData.cover_image}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="edit-form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="full_name"
                                    className="edit-input"
                                    placeholder="Alexander Sterling"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="edit-form-group">
                                <label>Role / Title</label>
                                <input
                                    type="text"
                                    name="job_title"
                                    className="edit-input"
                                    placeholder="Lead Product Architect"
                                    value={formData.job_title}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="edit-form-group">
                            <label>Bio</label>
                            <textarea
                                name="bio"
                                className="edit-textarea"
                                placeholder="Tell us about your technical expertise..."
                                value={formData.bio}
                                onChange={handleChange}
                                maxLength={200}
                            ></textarea>
                            <span style={{ fontSize: '0.75rem', color: '#a0aec0', textAlign: 'right' }}>
                                {formData.bio.length} / 200
                            </span>
                        </div>

                        <div className="form-row">
                            <div className="edit-form-group">
                                <label>Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    className="edit-input"
                                    placeholder="San Francisco, CA"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="edit-form-group">
                                <label>Website / Social Link</label>
                                <input
                                    type="url"
                                    name="website"
                                    className="edit-input"
                                    placeholder="https://alexsterling.design"
                                    value={formData.website}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="visibility-section">
                            <div className="visibility-info">
                                <h4>Profile Visibility</h4>
                                <p>Your profile is currently {formData.is_visible ? 'public and discoverable' : 'private'}.</p>
                            </div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    name="is_visible"
                                    checked={formData.is_visible}
                                    onChange={handleChange}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="btn-cancel"
                                onClick={() => navigate('/profile')}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn-save"
                                disabled={saving}
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
