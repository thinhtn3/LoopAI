# AI Agent Backend

A Node.js/Express backend following MVC architecture for the AI Agent technical interview platform.

## 🏗️ Project Structure

```
backend/
├── config/          # Configuration files (database, etc.)
├── controllers/     # Business logic and request handlers
├── middleware/      # Custom middleware (auth, validation, etc.)
├── models/          # Database models and schemas
├── routes/          # API route definitions
├── services/        # Business services and external API calls
├── utils/           # Utility functions and helpers
├── views/           # Template views (if using server-side rendering)
├── server.js        # Main application entry point
├── package.json     # Dependencies and scripts
└── env.example      # Environment variables template
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `CORS_ORIGIN`: Allowed CORS origin

### Database
The backend uses MongoDB with Mongoose ODM. Models include:
- **User**: Authentication and profile management
- **Interview**: Interview sessions and results

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Interviews
- `GET /api/interviews` - Get user interviews (protected)
- `POST /api/interviews` - Create new interview (protected)
- `GET /api/interviews/:id` - Get interview by ID (protected)
- `PUT /api/interviews/:id` - Update interview (protected)
- `DELETE /api/interviews/:id` - Delete interview (protected)

### Users
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `GET /api/users/interviews` - Get user interview history (protected)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:
- Include `Authorization: Bearer <token>` header for protected routes
- Tokens expire after 7 days
- Password hashing with bcrypt

## 🛡️ Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Input Validation**: Express-validator for request validation
- **Password Hashing**: bcrypt for secure password storage
- **JWT**: Secure token-based authentication

## 🧪 Testing

```bash
npm test
```

## 📝 TODO

- [ ] Implement interview controller
- [ ] Implement user controller
- [ ] Add code execution service
- [ ] Add AI interview service
- [ ] Add comprehensive error handling
- [ ] Add logging system
- [ ] Add rate limiting
- [ ] Add API documentation

## 🤝 Contributing

1. Follow MVC architecture patterns
2. Add proper error handling
3. Include input validation
4. Write tests for new features
5. Update documentation
