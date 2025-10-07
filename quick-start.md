# Quick Start Guide

## Option 1: Local Development (Recommended)
```powershell
cd C:\devops-dashboard
.\start-local.bat
```

## Option 2: Manual Start
```powershell
# Terminal 1 - Backend
cd C:\devops-dashboard\backend
npm install
npm start

# Terminal 2 - Frontend  
cd C:\devops-dashboard\frontend
npm install
npm start
```

## Option 3: Docker (if Docker Desktop installed)
```powershell
cd C:\devops-dashboard
docker-compose up
```

## Access Points
- Dashboard: http://localhost:3000
- API: http://localhost:3001
- Health Check: http://localhost:3001/health

## For Kubernetes (requires cluster setup)
First install minikube or Docker Desktop with Kubernetes enabled:
```powershell
minikube start
kubectl apply -f k8s/
```