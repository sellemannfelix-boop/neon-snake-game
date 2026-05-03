@echo off
cd /d "%~dp0"

set "CODEX_NODE=C:\Users\leonie\AppData\Local\OpenAI\Codex\bin\node.exe"

if exist "%CODEX_NODE%" (
  "%CODEX_NODE%" server.js
) else (
  where node >nul 2>nul
  if not errorlevel 1 (
    node server.js
  ) else (
    where py >nul 2>nul
    if not errorlevel 1 (
      py server.py
    ) else (
      where python >nul 2>nul
      if not errorlevel 1 (
        python server.py
      ) else (
        echo Node und Python wurden nicht gefunden.
        echo Du kannst index.html direkt oeffnen, dann funktioniert das Spiel ohne echtes Online-Leaderboard.
        echo Fuer das echte Leaderboard installiere Node.js von https://nodejs.org
      )
    )
  )
)

pause
