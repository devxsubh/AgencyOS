# Architecture Documentation
## Wonder Creative Studios - Next.js Application

**Version:** 1.0.0  
**Last Updated:** December 2024  
**Document Owner:** Development Team

---

## 📊 Architecture Overview

Wonder Creative Studios is a full-stack Next.js application following a modern, scalable architecture with clear separation between client-facing and administrative functionalities.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Client Layer (Browser)                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────┐        ┌──────────────────────┐          │
│  │   Marketing Site     │        │    Admin Panel       │          │
│  │  (Public Access)     │        │  (Protected Access)  │          │
│  │                      │        │                      │          │
│  │ • Homepage           │        │ • Dashboard          │          │
│  │ • Services Pages     │        │ • Blog Management    │          │
│  │ • Portfolio          │        │ • Portfolio Mgmt     │          │
│  │ • Blog (Read)        │        │ • Pricing Config     │          │
│  │ • Contact Forms      │        │ • Chatbot Config     │          │
│  │ • Chatbot Widget     │        │ • Settings           │          │
│  └──────────────────────┘        └──────────────────────┘          │
│                                                                       │
└───────────────────────────┬───────────────────────────────────────┘
                            │
                            │ HTTPS / REST API
                            │
┌───────────────────────────▼───────────────────────────────────────┐
│                    Application Layer (Next.js)                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                   Next.js App Router                          │  │
│  │                                                               │  │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐ │  │
│  │  │   Route Groups │  │   Middleware   │  │   API Routes   │ │  │
│  │  │                │  │                │  │                │ │  │
│  │  │ • (marketing)  │  │ • Auth Check   │  │ • /api/blogs   │ │  │
│  │  │ • (admin)      │  │ • Cookie Mgmt  │  │ • /api/port.   │ │  │
│  │  │ • /login       │  │ • Redirects    │  │ • /api/prices  │ │  │
│  │  └────────────────┘  └────────────────┘  │ • /api/chatbot │ │  │
│  │                                           └────────────────┘ │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                   React Components Layer                      │  │
│  │                                                               │  │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌──────────┐ │  │
│  │  │ Marketing │  │   Admin   │  │  Shared   │  │   UI     │ │  │
│  │  │Components │  │Components │  │Components │  │Components│ │  │
│  │  └───────────┘  └───────────┘  └───────────┘  └──────────┘ │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                   Business Logic Layer                        │  │
│  │                                                               │  │
│  │  • Authentication (Context API)                              │  │
│  │  • State Management                                          │  │
│  │  • API Integration                                           │  │
│  │  • Form Validation (React Hook Form + Zod)                  │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                       │
└───────────────────────────┬───────────────────────────────────────┘
                            │
                            │ Mongoose ODM
                            │
┌───────────────────────────▼───────────────────────────────────────┐
│                      Data Layer (MongoDB)                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌──────────┐ │
│  │   blogs     │  │ portfolios  │  │   prices    │  │  chats   │ │
│  │ Collection  │  │ Collection  │  │ Collection  │  │Collection│ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └──────────┘ │
│                                                                       │
│  ┌─────────────────────────────┐                                    │
│  │   chatbot_configs           │                                    │
│  │   Collection                │                                    │
│  └─────────────────────────────┘                                    │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    External Services Layer                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│  │  Cloudinary  │  │    OpenAI    │  │  Vercel KV   │             │
│  │    (CDN)     │  │    (AI)      │  │   (Cache)    │             │
│  └──────────────┘  └──────────────┘  └──────────────┘             │
│                                                                       │
│  ┌──────────────┐  ┌──────────────┐                                │
│  │   Google     │  │   Meta       │                                │
│  │  Analytics   │  │   Pixel      │                                │
│  └──────────────┘  └──────────────┘                                │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🏗 Architectural Patterns

### 1. **Route-Based Architecture (Next.js App Router)**

The application uses Next.js 15's App Router with route groups for logical separation:

```
app/
├── (marketing)/          # Public-facing pages
│   ├── layout.tsx        # Marketing layout (Navbar + Footer)
│   └── */                # Marketing pages
├── (admin)/              # Protected admin pages
│   ├── layout.tsx        # Admin layout (Sidebar)
│   └── admin/            # Admin pages
├── api/                  # API endpoints
├── login/                # Authentication page
└── layout.tsx            # Root layout
```

**Benefits:**
- Clear separation of concerns
- Independent layouts for different sections
- Middleware-based route protection
- SEO-friendly structure

### 2. **Component-Driven Architecture**

