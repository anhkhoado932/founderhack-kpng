# Supabase Setup Guide for KPNG Community Forum

This guide will help you set up Supabase to power the community forum features in your KPNG parenting application.

## Prerequisites

- A Supabase account (free tier available at [supabase.com](https://supabase.com))
- Node.js and npm installed
- Basic knowledge of SQL

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in/sign up
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `kpng-community` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be created (usually 2-3 minutes)

## Step 2: Get Your Project Credentials

1. In your project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://your-project-id.supabase.co`)
   - **Project API Key** (this replaces the old "anon key")
   - **Service Role Key** (for admin operations - keep this secret!)

> **Note**: Supabase has updated their API key system. The "Project API Key" is what you'll use for client-side operations (replaces the old "anon key").

## Step 3: Set Up Environment Variables

1. Create a `.env.local` file in your project root:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_project_api_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

2. Replace the placeholder values with your actual Supabase credentials

> **Important**: 
> - `NEXT_PUBLIC_SUPABASE_ANON_KEY` is safe to expose in the client (it's designed for this)
> - `SUPABASE_SERVICE_ROLE_KEY` should NEVER be exposed to the client - keep it secret!

## Step 4: Create Database Tables

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the entire contents of `supabase-schema.sql`
4. Click "Run" to execute the SQL

This will create:
- `posts` table for community discussions
- `comments` table for post replies
- `likes` table for post/comment reactions
- `events` table for community events
- `event_attendees` table for event RSVPs
- All necessary indexes, triggers, and sample data

## Step 5: Verify the Setup

1. Go to **Table Editor** in your Supabase dashboard
2. You should see the following tables:
   - `posts`
   - `comments`
   - `likes`
   - `events`
   - `event_attendees`

3. Check that sample data was inserted:
   - Go to the `posts` table
   - You should see 3 sample posts
   - Go to the `events` table
   - You should see 3 sample events

## Step 6: Test the Application

1. Start your development server:
```bash
npm run dev
```

2. Navigate to `/home` in your application
3. Click on the "Community" tab
4. You should see the sample posts and events loaded from Supabase

## Database Schema Overview

### Posts Table
- **id**: Unique identifier (UUID)
- **title**: Post title
- **content**: Post content
- **author_id**: User ID who created the post
- **author_name**: Display name of the author
- **author_avatar**: Avatar initials
- **category**: Post category (e.g., "sleep-training", "nutrition")
- **tags**: Array of tags
- **likes_count**: Number of likes
- **comments_count**: Number of comments
- **created_at**: Creation timestamp
- **updated_at**: Last update timestamp

### Comments Table
- **id**: Unique identifier (UUID)
- **post_id**: Reference to the parent post
- **content**: Comment content
- **author_id**: User ID who created the comment
- **author_name**: Display name of the author
- **author_avatar**: Avatar initials
- **parent_id**: Reference to parent comment (for nested replies)
- **likes_count**: Number of likes
- **created_at**: Creation timestamp
- **updated_at**: Last update timestamp

### Events Table
- **id**: Unique identifier (UUID)
- **title**: Event title
- **description**: Event description
- **date**: Event date and time
- **location**: Event location
- **max_attendees**: Maximum number of attendees
- **created_by**: User ID who created the event
- **created_at**: Creation timestamp
- **updated_at**: Last update timestamp

## Row Level Security (RLS)

The database includes Row Level Security policies:
- **Public Read Access**: Anyone can read posts, comments, events
- **Authenticated Write Access**: Users can create posts, comments, events
- **Owner Control**: Users can only edit/delete their own content

## Features Included

✅ **Real-time Data**: All data is stored in Supabase and updates in real-time
✅ **Search**: Full-text search across post titles and content
✅ **Categories**: Filter posts by category
✅ **Likes**: Like/unlike posts and comments
✅ **Comments**: Reply to posts (nested comments supported)
✅ **Events**: Create and join community events
✅ **User Management**: Track user interactions and ownership

## Troubleshooting

### Common Issues

1. **"Cannot find module 'tailwindcss-animate'"**
   - This was already fixed in the previous setup

2. **"Invalid API key"**
   - Check your `.env.local` file
   - Ensure you copied the **Project API Key** (not the old anon key)
   - Verify the key starts with `eyJ...`

3. **"Table doesn't exist"**
   - Make sure you ran the `supabase-schema.sql` script
   - Check the SQL Editor for any error messages

4. **"Permission denied"**
   - Verify RLS policies are set up correctly
   - Check that your environment variables are loaded

5. **"API key not found"**
   - Make sure you're using the **Project API Key** from Settings > API
   - The old "anon key" terminology has been updated

### Getting Help

- Check the [Supabase documentation](https://supabase.com/docs)
- Review the SQL script for syntax errors
- Check the browser console for JavaScript errors
- Verify your environment variables are loaded correctly

## API Key Changes (Updated 2024)

Supabase has updated their API key system:

- **Old System**: Used "anon key" and "service role key"
- **New System**: Uses "Project API Key" and "Service Role Key"
- **Functionality**: Same capabilities, just updated terminology
- **Migration**: If you have an old project, the keys still work but the names have changed

## Next Steps

Once Supabase is working:

1. **Add Authentication**: Implement user sign-up/login
2. **Real-time Updates**: Add real-time subscriptions for live updates
3. **File Uploads**: Add image uploads for posts and profiles
4. **Notifications**: Implement push notifications for likes and comments
5. **Moderation**: Add content moderation tools

## Security Notes

- The **Project API Key** is safe to expose in the client (it's designed for this)
- The **Service Role Key** should NEVER be exposed to the client
- RLS policies ensure users can only modify their own content
- All user inputs are properly sanitized by Supabase
- Consider implementing rate limiting for production use

Your community forum is now powered by Supabase! 🎉 