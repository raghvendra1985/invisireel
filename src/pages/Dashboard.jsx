import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Play, Download, Trash2, Eye, Calendar, Video, Users, TrendingUp, Settings, BarChart3, User, FileText } from 'lucide-react'
import { supabase, TABLES, VIDEO_STATUS } from '../lib/supabase'
import LoadingSpinner from '../components/LoadingSpinner'

const Dashboard = ({ user }) => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalVideos: 0,
    completedVideos: 0,
    processingVideos: 0,
    totalViews: 0
  })

  useEffect(() => {
    if (user) {
      fetchVideos()
      fetchStats()
    }
  }, [user])

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from(TABLES.VIDEOS)
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setVideos(data || [])
    } catch (error) {
      console.error('Error fetching videos:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from(TABLES.VIDEOS)
        .select('status, views')
        .eq('user_id', user.id)

      if (error) throw error

      const stats = {
        totalVideos: data.length,
        completedVideos: data.filter(v => v.status === VIDEO_STATUS.COMPLETED).length,
        processingVideos: data.filter(v => v.status === VIDEO_STATUS.PROCESSING).length,
        totalViews: data.reduce((sum, v) => sum + (v.views || 0), 0)
      }

      setStats(stats)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const deleteVideo = async (videoId) => {
    if (!confirm('Are you sure you want to delete this video?')) return

    try {
      const { error } = await supabase
        .from(TABLES.VIDEOS)
        .delete()
        .eq('id', videoId)

      if (error) throw error

      setVideos(videos.filter(v => v.id !== videoId))
      fetchStats()
    } catch (error) {
      console.error('Error deleting video:', error)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case VIDEO_STATUS.COMPLETED:
        return 'text-green-400 bg-green-400/10'
      case VIDEO_STATUS.PROCESSING:
        return 'text-yellow-400 bg-yellow-400/10'
      case VIDEO_STATUS.FAILED:
        return 'text-red-400 bg-red-400/10'
      default:
        return 'text-gray-400 bg-gray-400/10'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-300">Welcome back, {user?.user_metadata?.name || 'Creator'}!</p>
          </div>
          <Link to="/create" className="btn-primary flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Create New Video
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mr-4">
                <Video className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Videos</p>
                <p className="text-2xl font-bold text-white">{stats.totalVideos}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mr-4">
                <Play className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Completed</p>
                <p className="text-2xl font-bold text-white">{stats.completedVideos}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mr-4">
                <TrendingUp className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Processing</p>
                <p className="text-2xl font-bold text-white">{stats.processingVideos}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mr-4">
                <Eye className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Views</p>
                <p className="text-2xl font-bold text-white">{stats.totalViews.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/analytics" className="card hover:bg-gray-700/50 transition-colors cursor-pointer">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mr-4">
                <BarChart3 className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Analytics</h3>
                <p className="text-gray-300 text-sm">View performance insights</p>
              </div>
            </div>
          </Link>

          <Link to="/profile" className="card hover:bg-gray-700/50 transition-colors cursor-pointer">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mr-4">
                <User className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Profile</h3>
                <p className="text-gray-300 text-sm">Manage your account</p>
              </div>
            </div>
          </Link>

          <Link to="/templates" className="card hover:bg-gray-700/50 transition-colors cursor-pointer">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Templates</h3>
                <p className="text-gray-300 text-sm">Browse video templates</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Videos Section */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Your Videos</h2>
            <Link to="/create" className="text-primary-500 hover:text-primary-400 text-sm font-medium">
              Create New
            </Link>
          </div>

          {videos.length === 0 ? (
            <div className="text-center py-12">
              <Video className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No videos yet</h3>
              <p className="text-gray-300 mb-6">Create your first video to get started</p>
              <Link to="/create" className="btn-primary">
                Create Your First Video
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Title</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Created</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Views</th>
                    <th className="text-right py-3 px-4 text-gray-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {videos.map((video) => (
                    <tr key={video.id} className="border-b border-gray-700/50 hover:bg-gray-700/20">
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-white font-medium">{video.title}</p>
                          <p className="text-sm text-gray-400">{video.description}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(video.status)}`}>
                          {video.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {new Date(video.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {video.views || 0}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          {video.status === VIDEO_STATUS.COMPLETED && (
                            <>
                              <button className="text-primary-500 hover:text-primary-400">
                                <Play className="w-4 h-4" />
                              </button>
                              <Link 
                                to={`/video-editor/${video.id}`}
                                className="text-blue-500 hover:text-blue-400"
                              >
                                <Settings className="w-4 h-4" />
                              </Link>
                              <button className="text-green-500 hover:text-green-400">
                                <Download className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button 
                            onClick={() => deleteVideo(video.id)}
                            className="text-red-500 hover:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard 