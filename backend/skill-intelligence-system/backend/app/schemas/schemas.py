from typing import List, Optional
from pydantic import BaseModel

# --- Shared ---
class SkillBase(BaseModel):
    name: str
    category: str

class Skill(SkillBase):
    id: int
    class Config:
        from_attributes = True

# --- Job Role ---
class JobSkillBase(BaseModel):
    skill_id: int
    required_level: int
    importance_weight: float

class JobSkill(JobSkillBase):
    id: int
    skill: Skill  # Nested
    class Config:
        from_attributes = True

class JobRoleBase(BaseModel):
    title: str
    domain: str
    description: Optional[str] = None

class JobRole(JobRoleBase):
    id: int
    required_skills: List[JobSkill] = []
    class Config:
        from_attributes = True

# --- User ---
class UserSkillBase(BaseModel):
    skill_id: int
    proficiency_level: int

class UserSkill(UserSkillBase):
    id: int
    skill: Skill
    class Config:
        from_attributes = True

class UserBase(BaseModel):
    full_name: str
    email: str
    current_role_title: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    current_role_title: Optional[str] = None
    target_role_id: Optional[int] = None

class User(UserBase):
    id: int
    skills: List[UserSkill] = []
    target_role_id: Optional[int]
    class Config:
        from_attributes = True

# --- Intelligence Responses ---
class ResourceRecommendation(BaseModel):
    title: str
    type: str
    provider: str
    link: Optional[str]
    difficulty_level: int

class GapDetail(BaseModel):
    skill_name: str
    current_level: int
    required_level: int
    gap: int
    importance: float
    recommended_resources: List[ResourceRecommendation] = []

class RoleReadiness(BaseModel):
    role_id: int
    role_title: str
    domain: str
    readiness_score: float  # 0.0 to 1.0
    missing_skill_count: int
    gaps: List[GapDetail] = []
