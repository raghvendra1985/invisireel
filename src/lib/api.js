import axios from 'axios'

// ElevenLabs API for AI voiceovers
const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY
const ELEVENLABS_BASE_URL = 'https://api.elevenlabs.io/v1'

export const elevenLabsAPI = {
  // Get available voices
  getVoices: async () => {
    try {
      const response = await axios.get(`${ELEVENLABS_BASE_URL}/voices`, {
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY
        }
      })
      return response.data.voices
    } catch (error) {
      console.error('Error fetching voices:', error)
      throw error
    }
  },

  // Generate speech from text
  generateSpeech: async (text, voiceId, stability = 0.5, similarityBoost = 0.5) => {
    try {
      const response = await axios.post(
        `${ELEVENLABS_BASE_URL}/text-to-speech/${voiceId}`,
        {
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability,
            similarity_boost: similarityBoost
          }
        },
        {
          headers: {
            'xi-api-key': ELEVENLABS_API_KEY,
            'Content-Type': 'application/json'
          },
          responseType: 'arraybuffer'
        }
      )
      return response.data
    } catch (error) {
      console.error('Error generating speech:', error)
      throw error
    }
  }
}

// Pexels API for stock videos
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY
const PEXELS_BASE_URL = 'https://api.pexels.com/videos'

export const pexelsAPI = {
  // Search for videos
  searchVideos: async (query, perPage = 15, page = 1) => {
    try {
      const response = await axios.get(`${PEXELS_BASE_URL}/search`, {
        headers: {
          'Authorization': PEXELS_API_KEY
        },
        params: {
          query,
          per_page: perPage,
          page
        }
      })
      return response.data
    } catch (error) {
      console.error('Error searching videos:', error)
      throw error
    }
  },

  // Get popular videos
  getPopularVideos: async (perPage = 15, page = 1) => {
    try {
      const response = await axios.get(`${PEXELS_BASE_URL}/popular`, {
        headers: {
          'Authorization': PEXELS_API_KEY
        },
        params: {
          per_page: perPage,
          page
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching popular videos:', error)
      throw error
    }
  }
}

// Video processing service
export const videoService = {
  // Generate video from script
  generateVideo: async (script, voiceId, template, backgroundMusic = null) => {
    try {
      // This would typically call your backend API
      // For now, we'll simulate the process
      const response = await axios.post('/api/videos/generate', {
        script,
        voiceId,
        template,
        backgroundMusic
      })
      return response.data
    } catch (error) {
      console.error('Error generating video:', error)
      throw error
    }
  },

  // Get video status
  getVideoStatus: async (videoId) => {
    try {
      const response = await axios.get(`/api/videos/${videoId}/status`)
      return response.data
    } catch (error) {
      console.error('Error getting video status:', error)
      throw error
    }
  },

  // Download video
  downloadVideo: async (videoId) => {
    try {
      const response = await axios.get(`/api/videos/${videoId}/download`, {
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error downloading video:', error)
      throw error
    }
  }
}

// YouTube API for auto-upload
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

export const youtubeAPI = {
  // Upload video to YouTube
  uploadVideo: async (videoFile, title, description, tags = []) => {
    try {
      const formData = new FormData()
      formData.append('video', videoFile)
      formData.append('title', title)
      formData.append('description', description)
      formData.append('tags', JSON.stringify(tags))

      const response = await axios.post('/api/youtube/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error uploading to YouTube:', error)
      throw error
    }
  }
} 