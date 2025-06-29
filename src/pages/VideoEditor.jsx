import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Play, Pause, Volume2, VolumeX, Settings, Download, Save, RotateCcw, Scissors, Type, Music, Image } from 'lucide-react'
import { supabase, TABLES } from '../lib/supabase'
import LoadingSpinner from '../components/LoadingSpinner'

const VideoEditor = ({ user }) => {
  const { videoId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [video, setVideo] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [activeTab, setActiveTab] = useState('trim')
  
  // Editor states
  const [trimStart, setTrimStart] = useState(0)
  const [trimEnd, setTrimEnd] = useState(100)
  const [textOverlays, setTextOverlays] = useState([])
  const [selectedMusic, setSelectedMusic] = useState('')
  const [musicVolume, setMusicVolume] = useState(0.5)
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100
  })

  useEffect(() => {
    if (user && videoId) {
      fetchVideo()
    }
  }, [user, videoId])

  const fetchVideo = async () => {
    try {
      const { data, error } = await supabase
        .from(TABLES.VIDEOS)
        .select('*')
        .eq('id', videoId)
        .eq('user_id', user.id)
        .single()

      if (error) throw error
      setVideo(data)
    } catch (error) {
      console.error('Error fetching video:', error)
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime)
  }

  const handleLoadedMetadata = (e) => {
    setDuration(e.target.duration)
    setTrimEnd(e.target.duration)
  }

  const togglePlay = () => {
    const videoElement = document.getElementById('video-player')
    if (isPlaying) {
      videoElement.pause()
    } else {
      videoElement.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const addTextOverlay = () => {
    const newOverlay = {
      id: Date.now(),
      text: 'New Text',
      position: { x: 50, y: 50 },
      fontSize: 24,
      color: '#ffffff',
      startTime: currentTime,
      endTime: currentTime + 5
    }
    setTextOverlays([...textOverlays, newOverlay])
  }

  const updateTextOverlay = (id, field, value) => {
    setTextOverlays(textOverlays.map(overlay => 
      overlay.id === id ? { ...overlay, [field]: value } : overlay
    ))
  }

  const removeTextOverlay = (id) => {
    setTextOverlays(textOverlays.filter(overlay => overlay.id !== id))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const { error } = await supabase
        .from(TABLES.VIDEOS)
        .update({
          trim_start: trimStart,
          trim_end: trimEnd,
          text_overlays: textOverlays,
          background_music: selectedMusic,
          music_volume: musicVolume,
          filters: filters,
          updated_at: new Date().toISOString()
        })
        .eq('id', videoId)

      if (error) throw error
      alert('Changes saved successfully!')
    } catch (error) {
      console.error('Error saving video:', error)
      alert('Error saving changes. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleExport = () => {
    // Mock export functionality
    alert('Video export feature coming soon!')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Video not found</h2>
          <p className="text-gray-300">The video you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Video Editor</h1>
            <p className="text-gray-300">Edit and customize your video</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-secondary flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleExport}
              className="btn-primary flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Preview */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="relative">
                <video
                  id="video-player"
                  className="w-full rounded-lg"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src={video.url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Text Overlays */}
                {textOverlays.map(overlay => (
                  <div
                    key={overlay.id}
                    className="absolute pointer-events-none"
                    style={{
                      left: `${overlay.position.x}%`,
                      top: `${overlay.position.y}%`,
                      fontSize: `${overlay.fontSize}px`,
                      color: overlay.color
                    }}
                  >
                    {overlay.text}
                  </div>
                ))}
              </div>

              {/* Video Controls */}
              <div className="mt-4 space-y-4">
                {/* Progress Bar */}
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={(e) => {
                      const videoElement = document.getElementById('video-player')
                      videoElement.currentTime = e.target.value
                      setCurrentTime(e.target.value)
                    }}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-1">
                    <span>{Math.floor(currentTime)}s</span>
                    <span>{Math.floor(duration)}s</span>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={togglePlay}
                      className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                    </button>
                    
                    <div className="flex items-center space-x-2">
                      <button onClick={toggleMute}>
                        {isMuted ? <VolumeX className="w-5 h-5 text-gray-400" /> : <Volume2 className="w-5 h-5 text-gray-400" />}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-20 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>

                  <div className="text-sm text-gray-400">
                    {video.title}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Editor Panel */}
          <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="card">
              <div className="flex space-x-1">
                {[
                  { id: 'trim', label: 'Trim', icon: Scissors },
                  { id: 'text', label: 'Text', icon: Type },
                  { id: 'music', label: 'Music', icon: Music },
                  { id: 'filters', label: 'Filters', icon: Settings }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-yellow-500 text-gray-900'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 mx-auto mb-1" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="card">
              {activeTab === 'trim' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Trim Video</h3>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Start Time (seconds)</label>
                    <input
                      type="number"
                      min="0"
                      max={duration}
                      value={trimStart}
                      onChange={(e) => setTrimStart(parseFloat(e.target.value))}
                      className="input-field w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">End Time (seconds)</label>
                    <input
                      type="number"
                      min={trimStart}
                      max={duration}
                      value={trimEnd}
                      onChange={(e) => setTrimEnd(parseFloat(e.target.value))}
                      className="input-field w-full"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'text' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">Text Overlays</h3>
                    <button
                      onClick={addTextOverlay}
                      className="btn-secondary text-sm"
                    >
                      Add Text
                    </button>
                  </div>
                  
                  {textOverlays.map(overlay => (
                    <div key={overlay.id} className="p-3 bg-gray-700 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">Text Overlay</span>
                        <button
                          onClick={() => removeTextOverlay(overlay.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          ×
                        </button>
                      </div>
                      <input
                        type="text"
                        value={overlay.text}
                        onChange={(e) => updateTextOverlay(overlay.id, 'text', e.target.value)}
                        className="input-field w-full mb-2"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          value={overlay.fontSize}
                          onChange={(e) => updateTextOverlay(overlay.id, 'fontSize', parseInt(e.target.value))}
                          className="input-field"
                          placeholder="Font size"
                        />
                        <input
                          type="color"
                          value={overlay.color}
                          onChange={(e) => updateTextOverlay(overlay.id, 'color', e.target.value)}
                          className="w-full h-10 rounded border border-gray-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'music' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Background Music</h3>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Select Music</label>
                    <select
                      value={selectedMusic}
                      onChange={(e) => setSelectedMusic(e.target.value)}
                      className="input-field w-full"
                    >
                      <option value="">No music</option>
                      <option value="upbeat">Upbeat & Energetic</option>
                      <option value="calm">Calm & Relaxing</option>
                      <option value="dramatic">Dramatic & Intense</option>
                      <option value="fun">Fun & Playful</option>
                    </select>
                  </div>
                  {selectedMusic && (
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Music Volume</label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={musicVolume}
                        onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'filters' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Video Filters</h3>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Brightness</label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={filters.brightness}
                      onChange={(e) => setFilters({...filters, brightness: parseInt(e.target.value)})}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Contrast</label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={filters.contrast}
                      onChange={(e) => setFilters({...filters, contrast: parseInt(e.target.value)})}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Saturation</label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={filters.saturation}
                      onChange={(e) => setFilters({...filters, saturation: parseInt(e.target.value)})}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoEditor 