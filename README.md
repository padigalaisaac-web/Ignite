# RepoPilot AI
### Understand. Navigate. Contribute.

> **MLH Hacktoberfest Hack Day Submission — Best Open-Source AI Project**  
> *An open-weight AI developer companion that analyzes unfamiliar GitHub repositories and generates actionable contributor onboarding guides.*

---

## 🌟 What It Does

When developers encounter a new open-source repository, understanding its layout, entrypoints, control flow, and contribution opportunities usually takes hours of manual file exploration.

**RepoPilot AI** solves this with a focused, end-to-end AI workflow:
1. Pastes any public GitHub repository URL.
2. Fetches repository metadata, recursively inspects the Git tree, and intelligently selects high-priority manifests, entrypoints, and core architecture files.
3. Analyzes the contextualized source code using an **open-weight AI model** (e.g., Llama 3.2, Qwen 2.5 Coder, Mistral).
4. Delivers a developer-first dashboard with:
   - **Project Overview**: Purpose, detected technologies, and repository metrics.
   - **Visual Architecture**: Dynamic topology mapping components (Frontend, API Gateway, Core Engine, Storage).
   - **Important Files Map**: Crucial files, their purpose, and why they matter.
   - **Execution & Request Flow**: Clear step-by-step runtime lifecycle walkthrough.
   - **Contributor Starting Point ("Where should I start?")**: Recommended starting file, in-depth rationale, actionable first PR suggestion, and quickstart commands.
   - **Potential Issues (Grounded Triage)**: Evidence-backed observations labeled "Needs Review" to eliminate AI hallucinations.

---

## 💡 Why It Exists

During Hacktoberfest, thousands of software engineers want to contribute to open source, but are stopped by the "blank canvas" intimidation of massive codebases. Generic AI chatbots simply guess or summarize READMEs. 

RepoPilot AI is designed to be an actual developer tool: it inspects the real code, respects context budgets, runs open-weight models, and provides the exact file paths and instructions needed to make a successful first pull request.

---

## 🧠 AI Component & Open-Weight Architecture

The open-weight AI model is the **core intelligence engine** of RepoPilot AI, not a cosmetic wrapper.

### Pipeline Architecture:
```text
  GitHub Repository URL
           ↓
  URL Validation & SSRF Prevention
           ↓
  GitHub Repository Metadata (Stars, Forks, License, Branch)
           ↓
  Git Tree Discovery (Blobs & Directory Traversal)
           ↓
  Intelligent File Filtering & Ranking (Noise Elimination)
           ↓
  Code Context Synthesis (Bounded Extraction of Entrypoints & Manifests)
           ↓
  Open-Weight AI Model (Ollama: Llama 3.2 / Qwen 2.5 Coder or Groq / vLLM / OpenRouter)
           ↓
  Strict JSON Analysis Output
           ↓
  Pydantic Schema Validation & Repair
           ↓
  Interactive React Dashboard
```

### Clean AI Service Abstraction
RepoPilot AI decouples model inference behind the `BaseAIProvider` interface:
1. **Local Open-Weight Runner (`OllamaProvider`)**:
   - Runs 100% locally with zero external network calls.
   - Supported models: `llama3.2`, `qwen2.5-coder`, `mistral`, `deepseek-r1`.
   - Native JSON structured output mode.
2. **Cloud Open-Weight Runner (`OpenWeightAPIProvider`)**:
   - OpenAI-compatible gateway for open-weight models hosted on Groq, Together.ai, OpenRouter, vLLM, or LM Studio.
   - Default tested model: `llama-3.3-70b-versatile` or `qwen-2.5-coder-32b`.
3. **Grounded AST / Semantic Fallback (`SemanticExtractorFallback`)**:
   - If the developer has not started Ollama or supplied API keys, the application automatically engages a grounded semantic code parser so judges can test the full pipeline and UI without crashing.

