# Frontend-Backend Integration Guide

## Overview
This document outlines the integration between the Doctors Network frontend and backend using REST APIs and Socket.io for real-time functionality.

## Environment Setup
1. Copy `.env.example` to `.env`
2. Set your backend URL in `.env`:
   ```
   VITE_BACKEND_URL=http://localhost:5000
   ```

## Authentication Flow

### 1. User Registration
- Endpoint: `POST /api/auth/register`
- Component: `Register.jsx`
- Flow: Form validation → API call → Token storage → Socket connection

### 2. User Login
- Endpoint: `POST /api/auth/login`
- Component: `Login.jsx`
- Flow: Form validation → API call → Token storage → Socket connection

### 3. Authentication Check
- Endpoint: `GET /api/auth/check`
- Triggered on app load and token validation
- Restores user session and connects socket

### 4. Profile Update
- Endpoint: `PUT /api/auth/update-profile`
- Updates user information in backend and local state

### 5. Logout
- Clears token, user state, and disconnects socket

## Socket Integration
- Real-time connection using Socket.io
- Tracks online users
- Automatic connection on successful authentication
- Disconnection on logout

## Key Components

### AuthContext
- Centralized authentication state management
- Token handling with localStorage persistence
- Socket connection management
- API integration with axios

### useAuth Hook
- Custom hook for easy access to auth context
- Provides: `token`, `authUser`, `socket`, `onlineUser`, `login`, `logout`, `updateProfile`

## API Endpoints Used
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `GET /api/auth/check` - Token validation
- `PUT /api/auth/update-profile` - Profile updates

## Error Handling
- Toast notifications for user feedback
- Form validation with error messages
- API error handling with user-friendly messages

## Dependencies
- `axios` - HTTP client for API calls
- `socket.io-client` - Real-time communication
- `react-hot-toast` - Notification system

## Usage Example
```javascript
import { useAuth } from './hooks/useAuth';

const MyComponent = () => {
    const { login, logout, authUser, onlineUser } = useAuth();
    
    const handleLogin = async (credentials) => {
        await login('login', credentials);
    };
    
    return (
        <div>
            {authUser && <p>Welcome, {authUser.fullName}</p>}
            <button onClick={handleLogin}>Login</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};
```
