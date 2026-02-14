import React from 'react';
import './AboutCard.css';

const AboutCard = ({ bio, skills }) => {
    // Default values if none provided
    const defaultBio = "Passionate about building scalable cloud architectures and mentoring the next generation of engineers. Expert in React, Go, and Kubernetes. Currently leading the core architecture team at TechStartup, focusing on high-performance distributed systems and developer experience.";
    const defaultSkills = ["CloudArchitecture", "React", "GoLang", "Kubernetes"];

    const displayBio = bio || defaultBio;
    const skillList = skills ? skills.split(',').map(s => s.trim()) : defaultSkills;

    return (
        <div className="about-card">
            <div className="card-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <h3>About</h3>
            </div>
            <p className="about-text">{displayBio}</p>
            <div className="tags-container">
                {skillList.map((skill, index) => (
                    <span key={index} className="skill-tag">#{skill}</span>
                ))}
            </div>
        </div>
    );
};

export default AboutCard;
