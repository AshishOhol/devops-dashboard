# DevOps Dashboard - Complete Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [Source Code Analysis](#source-code-analysis)
4. [Configuration Files](#configuration-files)
5. [Workflow & Architecture](#workflow--architecture)
6. [Deployment Guide](#deployment-guide)

---

## Project Overview

**DevOps Dashboard** is a comprehensive real-time monitoring solution that provides system health metrics, alerts, and service status monitoring. The application follows a modern microservices architecture with containerization and orchestration capabilities.

### Technology Stack
- **Frontend**: React 18 with Recharts for data visualization
- **Backend**: Node.js with Express API server
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)
- **Containerization**: Docker with multi-stage builds
- **Orchestration**: Kubernetes
- **CI/CD**: Jenkins Pipeline
- **System Monitoring**: systeminformation library for real system metrics

---

## File Structure

```
devops-dashboard/
├── backend/                    # Node.js API Server
│   ├── package.json           # Backend dependencies
│   ├── package-lock.json      # Dependency lock file
│   ├── server.js              # Main API server
│   └── stress-test.js         # CPU load testing utility
├── frontend/                   # React Dashboard Application
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── src/
│   │   ├── App.js             # Main dashboard component
│   │   └── index.js           # React entry point
│   ├── package.json           # Frontend dependencies
│   └── package-lock.json      # Dependency lock file
├── docker/                     # Container Definitions
│   ├── Dockerfile.frontend    # Frontend container build
│   └── Dockerfile.backend     # Backend container build
├── k8s/                       # Kubernetes Manifests
│   ├── namespace.yaml         # Namespace definition
│   ├── deployment.yaml        # Application deployments
│   └── service.yaml           # Service definitions
├── monitoring/                 # Monitoring Configuration
│   ├── prometheus.yml         # Prometheus scraping config
│   ├── alert_rules.yml        # Alert rule definitions
│   └── alertmanager.yml       # Alert manager config
├── logging/                    # ELK Stack Configuration
│   ├── filebeat.yml           # Log shipping config
│   └── logstash.conf          # Log processing pipeline
├── jenkins/                    # CI/CD Pipeline
│   └── Jenkinsfile            # Jenkins pipeline definition
├── docker-compose.yml         # Multi-service orchestration
├── Makefile                   # Build automation commands
└── README.md                  # Project documentation
```

---

## Source Code Analysis

### Frontend Components

#### 1. App.js - Main Dashboard Component
**Purpose**: Central React component that displays real-time system metrics, alerts, and service status.

**Key Features**:
- Real-time data fetching every 5 seconds
- Interactive line charts using Recharts library
- Live connection status indicator with pulse animation
- Responsive grid layout for metrics and alerts
- Error handling for backend connectivity

**State Management**:
```javascript
const [metrics, setMetrics] = useState([]);        // System metrics data
const [alerts, setAlerts] = useState([]);          // Active system alerts
const [services, setServices] = useState([]);      // Service health status
const [systemInfo, setSystemInfo] = useState({});  // System information
const [loading, setLoading] = useState(true);      // Loading state
const [lastUpdate, setLastUpdate] = useState(null); // Last data update time
const [isLive, setIsLive] = useState(false);       // Connection status
```

**Data Flow**:
1. Component mounts and initiates data fetching
2. Axios makes HTTP requests to backend API endpoints
3. Data is processed and stored in component state
4. Charts and UI elements re-render with new data
5. Process repeats every 5 seconds via setInterval

#### 2. index.js - React Entry Point
**Purpose**: Minimal entry point that renders the main App component into the DOM.

**Functionality**:
- Creates React root using React 18's createRoot API
- Renders App component into the 'root' div element

### Backend Components

#### 1. server.js - API Server
**Purpose**: Express.js server providing REST API endpoints for system monitoring data.

**Core Functionality**:

**Data Collection**:
- Uses `systeminformation` library for real system metrics
- Implements `node-cron` for scheduled data collection
- Maintains in-memory storage for metrics history (last 20 data points)
- Generates simulated varying data for demonstration

**API Endpoints**:
```javascript
GET /api/metrics     // Returns system metrics history
GET /api/alerts      // Returns current active alerts
GET /api/services    // Returns service health status
GET /api/system-info // Returns detailed system information
GET /health          // Health check endpoint
```

**Alert System**:
- Monitors CPU usage (alert if > 80%)
- Monitors memory usage (alert if > 85%)
- Monitors disk usage (alert if > 90%)
- Generates alerts with severity levels (warning/critical)

**Scheduled Tasks**:
```javascript
cron.schedule('*/5 * * * * *', collectMetrics);  // Every 5 seconds
cron.schedule('*/10 * * * * *', checkServices);  // Every 10 seconds
```

#### 2. stress-test.js - Load Testing Utility
**Purpose**: Creates artificial CPU load to demonstrate real-time monitoring capabilities.

**Functionality**:
- Runs intensive mathematical calculations for 30 seconds
- Allows testing of dashboard's real-time monitoring
- Demonstrates alert system activation under high CPU load

---

## Configuration Files

### Docker Configuration

#### 1. Dockerfile.frontend
**Purpose**: Multi-stage Docker build for React application.

**Build Process**:
1. **Stage 1**: Node.js build environment
   - Installs dependencies
   - Builds production React bundle
2. **Stage 2**: Nginx production server
   - Copies built files to nginx
   - Serves static files on port 80

#### 2. Dockerfile.backend
**Purpose**: Containerizes Node.js API server.

**Configuration**:
- Uses Alpine Linux for minimal image size
- Installs production dependencies only
- Exposes port 3001 for API access

### Kubernetes Configuration

#### 1. namespace.yaml
**Purpose**: Creates isolated environment for dashboard deployment.

#### 2. deployment.yaml
**Purpose**: Defines application deployments with scaling capabilities.

**Configuration**:
- Frontend: 2 replicas for load distribution
- Backend: 3 replicas for high availability
- Rolling update strategy for zero-downtime deployments

#### 3. service.yaml
**Purpose**: Exposes applications and enables service discovery.

**Services**:
- Frontend: LoadBalancer service (external access)
- Backend: ClusterIP service (internal access only)

### Monitoring Configuration

#### 1. prometheus.yml
**Purpose**: Configures Prometheus monitoring system.

**Scraping Targets**:
- Dashboard backend metrics endpoint
- Node exporter for system metrics
- 15-second scraping interval

#### 2. alert_rules.yml
**Purpose**: Defines alerting conditions and thresholds.

**Alert Rules**:
- High CPU usage (>80% for 5 minutes)
- High memory usage (>90% for 5 minutes)
- Service downtime (>1 minute)

### CI/CD Configuration

#### 1. Jenkinsfile
**Purpose**: Defines automated build, test, and deployment pipeline.

**Pipeline Stages**:
1. **Checkout**: Retrieves source code from repository
2. **Build**: Creates Docker images for frontend and backend
3. **Test**: Runs parallel test suites for both components
4. **Push**: Uploads images to Docker registry
5. **Deploy**: Updates Kubernetes deployment with new images

**Features**:
- Parallel testing for faster execution
- Automatic image tagging with build numbers
- Email notifications on build failures
- Workspace cleanup after completion

---

## Workflow & Architecture

### System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │  Node.js Backend│    │  Monitoring     │
│   (Port 3000)   │◄──►│   (Port 3001)   │◄──►│  Stack          │
│                 │    │                 │    │                 │
│ • Dashboard UI  │    │ • REST API      │    │ • Prometheus    │
│ • Real-time     │    │ • System Metrics│    │ • Grafana       │
│ • Charts        │    │ • Alert Engine  │    │ • ELK Stack     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Infrastructure│
                    │                 │
                    │ • Docker        │
                    │ • Kubernetes    │
                    │ • Jenkins       │
                    └─────────────────┘
```

### Data Flow Process

1. **Data Collection**:
   - Backend server collects system metrics using `systeminformation`
   - Cron jobs schedule data collection every 5 seconds
   - Metrics stored in memory with 20-point rolling history

2. **Alert Processing**:
   - Each metric collection triggers alert evaluation
   - Thresholds checked for CPU, memory, and disk usage
   - Alerts generated with severity levels and timestamps

3. **API Communication**:
   - Frontend polls backend API endpoints every 5 seconds
   - RESTful endpoints provide JSON responses
   - CORS enabled for cross-origin requests

4. **Real-time Visualization**:
   - React components update state with new data
   - Recharts library renders interactive line graphs
   - UI shows live connection status and current values

5. **Service Monitoring**:
   - Backend monitors system processes and network interfaces
   - Service health status updated every 10 seconds
   - Status displayed in dashboard service grid

### Development Workflow

1. **Local Development**:
   ```bash
   # Start backend
   cd backend && npm start
   
   # Start frontend (separate terminal)
   cd frontend && npm start
   ```

2. **Docker Development**:
   ```bash
   # Build and start all services
   make up
   
   # View logs
   make logs
   ```

3. **Kubernetes Deployment**:
   ```bash
   # Deploy to cluster
   make deploy-k8s
   
   # Check status
   make status
   ```

### Monitoring & Alerting Workflow

1. **Metrics Collection**:
   - Prometheus scrapes metrics from backend
   - Node exporter provides system-level metrics
   - Data stored in time-series database

2. **Alert Evaluation**:
   - Prometheus evaluates alert rules continuously
   - Alertmanager handles alert routing and notifications
   - Dashboard shows real-time alert status

3. **Visualization**:
   - Grafana provides advanced dashboarding
   - Custom React dashboard shows real-time data
   - Multiple visualization options available

---

## Deployment Guide

### Prerequisites
- Docker and Docker Compose
- Kubernetes cluster (local or cloud)
- Node.js 18+ for local development
- Jenkins for CI/CD (optional)

### Quick Start Options

#### Option 1: Docker Compose (Recommended for Development)
```bash
# Clone repository
git clone <repository-url>
cd devops-dashboard

# Start all services
docker-compose up -d

# Access applications
# Dashboard: http://localhost:3000
# Backend API: http://localhost:3001
# Prometheus: http://localhost:9090
# Grafana: http://localhost:3002
```

#### Option 2: Kubernetes Deployment
```bash
# Apply Kubernetes manifests
kubectl apply -f k8s/

# Check deployment status
kubectl get pods -n devops-dashboard

# Access via port forwarding
kubectl port-forward svc/dashboard-frontend-service 3000:80 -n devops-dashboard
```

#### Option 3: Local Development
```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Start backend (terminal 1)
cd backend && npm start

# Start frontend (terminal 2)
cd frontend && npm start
```

### Production Considerations

1. **Security**:
   - Enable HTTPS/TLS encryption
   - Implement authentication and authorization
   - Use secrets management for sensitive data
   - Regular security updates and patches

2. **Scalability**:
   - Horizontal pod autoscaling in Kubernetes
   - Load balancing for multiple replicas
   - Database persistence for metrics storage
   - Caching layer for improved performance

3. **Monitoring**:
   - Set up comprehensive logging
   - Configure alert notifications (email, Slack, etc.)
   - Implement health checks and readiness probes
   - Monitor resource usage and performance metrics

4. **Backup & Recovery**:
   - Regular configuration backups
   - Database backup strategies
   - Disaster recovery procedures
   - Version control for all configurations

---

## Conclusion

The DevOps Dashboard provides a complete monitoring solution with modern architecture patterns, containerization, and orchestration capabilities. The modular design allows for easy extension and customization while maintaining production-ready standards for deployment and monitoring.

The project demonstrates best practices in:
- Microservices architecture
- Real-time data visualization
- Container orchestration
- CI/CD automation
- Infrastructure as Code
- Monitoring and alerting

This documentation serves as a comprehensive guide for understanding, deploying, and maintaining the DevOps Dashboard system.