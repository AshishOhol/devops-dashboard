@echo off
REM Quick development startup script
REM Starts backend and frontend in development mode

echo Starting DevOps Dashboard...

cd backend
start "Backend" cmd /k "npm install && npm start"

cd ../frontend  
start "Frontend" cmd /k "npm install && npm start"

echo Dashboard starting...
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
pause