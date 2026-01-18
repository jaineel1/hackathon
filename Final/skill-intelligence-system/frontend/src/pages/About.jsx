import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function About() {
    const { user } = useAuth();

    return (
        <div className="container animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1rem' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="heading" style={{ fontSize: '3rem', marginBottom: '1rem' }}>About JobWeMet</h1>
                <p className="text-secondary" style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
                    Bridging the gap between academic learning and industry demands through <strong style={{ color: 'var(--brand-primary)' }}>Data-Driven Intelligence</strong>.
                </p>
            </div>

            {/* Mission Section */}
            <section style={{ marginBottom: '4rem' }}>
                <h2 className="heading" style={{ fontSize: '1.8rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                    🚀 Our Mission
                </h2>
                <p className="text-secondary" style={{ marginBottom: '1rem' }}>
                    The modern job market works on <strong>Skills, not just Degrees</strong>. Yet, students often graduate without knowing exactly what skills specific roles require aka The "Skill Gap".
                </p>
                <p className="text-secondary">
                    <strong>JobWeMet</strong> is a holistic system designed to demystify career readiness. We don't just list jobs; we analyze your profile, calculate your "Readiness Score", and provide a concrete roadmap to 100%.
                </p>
            </section>

            {/* Features Grid */}
            <section style={{ marginBottom: '4rem' }}>
                <h2 className="heading" style={{ fontSize: '1.8rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                    ✨ Key Features
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                    <div className="card">
                        <h3 style={{ color: 'var(--brand-primary)', marginBottom: '0.5rem' }}>🧠 Intelligence Engine</h3>
                        <p className="text-secondary text-sm">
                            Our backend algorithms map your skills (rated 1-5) against standardized job requirements (O*NET taxonomy) to calculate precise readiness scores.
                        </p>
                    </div>

                    <div className="card">
                        <h3 style={{ color: 'var(--brand-secondary)', marginBottom: '0.5rem' }}>⚡ Impact Simulator</h3>
                        <p className="text-secondary text-sm">
                            "What if I learn React?" Our simulation engine instantly recalculates your job fit, showing you the ROI of learning a new skill before you even start.
                        </p>
                    </div>

                    <div className="card">
                        <h3 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>🛠 Projects Hub</h3>
                        <p className="text-secondary text-sm">
                            Theory isn't enough. We recommend real-world <strong>GitHub Projects</strong> (e.g., IoT Systems, Traffic Predictors) tailored to your current skill level.
                        </p>
                    </div>

                    <div className="card">
                        <h3 style={{ color: '#10b981', marginBottom: '0.5rem' }}>📚 Learning Hub</h3>
                        <p className="text-secondary text-sm">
                            Curated resources from top providers like Coursera and Udemy, directly linked to the specific "Gap Skills" you need to improve.
                        </p>
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section style={{ marginBottom: '4rem', background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '12px' }}>
                <h2 className="heading" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Built With Modern Tech</h2>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                    <li>🐍 <strong>Python (FastAPI)</strong></li>
                    <li>🗄 <strong>SQLAlchemy (SQLite)</strong></li>
                    <li>⚛️ <strong>React.js (Vite)</strong></li>
                    <li>🤖 <strong>Pydantic AI Agents</strong></li>
                    <li>🔥 <strong>Firebase Auth</strong></li>
                </ul>
            </section>

            <div style={{ textAlign: 'center' }}>
                <Link to={user ? "/profile" : "/login"} className="btn btn-primary" style={{ padding: '0.75rem 3rem', fontSize: '1.1rem' }}>
                    {user ? "Go to Profile" : "Start Your Journey"}
                </Link>
            </div>
        </div>
    );
}
