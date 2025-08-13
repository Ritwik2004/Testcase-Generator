# 🚀 GitHub Test Case Generator

A web-based application that **automatically generates test cases** directly from your GitHub repositories.  
Built to save developer time, improve testing accuracy, and enhance productivity.

## 📌 Features

- **🔐 GitHub OAuth Login**
  - Secure authentication using GitHub OAuth.
  - No need to share credentials — uses GitHub's secure login process.
  
- **📂 Repository & File Selection**
  - Browse all repositories from your GitHub account.
  - Select specific files for test case generation.
  
- **🤖 AI-Powered Test Case Generation**
  - Automatically analyzes code and generates relevant test cases.
  - Supports multiple programming languages.
  
- **📜 Test History**
  - View previously generated test cases for future reference.
  
- **📱 Responsive UI**
  - Mobile-friendly design using **React** + **TailwindCSS**.

## 🛠 Tech Stack

**Frontend**
- React.js  
- TailwindCSS  

**Backend**
- Node.js  
- Express.js  

**Integration**
- GitHub REST API  
- OAuth 2.0 Authentication  

**AI Logic**
- Custom AI-powered test case generation algorithm  

## 📦 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Ritwik2004/Testcase-Generator.git
cd github-test-case-generator
```

### 2️⃣ Install dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3️⃣ Configure environment variables
Create a `.env` file in the root directory and add:
```env
# GitHub OAuth
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret

# Security
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret

# Database 
DATABASE_URL=your_database_url

# AI Service
AI_API_KEY=your_ai_api_key
AI_API_URL=your_ai_service_url

# Environment
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### 4️⃣ Run the project
```bash
# Development mode (runs both frontend and backend)
npm run dev

# Or run separately
npm run server  # Backend on port 8000
npm run dev  # Frontend on port 5173
```

The app will be available at `http://localhost:5173`

## 📍 Usage

1. **Login** using your GitHub account.
2. **Select** a repository and browse its files.
3. **Choose** the file you want to generate test cases for.
4. **Click** Generate Test Cases — AI will handle the rest.
5. **Save** or download the generated test cases.

## 🎯 Benefits

- ⏱ **Time Saving** – No need to manually write test cases.
- ✅ **Accurate** – Reduces human errors.
- 📊 **Better Coverage** – Ensures consistent and thorough testing.
- 🛠 **Scalable** – Works for small and large projects.

## 🚨 Error Handling & Troubleshooting

### Frontend Error Handling

#### Authentication Errors
```javascript
// Common OAuth errors and solutions
const authErrorMessages = {
  'access_denied': 'GitHub authorization was denied. Please try logging in again.',
  'invalid_client': 'Invalid GitHub client configuration. Check your environment variables.',
  'network_error': 'Network connection issue. Please check your internet connection.'
};
```

#### API Request Errors
```javascript
// Centralized error handling for API calls
const handleApiError = (error) => {
  if (error.response?.status === 401) {
    return 'Session expired. Please log in again.';
  }
  if (error.response?.status === 403) {
    return 'Access denied. Check repository permissions.';
  }
  if (error.response?.status === 404) {
    return 'Resource not found. Repository or file may have been deleted.';
  }
  if (error.response?.status >= 500) {
    return 'Server error. Please try again later.';
  }
  return 'An unexpected error occurred. Please try again.';
};
```

### Backend Error Handling

#### GitHub API Integration
```javascript
// Error handling for GitHub API calls
const githubErrorHandler = (error) => {
  const status = error.response?.status;
  const message = error.response?.data?.message || 'GitHub API error';
  
  switch (status) {
    case 401:
      throw new Error('Invalid GitHub token. Please re-authenticate.');
    case 403:
      if (message.includes('rate limit')) {
        throw new Error('GitHub API rate limit exceeded. Please try again later.');
      }
      throw new Error('Insufficient permissions to access this resource.');
    case 404:
      throw new Error('Repository or resource not found.');
    default:
      throw new Error(`GitHub API error: ${message}`);
  }
};
```

#### AI Service Integration
```javascript
// Error handling for AI test generation
const aiServiceErrorHandler = (error) => {
  if (error.code === 'TIMEOUT') {
    throw new Error('AI service timeout. The file might be too large.');
  }
  if (error.response?.status === 429) {
    throw new Error('AI service rate limit exceeded. Please try again later.');
  }
  if (error.response?.status === 413) {
    throw new Error('File too large for processing. Please select a smaller file.');
  }
  throw new Error('Failed to generate test cases. Please try again.');
};
```

### Common Issues & Solutions

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| **Login fails** | Invalid GitHub OAuth config | Check `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` |
| **No repositories shown** | Token lacks permissions | Re-authenticate with broader permissions |
| **Test generation fails** | File too large/complex | Try smaller files or check AI service limits |
| **Slow performance** | Large repository/file | Implement pagination and file size limits |
| **Rate limiting** | Too many API calls | Implement caching and request throttling |

### Error Monitoring

The application includes comprehensive error logging:

- **Frontend**: Errors logged to console and user-friendly messages displayed
- **Backend**: Structured logging with error details and stack traces
- **API Integration**: Detailed logging of external service failures

### Environment-Specific Configurations

#### Development
```javascript
// Detailed error messages and stack traces
if (process.env.NODE_ENV === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack
    });
  });
}
```

#### Production
```javascript
// User-friendly error messages only
if (process.env.NODE_ENV === 'production') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: 'Something went wrong. Please try again.'
    });
  });
}
```

## 🔧 API Endpoints

### Authentication
- `GET /auth/github` - Initiate GitHub OAuth
- `GET /auth/callback` - OAuth callback handler
- `POST /auth/logout` - Logout user

### Repositories
- `GET /api/repos` - Get user repositories
- `GET /api/repos/:owner/:repo/files` - Get repository files

### Test Generation
- `POST /api/generate-tests` - Generate test cases for file
- `GET /api/test-history` - Get user's test generation history

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- 📱 **Mobile devices** (320px+)
- 📟 **Tablets** (768px+)  
- 💻 **Desktop** (1024px+)
- 🖥 **Large screens** (1440px+)

## 🧪 Testing

```bash
# Run frontend tests
cd frontend && npm test

# Run backend tests
npm run test:backend

# Run integration tests
npm run test:integration

# Generate coverage report
npm run test:coverage
```

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
GITHUB_CLIENT_ID=your_production_client_id
GITHUB_CLIENT_SECRET=your_production_client_secret
JWT_SECRET=your_strong_jwt_secret
DATABASE_URL=your_production_db_url
FRONTEND_URL=https://yourdomain.com
```

### Build Commands
```bash
# Build frontend for production
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ritwik Kundu**  
- GitHub: https://github.com/Ritwik2004
- LinkedIn: https://www.linkedin.com/in/rik09/
- Email: ritwikkundu09@gmail.com

## 🙏 Acknowledgments

- GitHub API for seamless repository integration
- React and TailwindCSS communities
- AI service providers for test generation capabilities

---

## 📊 Project Status

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

**⭐ Star this repository if you find it helpful!**
