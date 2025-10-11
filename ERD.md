# Entity Relationship Diagram (ERD)
## Wonder Creative Studios - Database Schema

**Version:** 1.0.0  
**Database:** MongoDB  
**Last Updated:** December 2024

---

## 📋 Table of Contents

- [Overview](#overview)
- [Database Architecture](#database-architecture)
- [Collections](#collections)
- [Schema Definitions](#schema-definitions)
- [Relationships](#relationships)
- [Indexes](#indexes)
- [Data Flow](#data-flow)

---

## Overview

Wonder Creative Studios uses MongoDB as its primary database. The schema is designed to support content management for blogs, portfolios, pricing, and chatbot functionality.

### Database Information

- **Database Type:** MongoDB (NoSQL)
- **ORM/ODM:** Mongoose 8.14.0
- **Connection:** MongoDB Atlas / Local MongoDB
- **Collections:** 5 main collections

---

## Database Architecture

```
MongoDB Database: wonder-creative-studios
│
├── blogs                    (Blog posts)
├── portfolios              (Portfolio items)
├── prices                  (Pricing plans)
├── chats                   (Chat sessions)
└── chatbotconfigs          (Chatbot configuration)
```

---

## Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         DATABASE SCHEMA                              │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────┐
│        blogs            │
├─────────────────────────┤
│ _id: ObjectId (PK)      │
│ title: String           │
│ content: String         │
│ thumbnail: String       │
│ sections: Array         │
│   ├─ heading: String    │
│   └─ content: String    │
│ trending: Boolean       │
│ views: Number           │
│ createdAt: Date         │
└─────────────────────────┘

┌─────────────────────────┐
│      portfolios         │
├─────────────────────────┤
│ _id: ObjectId (PK)      │
│ title: String           │
│ description: String     │
│ image: String           │
│ category: String        │
│ agency: String          │
│ url: String             │
│ color: String           │
│ challenge: String       │
│ solution: String        │
│ result: String          │
│ createdAt: Date         │
└─────────────────────────┘

┌─────────────────────────┐
│        prices           │
├─────────────────────────┤
│ _id: ObjectId (PK)      │
│ name: String            │
│ price: String           │
│ description: String     │
│ features: [String]      │
│ bestFor: String         │
│ serviceType: String     │
│ createdAt: Date         │
│ updatedAt: Date         │
└─────────────────────────┘

┌─────────────────────────┐
│         chats           │
├─────────────────────────┤
│ _id: ObjectId (PK)      │
│ userId: String          │
│ sessionId: String       │◄───┐
│ messages: Array         │    │ Session-based
│   ├─ from: String       │    │ relationship
│   ├─ text: String       │    │
│   └─ timestamp: Date    │    │
│ systemPrompt: String    │    │
│ createdAt: Date         │    │
└─────────────────────────┘    │
                               │
┌─────────────────────────┐    │
│   chatbotconfigs        │    │
├─────────────────────────┤    │
│ _id: ObjectId (PK)      │    │
│ systemPrompt: String    │────┘ Used by chatbot
│ createdAt: Date         │
│ updatedAt: Date         │
└─────────────────────────┘
```

---

## Schema Definitions

### 1. Blog Collection

**Collection Name:** `blogs`

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Auto | - | Unique identifier |
| `title` | String | Yes | - | Blog post title |
| `content` | String | Yes | - | Full blog content (markdown/HTML) |
| `thumbnail` | String (URL) | Yes | - | Featured image URL (Cloudinary) |
| `sections` | Array | No | [] | Array of content sections |
| `sections.heading` | String | No | - | Section heading |
| `sections.content` | String | No | - | Section content |
| `trending` | Boolean | No | false | Whether blog is trending |
| `views` | Number | No | 0 | View count |
| `createdAt` | Date | Auto | Date.now | Creation timestamp |

**Mongoose Schema:**
```javascript
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  thumbnail: { type: String, required: true },
  sections: [{
    heading: String,
    content: String
  }],
  createdAt: { type: Date, default: Date.now },
  trending: { type: Boolean, default: false },
  views: { type: Number, default: 0 }
});
```

**Example Document:**
```json
{
  "_id": "6581234567890abcdef12345",
  "title": "10 Web Development Trends in 2024",
  "content": "In this comprehensive guide, we explore...",
  "thumbnail": "https://res.cloudinary.com/wonder/image/upload/v1234/blog-thumb.jpg",
  "sections": [
    {
      "heading": "Introduction",
      "content": "Web development is constantly evolving..."
    },
    {
      "heading": "Trend 1: AI Integration",
      "content": "Artificial Intelligence is becoming..."
    }
  ],
  "trending": true,
  "views": 1250,
  "createdAt": "2024-12-01T10:30:00.000Z"
}
```

---

### 2. Portfolio Collection

**Collection Name:** `portfolios`

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Auto | - | Unique identifier |
| `title` | String | Yes | - | Project title |
| `description` | String | Yes | - | Project description |
| `image` | String (URL) | Yes | - | Project image URL |
| `category` | String | Yes | - | Project category (e.g., "Web Development") |
| `agency` | String | Yes | "Wonder" | Agency name |
| `url` | String (URL) | No | - | Live project URL |
| `color` | String (Hex) | No | "#3B82F6" | Theme color for display |
| `challenge` | String | Yes | - | Client challenge description |
| `solution` | String | Yes | - | Solution provided |
| `result` | String | Yes | - | Project results/outcomes |
| `createdAt` | Date | Auto | Date.now | Creation timestamp |

**Mongoose Schema:**
```javascript
const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  agency: { type: String, required: true, default: 'Wonder' },
  url: { type: String, required: false },
  color: { type: String, required: false, default: '#3B82F6' },
  challenge: { type: String, required: true },
  solution: { type: String, required: true },
  result: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
```

**Example Document:**
```json
{
  "_id": "6581234567890abcdef12346",
  "title": "Modern E-commerce Platform",
  "description": "A fully responsive e-commerce solution built with Next.js",
  "image": "https://res.cloudinary.com/wonder/image/upload/v1234/portfolio-ecom.jpg",
  "category": "Web Development",
  "agency": "Wonder",
  "url": "https://example-store.com",
  "color": "#10B981",
  "challenge": "Client needed a scalable e-commerce platform that could handle high traffic during sales events.",
  "solution": "We built a modern Next.js application with server-side rendering, optimized images, and integrated payment gateways.",
  "result": "300% increase in online sales, 50% faster page load times, and 95% customer satisfaction rate.",
  "createdAt": "2024-11-15T10:30:00.000Z"
}
```

---

### 3. Price Collection

**Collection Name:** `prices`

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Auto | - | Unique identifier |
| `name` | String | Yes | - | Plan name |
| `price` | String | Yes | - | Price (formatted string) |
| `description` | String | Yes | - | Plan description |
| `features` | [String] | No | [] | List of features |
| `bestFor` | String | Yes | - | Target audience |
| `serviceType` | String | Yes | - | Service category (webapp/automation/marketing) |
| `createdAt` | Date | Auto | Date.now | Creation timestamp |
| `updatedAt` | Date | Auto | Date.now | Last update timestamp |

**Mongoose Schema:**
```javascript
const PriceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  features: [{ type: String }],
  bestFor: { type: String, required: true },
  serviceType: { type: String, required: true },
}, { timestamps: true });
```

**Example Document:**
```json
{
  "_id": "6581234567890abcdef12347",
  "name": "Growth Plan",
  "price": "₹4,49,999",
  "description": "Perfect for growing businesses looking to scale",
  "features": [
    "Custom Web Development",
    "CRM Integration",
    "SEO Optimization",
    "Mobile Responsive Design",
    "3 Months Support",
    "Performance Optimization"
  ],
  "bestFor": "Small to Medium Businesses",
  "serviceType": "webapp",
  "createdAt": "2024-11-01T10:30:00.000Z",
  "updatedAt": "2024-12-01T15:45:00.000Z"
}
```

---

### 4. Chat Collection

**Collection Name:** `chats`

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Auto | - | Unique identifier |
| `userId` | String | No | - | User identifier (if logged in) |
| `sessionId` | String | No | - | Session identifier (cookie-based) |
| `messages` | Array | Yes | [] | Array of chat messages |
| `messages.from` | String | Yes | - | Sender ("user" or "bot") |
| `messages.text` | String | Yes | - | Message content |
| `messages.timestamp` | Date | Auto | Date.now | Message timestamp |
| `systemPrompt` | String | No | - | Custom system prompt (optional) |
| `createdAt` | Date | Auto | Date.now | Session creation timestamp |

**Mongoose Schema:**
```javascript
const chatSchema = new mongoose.Schema({
  userId: { type: String, required: false },
  sessionId: { type: String, required: false },
  messages: [{
    from: {
      type: String,
      enum: ['user', 'bot'],
      required: true
    },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }],
  systemPrompt: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});
```

**Example Document:**
```json
{
  "_id": "6581234567890abcdef12348",
  "userId": null,
  "sessionId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "messages": [
    {
      "from": "user",
      "text": "What services do you offer?",
      "timestamp": "2024-12-15T14:00:00.000Z"
    },
    {
      "from": "bot",
      "text": "We offer web development, mobile app development, marketing automation, AI solutions, and branding services. Would you like to know more about any specific service?",
      "timestamp": "2024-12-15T14:00:02.000Z"
    },
    {
      "from": "user",
      "text": "Tell me about web development",
      "timestamp": "2024-12-15T14:00:30.000Z"
    },
    {
      "from": "bot",
      "text": "Our web development services include custom website development using modern technologies like Next.js, React, and Node.js. We build responsive, fast, and SEO-optimized websites starting from ₹4,49,999.",
      "timestamp": "2024-12-15T14:00:33.000Z"
    }
  ],
  "systemPrompt": null,
  "createdAt": "2024-12-15T14:00:00.000Z"
}
```

---

### 5. ChatbotConfig Collection

**Collection Name:** `chatbotconfigs`

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Auto | - | Unique identifier |
| `systemPrompt` | String | Yes | - | System prompt for OpenAI |
| `createdAt` | Date | Auto | Date.now | Creation timestamp |
| `updatedAt` | Date | Auto | Date.now | Last update timestamp |

**Mongoose Schema:**
```javascript
const chatbotConfigSchema = new mongoose.Schema({
  systemPrompt: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
```

**Example Document:**
```json
{
  "_id": "6581234567890abcdef12349",
  "systemPrompt": "You are WonderBot, the innovative AI assistant for Wonder Creative Studio. You combine technical expertise with a friendly, consultative approach. Your personality is tech-savvy, creative, and solution-oriented.\n\nCORE SERVICES:\n1. Web & App Development (₹4,49,999 - ₹5,49,999)\n2. Marketing Automation (from ₹60,000)\n3. Branding & Design (from ₹50,000)\n4. Digital Marketing (from ₹50,000/month)\n\nAlways be professional, provide accurate information, and encourage users to book a consultation for detailed discussions.",
  "createdAt": "2024-11-01T10:30:00.000Z",
  "updatedAt": "2024-12-15T09:15:00.000Z"
}
```

---

## Relationships

### Relationship Summary

The database primarily uses a **document-based** approach with minimal relationships:

1. **No Direct Foreign Keys:** MongoDB collections are independent
2. **Session-Based Linking:** Chats linked to sessions via `sessionId` (stored in cookies)
3. **Configuration Reference:** Chatbot uses latest config from `chatbotconfigs`

### Logical Relationships

```
┌──────────────┐
│   chats      │
│              │
│ sessionId    │◄─────── Cookie: chat_session_id
│              │         (Client-side storage)
└──────────────┘

┌──────────────┐
│chatbotconfigs│
│              │
│systemPrompt  │◄─────── Latest config used by
│              │         /api/chatbot route
└──────────────┘
```

---

## Indexes

### Recommended Indexes

To optimize query performance, consider creating these indexes:

#### blogs Collection
```javascript
// Index for sorting by creation date
db.blogs.createIndex({ "createdAt": -1 })

// Index for trending blogs
db.blogs.createIndex({ "trending": 1, "createdAt": -1 })

// Text index for search
db.blogs.createIndex({ "title": "text", "content": "text" })
```

#### portfolios Collection
```javascript
// Index for sorting by creation date
db.portfolios.createIndex({ "createdAt": -1 })

// Index for filtering by category
db.portfolios.createIndex({ "category": 1, "createdAt": -1 })
```

#### prices Collection
```javascript
// Index for filtering by service type
db.prices.createIndex({ "serviceType": 1 })
```

#### chats Collection
```javascript
// Index for finding chats by session
db.chats.createIndex({ "sessionId": 1 })

// Index for finding user chats
db.chats.createIndex({ "userId": 1, "createdAt": -1 })

// TTL index to auto-delete old chats (30 days)
db.chats.createIndex(
  { "createdAt": 1 },
  { expireAfterSeconds: 2592000 }
)
```

#### chatbotconfigs Collection
```javascript
// Index for getting latest config
db.chatbotconfigs.createIndex({ "updatedAt": -1 })
```

---

## Data Flow

### Blog Creation Flow

```
Admin Panel
    │
    ▼
POST /api/blogs
    │
    ▼
Mongoose Validation
    │
    ▼
blogs.insertOne()
    │
    ▼
MongoDB: blogs collection
    │
    ▼
Return created blog
```

### Chatbot Conversation Flow

```
User Message
    │
    ▼
POST /api/chatbot
    │
    ├─► Get/Create sessionId (cookie)
    │
    ├─► Fetch latest chatbotconfig
    │       │
    │       ▼
    │   chatbotconfigs.findOne().sort({ updatedAt: -1 })
    │
    ├─► Call OpenAI API
    │       │
    │       ▼
    │   GPT-4 Response
    │
    └─► Save conversation
            │
            ▼
        chats.findOne({ sessionId })
            │
            ▼
        Append messages
            │
            ▼
        chats.save()
```

---

## Database Connection

### Connection Configuration

```javascript
// utils/database.ts
import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI!);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};
```

### Environment Variables

```env
MONGODB_URI=mongodb://localhost:27017/wonder-creative-studios
# or
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wonder-creative-studios
```

---

## Data Validation

### Mongoose Validation

All schemas include validation rules:

1. **Required Fields:** Marked with `required: true`
2. **Type Validation:** Automatic type checking
3. **Enum Validation:** For fields like `messages.from`
4. **Default Values:** Auto-populated fields

### Application-Level Validation

Additional validation using **Zod** schemas:

```typescript
// Example: Blog validation
import { z } from 'zod';

const blogSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(100),
  thumbnail: z.string().url(),
  sections: z.array(z.object({
    heading: z.string(),
    content: z.string()
  })).optional()
});
```

---

## Backup & Recovery

### Recommended Backup Strategy

1. **MongoDB Atlas Automated Backups** (if using Atlas)
   - Continuous backups
   - Point-in-time recovery
   - Snapshot retention

2. **Manual Backups**
   ```bash
   # Export entire database
   mongodump --uri="mongodb://connection-string" --out=/backup/path
   
   # Export specific collection
   mongoexport --uri="mongodb://connection-string" --collection=blogs --out=blogs.json
   ```

3. **Restore from Backup**
   ```bash
   # Restore entire database
   mongorestore --uri="mongodb://connection-string" /backup/path
   
   # Restore specific collection
   mongoimport --uri="mongodb://connection-string" --collection=blogs --file=blogs.json
   ```

---

## Database Migrations

### Current Approach

- **No formal migration system** currently in place
- Schema changes handled via Mongoose models
- Manual data updates when needed

### Recommended for Production

Consider implementing:
1. **migrate-mongo** - MongoDB migration tool
2. **Version-controlled migrations**
3. **Rollback capabilities**

---

## Performance Considerations

### Query Optimization

1. **Use Indexes:** Create indexes for frequently queried fields
2. **Limit Fields:** Use projection to fetch only needed fields
3. **Pagination:** Implement pagination for large datasets
4. **Aggregation:** Use aggregation pipeline for complex queries

### Connection Pooling

Mongoose automatically handles connection pooling. Default settings are suitable for most use cases.

---

## Security

### Database Security Measures

1. **Connection String:** Stored in environment variables
2. **Network Access:** Whitelist IP addresses (MongoDB Atlas)
3. **Authentication:** Username/password authentication
4. **Encryption:** TLS/SSL for connections
5. **Input Sanitization:** Mongoose handles basic sanitization

---

## Future Enhancements

### Planned Schema Changes

1. **User Collection:** For proper user management
2. **Comments Collection:** For blog comments
3. **Analytics Collection:** For tracking metrics
4. **Media Collection:** For managing uploaded files
5. **Tags/Categories:** Better content organization

---

## Visual ERD Export

For visual ERD diagrams, you can use tools like:

- **MongoDB Compass** - Built-in schema visualization
- **dbdiagram.io** - Online ERD tool
- **DrawSQL** - Database design tool
- **Lucidchart** - Professional diagrams

### Generate ERD from Schema

```bash
# Install mongo-to-erd
npm install -g mongo-to-erd

# Generate ERD
mongo-to-erd --uri "mongodb://connection-string" --output ./erd.png
```

---

## Related Documentation

- [API Documentation](./API.md)
- [Architecture Documentation](./ARCHITECTURE.md)
- [Environment Configuration](./.env.example)

---

**Document Version:** 1.0.0  
**Created:** December 2024  
**Last Updated:** December 2024  
**Next Review:** March 2025
