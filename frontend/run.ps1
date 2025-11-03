# Starts the Vite dev server on npm
Set-Location -Path $PSScriptRoot

Write-Host "Starting frontend (Vite) dev server..." -ForegroundColor Cyan

npm run dev

if ($LASTEXITCODE -ne 0) {
  Write-Error "Failed to start Vite dev server."
  exit 1
}



