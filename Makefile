# DevOps Dashboard Build Automation Makefile
# 
# This Makefile provides convenient commands for building, testing, and deploying
# the DevOps Dashboard application. It simplifies complex Docker and Kubernetes commands.
# 
# Usage Examples:
# make build      - Build all Docker images
# make up         - Start all services in background
# make test       - Run test suites for frontend and backend
# make deploy-k8s - Deploy to Kubernetes cluster
# make clean      - Clean up containers and images
# 
# Prerequisites:
# - Docker and Docker Compose installed
# - kubectl configured for Kubernetes cluster
# - Node.js and npm for local testing

# Declare phony targets (not actual files)
.PHONY: build deploy test clean up down logs status

# BUILD COMMAND
# Builds Docker images for all services defined in docker-compose.yml
build:
	@echo "Building Docker images for DevOps Dashboard..."
	docker-compose build
	@echo "Build completed successfully!"

# START SERVICES COMMAND
# Starts all services in detached mode (background)
up:
	@echo "Starting DevOps Dashboard services..."
	docker-compose up -d
	@echo "Services started! Dashboard: http://localhost:3000"

# STOP SERVICES COMMAND
# Stops and removes all containers
down:
	@echo "Stopping DevOps Dashboard services..."
	docker-compose down
	@echo "Services stopped successfully!"

# KUBERNETES DEPLOYMENT COMMAND
# Applies all Kubernetes manifests to deploy on cluster
deploy-k8s:
	@echo "Deploying to Kubernetes cluster..."
	kubectl apply -f k8s/
	@echo "Deployment completed! Check status with 'make status'"

# TEST COMMAND
# Runs test suites for both frontend and backend
test:
	@echo "Running frontend tests..."
	cd frontend && npm test
	@echo "Running backend tests..."
	cd backend && npm test
	@echo "All tests completed!"

# CLEANUP COMMAND
# Removes containers, volumes, and unused Docker resources
clean:
	@echo "Cleaning up Docker resources..."
	docker-compose down -v  # Stop containers and remove volumes
	docker system prune -f  # Remove unused images, networks, containers
	@echo "Cleanup completed!"

# LOGS COMMAND
# Shows real-time logs from all services
logs:
	@echo "Showing logs from all services (Ctrl+C to exit)..."
	docker-compose logs -f

# STATUS COMMAND
# Shows status of Kubernetes pods in the dashboard namespace
status:
	@echo "Checking Kubernetes deployment status..."
	kubectl get pods -n devops-dashboard
	@echo "Use 'kubectl describe pod <pod-name> -n devops-dashboard' for details"