```
components/
├── admin/                # Admin-specific components
├── marketing/            # Marketing page components
├── ui/                   # Base UI components (shadcn/ui)
├── forms/                # Reusable form components
├── global/               # Shared global components
└── [feature]/            # Feature-specific components
```

**Principles:**
- Single Responsibility Principle
- Reusability through composition
- Prop drilling minimized with Context API
- TypeScript for type safety

### 3. **API-First Design**

RESTful API endpoints following conventional patterns:

```
/api/[resource]           # GET (list), POST (create)
/api/[resource]/[id]      # GET (read), PUT (update), DELETE
/api/[resource]/[action]  # POST (custom actions)
```

**Standards:**
- Consistent JSON response format
- Proper HTTP status codes
- Error handling middleware
- Request validation

### 4. **Data Layer Abstraction**

```
Models (Mongoose) → API Routes → Frontend
```

**Features:**
- Schema validation at database level
- Centralized database connection
- Connection pooling
- Environment-based configuration

---

## 🔐 Security Architecture

### Authentication Flow

```
┌──────────┐      1. Login Request       ┌─────────────┐
│  Client  │ ──────────────────────────> │   /login    │
│ (Browser)│                              │    Page     │
└──────────┘                              └─────────────┘
     │                                           │
     │                                           │ 2. Validate
     │                                           │    Credentials
     │                                           ▼
     │                              ┌─────────────────────────┐
     │                              │   AuthContext           │
     │                              │   (Client-side)         │
     │                              └─────────────────────────┘
     │                                           │
     │                                           │ 3. Set Cookie
     │          4. Cookie Set                    ▼
     │ <────────────────────────── ┌─────────────────────────┐
     │                              │   httpOnly session      │
     │                              │   auth-token            │
     │                              └─────────────────────────┘
     │
     │          5. Access Admin
     ▼
┌──────────────┐   6. Check Cookie    ┌─────────────────────┐
│   /admin/*   │ <──────────────────── │   middleware.ts     │
│   Routes     │                       │   (Server-side)     │
└──────────────┘                       └─────────────────────┘
     │                                           │
     │ 7a. Valid                                 │ 7b. Invalid
     ▼                                           ▼
┌──────────────┐                       ┌─────────────────────┐
│ Admin Panel  │                       │  Redirect to Login  │
│  (Access)    │                       │   with returnUrl    │
└──────────────┘                       └─────────────────────┘
```

### Security Measures

1. **Middleware Protection**
   - All `/admin/*` routes protected
   - Cookie validation on every request
   - Automatic redirect to login

2. **Cookie Security**
   - HttpOnly cookies (prevents XSS)
   - Secure flag in production
   - SameSite strict
   - 7-day expiration

3. **Environment Variables**
   - Sensitive data never in code
   - Separate configs per environment
   - Server-only secrets

4. **Database Security**
   - Connection string in environment
   - Mongoose schema validation
   - Input sanitization

---

## 📦 Data Flow Architecture

### Read Operation (Blog Detail Page)

```
User Request
    │
    ▼
Marketing Page (/blog/[id])
    │
    ▼
Server Component (SSR)
    │
    ▼
API Call (Internal)
    │
    ▼
/api/blogs/[id] Route
    │
    ▼
connectDB() → MongoDB
    │
    ▼
Blog Model (Mongoose)
    │
    ▼
Find Document
    │
    ▼
JSON Response
    │
    ▼
Hydrate Component
    │
    ▼
Render to User
```

### Write Operation (Create Blog)

```
Admin Form Submit
    │
    ▼
FormData Collection
    │
    ▼
Client-side Validation (Zod)
    │
    ▼
POST /api/blogs
    │
    ▼
Server-side Validation
    │
    ▼
Image Upload → Cloudinary
    │
    ▼
connectDB() → MongoDB
    │
    ▼
Blog.create() (Mongoose)
    │
    ▼
Success Response
    │
    ▼
UI Update + Toast
    │
    ▼
Redirect/Refresh
```

---

## 🎨 Frontend Architecture

### State Management Strategy

1. **Server State** (API Data)
   - Fetched via API calls
   - Cached by Next.js
   - Revalidated on demand

2. **UI State** (Local)
   - React useState for component state
   - Form state via React Hook Form
   - Toast notifications via Sonner

3. **Global State** (Auth)
   - React Context API for authentication
   - Cookie persistence
   - Shared across components

### Styling Architecture

