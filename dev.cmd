@echo off
setlocal
rem One-command dev server for SolBeat Cleaning.
rem Uses system Node if available, otherwise the portable runtime shared
rem with the stony-brook-eco-builders project (..\stony-brook-eco-builders\.tools\node).

cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  if exist "%~dp0..\stony-brook-eco-builders\.tools\node\node.exe" (
    set "PATH=%~dp0..\stony-brook-eco-builders\.tools\node;%PATH%"
  ) else (
    echo Node.js was not found. Install Node 18+ first.
    exit /b 1
  )
)

if not exist "%~dp0node_modules" (
  echo Installing dependencies...
  call npm install --no-fund --no-audit || exit /b 1
)

call npm run dev
