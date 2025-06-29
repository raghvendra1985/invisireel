import { useState, useEffect } from 'react'
import { TrendingUp, Eye, Play, Share2, Calendar, BarChart3, PieChart, Activity } from 'lucide-react'
import { supabase, TABLES } from '../lib/supabase'
import LoadingSpinner from '../components/LoadingSpinner'

const Analytics = ({ user }) => {
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d')
  const [analytics, setAnalytics] = useState({
    overview: {
      totalViews: 0,
      totalVideos: 0,
      avgWatchTime: 0,
      engagementRate: 0
    },
    topVideos: [],
    viewsByDay: [],
    categoryPerformance: []
  })

  useEffect(() => {
    if (user) {
      fetchAnalytics()
    }
  }, [user, timeRange])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      // Fetch user's videos
      const { data: videos, error } = await supabase
        .from(TABLES.VIDEOS)
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      // Mock analytics data based on videos
      const mockAnalytics = generateMockAnalytics(videos || [])
      setAnalytics(mockAnalytics)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateMockAnalytics = (videos) => {
    const totalViews = videos.reduce((sum, v) => sum + (v.views || 0), 0)
    const totalVideos = videos.length
    const avgWatchTime = totalVideos > 0 ? Math.round(totalViews / totalVideos) : 0
    const engagementRate = totalViews > 0 ? Math.round((totalViews / (totalVideos * 100)) * 100) : 0

    // Generate mock daily views for the last 7 days
    const viewsByDay = Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      views: Math.floor(Math.random() * 100) + 10
    }))

    // Generate mock top videos
    const topVideos = videos.slice(0, 5).map(video => ({
      ...video,
      views: video.views || Math.floor(Math.random() * 1000) + 100,
      watchTime: Math.floor(Math.random() * 300) + 60,
      engagement: Math.floor(Math.random() * 20) + 5
    })).sort((a, b) => b.views - a.views)

    // Generate mock category performance
    const categories = ['Educational', 'Entertainment', 'Business', 'Lifestyle', 'Technology']
    const categoryPerformance = categories.map(category => ({
      category,
      videos: Math.floor(Math.random() * 10) + 1,
      views: Math.floor(Math.random() * 5000) + 100,
      avgWatchTime: Math.floor(Math.random() * 200) + 60
    }))

    return {
      overview: { totalViews, totalVideos, avgWatchTime, engagementRate },
      topVideos,
      viewsByDay,
      categoryPerformance
    }
  }

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
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
            <h1 className="text-3xl font-bold text-white">Analytics</h1>
            <p className="text-gray-300">Track your video performance and insights</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="input-field"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mr-4">
                <Eye className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Views</p>
                <p className="text-2xl font-bold text-white">{formatNumber(analytics.overview.totalViews)}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mr-4">
                <Play className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Videos</p>
                <p className="text-2xl font-bold text-white">{analytics.overview.totalVideos}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mr-4">
                <Activity className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Avg Watch Time</p>
                <p className="text-2xl font-bold text-white">{analytics.overview.avgWatchTime}s</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mr-4">
                <TrendingUp className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Engagement Rate</p>
                <p className="text-2xl font-bold text-white">{analytics.overview.engagementRate}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Views Over Time */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Views Over Time</h2>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {analytics.viewsByDay.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">{day.date}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{width: `${(day.views / 100) * 100}%`}}
                      ></div>
                    </div>
                    <span className="text-white text-sm w-12 text-right">{day.views}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Performance */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Category Performance</h2>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {analytics.categoryPerformance.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">{category.category}</h3>
                    <p className="text-sm text-gray-400">{category.videos} videos</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{formatNumber(category.views)} views</p>
                    <p className="text-sm text-gray-400">{category.avgWatchTime}s avg</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Videos */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Top Performing Videos</h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          
          {analytics.topVideos.length === 0 ? (
            <div className="text-center py-12">
              <Play className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No videos yet</h3>
              <p className="text-gray-300">Create your first video to see analytics</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Video</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Views</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Watch Time</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Engagement</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.topVideos.map((video, index) => (
                    <tr key={video.id} className="border-b border-gray-700/50 hover:bg-gray-700/20">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                          </div>
                          <div>
                            <p className="text-white font-medium">{video.title}</p>
                            <p className="text-sm text-gray-400">{video.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-white font-medium">
                        {formatNumber(video.views)}
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {video.watchTime}s
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {video.engagement}%
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {new Date(video.created_at).toLocaleDateString()}
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

export default Analytics 