# Holistic Skill Intelligence Platform

## Problem Statement
Problem Statement 3 – Holistic Academic and Professional Skill Intelligence System for Emerging Sectors

---

## Overview
Students and early-career professionals often struggle to understand how their academic performance, projects, and practical skills align with real-world industry requirements. Existing platforms focus on isolated indicators such as grades, certifications, or resumes, without providing integrated insights or actionable guidance for future growth.

This project presents a Holistic Skill Intelligence Platform that continuously captures, organizes, and analyzes a user’s academic and professional journey. The system identifies skill gaps, estimates career readiness, recommends personalized learning paths, and visualizes progression for emerging sectors such as Healthcare Technology, Agricultural Technology, and Smart City Systems.

Unlike static profiles, this platform functions as a living system that evolves with the user over time.

---

## Objectives
The platform aims to:
- Capture user skills, courses, projects, and achievements
- Analyze skill readiness for targeted career paths
- Identify gaps between current and required skills
- Recommend relevant courses and projects
- Visualize skill progression and career pathways
- Integrate external data sources for enhanced insights

---

## Key Features
- User profile management for skills, courses, projects, and certifications
- Skill assessment and gap analysis using sector-specific frameworks
- Career-oriented recommendation engine
- Interactive dashboard for visualizing skill progression and gaps
- Focus on healthcare, agriculture, and smart city domains
- External API integration (real or simulated)

---

## System Architecture

The system is designed using a modular, layered architecture to ensure scalability, clarity, and ease of extension. Each component is responsible for a specific function, enabling independent development and future enhancements.

Frontend Layer:
The frontend is built using React and serves as the primary interface for users. It allows users to enter and manage their skills, courses, projects, and career goals. The frontend also displays dashboards that visualize skill progression, identified gaps, and recommended learning paths.

Backend Layer:
The backend is implemented using Node.js and Express. It exposes RESTful APIs that handle user profile management, skill data processing, and communication between the frontend and the intelligence layer.

Skill Intelligence and Analytics Layer:
This layer evaluates user skills against predefined, sector-specific skill frameworks for healthcare, agriculture, and smart city domains. It identifies skill gaps and generates personalized recommendations aligned with career goals.

Data Layer:
The data layer stores user profiles, skills, projects, achievements, and skill framework definitions. During initial development, mock or in-memory data structures are used, with support for future migration to persistent databases.

External Integration Layer:
The platform supports integration with services such as LinkedIn, GitHub, and online learning platforms. Mocked integrations are used where direct access is unavailable.

Data Flow:
User input flows from the frontend to the backend via REST APIs. The backend processes the data using the intelligence layer and returns readiness scores, skill gaps, and recommendations to the frontend.

---

## Machine Learning and Skill Intelligence

The platform implements a deterministic, weighted skill-gap scoring engine to estimate career readiness and generate personalized learning recommendations.

This is a rule-based, explainable, and domain-grounded intelligence mechanism aligned with real-world skill assessment practices. It avoids opaque black-box models while ensuring transparency, interpretability, and reproducibility.

Skill-Gap Scoring Model:
For each target career role, a predefined skill framework is maintained. Each skill is assigned a weight based on industry relevance. User skills are evaluated against this framework to compute a readiness score.

The output is a Career Readiness Index representing how closely a user’s current skill profile aligns with the selected role.

Recommendation Logic:
Skills with the highest weighted gaps are prioritized, and relevant courses or projects are recommended to maximize improvement in career readiness.

---

## Dataset

The skill intelligence and recommendation logic is informed by a publicly available dataset sourced from Kaggle.

Dataset Name: LinkedIn Jobs and Skills (1–3M)  
Source: Kaggle  
URL: https://www.kaggle.com/datasets/asaniczka/1-3m-linkedin-jobs-and-skills-2024

The dataset contains large-scale job listings and associated skill requirements. It was used to analyze skill demand patterns and inform role-specific skill frameworks and weighting strategies. Preprocessing included filtering domain-relevant roles, normalizing skill terminology, and aggregating skill frequencies.

---

## Technology Stack

### Frontend Layer (Client-Side)
- **Framework:** React 18 (Functional Components and Hooks)
- **Build Tool:** Vite (fast development server and optimized builds)
- **Language:** JavaScript (ES6+)
- **Routing:** React Router v6 (client-side navigation)
- **State Management:** React Context API and React Hooks (useState, useEffect)
- **Data Visualization:** Chart.js and react-chartjs-2
- **HTTP Client:** Axios (API communication)
- **Authentication:** Firebase Authentication SDK
- **Styling:** Vanilla CSS3 with custom variables and dark theme support

### Backend Layer (Server-Side)
- **Framework:** FastAPI (high-performance Python web framework)
- **Language:** Python 3.9+
- **ASGI Server:** Uvicorn
- **ORM:** SQLAlchemy 2.0
- **Data Validation:** Pydantic
- **API Documentation:** Swagger UI (auto-generated)

### Intelligence Engine (Machine Learning)
- **Algorithm:** Weighted Vector-Space Matching (custom heuristic implementation)
- **Core Logic:** Python set operations and dictionary-based lookups
- **Key Capabilities:**
  - Dynamic Career Readiness Scoring (0–100%)
  - Weighted Skill Gap Analysis
  - Resource and Learning Recommendation Mapping

### Database Layer
- **Primary Database:** SQLite (development and prototyping)
- **Production Compatibility:** PostgreSQL-ready (via SQLAlchemy)
- **Data Consistency:** ACID-compliant relational storage

### Infrastructure and DevOps
- **Automation:** Windows batch scripts (`.bat`) for environment setup and server execution
- **Version Control:** Git
- **Environment Management:** Python virtual environment (`venv`)

---

## Installation and Setup

# Clone the repository
git clone <repository-url>
cd app

# Start the backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
# Backend runs at http://localhost:8000

# Start the frontend
cd ../frontend
npm install
npm run dev
# Frontend runs at http://localhost:5173

### Demonstration

-The platform demonstrates:
-Creation of sample user profiles with defined career goals
-Computation of a Career Readiness Index
-Identification of weighted skill gaps
-Personalized learning recommendations
-Dashboard-based visualization of skill progression and readiness
-Future Enhancements
-User authentication and role-based access control
-Persistent database integration
-Real-time LinkedIn and GitHub integrations
-Advanced hybrid intelligence models
-Resume and portfolio generation
-Mobile application support

### Team Information

-Hackathon: Ingenious Hackathon 7.0
-Team Name: Papayu
-Problem Statement: 3
-Project Type: Full-stack Skill Intelligence and Career Readiness System

### Conclusion

This project delivers an explainable, grounded, and scalable skill intelligence platform that bridges the gap between academic learning and industry requirements. By focusing on career readiness estimation rather than opaque prediction, the system provides meaningful, actionable guidance for long-term professional growth in emerging sectors.
