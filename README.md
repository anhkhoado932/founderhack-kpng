# KPNG - Parenting Support Application

A modern web-based application designed to help parents through the first few years of early childhood care. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🗨️ Chat
- AI-powered parenting assistant
- Quick question suggestions
- Real-time chat interface
- Personalized parenting advice

### 👥 Community
- Parent discussion forums
- Community events and meetups
- Experience sharing
- Support network building

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **State Management**: React hooks
- **Responsive Design**: Mobile-first approach

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

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

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

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
│   └── page.tsx             # Main page component
├── components/
│   ├── navigation.tsx       # Responsive navigation (menu/tabs)
│   ├── chat.tsx            # Chat functionality
│   └── community.tsx       # Community features
├── lib/
│   └── utils.ts            # Utility functions
└── types/                  # TypeScript type definitions
```

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

### Chat
- Message history with user/AI distinction
- Quick question suggestions
- Real-time input handling
- Loading states and animations

### Community
- Discussion posts with engagement metrics
- Community events with RSVP functionality
- Tag-based categorization
- Social interaction features

## Development Guidelines

- Follow TypeScript best practices
- Use functional components with hooks
- Implement responsive design patterns
- Maintain accessibility standards
- Write clean, maintainable code

## Future Enhancements

- User authentication and profiles
- Real-time messaging
- Event management system
- Content moderation tools
- Mobile app development
- AI integration for personalized advice

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. 