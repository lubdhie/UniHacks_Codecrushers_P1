import React from 'react';
import './ProjectList.css';

const ProjectList = ({ projects }) => {
    // Default projects for demonstration if none provided
    const defaultProjects = [
        { id: "P1", title: "Project Nova", color: "#f97316", progress: "80%" },
        { id: "A2", title: "Atlas API", color: "#3b82f6", progress: "55%" },
        { id: "S3", title: "Synergy SDK", color: "#10b981", progress: "40%" },
    ];

    const displayProjects = projects || defaultProjects;

    return (
        <div className="project-list-card">
            <h4 className="sidebar-title">CURRENT PROJECTS</h4>
            <div className="projects-container">
                {displayProjects.map((project, index) => (
                    <div key={project.id || index} className="project-row">
                        <div className="project-indicator" style={{ backgroundColor: project.color }}>
                            {project.id || 'P1'}
                        </div>
                        <div className="project-details">
                            <span className="project-title">{project.title}</span>
                            <div className="project-progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: project.progress, backgroundColor: project.color }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="view-all-projects-btn">View All Projects</button>
        </div>
    );
};

export default ProjectList;
