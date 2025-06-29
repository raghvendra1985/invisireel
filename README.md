# InvisiReel - AI-Powered Faceless Video Creator

Create engaging faceless videos with AI voiceovers, stock visuals, and auto-subtitles in seconds.

## Features

- 🎬 **Text to Video**: Transform scripts into engaging videos
- 🎤 **AI Voiceovers**: Professional voices using ElevenLabs
- 🎵 **Royalty-free Music**: Background music and sound effects
- 📝 **Auto-subtitles**: Synced captions with voice
- 📤 **Auto-upload**: Direct upload to YouTube Shorts
- 🎨 **Template Library**: Pre-designed templates by niche
- 📊 **User Dashboard**: Manage and track your videos
- 💳 **Subscription Plans**: Free, Starter, and Pro tiers

## Tech Stack

- **Frontend**: React.js with Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Auth, Database, Storage)
- **AI Voice**: ElevenLabs API
- **Stock Videos**: Pexels API
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- ElevenLabs API key
- Pexels API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd invisireel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

   # ElevenLabs API
   VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

   # Pexels API
   VITE_PEXELS_API_KEY=your_pexels_api_key_here

   # YouTube API (for auto-upload feature)
   VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Set up the following tables:

   ```sql
   -- Users table (extends Supabase auth)
   CREATE TABLE users (
     id UUID REFERENCES auth.users(id) PRIMARY KEY,
     name TEXT,
     email TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Videos table
   CREATE TABLE videos (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id),
     title TEXT NOT NULL,
     description TEXT,
     script TEXT NOT NULL,
     voice_id TEXT,
     template TEXT,
     background_music TEXT,
     status TEXT DEFAULT 'pending',
     video_url TEXT,
     thumbnail_url TEXT,
     views INTEGER DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Templates table
   CREATE TABLE templates (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     description TEXT,
     category TEXT,
     thumbnail_url TEXT,
     duration TEXT,
     usage_count INTEGER DEFAULT 0,
     rating DECIMAL(3,2) DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Subscriptions table
   CREATE TABLE subscriptions (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id),
     plan_type TEXT NOT NULL,
     status TEXT DEFAULT 'active',
     current_period_start TIMESTAMP WITH TIME ZONE,
     current_period_end TIMESTAMP WITH TIME ZONE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## API Setup

### ElevenLabs
1. Sign up at [ElevenLabs](https://elevenlabs.io)
2. Get your API key from the dashboard
3. Add it to your `.env` file

### Pexels
1. Sign up at [Pexels](https://pexels.com/api)
2. Get your API key
3. Add it to your `.env` file

### YouTube API (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable YouTube Data API v3
4. Create credentials and get your API key
5. Add it to your `.env` file

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   └── LoadingSpinner.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── CreateVideo.jsx
│   ├── Templates.jsx
│   └── Pricing.jsx
├── lib/                # Utility libraries
│   ├── supabase.js     # Supabase configuration
│   └── api.js          # External API services
├── App.jsx             # Main app component
└── index.css           # Global styles
```

## Features Implementation

### Video Generation Flow
1. User enters script and selects options
2. Script is sent to ElevenLabs for voice generation
3. Stock videos are fetched from Pexels
4. Video is composed using FFmpeg (backend)
5. Final video is stored and made available for download

### Authentication
- Supabase Auth handles user registration and login
- Protected routes require authentication
- User data is stored in Supabase

### Subscription Management
- Free plan: 3 videos/month with watermark
- Starter plan: 30 videos/month, no watermark
- Pro plan: Unlimited videos with advanced features

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Netlify
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@invisireel.com or join our Discord community.

## Roadmap

- [ ] Batch video generation
- [ ] Custom voice cloning
- [ ] Advanced video editing
- [ ] Social media scheduling
- [ ] Analytics dashboard
- [ ] White-label solution
- [ ] Mobile app
