# KPNG - Parenting Support Application

A modern web-based application designed to help parents through the first few years of early childhood care. Built with Next.js, TypeScript, and Tailwind CSS, featuring a real-time community forum powered by Supabase.

## Features

### 🗨️ Chat
- AI-powered parenting assistant
- Quick question suggestions
- Real-time chat interface
- Personalized parenting advice

### 👥 Community Forum
- **Real-time discussions** powered by Supabase
- **Post creation and management** with categories and tags
- **Like and comment system** for engagement
- **Search and filtering** capabilities
- **Community events** with RSVP functionality
- **User authentication** and content ownership

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **UI Components**: Lucide React icons
- **State Management**: React hooks
- **Responsive Design**: Mobile-first approach

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (free tier available)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kpng
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase (see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions):
   - Create a Supabase project
   - Copy your project URL and **Project API Key** (replaces the old "anon key")
   - Create a `.env.local` file with your credentials
   - Run the database schema script

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Landing page (main marketing page)
│   └── home/                # Application home page
│       └── page.tsx         # Chat and Community functionality
├── components/
│   ├── navigation.tsx       # Responsive navigation (menu/tabs)
│   ├── chat.tsx            # Chat functionality
│   └── community.tsx       # Community features with Supabase
├── lib/
│   ├── supabase.ts         # Supabase client configuration
│   ├── community-service.ts # Community data operations
│   └── utils.ts            # Utility functions
└── types/                  # TypeScript type definitions
```

## Application Structure

### Landing Page (`/`)
- **Hero Section**: "First AI Solution for Parents"
- **Key Benefits**: Eliminate information overload, end unnecessary worry, build strong community
- **How It Works**: 3-step process explanation
- **Call-to-Action**: Direct users to the main application

### Home Page (`/home`)
- **Chat Interface**: AI-powered parenting assistant
- **Community Features**: Real-time forum with Supabase backend
- **Responsive Navigation**: Menu on desktop, tabs on mobile

## Database Schema

The application uses Supabase with the following main tables:

- **posts**: Community discussions with categories and tags
- **comments**: Nested replies to posts
- **likes**: User reactions to posts and comments
- **events**: Community events and meetups
- **event_attendees**: Event RSVP management

All tables include Row Level Security (RLS) for proper data access control.

## Design System

The application uses a comprehensive design system with:
- CSS custom properties for consistent theming
- Responsive breakpoints (mobile-first)
- Accessible color contrasts
- Smooth transitions and animations

## Responsive Design

- **Desktop**: Horizontal navigation menu with Chat and Community options
- **Mobile**: Tab-based navigation for optimal touch experience
- **Adaptive Layout**: Components adjust seamlessly across screen sizes

## Key Components

### Navigation
- Responsive design that switches between menu (desktop) and tabs (mobile)
- Active state indicators
- Smooth transitions
- Links between landing page and application

### Chat
- Message history with user/AI distinction
- Quick question suggestions
- Real-time input handling
- Loading states and animations

### Community Forum
- **Real-time posts** with categories and tags
- **Search functionality** across titles and content
- **Category filtering** for organized browsing
- **Like system** for user engagement
- **Comment system** for discussions
- **Event management** with RSVP functionality
- **User authentication** and content ownership

## Development Guidelines

- Follow TypeScript best practices
- Use functional components with hooks
- Implement responsive design patterns
- Maintain accessibility standards
- Write clean, maintainable code
- Use Supabase service layer for database operations

## Supabase Integration

The community forum is fully powered by Supabase:

- **Real-time Database**: PostgreSQL with automatic real-time subscriptions
- **Row Level Security**: Proper data access control
- **Authentication Ready**: Built-in user management system
- **API Integration**: RESTful and real-time APIs
- **Scalable**: Handles growth from startup to enterprise

### API Key System (Updated 2024)

Supabase has updated their API key system:
- **Project API Key**: Used for client-side operations (replaces the old "anon key")
- **Service Role Key**: For admin operations (keep secret, never expose to client)

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for complete setup instructions.

## Future Enhancements

- **User Authentication**: Complete sign-up/login system
- **Real-time Updates**: Live notifications for likes and comments
- **File Uploads**: Image and document sharing
- **Advanced Search**: Semantic search and filtering
- **Moderation Tools**: Content moderation and reporting
- **Mobile App**: React Native or PWA development
- **AI Integration**: Personalized content recommendations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. 