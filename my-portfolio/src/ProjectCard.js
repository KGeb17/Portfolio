import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{project.title}</h3>
      <p style={styles.role}><strong>Role:</strong> {project.role}</p>
      <p style={styles.text}>{project.description}</p>
      
      <div style={styles.impactBox}>
        <strong>Business Impact:</strong> {project.impact}
      </div>

      <div style={styles.techStack}>
        {project.tech.map(t => <span key={t} style={styles.badge}>{t}</span>)}
      </div>

      <a href={project.link} style={styles.button}>View Case Study & Code</a>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: '#111827',
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
  },
  title: { color: '#f8fafc', marginTop: '0' },
  impactBox: {
    backgroundColor: '#1e293b',
    padding: '10px',
    borderRadius: '4px',
    margin: '15px 0',
    borderLeft: '4px solid #60a5fa',
    color: '#e2e8f0'
  },
  role: { color: '#bfdbfe' },
  text: { color: '#d1d5db' },
  techStack: { marginTop: '12px' },
  badge: {
    backgroundColor: '#1f2937',
    color: '#cbd5e1',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '0.85rem',
    marginRight: '8px',
    display: 'inline-block',
    marginBottom: '8px'
  },
  button: {
    display: 'inline-block',
    marginTop: '10px',
    color: '#93c5fd',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};

export default ProjectCard;
