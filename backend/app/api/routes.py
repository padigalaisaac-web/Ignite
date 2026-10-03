import logging
from fastapi import APIRouter, HTTPException, status
from app.models.schemas import AnalyzeRequest, AnalyzeResponse, HealthResponse
from app.services.repository_analyzer import repository_analyzer
from app.services.ai_service import ai_service

logger = logging.getLogger(__name__)

router = APIRouter()

@router.get("/health", response_model=HealthResponse)
async def health_check():
    provider_info = ai_service.get_provider_info()
    return HealthResponse(
        status="ok",
        version="1.0.0",
        ai_provider=provider_info["provider"],
        ai_model=provider_info["model"]
    )

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_repository(request: AnalyzeRequest):
    if not request.repo_url or not request.repo_url.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Repository URL cannot be blank."
        )

    try:
        response = await repository_analyzer.analyze(request.repo_url)
        return response
    except ValueError as ve:
        logger.warning(f"Validation or GitHub error: {ve}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except TimeoutError as te:
        logger.error(f"Analysis timed out: {te}")
        raise HTTPException(
            status_code=status.HTTP_504_GATEWAY_TIMEOUT,
            detail="Repository analysis timed out. The repository may be too large or the AI provider was slow."
        )
    except Exception as e:
        logger.error(f"Unexpected error during repository analysis: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to analyze repository: {str(e)}"
        )
