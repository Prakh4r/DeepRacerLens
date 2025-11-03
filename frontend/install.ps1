# Requires: Node.js 18+ and npm
Write-Host "Installing frontend dependencies with npm..." -ForegroundColor Cyan
Set-Location -Path $PSScriptRoot

npm install --no-audit --no-fund --legacy-peer-deps

if ($LASTEXITCODE -ne 0) {
  Write-Error "npm install failed. Ensure Node.js/npm are installed."
  exit 1
}

Write-Host "Frontend dependencies installed." -ForegroundColor Green