### Dedicated System Prompt:
```text
You are RepoPilot AI, an expert open-source software engineer.
Analyze ONLY the repository context supplied to you.
Your job is to help a developer understand an unfamiliar repository and make their first useful contribution.
Do not invent files, technologies, architecture, bugs, or functionality.
If information is unavailable, explicitly say so.
Distinguish between:
- observed facts from repository files
- reasonable architectural inference
- potential issues requiring human review
Identify the most important files based on their actual contents and relationships.
Recommend a realistic starting point for a new contributor.
Return ONLY the requested structured JSON.
```

---

## 🛠️ Tech Stack

- **Frontend**:
  - React 19
  - Vite
  - TypeScript
  - Tailwind CSS v4
  - Lucide React Icons
- **Backend**:
  - Python 3.10+ / 3.14
  - FastAPI
  - Uvicorn
  - Pydantic v2 (Strict Schema Validation)
  - HTTPX (Async HTTP Client)
  - Python-Dotenv
- **AI / LLM Engine**:
  - Open-Weight Models: Meta Llama 3.2 / 3.3, Qwen 2.5 Coder, Mistral
  - Local Runner: Ollama
  - Cloud Open-Weight APIs: Groq, Together.ai, OpenRouter, vLLM

---

## 📂 Project Structure

```text
repopilot-ai/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ArchitectureDiagram.tsx    # Visual multi-layer topology diagram
│   │   │   ├── CodeFlowView.tsx           # Runtime request lifecycle breakdown
│   │   │   ├── ContributorGuideCard.tsx   # "Where should I start?" & First PR blueprint
│   │   │   ├── ErrorAlert.tsx             # Contextual error troubleshooting
│   │   │   ├── Header.tsx                 # Branding, model status, and navigation
│   │   │   ├── ImportantFilesTable.tsx    # File path, purpose, and importance
│   │   │   ├── LoadingSteppedProgress.tsx # 7-step pipeline visual progress tracker
│   │   │   ├── OverviewCard.tsx           # Purpose, metrics, and technology pills
│   │   │   ├── PotentialIssuesList.tsx    # Evidence-based review cards with confidence tags
│   │   │   ├── RepoInputHero.tsx          # Hero landing, quick samples, and URL form
│   │   │   └── TabNavigation.tsx          # Developer-focused section tabs
│   │   ├── services/
│   │   │   └── api.ts                     # API client for backend communication
│   │   ├── types/
│   │   │   └── index.ts                   # Strict TypeScript interfaces
│   │   ├── App.tsx                        # Main dashboard coordinator
│   │   ├── index.css                      # Dark developer theme & Tailwind styling
│   │   └── main.tsx                       # React application entrypoint
│   ├── index.html                         # App title, SVG favicon, and viewport
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── .env.example
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes.py                  # POST /api/analyze & GET /api/health
│   │   ├── models/
│   │   │   └── schemas.py                 # Pydantic models for strict analysis schema
│   │   ├── services/
│   │   │   ├── ai_service.py              # Open-weight model provider abstraction
│   │   │   ├── github_service.py          # GitHub API, tree traversal, and file selector
│   │   │   └── repository_analyzer.py     # End-to-end pipeline coordinator
│   │   ├── utils/
│   │   │   └── url_parser.py              # URL validation, slug parsing, and SSRF guard
│   │   ├── config.py                      # Environment settings
│   │   └── main.py                        # FastAPI app entrypoint with CORS
│   ├── requirements.txt
│   └── .env.example
│
├── README.md
├── LICENSE                                # MIT Open-Source License
├── .gitignore
└── .env.example                           # Global environment variable reference
```

---

## ⚡ Installation & Quick Start

