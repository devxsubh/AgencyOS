# Wonder Creative Studios - Next.js Project

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Complete Documentation Suite](#complete-documentation-suite)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Installation & Setup](#installation--setup)
- [Admin Panel](#admin-panel)
- [Client/Marketing Side](#clientmarketing-side)
- [API Routes](#api-routes)
- [Database Models](#database-models)
- [Authentication System](#authentication-system)
- [Key Features](#key-features)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## 📚 Complete Documentation Suite

This project includes comprehensive documentation for easy handover and development:

| Document | Description | Use When |
|----------|-------------|----------|
| **[README.md](./README.md)** (This file) | Main project documentation, setup guide, and overview | Getting started with the project |
| **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** | Documentation index and learning path | Finding specific documentation |
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | System architecture, design patterns, and diagrams | Understanding system design |
| **[API.md](./API.md)** | Complete API documentation with examples | Working with APIs |
| **[ERD.md](./ERD.md)** | Database schema and data models | Understanding database structure |
| **[CHANGELOG.md](./CHANGELOG.md)** | Version history and release notes | Checking what changed |
| **[ADR.md](./ADR.md)** | Architectural Decision Records | Understanding why decisions were made |
| **[env.example](./env.example)** | Environment variables template | Setting up environment |

**Quick Navigation:**
- 🆕 **New to the project?** Start with this README, then check [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)
- 🔌 **Working with APIs?** See [API.md](./API.md)
- 🗄️ **Database work?** Check [ERD.md](./ERD.md)
- 🏗️ **Architecture questions?** Read [ARCHITECTURE.md](./ARCHITECTURE.md)
- ⚙️ **Setup issues?** Review [env.example](./env.example)

## 🎯 Project Overview

Wonder Creative Studios is a comprehensive Next.js application that serves as both a marketing website and an admin panel for managing content. The project is built with modern web technologies and follows best practices for scalability and maintainability.

### Key Components:
- **Marketing Website**: Public-facing website showcasing services, portfolio, and company information
- **Admin Panel**: Protected dashboard for content management (blogs, portfolios, pricing, chatbot)
- **API Layer**: RESTful APIs for data management
- **Authentication**: Secure login system for admin access
- **Database**: MongoDB integration for data persistence

## 🛠 Tech Stack

### Frontend
- **Next.js 15.1.6** - React framework with App Router
- **React 19.0.0-rc.1** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animations
- **GSAP** - Advanced animations
- **Radix UI** - Component primitives
- **Lucide React** - Icons

### Backend & Database
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Next.js API Routes** - Server-side logic

### External Services
- **Cloudinary** - Image management
- **OpenAI** - AI content generation
- **Vercel KV** - Key-value storage
- **Google Analytics** - Analytics
- **Meta Pixel** - Facebook tracking

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **pnpm** - Package manager

## 📁 Project Structure

```
nextjs-wondercreativestudios/
├── public/                          # Static assets
│   ├── fonts/                       # Custom fonts (Satoshi family)
│   ├── icons/                       # Logo and icon files
│   └── images/                      # Images and media files
│       ├── coding/                  # Technology stack icons
│       └── project/                 # Portfolio project images
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── (admin)/                 # Admin route group
│   │   │   ├── admin/               # Admin panel pages
│   │   │   │   ├── blogs/           # Blog management
│   │   │   │   ├── portfolios/      # Portfolio management
│   │   │   │   ├── pricing/         # Pricing management
│   │   │   │   ├── chatbot/         # Chatbot configuration
│   │   │   │   └── settings/        # Admin settings
│   │   │   └── layout.tsx           # Admin layout
│   │   ├── (marketing)/             # Marketing route group
│   │   │   ├── automation/          # Automation services page
│   │   │   ├── blog/                # Blog listing and detail pages
│   │   │   ├── calculator/          # Pricing calculator
│   │   │   ├── contact/             # Contact pages
│   │   │   ├── portfolio/           # Portfolio showcase
│   │   │   ├── web-and-app/         # Web & app services
│   │   │   └── layout.tsx           # Marketing layout
│   │   ├── api/                     # API routes
│   │   │   ├── blogs/               # Blog CRUD operations
│   │   │   ├── portfolios/          # Portfolio CRUD operations
│   │   │   ├── prices/              # Pricing management
│   │   │   ├── chatbot/             # Chatbot functionality
│   │   │   └── chats/               # Chat management
│   │   ├── login/                   # Authentication page
│   │   ├── layout.tsx               # Root layout
│   │   └── loading.tsx              # Global loading component
│   ├── components/                  # Reusable components
│   │   ├── admin/                   # Admin-specific components
│   │   ├── automation/              # Automation page components
│   │   ├── blog/                    # Blog-related components
│   │   ├── calculator/              # Calculator components
│   │   ├── casestudy/               # Case study components
│   │   ├── chatbot/                 # Chatbot components
│   │   ├── contact/                 # Contact form components
│   │   ├── forms/                   # Reusable form components
│   │   ├── global/                  # Global components
│   │   ├── legalities/              # Legal page components
│   │   ├── magicui/                 # UI magic components
│   │   ├── marketing/               # Marketing page components
│   │   ├── meta/                    # Meta tag components
│   │   ├── ui/                      # Base UI components
│   │   └── web-and-app/             # Web & app components
│   ├── constants/                   # Application constants
│   │   ├── blog.ts                  # Blog-related constants
│   │   ├── countries.ts             # Country/language data
│   │   ├── features.ts              # Feature definitions
│   │   ├── fonts.ts                 # Font configurations
│   │   ├── index.ts                 # Main exports
│   │   ├── links.ts                 # Navigation links
│   │   ├── plans.ts                 # Pricing plans
│   │   ├── projects.ts              # Project templates
│   │   └── reviews.ts               # Customer reviews
│   ├── contexts/                    # React contexts
│   │   └── AuthContext.tsx          # Authentication context
│   ├── hooks/                       # Custom React hooks
│   │   ├── use-mobile.tsx           # Mobile detection hook
│   │   ├── use-mouse-position.tsx   # Mouse tracking hook
│   │   └── use-toast.ts             # Toast notification hook
│   ├── lib/                         # Utility libraries
│   │   ├── cn.ts                    # Class name utility
│   │   └── index.ts                 # Library exports
│   ├── models/                      # Database models
│   │   ├── Blog.ts                  # Blog schema
│   │   ├── Chat.ts                  # Chat schema
│   │   ├── ChatbotConfig.ts         # Chatbot configuration schema
│   │   ├── Portfolio.ts             # Portfolio schema
│   │   └── Price.ts                 # Pricing schema
│   ├── styles/                      # Global styles
│   │   └── globals.css              # Global CSS
│   ├── utils/                       # Utility functions
│   │   ├── cloudinary.ts            # Cloudinary configuration
│   │   ├── database.ts              # Database connection
│   │   ├── index.ts                 # Utility exports
│   │   └── metadata.ts              # SEO metadata generation
│   └── middleware.ts                # Next.js middleware
├── components.json                  # shadcn/ui configuration
├── eslint.config.mjs                # ESLint configuration
├── next.config.ts                   # Next.js configuration
├── package.json                     # Dependencies and scripts
├── postcss.config.mjs               # PostCSS configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
└── system.txt                       # System information
```

## 🔧 Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/wonder-creative-studios
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wonder-creative-studios

# Cloudinary (for image management)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# OpenAI (for AI content generation)
OPENAI_API_KEY=your_openai_api_key

# Admin Authentication
NEXT_PUBLIC_ADMIN_USERNAME=admin
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password

# Analytics
NEXT_PUBLIC_GA_ID=G-GEYE331BP3

# Vercel KV (optional, for caching)
KV_REST_API_URL=your_kv_url
KV_REST_API_TOKEN=your_kv_token
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- MongoDB (local or Atlas)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nextjs-wondercreativestudios
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

4. **Set up MongoDB**
   - Local: Install MongoDB and start the service
   - Atlas: Create a cluster and get connection string

5. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

6. **Access the application**
   - Marketing site: http://localhost:3000
   - Admin panel: http://localhost:3000/admin
   - Login: http://localhost:3000/login

## 🔐 Admin Panel

### Overview
The admin panel is a protected area accessible only to authenticated users. It provides comprehensive content management capabilities.

### Access Control
- **Route Protection**: Middleware protects all `/admin/*` routes
- **Authentication**: Simple cookie-based authentication
- **Login Credentials**: Set via environment variables

### Admin Features

#### 1. Dashboard (`/admin`)
- Overview of system statistics
- Quick access to all management sections

#### 2. Blog Management (`/admin/blogs`)
- Create, edit, and delete blog posts
- AI-powered content generation
- Image upload via Cloudinary
- SEO optimization features

#### 3. Portfolio Management (`/admin/portfolios`)
- Manage project showcases
- Upload project images
- Set project categories and details
- Case study information

#### 4. Pricing Management (`/admin/pricing`)
- Configure service pricing
- Manage pricing tiers
- Update pricing plans

#### 5. Chatbot Configuration (`/admin/chatbot`)
- Configure chatbot responses
- Set up automated responses
- Manage chat history

#### 6. Settings (`/admin/settings`)
- System configuration
- User preferences
- General settings

### Admin Layout Structure
```tsx
// Admin layout includes:
- Sidebar navigation
- Main content area
- Authentication checks
- Loading states
- Logout functionality
```

## 🌐 Client/Marketing Side

### Overview
The marketing side is the public-facing website that showcases Wonder Creative Studios' services and portfolio.

### Key Pages

#### 1. Homepage (`/`)
- Hero section with company introduction
- Services overview
- Portfolio showcase
- Customer testimonials
- Company information
- FAQ section

#### 2. Services Pages
- **Automation** (`/automation`): AI automation services
- **Web & App** (`/web-and-app`): Development services
- **Calculator** (`/calculator`): Pricing calculator

#### 3. Content Pages
- **Blog** (`/blog`): Blog listing and individual posts
- **Portfolio** (`/portfolio`): Project showcase
- **Case Studies** (`/casestudy`): Detailed project case studies

#### 4. Contact & Legal
- **Contact** (`/contact`): Contact forms and information
- **Privacy Policy** (`/privacy-policy`): Privacy policy
- **Terms & Conditions** (`/terms-condition`): Terms of service
- **Support** (`/support`): Customer support

### Marketing Layout Features
- Responsive navigation
- Loading animations
- Floating chatbot
- SEO optimization
- Analytics integration

## 🔌 API Routes

### Blog APIs (`/api/blogs`)
- `GET /api/blogs` - Fetch all blogs
- `POST /api/blogs` - Create new blog
- `GET /api/blogs/[id]` - Fetch specific blog
- `PUT /api/blogs/[id]` - Update blog
- `DELETE /api/blogs/[id]` - Delete blog
- `POST /api/blogs/generate` - AI content generation
- `POST /api/blogs/generate-image` - AI image generation
- `POST /api/blogs/publish` - Publish blog

### Portfolio APIs (`/api/portfolios`)
- `GET /api/portfolios` - Fetch all portfolios
- `POST /api/portfolios` - Create new portfolio
- `GET /api/portfolios/[id]` - Fetch specific portfolio
- `PUT /api/portfolios/[id]` - Update portfolio
- `DELETE /api/portfolios/[id]` - Delete portfolio
- `POST /api/portfolios/publish` - Publish portfolio

### Pricing APIs (`/api/prices`)
- `GET /api/prices` - Fetch pricing plans
- `POST /api/prices` - Create pricing plan
- `GET /api/prices/[id]` - Fetch specific pricing
- `PUT /api/prices/[id]` - Update pricing
- `DELETE /api/prices/[id]` - Delete pricing

### Chatbot APIs (`/api/chatbot`)
- `POST /api/chatbot` - Process chat messages
- `GET /api/chatbot/config` - Get chatbot configuration
- `PUT /api/chatbot/config` - Update chatbot configuration

### Chat APIs (`/api/chats`)
- `GET /api/chats` - Fetch chat history
- `POST /api/chats` - Create new chat
- `DELETE /api/chats` - Clear chat history

## 🗄 Database Models

### Blog Model
```typescript
{
  title: string (required)
  content: string (required)
  thumbnail: string (required)
  sections: Array<{
    heading: string
    content: string
  }>
  createdAt: Date (default: now)
  trending: boolean (default: false)
  views: number (default: 0)
}
```

### Portfolio Model
```typescript
{
  title: string (required)
  description: string (required)
  image: string (required)
  category: string (required)
  agency: string (default: 'Wonder')
  url: string (optional)
  color: string (default: '#3B82F6')
  challenge: string (required)
  solution: string (required)
  result: string (required)
  createdAt: Date (default: now)
}
```

### Chat Model
```typescript
{
  message: string (required)
  response: string (required)
  timestamp: Date (default: now)
  sessionId: string (required)
}
```

### ChatbotConfig Model
```typescript
{
  welcomeMessage: string
  responses: Array<{
    keyword: string
    response: string
  }>
  updatedAt: Date (default: now)
}
```

### Price Model
```typescript
{
  name: string (required)
  description: string (required)
  price: number (required)
  features: string[] (required)
  popular: boolean (default: false)
  createdAt: Date (default: now)
}
```

## 🔒 Authentication System

### Implementation
- **Context-based**: Uses React Context for state management
- **Cookie-based**: Stores authentication token in cookies
- **Middleware Protection**: Next.js middleware protects admin routes
- **Environment Variables**: Credentials stored in environment variables

### Authentication Flow
1. User visits `/login`
2. Enters credentials (username/password)
3. System validates against environment variables
4. On success, sets `auth-token` cookie
5. Middleware checks cookie for protected routes
6. Admin panel accessible with valid token

### Security Features
- Route protection via middleware
- Automatic redirect to login for unauthorized access
- Token expiration (7 days)
- Secure cookie handling

## ✨ Key Features

### 1. AI-Powered Content Generation
- Blog post generation using OpenAI
- Image generation for blog thumbnails
- Automated content creation

### 2. Image Management
- Cloudinary integration for image uploads
- Automatic image optimization
- CDN delivery for fast loading

### 3. Responsive Design
- Mobile-first approach
- Tailwind CSS for styling
- Custom animations with Framer Motion and GSAP

### 4. SEO Optimization
- Dynamic metadata generation
- Structured data
- Google Analytics integration
- Meta Pixel for Facebook tracking

### 5. Interactive Elements
- Floating chatbot
- Pricing calculator
- Contact forms
- Portfolio galleries

### 6. Performance Optimization
- Next.js App Router
- Image optimization
- Code splitting
- Lazy loading

## 🔄 Development Workflow

### Available Scripts
```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Database
# Connect to MongoDB and run queries
# Use MongoDB Compass or CLI for database management
```

### Code Organization
- **Components**: Reusable UI components in `/src/components`
- **Pages**: Route components in `/src/app`
- **API**: Server-side logic in `/src/app/api`
- **Utils**: Helper functions in `/src/utils`
- **Constants**: Application constants in `/src/constants`
- **Types**: TypeScript definitions in `/src/types`

### Best Practices
- Use TypeScript for type safety
- Follow Next.js App Router conventions
- Implement proper error handling
- Use Tailwind CSS for styling
- Follow component composition patterns
- Implement proper loading states

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. Connect repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
```env
MONGODB_URI=your_production_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
OPENAI_API_KEY=your_openai_key
NEXT_PUBLIC_ADMIN_USERNAME=your_admin_username
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### Build Process
```bash
pnpm build    # Creates optimized production build
pnpm start    # Starts production server
```

## 🐛 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error
```bash
Error: MongoDB connection error
```
**Solution**: Check MongoDB URI and ensure database is running

#### 2. Cloudinary Upload Error
```bash
Error: Cloudinary configuration missing
```
**Solution**: Verify Cloudinary credentials in environment variables

#### 3. Authentication Issues
```bash
Error: Invalid credentials
```
**Solution**: Check admin username/password in environment variables

#### 4. Build Errors
```bash
Error: TypeScript compilation failed
```
**Solution**: Run `pnpm lint` to identify and fix type errors

#### 5. Image Loading Issues
```bash
Error: Image domain not configured
```
**Solution**: Add image domains to `next.config.ts`

### Debug Mode
Enable debug logging by setting:
```env
NODE_ENV=development
```

### Database Issues
- Check MongoDB connection string
- Verify database permissions
- Ensure collections exist
- Check for data validation errors

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards
- Follow TypeScript best practices
- Use meaningful variable names
- Add comments for complex logic
- Follow existing code patterns
- Test all new features

### Pull Request Process
1. Ensure all tests pass
2. Update documentation if needed
3. Provide clear description of changes
4. Request review from maintainers

## 📞 Support

For technical support or questions:
- Check the troubleshooting section
- Review the code documentation
- Contact the development team
- Create an issue in the repository

## 📄 License

This project is proprietary software. All rights reserved.

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Maintainer**: Wonder Creative Studios Development Team
