@echo off
echo Killing existing processes...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do taskkill /PID %%a /F 2>nul
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001') do taskkill /PID %%a /F 2>nul

echo Starting backend...
cd backend
start "Backend API" cmd /k "npm start"

echo Waiting for backend to start...
timeout /t 5

echo Starting frontend...
cd ../frontend
start "Frontend Dashboard" cmd /k "npm start"

echo.
echo Both services starting...
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Wait 30 seconds for React to compile, then open http://localhost:3000
pause