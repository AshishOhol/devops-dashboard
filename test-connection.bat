@echo off
echo Testing backend connection...
echo.

echo 1. Testing health endpoint:
curl -s http://localhost:3001/health
echo.

echo 2. Testing metrics endpoint:
curl -s http://localhost:3001/api/metrics
echo.

echo 3. Checking if backend is running:
netstat -an | findstr :3001
echo.

pause