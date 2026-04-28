import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

const INIT_PROJECTS = [
  { id: 1, userId: 2, title: 'AI Chatbot', desc: 'A conversational AI using NLP techniques and transformer models.', tech: ['Python', 'TensorFlow', 'Flask'], status: 'In Progress', progress: 65, category: 'AI/ML', likes: 12, views: 89, media: [], createdAt: '2024-01-10', thumbnail: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=80' },
  { id: 2, userId: 2, title: 'E-Commerce App', desc: 'Full-stack shopping platform with React and Node.js backend.', tech: ['React', 'Node.js', 'MongoDB'], status: 'Completed', progress: 100, category: 'Web Dev', likes: 24, views: 156, media: [], createdAt: '2024-02-05', thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80' },
  { id: 3, userId: 3, title: 'Data Dashboard', desc: 'Interactive analytics dashboard for visualizing large datasets.', tech: ['Python', 'Pandas', 'Plotly'], status: 'In Progress', progress: 40, category: 'Data Science', likes: 8, views: 45, media: [], createdAt: '2024-03-01', thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80' },
];

const INIT_MILESTONES = [
  { id: 1, projectId: 1, title: 'Research & Planning', desc: 'Literature review and architecture design', completed: true, dueDate: '2024-01-20' },
  { id: 2, projectId: 1, title: 'Model Training', desc: 'Train NLP model on dataset', completed: true, dueDate: '2024-02-15' },
  { id: 3, projectId: 1, title: 'API Development', desc: 'Build Flask REST API', completed: false, dueDate: '2024-03-10' },
  { id: 4, projectId: 1, title: 'Frontend Integration', desc: 'Connect UI with backend', completed: false, dueDate: '2024-04-01' },
  { id: 5, projectId: 2, title: 'UI Design', desc: 'Figma mockups and design system', completed: true, dueDate: '2024-02-10' },
  { id: 6, projectId: 2, title: 'Backend API', desc: 'REST API with authentication', completed: true, dueDate: '2024-02-25' },
  { id: 7, projectId: 2, title: 'Deployment', desc: 'Deploy to AWS', completed: true, dueDate: '2024-03-05' },
];

const INIT_FEEDBACK = [
  { id: 1, projectId: 1, adminId: 1, adminName: 'Admin Teacher', text: 'Great progress on the NLP model! Consider adding more training data for better accuracy.', rating: 4, createdAt: '2024-02-20' },
  { id: 2, projectId: 2, adminId: 1, adminName: 'Admin Teacher', text: 'Excellent work! The UI is clean and the backend is well-structured. Ready for deployment review.', rating: 5, createdAt: '2024-03-06' },
];

const INIT_PORTFOLIOS = [
  { id: 1, userId: 2, bio: 'Passionate CS student specializing in AI and web development. Love building impactful solutions.', skills: ['React', 'Python', 'TensorFlow', 'Node.js', 'MongoDB'], github: 'github.com/alice', linkedin: 'linkedin.com/in/alice', website: 'alice.dev', isPublic: true },
  { id: 2, userId: 3, bio: 'Data science enthusiast with a focus on visualization and machine learning pipelines.', skills: ['Python', 'Pandas', 'SQL', 'Tableau', 'Scikit-learn'], github: 'github.com/bob', linkedin: 'linkedin.com/in/bob', website: '', isPublic: true },
];

export function DataProvider({ children }) {
  const [projects, setProjects] = useState(INIT_PROJECTS);
  const [milestones, setMilestones] = useState(INIT_MILESTONES);
  const [feedback, setFeedback] = useState(INIT_FEEDBACK);
  const [portfolios, setPortfolios] = useState(INIT_PORTFOLIOS);

  const addProject = (proj) => setProjects(prev => [...prev, { ...proj, id: Date.now(), likes: 0, views: 0, media: [], createdAt: new Date().toISOString().split('T')[0] }]);
  const updateProject = (id, data) => setProjects(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  const deleteProject = (id) => setProjects(prev => prev.filter(p => p.id !== id));

  const addMilestone = (ms) => setMilestones(prev => [...prev, { ...ms, id: Date.now() }]);
  const toggleMilestone = (id) => setMilestones(prev => prev.map(m => m.id === id ? { ...m, completed: !m.completed } : m));
  const deleteMilestone = (id) => setMilestones(prev => prev.filter(m => m.id !== id));

  const addFeedback = (fb) => setFeedback(prev => [...prev, { ...fb, id: Date.now(), createdAt: new Date().toISOString().split('T')[0] }]);

  const savePortfolio = (userId, data) => {
    const exists = portfolios.find(p => p.userId === userId);
    if (exists) setPortfolios(prev => prev.map(p => p.userId === userId ? { ...p, ...data } : p));
    else setPortfolios(prev => [...prev, { ...data, id: Date.now(), userId }]);
  };

  const likeProject = (id) => setProjects(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));

  return (
    <DataContext.Provider value={{ projects, milestones, feedback, portfolios, addProject, updateProject, deleteProject, addMilestone, toggleMilestone, deleteMilestone, addFeedback, savePortfolio, likeProject }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
