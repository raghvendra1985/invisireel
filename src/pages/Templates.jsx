import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, Filter, Star, Users, Clock, Image } from 'lucide-react'

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [imageErrors, setImageErrors] = useState({})

  const handleImageError = (templateId) => {
    setImageErrors(prev => ({ ...prev, [templateId]: true }))
  }

  const handlePlayClick = (templateId) => {
    // For now, just log the template ID. In a real app, this would open a video preview
    console.log('Playing template:', templateId)
    // You could also navigate to a preview page or open a modal
    // navigate(`/preview/${templateId}`)
  }

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'motivation', name: 'Motivation' },
    { id: 'education', name: 'Education' },
    { id: 'business', name: 'Business' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'fitness', name: 'Fitness' },
    { id: 'finance', name: 'Finance' },
    { id: 'lifestyle', name: 'Lifestyle' }
  ]

  const templates = [
    {
      id: 'motivation-1',
      name: 'Daily Motivation',
      description: 'Perfect for daily motivational content and positive affirmations',
      category: 'motivation',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&crop=center',
      duration: '30-60s',
      usage: 1250,
      rating: 4.8,
      tags: ['motivation', 'daily', 'positive']
    },
    {
      id: 'education-1',
      name: 'Educational Explainer',
      description: 'Great for explaining complex topics in simple terms',
      category: 'education',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop&crop=center',
      duration: '60-90s',
      usage: 890,
      rating: 4.6,
      tags: ['education', 'explainer', 'learning']
    },
    {
      id: 'business-1',
      name: 'Business Tips',
      description: 'Professional template for business advice and tips',
      category: 'business',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop&crop=center',
      duration: '45-75s',
      usage: 650,
      rating: 4.7,
      tags: ['business', 'professional', 'tips']
    },
    {
      id: 'entertainment-1',
      name: 'Fun Facts',
      description: 'Engaging template for sharing interesting facts and trivia',
      category: 'entertainment',
      thumbnail: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&h=200&fit=crop&crop=center',
      duration: '30-45s',
      usage: 1100,
      rating: 4.9,
      tags: ['entertainment', 'fun', 'facts']
    },
    {
      id: 'fitness-1',
      name: 'Workout Motivation',
      description: 'Energetic template for fitness and workout content',
      category: 'fitness',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center',
      duration: '45-60s',
      usage: 750,
      rating: 4.5,
      tags: ['fitness', 'workout', 'energy']
    },
    {
      id: 'finance-1',
      name: 'Financial Tips',
      description: 'Professional template for financial advice and money tips',
      category: 'finance',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop&crop=center',
      duration: '60-90s',
      usage: 520,
      rating: 4.4,
      tags: ['finance', 'money', 'tips']
    },
    {
      id: 'lifestyle-1',
      name: 'Life Hacks',
      description: 'Creative template for sharing life hacks and tips',
      category: 'lifestyle',
      thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=300&h=200&fit=crop&crop=center',
      duration: '30-60s',
      usage: 980,
      rating: 4.6,
      tags: ['lifestyle', 'hacks', 'tips']
    },
    {
      id: 'motivation-2',
      name: 'Success Stories',
      description: 'Inspirational template for success stories and achievements',
      category: 'motivation',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop&crop=center',
      duration: '60-120s',
      usage: 420,
      rating: 4.7,
      tags: ['motivation', 'success', 'inspiration']
    },
    {
      id: 'education-2',
      name: 'Science Explainer',
      description: 'Perfect for explaining scientific concepts and discoveries',
      category: 'education',
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=200&fit=crop&crop=center',
      duration: '90-120s',
      usage: 320,
      rating: 4.5,
      tags: ['education', 'science', 'explainer']
    },
    {
      id: 'business-2',
      name: 'Startup Tips',
      description: 'Valuable insights for entrepreneurs and startup founders',
      category: 'business',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop&crop=center',
      duration: '45-90s',
      usage: 280,
      rating: 4.6,
      tags: ['business', 'startup', 'entrepreneur']
    },
    {
      id: 'entertainment-2',
      name: 'Movie Reviews',
      description: 'Engaging template for movie and entertainment reviews',
      category: 'entertainment',
      thumbnail: 'https://images.unsplash.com/photo-1489599835382-957593cb2371?w=300&h=200&fit=crop&crop=center',
      duration: '60-90s',
      usage: 650,
      rating: 4.8,
      tags: ['entertainment', 'movies', 'reviews']
    }
  ]

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Video Templates</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Choose from our collection of professionally designed templates to create stunning faceless videos
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates..."
                  className="input-field w-full pl-10"
                />
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-yellow-500 text-gray-900'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="card hover:scale-105 transition-transform duration-200 flex flex-col">
              {/* Thumbnail */}
              <div className="relative mb-4">
                {imageErrors[template.id] ? (
                  <div className="w-full h-48 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Image className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">{template.name}</p>
                    </div>
                  </div>
                ) : (
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={() => handleImageError(template.id)}
                    loading="lazy"
                  />
                )}
                <button 
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-lg"
                  onClick={() => handlePlayClick(template.id)}
                >
                  <Play className="w-12 h-12 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{template.name}</h3>
                  <p className="text-gray-300 text-sm">{template.description}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {template.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {template.usage.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                    {template.rating}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {template.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Use Template Button */}
                <Link
                  to={`/create?template=${template.id}`}
                  className="btn-primary w-full text-center mt-auto"
                >
                  Use Template
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No templates found</h3>
            <p className="text-gray-300 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Templates 