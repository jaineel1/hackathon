from sqlalchemy.orm import Session
from app import models, schemas
from app.services import intelligence
import random

def generate_response(request: schemas.ChatRequest, db: Session) -> schemas.ChatResponse:
    user = db.query(models.User).filter(models.User.id == request.user_id).first()
    if not user:
        return schemas.ChatResponse(response="User not found.")

    response_text = ""
    suggested_actions = []

    # 1. Parse User Intent & Context
    msg = request.message.lower()
    
    readiness = None
    role = None
    
    # Priority 1: Explicit ID
    if request.role_id:
        role = db.query(models.JobRole).filter(models.JobRole.id == request.role_id).first()
    
    # Priority 2: Intelligent Role Search
    if not role:
        all_roles = db.query(models.JobRole).all()
        best_match = None
        max_score = 0
        
        msg_tokens = set(msg.split())
        
        for r in all_roles:
            role_tokens = set(r.title.lower().split())
            # Calculate overlap
            overlap = len(msg_tokens.intersection(role_tokens))
            
            # Bonus for exact substring match (e.g "Data Analyst" in "Clinical Data Analyst")
            if msg in r.title.lower() and len(msg) > 4:
                overlap += 0.5
            
            # Score can be overlap count. Need at least 2 tokens match or 1 unique token match?
            # Let's say score must be >= 1. But single words like "data" are dangerous.
            # So let's penalize very common words or require score >= 1.5 for partials.
            
            # Simple heuristic:
            score = overlap
            
            if score > max_score and score >= 1: # Threshold
                max_score = score
                best_match = r
        
        # If we found a good match
        if best_match:
            role = best_match
            # We switched context based on the message. Treat this as an implicit request for status.
            # We can force the intent processing to skip to a summary if no other specific intent is found.
            pass

    # Calculate Readiness if we have a role
    if role:
        user_skills_map = {us.skill_id: us.proficiency_level for us in user.skills}
        readiness = intelligence.calculate_readiness(user_skills_map, role, db)
    
    # Intent: Explain Score
    if any(k in msg for k in ["score", "rating", "why", "analysis"]):
        if readiness:
            score = int(readiness.readiness_score * 100)
            if score > 80:
                response_text = f"You have a strong readiness score of {score}%! You are well-aligned with the {role.title} role."
            elif score > 50:
                response_text = f"Your score is {score}%. You have a good foundation, but there are {readiness.missing_skill_count} specific gaps we need to address."
            else:
                response_text = f"Your current score is {score}%. This is a specialized role, so don't worry—focusing on a few key skills will boost this quickly."
            
            suggested_actions.append("What are my gaps?")
        else:
            response_text = "I can currently explain your readiness for specific roles. Please select a Job Role context first!"

    # Intent: Gaps / Missing Skills
    elif any(k in msg for k in ["gap", "missing", "lack", "need", "skills", "required"]):
        if readiness and readiness.gaps:
            top_gaps = readiness.gaps[:3]
            gap_names = [g.skill_name for g in top_gaps]
            response_text = f"The most critical skills you are missing are: {', '.join(gap_names)}. Closing these gaps has the highest 'Importance Weight' for this role."
            suggested_actions.append(f"How to learn {gap_names[0]}?")
        elif readiness:
             response_text = "You don't have any major skill gaps for this role! You might be ready to apply."
        else:
            response_text = "Select a job role, and I'll tell you exactly what skills you are missing."

    # Intent: How to Improve / Learning
    elif any(k in msg for k in ["improve", "learn", "study", "resource", "help"]):
        if readiness and readiness.gaps:
            target_gap = readiness.gaps[0]
            # Check if user mentioned a specific skill
            for gap in readiness.gaps:
                if gap.skill_name.lower() in msg:
                    target_gap = gap
                    break
            
            response_text = f"To improve {target_gap.skill_name}, you should aim for Level {target_gap.required_level}. I recommend checking the Learning Hub for courses on this."
            suggested_actions.append("Go to Learning Hub")
        else:
            response_text = "The best way to improve is to tackle your biggest skill gaps one by one. Check the 'Gap Analysis' on your dashboard."

    # Intent: Projects
    elif any(k in msg for k in ["project", "build", "portfolio", "hands-on"]):
        response_text = "Building real-world projects is the best way to prove your skills! Check out the 'Projects' tab for GitHub repositories tailored to your profile."
        suggested_actions.append("Go to Projects Hub")
        
    # Intent: Greeting / General
    elif any(k in msg for k in ["hello", "hi", "hey"]):
        response_text = "Hello! I am your SkillMatch Assistant. I'm here to translate your data into a clear career path. Ask me about your match score or skill gaps."
        
    # Fallback
    else:
        # If we have a role, assume they want a summary
        if role:
             score = int(readiness.readiness_score * 100)
             response_text = f"I've switched context to **{role.title}**. Your readiness is {score}%. You are missing {readiness.missing_skill_count} skills."
             if readiness.gaps:
                 response_text += " Ask 'What are my gaps?' for details."
                 suggested_actions.append("What are my gaps?")
        else:
            response_text = "I'm tuned to analyze your career data. Try asking: 'Why is my score low?', 'What are my missing skills?', or 'How can I improve?'"
            suggested_actions.append("What are my missing skills?")

    return schemas.ChatResponse(
        response=response_text,
        suggested_actions=suggested_actions
    )
