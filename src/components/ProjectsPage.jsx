import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import api from '../api';
import './ProjectsPage.css';

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProject, setNewProject] = useState({
        name: '',
        description: '',
        status: 'planning',
        discord_invite_link: ''
    });
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await api.get('/projects/');
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
            // Fallback for demo if backend not ready
            setProjects([
                {
                    id: 1,
                    name: "Project Nova",
                    description: "Developing a next-gen AI assistant for code refactoring.",
                    status: "in_progress",
                    created_at: new Date().toISOString()
                },
                {
                    id: 2,
                    name: "Atlas API",
                    description: "Internal geolocation service for logistics.",
                    status: "planning",
                    created_at: new Date(Date.now() - 86400000).toISOString()
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();
        setCreating(true);
        try {
            const response = await api.post('/projects/create/', newProject);
            setProjects([response.data, ...projects]);
            setIsModalOpen(false);
            setNewProject({ name: '', description: '', status: 'planning', discord_invite_link: '' });
            alert('Project created successfully!');
        } catch (error) {
            console.error("Error creating project:", error);
            alert('Failed to create project.');
            // Fallback mock
            const mockProject = { ...newProject, id: Date.now(), created_at: new Date().toISOString() };
            setProjects([mockProject, ...projects]);
            setIsModalOpen(false);
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="projects-page">
            <Navbar />
            <div className="projects-container">
                <div className="projects-header">
                    <div>
                        <h2>Projects</h2>
                        <p>Manage and track all ongoing initiatives</p>
                    </div>
                    <button className="btn-new-project" onClick={() => setIsModalOpen(true)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        New Project
                    </button>
                </div>

                {loading ? (
                    <div className="loading-state">Loading projects...</div>
                ) : (
                    <div className="projects-grid">
                        {projects.length === 0 ? (
                            <div className="empty-state">No projects found. Create one to get started!</div>
                        ) : (
                            projects.map(project => (
                                <div key={project.id} className="project-card">
                                    <div className="project-card-header">
                                        <div className="project-icon">
                                            {project.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className={`project-status status-${project.status}`}>
                                            {project.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                    <h3 className="project-title">{project.name}</h3>
                                    <p className="project-description">{project.description}</p>

                                    <div className="project-meta">
                                        <div className="project-members">
                                            {/* Mock members for UI */}
                                            <span className="member-avatar"></span>
                                            <span className="member-avatar"></span>
                                            <span className="member-avatar"></span>
                                        </div>
                                        <div className="project-links">
                                            <button className="link-icon">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                                            </button>
                                            {project.discord_invite_link && (
                                                <a href={project.discord_invite_link} target="_blank" rel="noopener noreferrer" className="link-icon">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" /></svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Create Project Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Create New Project</h3>
                            <button className="btn-close" onClick={() => setIsModalOpen(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleCreateProject}>
                            <div className="form-group-project">
                                <label>Project Name</label>
                                <input
                                    type="text"
                                    className="input-project"
                                    placeholder="e.g. Project Apollo"
                                    value={newProject.name}
                                    onChange={e => setNewProject({ ...newProject, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group-project">
                                <label>Description</label>
                                <textarea
                                    className="textarea-project"
                                    placeholder="What is this project about?"
                                    value={newProject.description}
                                    onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group-project">
                                <label>Status</label>
                                <select
                                    className="select-project"
                                    value={newProject.status}
                                    onChange={e => setNewProject({ ...newProject, status: e.target.value })}
                                >
                                    <option value="planning">Planning</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div className="form-group-project">
                                <label>Discord Invite Link (Optional)</label>
                                <input
                                    type="url"
                                    className="input-project"
                                    placeholder="https://discord.gg/..."
                                    value={newProject.discord_invite_link}
                                    onChange={e => setNewProject({ ...newProject, discord_invite_link: e.target.value })}
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-modal-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-modal-submit" disabled={creating}>
                                    {creating ? 'Creating...' : 'Create Project'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectsPage;
