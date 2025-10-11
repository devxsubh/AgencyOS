# API Documentation
## Wonder Creative Studios - REST API

**Version:** 1.0.0  
**Base URL:** `https://yourdomain.com/api`  
**Last Updated:** December 2024

---

## 📋 Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Common Response Format](#common-response-format)
- [Blog APIs](#blog-apis)
- [Portfolio APIs](#portfolio-apis)
- [Pricing APIs](#pricing-apis)
- [Chatbot APIs](#chatbot-apis)
- [Chat APIs](#chat-apis)
- [Error Codes](#error-codes)

---

## Overview

This document describes the RESTful API endpoints available in the Wonder Creative Studios application. All endpoints return JSON responses and follow REST conventions.

### Base URL

- **Development:** `http://localhost:3000/api`
- **Production:** `https://yourdomain.com/api`

### Content Type

All requests and responses use `application/json` content type.

---

## Authentication

Most API endpoints in the admin section are protected by middleware. Authentication is cookie-based.

### Authentication Flow

1. User logs in via `/login` page
2. Cookie `auth-token` is set on successful authentication
3. Middleware validates cookie for `/admin/*` routes
4. API routes inherit the authentication context

**Note:** Currently, the API routes themselves don't validate authentication, but they're accessible only through admin panel which is protected by middleware.

---

## Common Response Format

### Success Response

```json
{
  "success": true,
  "data": { /* resource data */ }
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### List Response

```json
{
  "success": true,
  "blogs": [ /* array of resources */ ]
}
```

---

## Blog APIs

### 1. Get All Blogs

Retrieves a list of all blog posts, sorted by creation date (newest first).

**Endpoint:** `GET /api/blogs`

**Request:**
```bash
curl -X GET https://yourdomain.com/api/blogs
```

**Response:** `200 OK`
```json
{
  "success": true,
  "blogs": [
    {
      "_id": "6581234567890abcdef12345",
      "title": "10 Web Development Trends in 2024",
      "content": "Full blog content here...",
      "thumbnail": "https://res.cloudinary.com/...",
      "sections": [
        {
          "heading": "Introduction",
          "content": "Section content..."
        }
      ],
      "trending": true,
      "views": 1250,
      "createdAt": "2024-12-01T10:30:00.000Z"
    }
  ]
}
```

---

### 2. Get Single Blog

Retrieves a specific blog post by ID.

**Endpoint:** `GET /api/blogs/:id`

**Parameters:**
- `id` (path parameter) - MongoDB ObjectId of the blog

**Request:**
```bash
curl -X GET https://yourdomain.com/api/blogs/6581234567890abcdef12345
```

**Response:** `200 OK`
```json
{
  "success": true,
  "blog": {
    "_id": "6581234567890abcdef12345",
    "title": "10 Web Development Trends in 2024",
    "content": "Full blog content here...",
    "thumbnail": "https://res.cloudinary.com/...",
    "sections": [
      {
        "heading": "Introduction",
        "content": "Section content..."
      }
    ],
    "trending": false,
    "views": 1250,
    "createdAt": "2024-12-01T10:30:00.000Z"
  }
}
```

**Error Response:** `404 Not Found`
```json
{
  "success": false,
  "error": "Blog not found"
}
```

---

### 3. Create Blog

Creates a new blog post. (Admin only)

**Endpoint:** `POST /api/blogs`

**Request Body:**
```json
{
  "title": "New Blog Post Title",
  "content": "Full blog content...",
  "thumbnail": "https://res.cloudinary.com/...",
  "sections": [
    {
      "heading": "Section 1",
      "content": "Section content..."
    }
  ],
  "trending": false
}
```

**Request:**
```bash
curl -X POST https://yourdomain.com/api/blogs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Blog Post",
    "content": "Blog content...",
    "thumbnail": "https://...",
    "sections": []
  }'
```

**Response:** `201 Created`
```json
{
  "success": true,
  "blog": {
    "_id": "6581234567890abcdef12346",
    "title": "New Blog Post Title",
    "content": "Full blog content...",
    "thumbnail": "https://res.cloudinary.com/...",
    "sections": [],
    "trending": false,
    "views": 0,
    "createdAt": "2024-12-15T14:20:00.000Z"
  }
}
```

---

### 4. Update Blog

Updates an existing blog post. (Admin only)

**Endpoint:** `PUT /api/blogs/:id`

**Parameters:**
- `id` (path parameter) - MongoDB ObjectId of the blog

**Request Body:** (partial updates supported)
```json
{
  "title": "Updated Title",
  "trending": true
}
```

**Request:**
```bash
curl -X PUT https://yourdomain.com/api/blogs/6581234567890abcdef12345 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title", "trending": true}'
```

**Response:** `200 OK`
```json
{
  "success": true,
  "blog": {
    "_id": "6581234567890abcdef12345",
    "title": "Updated Title",
    "content": "Full blog content...",
    "thumbnail": "https://res.cloudinary.com/...",
    "sections": [],
    "trending": true,
    "views": 1250,
    "createdAt": "2024-12-01T10:30:00.000Z"
  }
}
```

**Error Response:** `404 Not Found`
```json
{
  "success": false,
  "error": "Blog not found"
}
```

---

### 5. Delete Blog

Deletes a blog post. (Admin only)

**Endpoint:** `DELETE /api/blogs/:id`

**Parameters:**
- `id` (path parameter) - MongoDB ObjectId of the blog

**Request:**
```bash
curl -X DELETE https://yourdomain.com/api/blogs/6581234567890abcdef12345
```

**Response:** `200 OK`
```json
{
  "success": true
}
```

**Error Response:** `500 Internal Server Error`
```json
{
  "success": false,
  "error": "Failed to delete blog"
}
```

---

### 6. Generate Blog Content (AI)

Generates blog content using OpenAI. (Admin only)

**Endpoint:** `POST /api/blogs/generate`

**Request Body:**
```json
{
  "topic": "The Future of AI in Web Development",
  "tone": "professional",
  "length": "medium"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "content": "Generated blog content...",
  "title": "Suggested title",
  "sections": [
    {
      "heading": "Introduction",
      "content": "Generated section content..."
    }
  ]
}
```

---

### 7. Generate Blog Image (AI)

Generates a blog thumbnail image using AI. (Admin only)

**Endpoint:** `POST /api/blogs/generate-image`

**Request Body:**
```json
{
  "prompt": "Modern web development workspace with code on screens",
  "style": "professional"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "imageUrl": "https://res.cloudinary.com/..."
}
```

---

### 8. Publish Blog

Publishes a draft blog post. (Admin only)

**Endpoint:** `POST /api/blogs/publish`

**Request Body:**
```json
{
  "blogId": "6581234567890abcdef12345"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "blog": {
    "_id": "6581234567890abcdef12345",
    "title": "Blog Title",
    "published": true,
    "publishedAt": "2024-12-15T14:20:00.000Z"
  }
}
```

---

## Portfolio APIs

### 1. Get All Portfolios

Retrieves all portfolio items, sorted by creation date.

**Endpoint:** `GET /api/portfolios`

**Request:**
```bash
curl -X GET https://yourdomain.com/api/portfolios
```

**Response:** `200 OK`
```json
{
  "success": true,
  "portfolios": [
    {
      "_id": "6581234567890abcdef12345",
      "title": "E-commerce Platform",
      "description": "Modern e-commerce solution",
      "image": "https://res.cloudinary.com/...",
      "category": "Web Development",
      "agency": "Wonder",
      "url": "https://example.com",
      "color": "#3B82F6",
      "challenge": "Client needed scalable e-commerce...",
      "solution": "We built a custom Next.js solution...",
      "result": "300% increase in sales...",
      "createdAt": "2024-11-01T10:30:00.000Z"
    }
  ]
}
```

---

### 2. Get Single Portfolio

Retrieves a specific portfolio item by ID.

**Endpoint:** `GET /api/portfolios/:id`

**Parameters:**
- `id` (path parameter) - MongoDB ObjectId of the portfolio

**Request:**
```bash
curl -X GET https://yourdomain.com/api/portfolios/6581234567890abcdef12345
```

**Response:** `200 OK`
```json
{
  "success": true,
  "portfolio": {
    "_id": "6581234567890abcdef12345",
    "title": "E-commerce Platform",
    "description": "Modern e-commerce solution",
    "image": "https://res.cloudinary.com/...",
    "category": "Web Development",
    "agency": "Wonder",
    "url": "https://example.com",
    "color": "#3B82F6",
    "challenge": "Client needed scalable e-commerce...",
    "solution": "We built a custom Next.js solution...",
    "result": "300% increase in sales...",
    "createdAt": "2024-11-01T10:30:00.000Z"
  }
}
```

---

### 3. Create Portfolio

Creates a new portfolio item. (Admin only)

**Endpoint:** `POST /api/portfolios`

**Request Body:**
```json
{
  "title": "Mobile App Project",
  "description": "Cross-platform mobile application",
  "image": "https://res.cloudinary.com/...",
  "category": "Mobile Development",
  "agency": "Wonder",
  "url": "https://example.com",
  "color": "#10B981",
  "challenge": "Challenge description...",
  "solution": "Solution description...",
  "result": "Result description..."
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "portfolio": {
    "_id": "6581234567890abcdef12347",
    "title": "Mobile App Project",
    "description": "Cross-platform mobile application",
    "image": "https://res.cloudinary.com/...",
    "category": "Mobile Development",
    "agency": "Wonder",
    "url": "https://example.com",
    "color": "#10B981",
    "challenge": "Challenge description...",
    "solution": "Solution description...",
    "result": "Result description...",
    "createdAt": "2024-12-15T14:20:00.000Z"
  }
}
```

---

### 4. Update Portfolio

Updates an existing portfolio item. (Admin only)

**Endpoint:** `PUT /api/portfolios/:id`

**Parameters:**
- `id` (path parameter) - MongoDB ObjectId of the portfolio

**Request Body:**
```json
{
  "title": "Updated Portfolio Title",
  "color": "#EF4444"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "portfolio": {
    "_id": "6581234567890abcdef12345",
    "title": "Updated Portfolio Title",
    "description": "Modern e-commerce solution",
    "color": "#EF4444",
    // ... rest of fields
  }
}
```

---

### 5. Delete Portfolio

Deletes a portfolio item. (Admin only)

**Endpoint:** `DELETE /api/portfolios/:id`

**Parameters:**
- `id` (path parameter) - MongoDB ObjectId of the portfolio

**Request:**
```bash
curl -X DELETE https://yourdomain.com/api/portfolios/6581234567890abcdef12345
```

**Response:** `200 OK`
```json
{
  "success": true
}
```

---

### 6. Publish Portfolio

Publishes a portfolio item. (Admin only)

**Endpoint:** `POST /api/portfolios/publish`

**Request Body:**
```json
{
  "portfolioId": "6581234567890abcdef12345"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "portfolio": {
    "_id": "6581234567890abcdef12345",
    "published": true
  }
}
```

---

## Pricing APIs

### 1. Get All Prices

Retrieves all pricing plans.

**Endpoint:** `GET /api/prices`

**Request:**
```bash
curl -X GET https://yourdomain.com/api/prices
```

**Response:** `200 OK`
```json
{
  "success": true,
  "prices": [
    {
      "_id": "6581234567890abcdef12345",
      "name": "Growth Plan",
      "price": "₹4,49,999",
      "description": "Perfect for growing businesses",
      "features": [
        "Custom Web Development",
        "CRM Integration",
        "SEO Optimization",
        "3 Months Support"
      ],
      "bestFor": "Small to Medium Businesses",
      "serviceType": "webapp",
      "createdAt": "2024-11-01T10:30:00.000Z",
      "updatedAt": "2024-12-01T10:30:00.000Z"
    }
  ]
}
```

---

### 2. Get Single Price

Retrieves a specific pricing plan by ID.

**Endpoint:** `GET /api/prices/:id`

**Parameters:**
- `id` (path parameter) - MongoDB ObjectId of the price

**Response:** `200 OK`
```json
{
  "success": true,
  "price": {
    "_id": "6581234567890abcdef12345",
    "name": "Growth Plan",
    "price": "₹4,49,999",
    "description": "Perfect for growing businesses",
    "features": ["..."],
    "bestFor": "Small to Medium Businesses",
    "serviceType": "webapp"
  }
}
```

---

### 3. Create Price

Creates a new pricing plan. (Admin only)

**Endpoint:** `POST /api/prices`

**Request Body:**
```json
{
  "name": "Enterprise Plan",
  "price": "₹9,99,999",
  "description": "Complete enterprise solution",
  "features": [
    "Custom Development",
    "Dedicated Team",
    "24/7 Support",
    "Advanced Analytics"
  ],
  "bestFor": "Large Enterprises",
  "serviceType": "webapp"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "price": {
    "_id": "6581234567890abcdef12348",
    "name": "Enterprise Plan",
    "price": "₹9,99,999",
    "description": "Complete enterprise solution",
    "features": ["..."],
    "bestFor": "Large Enterprises",
    "serviceType": "webapp",
    "createdAt": "2024-12-15T14:20:00.000Z"
  }
}
```

---

### 4. Update Price

Updates an existing pricing plan. (Admin only)

**Endpoint:** `PUT /api/prices/:id`

**Request Body:**
```json
{
  "price": "₹4,99,999",
  "features": ["Updated feature list"]
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "price": {
    "_id": "6581234567890abcdef12345",
    "name": "Growth Plan",
    "price": "₹4,99,999",
    // ... updated fields
  }
}
```

---

### 5. Delete Price

Deletes a pricing plan. (Admin only)

**Endpoint:** `DELETE /api/prices/:id`

**Response:** `200 OK`
```json
{
  "success": true
}
```

---

## Chatbot APIs

### 1. Send Message to Chatbot

Sends a message to the AI chatbot and receives a response.

**Endpoint:** `POST /api/chatbot`

**Request Body:**
```json
{
  "message": "What services do you offer?"
}
```

**Request:**
```bash
curl -X POST https://yourdomain.com/api/chatbot \
  -H "Content-Type: application/json" \
  -d '{"message": "What services do you offer?"}'
```

**Response:** `200 OK`
```json
{
  "success": true,
  "reply": "We offer web development, mobile app development, marketing automation, AI solutions, and branding services..."
}
```

**Notes:**
- Session ID is managed via cookies (`chat_session_id`)
- Messages are stored in database for history
- Uses OpenAI GPT-4 for responses
- System prompt configured in database

---

### 2. Get Chatbot Configuration

Retrieves the current chatbot configuration. (Admin only)

**Endpoint:** `GET /api/chatbot/config`

**Response:** `200 OK`
```json
{
  "success": true,
  "config": {
    "_id": "6581234567890abcdef12345",
    "systemPrompt": "You are WonderBot, the AI assistant for Wonder Creative Studio...",
    "createdAt": "2024-11-01T10:30:00.000Z",
    "updatedAt": "2024-12-01T10:30:00.000Z"
  }
}
```

---

### 3. Update Chatbot Configuration

Updates the chatbot system prompt and configuration. (Admin only)

**Endpoint:** `PUT /api/chatbot/config`

**Request Body:**
```json
{
  "systemPrompt": "Updated system prompt for the chatbot..."
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "config": {
    "_id": "6581234567890abcdef12345",
    "systemPrompt": "Updated system prompt...",
    "updatedAt": "2024-12-15T14:20:00.000Z"
  }
}
```

---

## Chat APIs

### 1. Get Chat History

Retrieves chat history for the current session.

**Endpoint:** `GET /api/chats`

**Query Parameters:**
- `sessionId` (optional) - Specific session ID

**Request:**
```bash
curl -X GET https://yourdomain.com/api/chats?sessionId=abc123
```

**Response:** `200 OK`
```json
{
  "success": true,
  "chats": [
    {
      "_id": "6581234567890abcdef12345",
      "sessionId": "abc123",
      "messages": [
        {
          "from": "user",
          "text": "Hello",
          "timestamp": "2024-12-15T14:00:00.000Z"
        },
        {
          "from": "bot",
          "text": "Hi! How can I help you?",
          "timestamp": "2024-12-15T14:00:01.000Z"
        }
      ],
      "createdAt": "2024-12-15T14:00:00.000Z"
    }
  ]
}
```

---

### 2. Create Chat Session

Creates a new chat session.

**Endpoint:** `POST /api/chats`

**Request Body:**
```json
{
  "sessionId": "unique-session-id"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "chat": {
    "_id": "6581234567890abcdef12345",
    "sessionId": "unique-session-id",
    "messages": [],
    "createdAt": "2024-12-15T14:20:00.000Z"
  }
}
```

---

### 3. Delete Chat History

Clears chat history. (Admin only)

**Endpoint:** `DELETE /api/chats`

**Query Parameters:**
- `sessionId` (optional) - Specific session to delete

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Chat history cleared"
}
```

---

## Error Codes

| Status Code | Meaning | Description |
|------------|---------|-------------|
| `200` | OK | Request succeeded |
| `201` | Created | Resource created successfully |
| `400` | Bad Request | Invalid request data |
| `401` | Unauthorized | Authentication required |
| `403` | Forbidden | Access denied |
| `404` | Not Found | Resource not found |
| `500` | Internal Server Error | Server error occurred |

### Common Error Responses

**Validation Error:**
```json
{
  "success": false,
  "error": "Validation failed: title is required"
}
```

**Not Found Error:**
```json
{
  "success": false,
  "error": "Blog not found"
}
```

**Server Error:**
```json
{
  "success": false,
  "error": "Failed to fetch blogs"
}
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. For production, consider:
- Implementing rate limiting per IP/user
- Using API keys for admin operations
- Setting up CORS policies

---

## Testing the API

### Using cURL

```bash
# Get all blogs
curl -X GET http://localhost:3000/api/blogs

# Create a blog
curl -X POST http://localhost:3000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Blog","content":"Content...","thumbnail":"https://..."}'
```

### Using Postman

1. Import the API endpoints
2. Set base URL to `http://localhost:3000/api`
3. Use cookie authentication for admin routes

### Using JavaScript Fetch

```javascript
// Get all blogs
const response = await fetch('/api/blogs');
const data = await response.json();

// Create a blog
const response = await fetch('/api/blogs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'New Blog',
    content: 'Content...',
    thumbnail: 'https://...'
  })
});
```

---

## Future API Enhancements

### Planned Features

1. **API Versioning** (`/api/v1/`, `/api/v2/`)
2. **Pagination** for list endpoints
3. **Search & Filtering** query parameters
4. **Sorting** options
5. **Field Selection** (partial responses)
6. **Batch Operations**
7. **WebSocket Support** for real-time updates
8. **GraphQL Alternative**
9. **API Documentation** via Swagger/OpenAPI
10. **API Keys & Token Authentication**

---

## OpenAPI Specification

For a complete OpenAPI/Swagger specification, you can generate it using tools like:
- **swagger-jsdoc** - Generate from JSDoc comments
- **swagger-autogen** - Auto-generate from routes
- **Next.js API Routes Scanner** - Custom solution

---

## Support

For API support and questions:
- Review this documentation
- Check the [Architecture Documentation](./ARCHITECTURE.md)
- Contact the development team

---

**Document Version:** 1.0.0  
**Created:** December 2024  
**Last Updated:** December 2024
