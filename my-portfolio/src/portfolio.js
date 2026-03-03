import React from "react";
import { Link, Element } from "react-scroll";
import { projects } from "./projects";
import ProjectCard from "./ProjectCard";

const navItems = ["home", "about", "experience", "projects", "contact"];

const Portfolio = () => {
  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        {navItems.map((item) => (
          <Link key={item} to={item} smooth duration={500} offset={-80} style={styles.navLink}>
            {item[0].toUpperCase() + item.slice(1)}
          </Link>
        ))}
      </nav>

      <Element name="home">
        <section style={styles.hero}>
          <div style={styles.circle}>
            <img src="/assets/profile.jpg" alt="Profile" style={styles.profileImg} />
          </div>
          <div style={styles.heroText}>
            <h1 style={styles.name}>Kalkidan A. Gebrehiwot</h1>
            <p style={styles.tagline}>Industrial Engineer | MSME Candidate | Content Strategist | Bridging Financial Literacy & Global Operations</p>
            <p style={styles.subTagline}>
              I build operational and analytics solutions that make teams faster, smarter, and
              more reliable.
            </p>
          </div>
        </section>
      </Element>

      <Element name="about">
        <section style={styles.section}>
          <h2 style={styles.header}>About</h2>
          <p style={styles.paragraph}>
            <b> From supply chains to data science.</b>

<p> I spent years leading 60+ person teams and driving lean projects at Amazon. Along the way, I saved over $300k in inventory revenue while maintaining a 97% team retention rate by uncovering the stories hidden in data.

I realized that the most profitable business decisions are often tucked away in datasets most people never look at. Now, I’m on a mission to bridge the gap between complex data manipulation and tangible business results. </p>

<b> My Toolkit: SQL · Python · Power BI · R · Machine Learning </b>
<b> What Defines My Work: </b>
<b> Translating Complexity: Breaking down dense data concepts into simple, visual, and actionable business explanations.</b>
<b> Technical Application: Applying SQL and Python to solve high-stakes, real-world operational problems.</b>
<b>Advocacy: Supporting Women in Tech and international students in STEM to build a more inclusive technical landscape.</b>
          </p>
          <a href="/assets/Sinny_Ye_Resume_.pdf" download style={styles.resumeBtn}>
            Download Resume
          </a>
        </section>
      </Element>

      <Element name="experience">
        <section style={styles.section}>
          <h2 style={styles.header}>Experience</h2>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Amazon</h3>
            <p style={styles.role}>
              <strong>Operations Lead</strong>
            </p>
            <ul style={styles.list}>
              <li>Managed resource planning for high-volume throughput operations.</li>
              <li>Used SQL and Python to identify enterprise technology needs.</li>
              <li>Partnered with cross-functional stakeholders to improve planning accuracy.</li>
            </ul>
          </div>
        </section>
      </Element>

      <Element name="projects">
        <section style={styles.section}>
          <h2 style={styles.header}>Projects</h2>
          <div style={styles.projectsGrid}>
            {projects.map((project, index) => (
              <ProjectCard key={`${project.title}-${index}`} project={project} />
            ))}
          </div>
        </section>
      </Element>

      <Element name="contact">
        <section style={styles.section}>
          <h2 style={styles.header}>Contact</h2>
          <p style={styles.paragraph}>
            If you are hiring for strategy, analytics, or operations roles, I would love to
            connect.
          </p>
          <div style={styles.contactLinks}>
            <a href="mailto:kalkidan@example.com" style={styles.contactLink}>
              Email
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" style={styles.contactLink}>
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" style={styles.contactLink}>
              GitHub
            </a>
          </div>
        </section>
      </Element>
    </div>
  );
};

const styles = {
  container: {
    background: "linear-gradient(180deg, #0b0d12 0%, #0f141d 100%)",
    color: "#f4f7fb",
    minHeight: "100vh",
  },
  nav: {
    position: "sticky",
    top: 0,
    backgroundColor: "rgba(11, 13, 18, 0.9)",
    backdropFilter: "blur(8px)",
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    padding: "16px 6%",
    zIndex: 1000,
    borderBottom: "1px solid #1f2937",
  },
  navLink: {
    cursor: "pointer",
    color: "#e2e8f0",
    textDecoration: "none",
    fontSize: "1.05rem",
    fontWeight: 700,
    letterSpacing: "0.4px",
    textTransform: "uppercase",
    border: "1px solid #334155",
    borderRadius: "999px",
    padding: "8px 14px",
    backgroundColor: "rgba(30, 41, 59, 0.45)",
    transition: "all 0.2s ease",
  },
  hero: {
    minHeight: "calc(100vh - 76px)",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "36px",
    padding: "40px 8%",
  },
  heroText: {
    maxWidth: "560px",
    textAlign: "left",
  },
  circle: {
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    overflow: "hidden",
    boxShadow: "0 0 24px rgba(96, 165, 250, 0.2)",
    border: "2px solid #243244",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  profileImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  name: {
    fontSize: "clamp(1.9rem, 4vw, 3rem)",
    marginBottom: "6px",
  },
  tagline: {
    fontSize: "1.05rem",
    color: "#93c5fd",
    marginBottom: "10px",
  },
  subTagline: {
    color: "#cbd5e1",
    lineHeight: 1.6,
  },
  section: {
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "56px 10%",
    borderTop: "1px solid #1f2937",
  },
  header: {
    marginBottom: "18px",
    fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
    letterSpacing: "0.8px",
    textTransform: "uppercase",
  },
  paragraph: {
    maxWidth: "760px",
    color: "#d1d5db",
    lineHeight: 1.7,
    marginBottom: "20px",
  },
  resumeBtn: {
    display: "block",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    padding: "10px 16px",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: 600,
  },
  card: {
    width: "min(780px, 100%)",
    backgroundColor: "#111827",
    border: "1px solid #334155",
    borderRadius: "12px",
    padding: "22px",
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: "6px",
  },
  role: {
    marginTop: 0,
    color: "#bfdbfe",
  },
  list: {
    marginBottom: 0,
    lineHeight: 1.8,
  },
  projectsGrid: {
    width: "100%",
    maxWidth: "1000px",
  },
  contactLinks: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
  },
  contactLink: {
    color: "#93c5fd",
    textDecoration: "none",
    border: "1px solid #334155",
    padding: "8px 12px",
    borderRadius: "8px",
  },
};

export default Portfolio;
