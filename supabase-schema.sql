-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create posts table
CREATE TABLE posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id VARCHAR(255) NOT NULL,
    author_name VARCHAR(255) NOT NULL,
    author_avatar VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL DEFAULT 'general',
    tags TEXT[] DEFAULT '{}',
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create comments table
CREATE TABLE comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    author_id VARCHAR(255) NOT NULL,
    author_name VARCHAR(255) NOT NULL,
    author_avatar VARCHAR(255) NOT NULL,
    parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create likes table
CREATE TABLE likes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    -- Ensure a user can only like a post or comment once
    CONSTRAINT unique_like UNIQUE (user_id, post_id, comment_id),
    -- Ensure either post_id or comment_id is set, but not both
    CONSTRAINT check_like_target CHECK (
        (post_id IS NOT NULL AND comment_id IS NULL) OR 
        (post_id IS NULL AND comment_id IS NOT NULL)
    )
);

-- Create events table
CREATE TABLE events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR(255) NOT NULL,
    max_attendees INTEGER NOT NULL DEFAULT 50,
    created_by VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create event_attendees table
CREATE TABLE event_attendees (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    user_id VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'going' CHECK (status IN ('going', 'maybe', 'not_going')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    -- Ensure a user can only attend an event once
    UNIQUE (event_id, user_id)
);

-- Create indexes for better performance
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);
CREATE INDEX idx_likes_post_id ON likes(post_id);
CREATE INDEX idx_likes_comment_id ON likes(comment_id);
CREATE INDEX idx_likes_user_id ON likes(user_id);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_event_attendees_event_id ON event_attendees(event_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to update likes_count and comments_count
CREATE OR REPLACE FUNCTION update_post_counts()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        IF NEW.post_id IS NOT NULL THEN
            UPDATE posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
        END IF;
        IF NEW.comment_id IS NOT NULL THEN
            UPDATE comments SET likes_count = likes_count + 1 WHERE id = NEW.comment_id;
        END IF;
        IF NEW.post_id IS NOT NULL AND NEW.comment_id IS NULL THEN
            UPDATE posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
        END IF;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        IF OLD.post_id IS NOT NULL THEN
            UPDATE posts SET comments_count = comments_count - 1 WHERE id = OLD.post_id;
        END IF;
        IF OLD.comment_id IS NOT NULL THEN
            UPDATE comments SET likes_count = likes_count - 1 WHERE id = OLD.comment_id;
        END IF;
        IF OLD.post_id IS NOT NULL AND OLD.comment_id IS NULL THEN
            UPDATE posts SET likes_count = likes_count - 1 WHERE id = OLD.post_id;
        END IF;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Create triggers for likes table
CREATE TRIGGER update_counts_on_like_insert AFTER INSERT ON likes
    FOR EACH ROW EXECUTE FUNCTION update_post_counts();

CREATE TRIGGER update_counts_on_like_delete AFTER DELETE ON likes
    FOR EACH ROW EXECUTE FUNCTION update_post_counts();

-- Create triggers for comments table
CREATE TRIGGER update_counts_on_comment_insert AFTER INSERT ON comments
    FOR EACH ROW EXECUTE FUNCTION update_post_counts();

CREATE TRIGGER update_counts_on_comment_delete AFTER DELETE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_post_counts();

-- Insert sample data
INSERT INTO posts (title, content, author_id, author_name, author_avatar, category, tags) VALUES
(
    'Sleep Training Success Story',
    'Just wanted to share that my 18-month-old finally slept through the night! The gentle sleep training method really worked for us. We started with a consistent bedtime routine and gradually reduced night feedings. Anyone else have success with this approach?',
    'user_1',
    'Sarah M.',
    'SM',
    'sleep-training',
    ARRAY['sleep-training', '18-months', 'success-story']
),
(
    'Healthy Snack Ideas for Picky 2-Year-Old',
    'Looking for recommendations on healthy snack ideas for a picky 2-year-old. We''re trying to introduce more vegetables but it''s been challenging. Any creative ideas that have worked for your little ones?',
    'user_2',
    'Mike R.',
    'MR',
    'nutrition',
    ARRAY['nutrition', 'picky-eater', '2-years-old', 'vegetables']
),
(
    'First Time Mom - Starting Solid Foods',
    'First time mom here! My baby is 6 months old and we''re starting to think about introducing solid foods. Any tips on how to begin this journey? What foods should we start with?',
    'user_3',
    'Emma L.',
    'EL',
    'feeding',
    ARRAY['first-time-mom', '6-months', 'solid-foods', 'tips']
);

INSERT INTO events (title, description, date, location, max_attendees, created_by) VALUES
(
    'New Parents Meetup',
    'Join other new parents for coffee and conversation. Share experiences and make new friends!',
    '2024-12-15 10:00:00+00',
    'Central Park Coffee Shop',
    20,
    'user_1'
),
(
    'Toddler Playgroup',
    'Weekly playgroup for toddlers 18-36 months. Activities include music, crafts, and free play.',
    '2024-12-17 09:30:00+00',
    'Community Center',
    15,
    'user_2'
),
(
    'Parenting Workshop: Managing Tantrums',
    'Learn effective strategies for managing toddler tantrums with child development expert Dr. Johnson.',
    '2024-12-20 19:00:00+00',
    'Library Meeting Room',
    30,
    'user_3'
);

-- Set up Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_attendees ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to posts" ON posts
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to comments" ON comments
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to likes" ON likes
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to events" ON events
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to event attendees" ON event_attendees
    FOR SELECT USING (true);

-- Create policies for authenticated users to create/update/delete
CREATE POLICY "Allow authenticated users to create posts" ON posts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow users to update their own posts" ON posts
    FOR UPDATE USING (author_id = current_user);

CREATE POLICY "Allow users to delete their own posts" ON posts
    FOR DELETE USING (author_id = current_user);

CREATE POLICY "Allow authenticated users to create comments" ON comments
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow users to update their own comments" ON comments
    FOR UPDATE USING (author_id = current_user);

CREATE POLICY "Allow users to delete their own comments" ON comments
    FOR DELETE USING (author_id = current_user);

CREATE POLICY "Allow authenticated users to manage likes" ON likes
    FOR ALL USING (user_id = current_user);

CREATE POLICY "Allow authenticated users to create events" ON events
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow users to update their own events" ON events
    FOR UPDATE USING (created_by = current_user);

CREATE POLICY "Allow users to delete their own events" ON events
    FOR DELETE USING (created_by = current_user);

CREATE POLICY "Allow authenticated users to manage event attendance" ON event_attendees
    FOR ALL USING (user_id = current_user); 