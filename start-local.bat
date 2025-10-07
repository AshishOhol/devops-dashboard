@echo off
echo Starting DevOps Dashboard locally...

echo Starting backend...
cd backend
start "Backend API" cmd /k "npm start"

timeout /t 3

echo Starting frontend...
cd ../frontend
start "Frontend Dashboard" cmd /k "npm start"

echo.
echo Dashboard URLs:
echo Backend API: http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Press any key to continue...
pause