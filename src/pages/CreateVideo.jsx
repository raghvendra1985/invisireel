import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Play, Download, Upload, Settings, Mic, Music, Video, Loader2, CheckCircle, ArrowRight, ArrowLeft, Info } from 'lucide-react'
import { supabase, TABLES, VIDEO_STATUS } from '../lib/supabase'
import { elevenLabsAPI, pexelsAPI } from '../lib/api'
import LoadingSpinner from '../components/LoadingSpinner'

const CreateVideo = ({ user }) => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  
  // Form data
  const [script, setScript] = useState('')
  const [title, setTitle] = useState('')
  const [selectedVoice, setSelectedVoice] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [backgroundMusic, setBackgroundMusic] = useState('')
  
  // Available options
  const [voices, setVoices] = useState([])
  const [templates, setTemplates] = useState([])
  const [musicOptions, setMusicOptions] = useState([])
  
  // Generated video
  const [generatedVideo, setGeneratedVideo] = useState(null)
  const [videoStatus, setVideoStatus] = useState('')

  useEffect(() => {
    // For demo purposes, allow the page to work without authentication
    // In production, you would want to require authentication
    if (!user) {
      console.log('No user found, running in demo mode')
    }
    
    fetchVoices()
    fetchTemplates()
    fetchMusicOptions()
  }, [user])

  const fetchVoices = async () => {
    try {
      // Mock voices for now since we don't have ElevenLabs API configured
      const mockVoices = [
        { voice_id: 'voice1', name: 'Sarah', description: 'Clear and professional female voice', language: 'English', accent: 'American', labels: { accent: 'American' } },
        { voice_id: 'voice2', name: 'Mike', description: 'Deep and authoritative male voice', language: 'English', accent: 'British', labels: { accent: 'British' } },
        { voice_id: 'voice3', name: 'Emma', description: 'Friendly and approachable female voice', language: 'English', accent: 'Australian', labels: { accent: 'Australian' } },
        { voice_id: 'voice4', name: 'David', description: 'Warm and engaging male voice', language: 'English', accent: 'Canadian', labels: { accent: 'Canadian' } }
      ]
      setVoices(mockVoices)
    } catch (error) {
      console.error('Error fetching voices:', error)
    }
  }

  const fetchTemplates = async () => {
    // Mock templates for now
    const mockTemplates = [
      { id: 'motivation', name: 'Motivation', description: 'Perfect for motivational content', category: 'Lifestyle' },
      { id: 'education', name: 'Education', description: 'Great for educational videos', category: 'Education' },
      { id: 'business', name: 'Business', description: 'Professional business content', category: 'Business' },
      { id: 'entertainment', name: 'Entertainment', description: 'Fun and engaging content', category: 'Entertainment' },
      { id: 'fitness', name: 'Fitness', description: 'Health and fitness content', category: 'Health' },
      { id: 'finance', name: 'Finance', description: 'Financial advice and tips', category: 'Finance' }
    ]
    setTemplates(mockTemplates)
  }

  const fetchMusicOptions = async () => {
    // Mock music options
    const mockMusic = [
      { id: 'upbeat', name: 'Upbeat', description: 'Energetic and positive' },
      { id: 'calm', name: 'Calm', description: 'Relaxing and peaceful' },
      { id: 'dramatic', name: 'Dramatic', description: 'Intense and powerful' },
      { id: 'fun', name: 'Fun', description: 'Playful and cheerful' },
      { id: 'none', name: 'No Music', description: 'Voice only' }
    ]
    setMusicOptions(mockMusic)
  }

  const handleGenerate = async () => {
    if (!script.trim() || !selectedVoice || !selectedTemplate) {
      alert('Please fill in all required fields')
      return
    }

    setGenerating(true)
    setVideoStatus('Generating your video...')

    try {
      // For demo purposes, skip database operations if no user
      if (user) {
        // Create video record in database
        const { data: videoData, error } = await supabase
          .from(TABLES.VIDEOS)
          .insert({
            user_id: user.id,
            title: title || 'Untitled Video',
            description: script.substring(0, 100) + '...',
            script: script,
            voice_id: selectedVoice,
            template: selectedTemplate,
            background_music: backgroundMusic,
            status: VIDEO_STATUS.PROCESSING
          })
          .select()
          .single()

        if (error) throw error
      }

      // Simulate video generation process
      setTimeout(() => {
        setGeneratedVideo({
          id: 'demo-video-1',
          title: title || 'Untitled Video',
          url: 'https://example.com/sample-video.mp4', // Mock URL
          thumbnail: 'https://via.placeholder.com/400x225/1f2937/ffffff?text=Generated+Video'
        })
        setVideoStatus('Video generated successfully!')
        setGenerating(false)
        setStep(4)
      }, 5000) // Simulate 5 second generation time

    } catch (error) {
      console.error('Error generating video:', error)
      setVideoStatus('Error generating video. Please try again.')
      setGenerating(false)
    }
  }

  const handleDownload = () => {
    // Mock download functionality
    const link = document.createElement('a')
    link.href = generatedVideo.url
    link.download = `${generatedVideo.title}.mp4`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleUploadToYouTube = () => {
    // Mock YouTube upload
    alert('YouTube upload feature coming soon!')
  }

  if (!user) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo Banner */}
        {!user && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <Info className="w-5 h-5 text-yellow-500 mr-3" />
              <div>
                <h4 className="font-medium text-white mb-1">Demo Mode</h4>
                <p className="text-sm text-gray-300">
                  You're currently in demo mode. Sign up to save your videos and access all features.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Your Video</h1>
          <p className="text-gray-300">Transform your script into a stunning faceless video</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= stepNumber ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    {stepNumber}
                  </div>
                  <span className="ml-2 text-sm font-medium text-white">{stepNumber}</span>
                </div>
                {stepNumber < 4 && (
                  <div
                    className={`w-12 h-0.5 mx-4 ${
                      step > stepNumber ? 'bg-yellow-500' : 'bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-gray-800 rounded-lg p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Video Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter your video title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Script Content
                </label>
                <textarea
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent h-32 resize-none"
                  placeholder="Write your script here... (Minimum 50 characters)"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-400">
                    {script.length} characters
                  </span>
                  {script.length < 50 && (
                    <span className="text-sm text-red-400">
                      Minimum 50 characters required
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Video Category
                </label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  <option value="educational">Educational</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="business">Business</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="technology">Technology</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={script.length < 50 || !selectedTemplate}
                  className="px-6 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-md hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  Next: Choose Voice
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-4">
                  Select AI Voice
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {voices.map((voice) => (
                    <div
                      key={voice.voice_id}
                      onClick={() => setSelectedVoice(voice.voice_id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedVoice === voice.voice_id
                          ? 'border-yellow-500 bg-yellow-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white">{voice.name}</h3>
                        <span className="text-sm text-gray-400">{voice.labels?.accent || 'Neutral'}</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">{voice.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          {voice.language} • {voice.accent}
                        </span>
                        <button className="text-yellow-500 hover:text-yellow-400">
                          <Play className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-500 flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedVoice}
                  className="px-6 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-md hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  Next: Choose Style
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-4">
                  Select Video Style
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedTemplate === template.id
                          ? 'border-yellow-500 bg-yellow-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="aspect-video bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                        <Play className="w-8 h-8 text-yellow-500" />
                      </div>
                      <h3 className="font-semibold text-white mb-1">{template.name}</h3>
                      <p className="text-sm text-gray-300">{template.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Background Music
                </label>
                <select
                  value={backgroundMusic}
                  onChange={(e) => setBackgroundMusic(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="">No background music</option>
                  <option value="upbeat">Upbeat & Energetic</option>
                  <option value="calm">Calm & Relaxing</option>
                  <option value="dramatic">Dramatic & Intense</option>
                  <option value="fun">Fun & Playful</option>
                </select>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(2)} className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-500 flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={!selectedVoice || !selectedTemplate || generating}
                  className="px-6 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-md hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {generating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Video...
                    </>
                  ) : (
                    <>
                      Generate Video
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 4 && generatedVideo && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Review Your Video</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span className="text-gray-300">Title:</span>
                    <span className="text-white font-medium">{title}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span className="text-gray-300">Category:</span>
                    <span className="text-white font-medium capitalize">{selectedTemplate}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span className="text-gray-300">Voice:</span>
                    <span className="text-white font-medium">
                      {voices.find(v => v.voice_id === selectedVoice)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span className="text-gray-300">Style:</span>
                    <span className="text-white font-medium">
                      {templates.find(t => t.id === selectedTemplate)?.name}
                    </span>
                  </div>
                  {backgroundMusic && (
                    <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                      <span className="text-gray-300">Music:</span>
                      <span className="text-white font-medium capitalize">{backgroundMusic}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white mb-1">Estimated Processing Time</h4>
                    <p className="text-sm text-gray-300">
                      Your video will be ready in approximately 2-3 minutes. You'll receive a notification when it's complete.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleDownload}
                  className="px-6 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-md hover:bg-yellow-400 flex items-center justify-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Video
                </button>
                <button
                  onClick={handleUploadToYouTube}
                  className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-500 flex items-center justify-center"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload to YouTube
                </button>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setStep(1)
                    setScript('')
                    setTitle('')
                    setSelectedVoice('')
                    setSelectedTemplate('')
                    setBackgroundMusic('')
                    setGeneratedVideo(null)
                    setVideoStatus('')
                  }}
                  className="text-yellow-500 hover:text-yellow-400 font-medium"
                >
                  Create Another Video
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateVideo 