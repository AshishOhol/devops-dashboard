@echo off
echo Testing API endpoints...
echo.

echo Testing health endpoint:
curl http://localhost:3001/health
echo.

echo Testing metrics endpoint:
curl http://localhost:3001/api/metrics
echo.

echo Testing alerts endpoint:
curl http://localhost:3001/api/alerts
echo.

echo Testing services endpoint:
curl http://localhost:3001/api/services
echo.

pause