import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, Filter, Star, Users, Clock } from 'lucide-react'

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

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
      thumbnail: 'https://via.placeholder.com/300x200/1f2937/ffffff?text=Daily+Motivation',
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
      thumbnail: 'https://via.placeholder.com/300x200/1f2937/ffffff?text=Educational+Explainer',
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
      thumbnail: 'https://via.placeholder.com/300x200/1f2937/ffffff?text=Business+Tips',
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
      thumbnail: 'https://via.placeholder.com/300x200/1f2937/ffffff?text=Fun+Facts',
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
      thumbnail: 'https://via.placeholder.com/300x200/1f2937/ffffff?text=Workout+Motivation',
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
      thumbnail: 'https://via.placeholder.com/300x200/1f2937/ffffff?text=Financial+Tips',
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
      thumbnail: 'https://via.placeholder.com/300x200/1f2937/ffffff?text=Life+Hacks',
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
      thumbnail: 'https://via.placeholder.com/300x200/1f2937/ffffff?text=Success+Stories',
      duration: '60-120s',
      usage: 420,
      rating: 4.7,
      tags: ['motivation', 'success', 'inspiration']
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
    <div className="min-h-screen bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Video Templates</h1>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Choose from our collection of professionally designed templates to create engaging faceless videos
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
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-500 text-dark-900'
                      : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
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
            <div key={template.id} className="card hover:scale-105 transition-transform duration-200">
              {/* Thumbnail */}
              <div className="relative mb-4">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                  <Play className="w-12 h-12 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{template.name}</h3>
                  <p className="text-dark-300 text-sm">{template.description}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-dark-400">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {template.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {template.usage.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-primary-500 fill-current" />
                    {template.rating}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {template.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-dark-700 rounded text-xs text-dark-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Use Template Button */}
                <Link
                  to={`/create?template=${template.id}`}
                  className="btn-primary w-full text-center"
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
            <div className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-dark-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No templates found</h3>
            <p className="text-dark-300 mb-6">
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