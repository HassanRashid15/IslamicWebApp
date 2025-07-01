# Islamic Web App - Backend Server

A secure Node.js/Express backend with MongoDB for the Islamic Web App authentication system.

## 🚀 Features

- **User Authentication**: Registration, login, logout
- **Password Management**: Forgot password, reset password
- **JWT Security**: Secure token-based authentication
- **Input Validation**: Comprehensive data validation
- **Rate Limiting**: Protection against brute force attacks
- **CORS Support**: Cross-origin resource sharing
- **MongoDB Integration**: NoSQL database with Mongoose ODM

## 📋 Prerequisites

Before running the server, make sure you have:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🛠️ Installation

1. **Navigate to the server directory:**

   ```bash
   cd server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create environment file:**

   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables in `.env`:**

   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/islamic-app
   # For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/islamic-app

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d

   # Client URL
   CLIENT_URL=http://localhost:3000
   ```

## 🗄️ Database Setup

### Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service:

   ```bash
   # Windows
   net start MongoDB

   # macOS (with Homebrew)
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod
   ```

### MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string and update `MONGODB_URI` in `.env`

## 🏃‍♂️ Running the Server

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Authentication Routes

| Method | Endpoint                          | Description               | Auth Required |
| ------ | --------------------------------- | ------------------------- | ------------- |
| POST   | `/api/auth/register`              | Register new user         | No            |
| POST   | `/api/auth/login`                 | Login user                | No            |
| GET    | `/api/auth/me`                    | Get current user          | Yes           |
| POST   | `/api/auth/forgot-password`       | Send password reset email | No            |
| PUT    | `/api/auth/reset-password/:token` | Reset password            | No            |
| GET    | `/api/auth/logout`                | Logout user               | Yes           |

### Health Check

| Method | Endpoint      | Description          |
| ------ | ------------- | -------------------- |
| GET    | `/api/health` | Server health status |

## 🔐 API Usage Examples

### Register User

```javascript
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "Ahmed",
  "lastName": "Ali",
  "email": "ahmed@example.com",
  "password": "StrongPass123",
  "confirmPassword": "StrongPass123"
}
```

### Login User

```javascript
POST /api/auth/login
Content-Type: application/json

{
  "email": "ahmed@example.com",
  "password": "StrongPass123"
}
```

### Get Current User

```javascript
GET /api/auth/me
Authorization: Bearer <jwt_token>
```

### Forgot Password

```javascript
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "ahmed@example.com"
}
```

### Reset Password

```javascript
PUT /api/auth/reset-password/reset_token_here
Content-Type: application/json

{
  "password": "NewStrongPass123"
}
```

## 🔒 Security Features

- **Password Hashing**: bcryptjs with 12 salt rounds
- **JWT Tokens**: Secure authentication tokens
- **Rate Limiting**: 100 requests per 15 minutes
- **Input Validation**: express-validator for data validation
- **Helmet**: Security headers protection
- **CORS**: Controlled cross-origin access

## 📁 Project Structure

```
server/
├── config/
│   ├── database.js      # MongoDB connection
│   └── config.js        # Environment configuration
├── controllers/
│   └── authController.js # Authentication logic
├── middleware/
│   ├── auth.js          # JWT authentication middleware
│   └── validation.js    # Input validation rules
├── models/
│   └── User.js          # User model schema
├── routes/
│   └── auth.js          # Authentication routes
├── .env.example         # Environment variables template
├── package.json         # Dependencies and scripts
├── server.js           # Main server file
└── README.md           # This file
```

## 🧪 Testing the API

You can test the API using:

- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [Thunder Client](https://www.thunderclient.com/) (VS Code extension)
- curl commands

### Example curl request:

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Ahmed",
    "lastName": "Ali",
    "email": "ahmed@example.com",
    "password": "StrongPass123",
    "confirmPassword": "StrongPass123"
  }'
```

## 🚀 Deployment

### Environment Setup for Production

1. Set `NODE_ENV=production` in your environment
2. Use a strong `JWT_SECRET`
3. Use MongoDB Atlas or a production MongoDB instance
4. Enable HTTPS in production

### Deployment Platforms

- [Heroku](https://heroku.com/)
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [Digital Ocean](https://www.digitalocean.com/)
- [AWS](https://aws.amazon.com/)

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Check if MongoDB is running
   - Verify connection string in `.env`
   - Check firewall settings

2. **JWT Token Issues**

   - Ensure JWT_SECRET is set
   - Check token expiration
   - Verify Authorization header format

3. **CORS Errors**

   - Check CLIENT_URL in `.env`
   - Verify frontend URL matches

4. **Validation Errors**
   - Check request body format
   - Ensure all required fields are provided
   - Verify data types match schema

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter any issues or have questions, please create an issue in the repository.

---

**Made with ❤️ for the Islamic community**