### 1. Prerequisites
- **Node.js**: v18+ (v22 recommended)
- **Python**: 3.10+ (tested on Python 3.14)
- **Ollama** (optional for local inference): [ollama.com](https://ollama.com)

---

### 2. Configure Environment Variables

#### Backend Configuration:
Create `backend/.env` from the template:
```bash
cp backend/.env.example backend/.env
```
Contents:
```env
# Optional: Increases GitHub API limit from 60 to 5,000 requests/hour
GITHUB_TOKEN=

# AI Provider: 'ollama' (local) or 'open_weight' (Groq/Together/OpenRouter)
AI_PROVIDER=ollama

# If using Ollama (Local):
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2

# If using Cloud Open-Weight API (e.g. Groq with Llama 3.3):
OPENAI_API_BASE=https://api.groq.com/openai/v1
OPENAI_API_KEY=
OPENAI_MODEL=llama-3.3-70b-versatile
```

#### Frontend Configuration:
Create `frontend/.env`:
```bash
cp frontend/.env.example frontend/.env
```
Contents:
```env
VITE_API_URL=http://localhost:8000
```

---

### 3. Run Local Open-Weight Model (Ollama)

If using Ollama locally:
```bash
# Pull the open-weight model
ollama pull llama3.2

# Start the Ollama daemon (runs on http://localhost:11434)
ollama serve
```
*(Alternatively, pull `qwen2.5-coder` or `mistral` and set `OLLAMA_MODEL=qwen2.5-coder` in `backend/.env`)*.

---

### 4. Start the Backend

Open a terminal:
```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
Verify backend health:
```bash
curl http://localhost:8000/api/health
# Returns: {"status":"ok","version":"1.0.0","ai_provider":"...","ai_model":"..."}
```

---

### 5. Start the Frontend

Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🎯 Hackathon Demo & Example Usage

### 2-Minute Demo Script:
1. **Open the App**: Visit `http://localhost:5173`.
2. **Select or Paste a Repo**:
   - Click one of the quick chips (`Express.js`, `Flask`, `FastAPI`, or `Octocat Hello-World`), OR paste any public repository URL like `https://github.com/expressjs/express`.
3. **Click "Analyze Repository"**:
   - Watch the **7-stage visual progress tracker** as RepoPilot connects to GitHub, reads the tree, filters out non-essential files, feeds context to the open-weight AI model, and validates the structured output.
4. **Explore the Developer Dashboard**:
   - **Overview**: Review high-level purpose and detected technology pills.
   - **Architecture**: Inspect the dynamic topology diagram with connections.
   - **Important Files**: Check the curated files table with purpose and rationale.
   - **Code Flow**: Read the request lifecycle narrative.
   - **Contribute ("Where should I start?")**: See the exact file recommended for beginners, why it matters, a suggested first PR task, and one-click copyable Git quickstart commands!
   - **Potential Issues**: Review grounded, human-in-the-loop observations with confidence levels.
   - **Copy Markdown**: Click "Copy Developer Guide (MD)" to export the full guide directly into your clipboard.

### Reliable Demo Repositories:
- `https://github.com/octocat/Hello-World` (Lightweight baseline)
- `https://github.com/expressjs/express` (Node.js framework)
- `https://github.com/pallets/flask` (Python microframework)
- `https://github.com/tiangolo/fastapi` (Python API framework)

---

## 🛡️ Security & Reliability

- **No Code Execution**: RepoPilot AI statically inspects repository tree structure and text files; it never runs untrusted scripts, builds binaries, or installs packages from analyzed repos.
- **SSRF Prevention & URL Sanitation**: Strict regex validation verifies `github.com` domain, disallows IP addresses, blocks localhost, and prevents directory traversal attacks.
- **Zero Token Leakage**: GitHub tokens and AI provider API keys exist exclusively on the backend in `.env` and are never serialized to the client.
- **Context Window Protection**: Configurable limits (`MAX_ANALYSIS_FILES=15`, `MAX_FILE_BYTES=25000`) prevent oversized payloads from exceeding model token limits.
- **Hallucination Guardrails**: Prompts explicitly forbid inventing files, and code observations require code evidence labeled "Needs Review".

---

## 🚀 Future Improvements

- **Interactive Architecture Deep-Dive**: Click on any architecture node to view code snippets directly in an embedded Monaco editor.
- **Multi-Branch & PR Diff Analysis**: Analyze proposed pull requests to explain incoming changes to open-source maintainers.
- **One-Click Issue Generator**: Automatically scaffold a formatted GitHub Issue or PR template directly from the suggested contribution.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
Open source, open weights, open contributions.
