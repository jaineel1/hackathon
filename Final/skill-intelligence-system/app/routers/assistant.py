from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import schemas
from app.database import get_db
from app.services import assistant

router = APIRouter(prefix="/assistant", tags=["assistant"])

@router.post("/chat", response_model=schemas.ChatResponse)
def chat_with_assistant(request: schemas.ChatRequest, db: Session = Depends(get_db)):
    try:
        return assistant.generate_response(request, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