```
Tailwind CSS (Utility-First)
    ├── globals.css (Base styles)
    ├── tailwind.config.ts (Configuration)
    ├── Component classes (Inline)
    └── cn() utility (Class merging)

shadcn/ui Components
    ├── Radix UI primitives
    ├── Tailwind styling
    └── Customizable variants
```

### Animation Strategy

1. **Framer Motion** - Component animations
2. **GSAP** - Complex scroll animations
3. **Tailwind Animate** - Simple transitions
4. **Custom keyframes** - Specific effects

---

## 🔄 Deployment Architecture

### Development Environment

```
Local Machine
    ├── Next.js Dev Server (Port 3000)
    ├── MongoDB Local/Atlas
    ├── Hot Module Replacement
    └── Development Tools
```

### Production Environment (Vercel)

```
Vercel Platform
    ├── Edge Network (CDN)
    ├── Serverless Functions (API Routes)
    ├── Static Site Generation
    ├── Image Optimization
    └── Analytics

External Services
    ├── MongoDB Atlas (Database)
    ├── Cloudinary (Media)
    ├── OpenAI (AI)
    └── Vercel KV (Cache)
```

---

## 📊 Performance Architecture

### Optimization Strategies

1. **Server-Side Rendering (SSR)**
   - Initial page load optimized
   - SEO-friendly content
   - Dynamic data fetching

2. **Static Generation**
   - Marketing pages pre-rendered
   - Fast initial load
   - CDN cached

3. **Image Optimization**
   - Next.js Image component
   - Cloudinary transformations
   - WebP format
   - Lazy loading

4. **Code Splitting**
   - Route-based splitting
   - Dynamic imports
   - Component lazy loading

5. **Caching Strategy**
   - Browser caching
   - API response caching
   - CDN edge caching

---

## 🔌 Integration Architecture

### External Service Integration

1. **Cloudinary (Media Management)**
   ```
   Upload Flow:
   Client → Server → Cloudinary API → CDN URL → Database
   ```

2. **OpenAI (AI Content)**
   ```
   Generate Flow:
   Admin Request → API Route → OpenAI → Response → Save
   ```

3. **Analytics (Tracking)**
   ```
   Page View → Google Analytics → Meta Pixel → Dashboard
   ```

---

## 🛠 Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 15, React 19 | UI Framework |
| **Styling** | Tailwind CSS, Framer Motion | Design System |
| **UI Components** | Radix UI, shadcn/ui | Component Library |
| **Backend** | Next.js API Routes | Server Logic |
| **Database** | MongoDB + Mongoose | Data Persistence |
| **Authentication** | Cookie-based, Context API | User Auth |
| **Media** | Cloudinary | Image Management |
| **AI** | OpenAI GPT-4 | Content Generation |
| **Analytics** | Google Analytics, Meta Pixel | User Tracking |
| **Deployment** | Vercel | Hosting Platform |
| **Package Manager** | pnpm | Dependency Management |

---

## 📈 Scalability Considerations

### Current Architecture Supports

1. **Horizontal Scaling**
   - Serverless functions auto-scale
   - MongoDB replica sets
   - CDN distribution

2. **Performance Scaling**
   - Edge caching
   - Database indexing
   - Query optimization

3. **Feature Scaling**
   - Modular component structure
   - API versioning ready
   - Plugin architecture for features

### Future Enhancements

1. **Caching Layer**
   - Redis/Vercel KV for API caching
   - Query result caching
   - Session storage

2. **Microservices**
   - Separate auth service
   - Dedicated media service
   - Background job processing

3. **Real-time Features**
   - WebSocket support
   - Live chat updates
   - Real-time notifications

---

## 🔍 Monitoring & Observability

### Current Implementation

- **Error Logging**: Console errors (production needs improvement)
- **Analytics**: Google Analytics for user behavior
- **Performance**: Vercel Analytics

### Recommended Additions

- **Application Monitoring**: Sentry or LogRocket
- **Performance Monitoring**: Web Vitals tracking
- **Database Monitoring**: MongoDB Atlas monitoring
- **API Monitoring**: Response time tracking

---

## 📝 Architecture Decision Records (ADRs)

See [ADR.md](./ADR.md) for detailed architectural decisions and rationale.

---

## 🔗 Related Documentation

- [API Documentation](./API.md)
- [Database Schema](./ERD.md)
- [Environment Configuration](./.env.example)
- [Changelog](./CHANGELOG.md)

---

**Document Version:** 1.0.0  
**Created:** December 2024  
**Last Review:** December 2024  
**Next Review:** March 2025
