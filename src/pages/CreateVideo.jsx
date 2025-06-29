import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Play, Download, Upload, Settings, Mic, Music, Video, Loader2, CheckCircle } from 'lucide-react'
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
    if (!user) {
      navigate('/login')
      return
    }
    
    fetchVoices()
    fetchTemplates()
    fetchMusicOptions()
  }, [user, navigate])

  const fetchVoices = async () => {
    try {
      const voicesData = await elevenLabsAPI.getVoices()
      setVoices(voicesData.slice(0, 10)) // Limit to 10 voices
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

      // Simulate video generation process
      setTimeout(() => {
        setGeneratedVideo({
          id: videoData.id,
          title: videoData.title,
          url: 'https://example.com/sample-video.mp4', // Mock URL
          thumbnail: 'https://via.placeholder.com/400x225/1f2937/ffffff?text=Generated+Video'
        })
        setVideoStatus('Video generated successfully!')
        setGenerating(false)
        setStep(3)
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
    <div className="min-h-screen bg-dark-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create New Video</h1>
          <p className="text-dark-300">Transform your script into an engaging faceless video</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= stepNumber ? 'bg-primary-500 text-dark-900' : 'bg-dark-700 text-dark-300'
                }`}>
                  {step > stepNumber ? <CheckCircle className="w-5 h-5" /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNumber ? 'bg-primary-500' : 'bg-dark-700'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Script Input */}
        {step === 1 && (
          <div className="card">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">Step 1: Write Your Script</h2>
              <p className="text-dark-300">Enter your script or content idea</p>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
                  Video Title (Optional)
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-field w-full"
                  placeholder="Enter video title"
                />
              </div>

              <div>
                <label htmlFor="script" className="block text-sm font-medium text-white mb-2">
                  Script *
                </label>
                <textarea
                  id="script"
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  className="input-field w-full h-32 resize-none"
                  placeholder="Write your script here... (Minimum 50 characters)"
                  required
                />
                <p className="text-dark-400 text-sm mt-1">
                  {script.length} characters
                </p>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={script.length < 50}
                className="btn-primary w-full"
              >
                Continue to Voice & Style
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Voice & Style Selection */}
        {step === 2 && (
          <div className="card">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">Step 2: Choose Voice & Style</h2>
              <p className="text-dark-300">Select your preferred voice and video template</p>
            </div>

            <div className="space-y-8">
              {/* Voice Selection */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                  <Mic className="w-5 h-5 mr-2" />
                  Choose Voice
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {voices.map((voice) => (
                    <div
                      key={voice.voice_id}
                      onClick={() => setSelectedVoice(voice.voice_id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedVoice === voice.voice_id
                          ? 'border-primary-500 bg-primary-500/10'
                          : 'border-dark-600 hover:border-dark-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">{voice.name}</p>
                          <p className="text-dark-400 text-sm">{voice.labels?.accent || 'Neutral'}</p>
                        </div>
                        <button className="text-primary-500 hover:text-primary-400">
                          <Play className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Template Selection */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                  <Video className="w-5 h-5 mr-2" />
                  Choose Template
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedTemplate === template.id
                          ? 'border-primary-500 bg-primary-500/10'
                          : 'border-dark-600 hover:border-dark-500'
                      }`}
                    >
                      <p className="font-medium text-white">{template.name}</p>
                      <p className="text-dark-400 text-sm">{template.description}</p>
                      <span className="inline-block mt-2 px-2 py-1 bg-dark-700 rounded text-xs text-dark-300">
                        {template.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Background Music */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                  <Music className="w-5 h-5 mr-2" />
                  Background Music (Optional)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {musicOptions.map((music) => (
                    <div
                      key={music.id}
                      onClick={() => setBackgroundMusic(music.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        backgroundMusic === music.id
                          ? 'border-primary-500 bg-primary-500/10'
                          : 'border-dark-600 hover:border-dark-500'
                      }`}
                    >
                      <p className="font-medium text-white">{music.name}</p>
                      <p className="text-dark-400 text-sm">{music.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setStep(1)}
                  className="btn-secondary flex-1"
                >
                  Back
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={!selectedVoice || !selectedTemplate || generating}
                  className="btn-primary flex-1 flex items-center justify-center"
                >
                  {generating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate Video'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Video Preview & Download */}
        {step === 3 && generatedVideo && (
          <div className="card">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">Step 3: Your Video is Ready!</h2>
              <p className="text-dark-300">{videoStatus}</p>
            </div>

            <div className="space-y-6">
              {/* Video Preview */}
              <div className="aspect-video bg-dark-700 rounded-lg flex items-center justify-center border border-dark-600">
                <div className="text-center">
                  <Play className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                  <p className="text-dark-300">Video preview will be displayed here</p>
                  <p className="text-dark-400 text-sm mt-2">{generatedVideo.title}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleDownload}
                  className="btn-primary flex items-center justify-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Video
                </button>
                <button
                  onClick={handleUploadToYouTube}
                  className="btn-secondary flex items-center justify-center"
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
                  className="text-primary-500 hover:text-primary-400 font-medium"
                >
                  Create Another Video
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateVideo 