# InvisiReel Setup Guide

## Supabase Configuration

To enable user authentication and database functionality, you need to set up Supabase:

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose your organization
5. Enter a project name (e.g., "invisireel")
6. Enter a database password
7. Choose a region close to your users
8. Click "Create new project"

### 2. Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the **Project URL** (looks like: `https://your-project-id.supabase.co`)
3. Copy the **anon public** key (starts with `eyJ...`)

### 3. Configure Environment Variables

1. In your project root, edit the `.env` file
2. Replace the placeholder values with your actual Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key
```

### 4. Enable Email Authentication

1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. Configure email templates if needed

### 5. Set Up Database Tables (Optional)

The app will create tables automatically when needed, but you can also create them manually:

```sql
-- Users table (created automatically by Supabase Auth)
-- Videos table
CREATE TABLE videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  video_url TEXT,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Templates table
CREATE TABLE templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 6. Test the Setup

1. Restart your development server: `npm run dev`
2. Go to the registration page
3. Try creating a new account
4. Check your email for the verification link
5. Sign in with your credentials

## Troubleshooting

### "Supabase is not configured" Error
- Make sure your `.env` file exists and has the correct values
- Restart your development server after updating the `.env` file
- Check that the environment variable names start with `VITE_`

### "Invalid API key" Error
- Verify that you copied the correct anon key from Supabase
- Make sure there are no extra spaces or characters in the `.env` file

### Network Errors
- Check your internet connection
- Verify that your Supabase project is active and not paused

### Email Not Received
- Check your spam folder
- Verify that email authentication is enabled in Supabase
- Check the email templates in Supabase dashboard

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

When deploying to Netlify or other platforms:

1. Add your environment variables in the deployment platform's settings
2. Make sure to prefix them with `VITE_` for Vite to expose them to the client
3. Redeploy after adding environment variables

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- Use environment variables in production, not hardcoded values
- The anon key is safe to use in the client-side code 