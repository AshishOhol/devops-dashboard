@echo off
echo Checking metrics data...
curl http://localhost:3001/api/metrics
echo.
echo.
echo Checking if backend is collecting data...
timeout /t 2
curl http://localhost:3001/api/metrics
pause