import React from 'react';
import './ProfileHeader.css';

const ProfileHeader = ({ user }) => {
    return (
        <header className="profile-header-new">
            <div className="cover-section-new">
                <img
                    src={user?.cover_image || "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"}
                    alt="Cover"
                    className="cover-img-new"
                />
            </div>
            <div className="profile-identity-section">
                <div className="avatar-wrapper-new">
                    <img
                        src={user?.profile_picture || `https://ui-avatars.com/api/?name=${user?.full_name || 'User'}&background=random&size=150`}
                        alt="Avatar"
                        className="main-avatar-new"
                    />
                    <div className="avatar-edit-icon">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </div>
                </div>

                <div className="upload-avatar-link">Upload New Avatar</div>

                <div className="user-info-new">
                    <h1>{user?.full_name || "Alexander Sterling"}</h1>
                    <p className="user-role-new">{user?.job_title || "Lead Product Architect"}</p>
                </div>
            </div>
        </header>
    );
};

export default ProfileHeader;
