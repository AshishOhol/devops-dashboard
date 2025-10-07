# Contributing to DevOps Dashboard

Thank you for your interest in contributing to the DevOps Dashboard project! 🎉

## 🤝 How to Contribute

### 1. Fork the Repository
- Click the "Fork" button on the GitHub repository page
- Clone your fork locally:
```bash
git clone https://github.com/yourusername/devops-dashboard.git
cd devops-dashboard
```

### 2. Set Up Development Environment
```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Start development servers
make up  # or docker-compose up -d
```

### 3. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b bugfix/issue-description
```

### 4. Make Your Changes
- Write clean, well-commented code
- Follow existing code style and patterns
- Add tests for new functionality
- Update documentation as needed

### 5. Test Your Changes
```bash
# Run tests
make test

# Test manually
npm start  # in both frontend and backend directories

# Test Docker build
make build
```

### 6. Commit Your Changes
```bash
git add .
git commit -m "feat: add new monitoring feature"
# or
git commit -m "fix: resolve memory leak in metrics collection"
```

### 7. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```
Then create a Pull Request on GitHub.

## 📝 Commit Message Guidelines

Use conventional commits format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## 🐛 Reporting Issues

When reporting issues, please include:
- Operating system and version
- Node.js version
- Docker version (if applicable)
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots (if applicable)

## 💡 Feature Requests

We welcome feature requests! Please:
- Check existing issues first
- Describe the use case
- Explain why it would be valuable
- Consider implementation complexity

## 🔍 Code Review Process

All contributions go through code review:
- Maintainers will review your PR
- Address any feedback promptly
- Keep discussions respectful and constructive
- Be patient - reviews take time

## 📋 Development Guidelines

### Code Style
- Use meaningful variable names
- Add comments for complex logic
- Follow existing patterns
- Keep functions small and focused

### Testing
- Write unit tests for new features
- Ensure all tests pass
- Test both happy path and edge cases
- Include integration tests where appropriate

### Documentation
- Update README.md for new features
- Add inline code comments
- Update API documentation
- Include usage examples

## 🚀 Areas for Contribution

We especially welcome contributions in:
- **New Metrics**: Additional system monitoring capabilities
- **Visualizations**: New chart types and dashboards
- **Alerts**: Enhanced alerting mechanisms
- **Performance**: Optimization improvements
- **Documentation**: Better guides and examples
- **Testing**: Improved test coverage
- **DevOps**: CI/CD pipeline enhancements

## 📞 Getting Help

Need help contributing?
- Check existing issues and discussions
- Ask questions in GitHub Discussions
- Reach out to maintainers

## 🙏 Recognition

Contributors will be:
- Listed in the README.md
- Mentioned in release notes
- Given credit for their contributions

Thank you for making DevOps Dashboard better! 🚀