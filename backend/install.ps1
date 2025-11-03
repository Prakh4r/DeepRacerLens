# Requires: Python 3.11+ and pip
Set-Location -Path $PSScriptRoot

if (-Not (Test-Path .venv)) {
  Write-Host "Creating Python virtual environment (.venv)..." -ForegroundColor Cyan
  python -m venv .venv
}

Write-Host "Activating virtual environment..." -ForegroundColor Cyan
& .\.venv\Scripts\Activate.ps1

Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
pip install --upgrade pip
pip install -r requirements.txt

if ($LASTEXITCODE -ne 0) {
  Write-Error "pip install failed. Check Python/pip installation."
  deactivate
  exit 1
}

Write-Host "Backend dependencies installed." -ForegroundColor Green
deactivate



