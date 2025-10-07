# 🚀 DevOps Dashboard - Real-Time System Monitoring

A comprehensive real-time monitoring solution with React frontend, Node.js backend, and integrated DevOps tools for system health monitoring, alerting, and service management.

![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-purple)

## 📊 Features

### Real-Time Monitoring
- **Live System Metrics**: CPU, Memory, and Disk usage with 5-second updates
- **Interactive Charts**: Beautiful line charts with Recharts library
- **Connection Status**: Live indicator with pulse animation
- **Historical Data**: Rolling 20-point history for trend analysis

### Alert Management
- **Smart Thresholds**: Configurable CPU (80%), Memory (85%), Disk (90%) alerts
- **Severity Levels**: Critical and warning alert classifications
- **Real-Time Notifications**: Instant alert generation and display

### Service Health Monitoring
- **System Processes**: Monitor running processes and system health
- **Network Status**: Track network interfaces and connectivity
- **API Health**: Built-in health check endpoints

### DevOps Integration
- **Docker Support**: Multi-stage builds for optimized containers
- **Kubernetes Ready**: Complete K8s manifests with scaling
- **CI/CD Pipeline**: Jenkins pipeline for automated deployment
- **Monitoring Stack**: Prometheus + Grafana integration
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana) support

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │  Node.js Backend│    │  Monitoring     │
│   (Port 3000)   │◄──►│   (Port 3001)   │◄──►│  Stack          │
│                 │    │                 │    │                 │
│ • Dashboard UI  │    │ • REST API      │    │ • Prometheus    │
│ • Real-time     │    │ • System Metrics│    │ • Grafana       │
│ • Charts        │    │ • Alert Engine  │    │ • ELK Stack     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)
```bash
# Clone the repository
git clone https://github.com/yourusername/devops-dashboard.git
cd devops-dashboard

# Start all services
make up
# or
docker-compose up -d

# Access the dashboard
open http://localhost:3000
```

### Option 2: Local Development
```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Start backend (Terminal 1)
cd backend && npm start

# Start frontend (Terminal 2)
cd frontend && npm start

# Dashboard will open at http://localhost:3000
```

### Option 3: Kubernetes Deployment
```bash
# Deploy to Kubernetes cluster
make deploy-k8s
# or
kubectl apply -f k8s/

# Check deployment status
make status
```

## 📋 Prerequisites

- **Node.js** 18+ 
- **Docker** and Docker Compose
- **kubectl** (for Kubernetes deployment)
- **Git** for version control

## 🛠️ Available Commands

```bash
# Build and Development
make build          # Build Docker images
make up             # Start all services
make down           # Stop all services
make logs           # View service logs

# Testing
make test           # Run test suites
node backend/stress-test.js  # CPU load testing

# Deployment
make deploy-k8s     # Deploy to Kubernetes
make status         # Check K8s deployment status

# Cleanup
make clean          # Remove containers and images
```

## 🌐 Service Endpoints

| Service | URL | Description |
|---------|-----|-------------|
| **Dashboard** | http://localhost:3000 | Main React dashboard |
| **API Server** | http://localhost:3001 | Backend REST API |
| **Prometheus** | http://localhost:9090 | Metrics collection |
| **Grafana** | http://localhost:3002 | Advanced dashboards |
| **Kibana** | http://localhost:5601 | Log visualization |

### API Endpoints
- `GET /api/metrics` - System metrics history
- `GET /api/alerts` - Current active alerts  
- `GET /api/services` - Service health status
- `GET /api/system-info` - Detailed system information
- `GET /health` - Health check endpoint

## 📁 Project Structure

```
devops-dashboard/
├── frontend/                   # React Dashboard Application
│   ├── public/                # Static files
│   ├── src/                   # React components
│   └── package.json           # Frontend dependencies
├── backend/                    # Node.js API Server
│   ├── server.js              # Main API server
│   ├── stress-test.js         # CPU testing utility
│   └── package.json           # Backend dependencies
├── docker/                     # Container Definitions
│   ├── Dockerfile.frontend    # Frontend container
│   └── Dockerfile.backend     # Backend container
├── k8s/                       # Kubernetes Manifests
│   ├── namespace.yaml         # Namespace definition
│   ├── deployment.yaml        # Application deployments
│   └── service.yaml           # Service definitions
├── monitoring/                 # Monitoring Configuration
│   ├── prometheus.yml         # Prometheus config
│   └── alert_rules.yml        # Alert definitions
├── jenkins/                    # CI/CD Pipeline
│   └── Jenkinsfile            # Jenkins pipeline
├── docker-compose.yml         # Multi-service orchestration
├── Makefile                   # Build automation
└── README.md                  # This file
```

## 🔧 Configuration

### Environment Variables
```bash
# Backend Configuration
NODE_ENV=development          # Environment mode
PORT=3001                    # API server port

# Frontend Configuration  
REACT_APP_API_URL=http://localhost:3001  # Backend API URL
```

### Alert Thresholds
```javascript
// Configurable in backend/server.js
CPU_THRESHOLD = 80%          # CPU usage alert
MEMORY_THRESHOLD = 85%       # Memory usage alert  
DISK_THRESHOLD = 90%         # Disk usage alert
```

## 🧪 Testing

### Load Testing
```bash
# Generate CPU load to test monitoring
node backend/stress-test.js

# Watch dashboard for:
# - CPU usage spike
# - Alert generation
# - Real-time updates
```

### Unit Tests
```bash
# Run all tests
make test

# Frontend tests only
cd frontend && npm test

# Backend tests only  
cd backend && npm test
```

## 🚢 Deployment

### Docker Production Build
```bash
# Build production images
docker build -f docker/Dockerfile.frontend -t devops-dashboard/frontend .
docker build -f docker/Dockerfile.backend -t devops-dashboard/backend .

# Run production containers
docker run -p 3000:80 devops-dashboard/frontend
docker run -p 3001:3001 devops-dashboard/backend
```

### Kubernetes Production
```bash
# Create namespace
kubectl apply -f k8s/namespace.yaml

# Deploy applications
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

# Scale deployments
kubectl scale deployment dashboard-backend --replicas=5 -n devops-dashboard
```

## 📊 Monitoring & Observability

### Prometheus Metrics
- System CPU, Memory, Disk usage
- Application performance metrics
- Custom business metrics

### Grafana Dashboards
- Real-time system overview
- Historical trend analysis
- Alert management interface

### ELK Stack Logging
- Centralized log collection
- Log parsing and enrichment
- Advanced log search and visualization

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues

**Dashboard not loading?**
```bash
# Check if backend is running
curl http://localhost:3001/health

# Check Docker containers
docker-compose ps
```

**No data showing?**
```bash
# Restart services
make down && make up

# Check logs
make logs
```

### Getting Help
- 📧 **Email**: your-email@example.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/devops-dashboard/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/devops-dashboard/discussions)

## 🙏 Acknowledgments

- **React Team** for the amazing frontend framework
- **Express.js** for the robust backend framework
- **Recharts** for beautiful data visualization
- **systeminformation** for system metrics
- **Docker** and **Kubernetes** for containerization
- **Prometheus** and **Grafana** for monitoring

---

⭐ **Star this repository if you find it helpful!**

Made with ❤️ for the DevOps community