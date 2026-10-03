import os
from typing import List
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # GitHub configuration
    GITHUB_TOKEN: str = os.getenv("GITHUB_TOKEN", "").strip()

    # AI Configuration
    # AI_PROVIDER can be 'ollama', 'open_weight' (OpenAI-compatible like Groq/Together/vLLM), or 'auto'
    AI_PROVIDER: str = os.getenv("AI_PROVIDER", "ollama").strip().lower()
    
    # Ollama settings (Local open-weight runner)
    OLLAMA_BASE_URL: str = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434").strip().rstrip("/")
    OLLAMA_MODEL: str = os.getenv("OLLAMA_MODEL", "llama3.2").strip()

    # Open-weight OpenAI-compatible endpoint (Groq, Together.ai, OpenRouter, LM Studio, vLLM)
    OPENAI_API_BASE: str = os.getenv("OPENAI_API_BASE", "https://api.groq.com/openai/v1").strip().rstrip("/")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "").strip()
    OPENAI_MODEL: str = os.getenv("OPENAI_MODEL", "llama-3.3-70b-versatile").strip()

    # Hugging Face Inference API (alternative open-weight host)
    HUGGINGFACE_API_KEY: str = os.getenv("HUGGINGFACE_API_KEY", "").strip()
    HUGGINGFACE_MODEL: str = os.getenv("HUGGINGFACE_MODEL", "meta-llama/Meta-Llama-3.1-8B-Instruct").strip()

    # Context and Limits
    MAX_ANALYSIS_FILES: int = int(os.getenv("MAX_ANALYSIS_FILES", "15"))
    MAX_FILE_BYTES: int = int(os.getenv("MAX_FILE_BYTES", "25000"))
    REQUEST_TIMEOUT_SECONDS: float = float(os.getenv("REQUEST_TIMEOUT_SECONDS", "60.0"))

    # CORS
    CORS_ORIGINS: List[str] = ["*"]

settings = Settings()
