import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database tables structure
export const TABLES = {
  USERS: 'users',
  VIDEOS: 'videos',
  TEMPLATES: 'templates',
  SUBSCRIPTIONS: 'subscriptions'
}

// Video status constants
export const VIDEO_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed'
}

// Subscription plans
export const SUBSCRIPTION_PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    videosPerMonth: 3,
    voices: 2,
    watermark: true,
    features: ['Basic video generation', 'Standard voices', 'Watermark']
  },
  STARTER: {
    name: 'Starter',
    price: 499,
    videosPerMonth: 30,
    voices: 5,
    watermark: false,
    features: ['30 videos/month', '5 premium voices', 'No watermark', 'HD quality']
  },
  PRO: {
    name: 'Pro',
    price: 999,
    videosPerMonth: -1, // Unlimited
    voices: 10,
    watermark: false,
    features: ['Unlimited videos', '10 premium voices', 'No watermark', '4K quality', 'Batch generation', 'YouTube auto-upload']
  }
} 