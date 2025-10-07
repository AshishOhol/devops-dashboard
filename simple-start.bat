@echo off
echo Killing any existing processes...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001') do taskkill /PID %%a /F 2>nul

echo Starting backend...
cd backend
start "Backend Server" cmd /k "npm start"

timeout /t 5

echo Backend should be running. Check http://localhost:3001/health
echo Frontend at http://localhost:3000

pause