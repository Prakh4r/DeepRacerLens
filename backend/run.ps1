Set-Location -Path $PSScriptRoot

Write-Host "Activating virtual environment and starting FastAPI (uvicorn)..." -ForegroundColor Cyan
& .\.venv\Scripts\Activate.ps1

uvicorn main:app --reload --host 127.0.0.1 --port 8000

deactivate



