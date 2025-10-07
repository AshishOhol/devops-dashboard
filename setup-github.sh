#!/bin/bash

# DevOps Dashboard - GitHub Setup Script
# This script helps you initialize and push your project to GitHub

echo "========================================"
echo "  DevOps Dashboard - GitHub Setup"
echo "========================================"
echo

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "ERROR: Git is not installed"
    echo "Please install Git from https://git-scm.com/"
    exit 1
fi

echo "Git is installed ✓"
echo

# Initialize Git repository if not already initialized
if [ ! -d .git ]; then
    echo "Initializing Git repository..."
    git init
    echo "Git repository initialized ✓"
else
    echo "Git repository already exists ✓"
fi

echo
echo "Setting up Git configuration..."
read -p "Please enter your GitHub username: " GITHUB_USERNAME
read -p "Please enter your email address: " GITHUB_EMAIL

# Set Git configuration
git config user.name "$GITHUB_USERNAME"
git config user.email "$GITHUB_EMAIL"

echo "Git configuration set ✓"
echo

# Add all files to Git
echo "Adding files to Git..."
git add .

# Create initial commit
echo "Creating initial commit..."
git commit -m "Initial commit: DevOps Dashboard with real-time monitoring

Features:
- React frontend with real-time charts
- Node.js backend with REST API
- Docker containerization
- Kubernetes deployment manifests
- CI/CD pipeline with GitHub Actions
- Comprehensive monitoring and alerting"

echo "Initial commit created ✓"
echo

echo "========================================"
echo "  Next Steps:"
echo "========================================"
echo
echo "1. Create a new repository on GitHub:"
echo "   - Go to https://github.com/new"
echo "   - Repository name: devops-dashboard"
echo "   - Description: Real-time DevOps monitoring dashboard"
echo "   - Make it Public (recommended for open source)"
echo "   - Do NOT initialize with README (we already have one)"
echo
echo "2. After creating the repository, run these commands:"
echo "   git remote add origin https://github.com/$GITHUB_USERNAME/devops-dashboard.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo
echo "3. Your repository will be available at:"
echo "   https://github.com/$GITHUB_USERNAME/devops-dashboard"
echo
echo "========================================"
echo "  Repository Contents:"
echo "========================================"
echo
echo "✓ Complete source code with detailed comments"
echo "✓ Docker containerization setup"
echo "✓ Kubernetes deployment manifests"
echo "✓ CI/CD pipeline with GitHub Actions"
echo "✓ Comprehensive README.md"
echo "✓ Contributing guidelines"
echo "✓ MIT License"
echo "✓ .gitignore for Node.js projects"
echo

# Try to open GitHub in browser (works on most systems)
if command -v xdg-open &> /dev/null; then
    echo "Opening GitHub in your browser..."
    xdg-open https://github.com/new
elif command -v open &> /dev/null; then
    echo "Opening GitHub in your browser..."
    open https://github.com/new
fi

echo
echo "Setup completed! Follow the next steps above to push to GitHub."