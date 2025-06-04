# Resume Portal API Documentation

## Authentication

### Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "ADMIN | HR_MANAGER | RECRUITER"
  },
  "token": "string"
}
```

### Register
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "ADMIN | HR_MANAGER | RECRUITER"
}
```

**Response:**
```json
{
  "message": "Registration successful",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string"
  }
}
```

### Logout
```http
POST /api/auth/logout
```

**Response:**
```json
{
  "message": "Logout successful"
}
```

### Forgot Password
```http
POST /api/auth/forgot-password
```

**Request Body:**
```json
{
  "email": "string"
}
```

**Response:**
```json
{
  "message": "If the email exists, a reset link will be sent."
}
```

## Users

### List Users
```http
GET /api/users
```

**Response:**
```json
{
  "users": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "string",
      "isActive": "boolean",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

### Create User
```http
POST /api/users
```

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "role": "ADMIN | HR_MANAGER | RECRUITER",
  "isActive": "boolean"
}
```

**Response:**
```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "isActive": "boolean",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

### Get User
```http
GET /api/users/{id}
```

**Response:**
```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "isActive": "boolean",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

### Update User
```http
PUT /api/users/{id}
```

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "role": "ADMIN | HR_MANAGER | RECRUITER",
  "isActive": "boolean"
}
```

**Response:**
```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "isActive": "boolean",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

### Delete User
```http
DELETE /api/users/{id}
```

**Response:**
```json
{
  "message": "User soft-deleted"
}
```

## Email Templates

### List Templates
```http
GET /api/email-templates
```

**Response:**
```json
{
  "templates": [
    {
      "id": "string",
      "name": "string",
      "subject": "string",
      "content": "string",
      "variables": ["string"],
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

### Create Template
```http
POST /api/email-templates
```

**Request Body:**
```json
{
  "name": "string",
  "subject": "string",
  "content": "string",
  "variables": ["string"]
}
```

**Response:**
```json
{
  "template": {
    "id": "string",
    "name": "string",
    "subject": "string",
    "content": "string",
    "variables": ["string"],
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

### Get Template
```http
GET /api/email-templates/{id}
```

**Response:**
```json
{
  "template": {
    "id": "string",
    "name": "string",
    "subject": "string",
    "content": "string",
    "variables": ["string"],
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

### Update Template
```http
PUT /api/email-templates/{id}
```

**Request Body:**
```json
{
  "name": "string",
  "subject": "string",
  "content": "string",
  "variables": ["string"]
}
```

**Response:**
```json
{
  "template": {
    "id": "string",
    "name": "string",
    "subject": "string",
    "content": "string",
    "variables": ["string"],
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

### Delete Template
```http
DELETE /api/email-templates/{id}
```

**Response:**
```json
{
  "message": "Template soft-deleted"
}
```

## Email Logs

### List Email Logs
```http
GET /api/email-logs?page=1&limit=10&status=SENT&recipientId=string
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `status`: Filter by status
- `recipientId`: Filter by recipient

**Response:**
```json
{
  "logs": [
    {
      "id": "string",
      "templateId": "string",
      "recipientId": "string",
      "subject": "string",
      "content": "string",
      "status": "PENDING | SENT | FAILED | DELIVERED | OPENED",
      "errorMessage": "string",
      "sentDate": "string",
      "openedDate": "string",
      "template": {
        "id": "string",
        "name": "string"
      },
      "recipient": {
        "id": "string",
        "name": "string",
        "email": "string"
      }
    }
  ],
  "pagination": {
    "total": "number",
    "pages": "number",
    "current": "number",
    "limit": "number"
  }
}
```

### Create Email Log
```http
POST /api/email-logs
```

**Request Body:**
```json
{
  "templateId": "string",
  "recipientId": "string",
  "subject": "string",
  "content": "string",
  "status": "PENDING | SENT | FAILED | DELIVERED | OPENED",
  "errorMessage": "string"
}
```

**Response:**
```json
{
  "log": {
    "id": "string",
    "templateId": "string",
    "recipientId": "string",
    "subject": "string",
    "content": "string",
    "status": "string",
    "errorMessage": "string",
    "sentDate": "string",
    "openedDate": "string",
    "template": {
      "id": "string",
      "name": "string"
    },
    "recipient": {
      "id": "string",
      "name": "string",
      "email": "string"
    }
  }
}
```

## File Upload

### Upload File
```http
POST /api/files/upload
```

**Form Data:**
- `file`: File to upload
- `type`: File type
- `candidateId`: Associated candidate ID

**Response:**
```json
{
  "file": {
    "id": "string",
    "filename": "string",
    "originalName": "string",
    "mimeType": "string",
    "size": "number",
    "type": "string",
    "path": "string",
    "candidateId": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

## Analytics

### Get Overview
```http
GET /api/analytics/overview?timeframe=30d
```

**Query Parameters:**
- `timeframe`: 7d | 30d | 90d (default: 30d)

**Response:**
```json
{
  "timeframe": "string",
  "candidates": [
    {
      "status": "string",
      "_count": "number"
    }
  ],
  "interviews": [
    {
      "status": "string",
      "_count": "number"
    }
  ],
  "emails": [
    {
      "status": "string",
      "_count": "number"
    }
  ],
  "topSkills": [
    {
      "skill": "string",
      "_count": "number"
    }
  ]
}
```

### Get Trends
```http
GET /api/analytics/trends?metric=candidates&interval=day&limit=30
```

**Query Parameters:**
- `metric`: candidates | interviews | emails (default: candidates)
- `interval`: hour | day | week | month (default: day)
- `limit`: Number of data points (default: 30)

**Response:**
```json
{
  "data": [
    {
      "date": "string",
      "total": "number",
      "byStatus": {
        "status": "number"
      }
    }
  ]
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Invalid input",
  "details": [
    {
      "path": ["string"],
      "message": "string"
    }
  ]
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Authentication

All endpoints except `/api/auth/*` require authentication. Include the JWT token in the Authorization header:

```http
Authorization: Bearer <token>
```

## Rate Limiting

API endpoints are rate-limited to prevent abuse. The current limits are:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

## Pagination

Endpoints that return lists support pagination using the following query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

The response includes pagination metadata:
```json
{
  "pagination": {
    "total": "number",
    "pages": "number",
    "current": "number",
    "limit": "number"
  }
}
``` 