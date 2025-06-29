import { Link } from 'react-router-dom'
import { Play, Zap, Users, Star, CheckCircle, ArrowRight, Video, Mic, Music, Download, X } from 'lucide-react'
import { useState } from 'react'

const Home = () => {
  const [showDemo, setShowDemo] = useState(false)

  const handleWatchDemo = () => {
    setShowDemo(true)
  }

  const closeDemo = () => {
    setShowDemo(false)
  }

  const features = [
    {
      icon: Video,
      title: 'Text to Video',
      description: 'Transform your scripts into engaging videos with AI-powered generation'
    },
    {
      icon: Mic,
      title: 'AI Voiceovers',
      description: 'Professional voiceovers using ElevenLabs technology'
    },
    {
      icon: Music,
      title: 'Royalty-free Music',
      description: 'Add background music and sound effects to your videos'
    },
    {
      icon: Download,
      title: 'Auto-upload',
      description: 'Direct upload to YouTube Shorts and Instagram Reels'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Content Creator',
      content: 'InvisiReel helped me create 50+ viral shorts in just one month!',
      rating: 5
    },
    {
      name: 'Mike Rodriguez',
      role: 'YouTuber',
      content: 'The AI voiceovers sound incredibly natural. My audience loves it!',
      rating: 5
    },
    {
      name: 'Emma Thompson',
      role: 'Business Coach',
      content: 'Perfect for creating educational content without showing my face.',
      rating: 5
    }
  ]

  const steps = [
    {
      number: '01',
      title: 'Enter Your Script',
      description: 'Write your script or paste your content idea'
    },
    {
      number: '02',
      title: 'Choose Voice & Style',
      description: 'Select from multiple AI voices and video templates'
    },
    {
      number: '03',
      title: 'Generate & Download',
      description: 'Get your video in seconds, ready for social media'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.02&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Create Faceless Videos with AI,
              <span className="gradient-text block">in Seconds</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform your scripts into high-quality faceless videos using AI voiceovers, 
              stock visuals, auto-subtitles, and music — all in one click.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary text-lg px-8 py-4">
                Start for Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <button 
                className="btn-secondary text-lg px-8 py-4 flex items-center justify-center"
                onClick={handleWatchDemo}
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              See InvisiReel in Action
            </h2>
            <p className="text-gray-300 text-lg">
              Watch how easy it is to create engaging faceless videos
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="relative aspect-video bg-gray-700 rounded-2xl overflow-hidden border border-gray-600 cursor-pointer group" onClick={handleWatchDemo}>
              <video 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                controls
                poster="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=450&fit=crop&crop=center"
              >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Play className="w-16 h-16 text-white" />
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-300 text-sm">
                This is a sample video showcasing InvisiReel's AI-powered video generation capabilities.
                <br />
                Create similar engaging content in seconds with our platform!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-300 text-lg">
              Create your first video in just 3 simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-gray-900 font-bold text-xl">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to Create Viral Videos
            </h2>
            <p className="text-gray-300 text-lg">
              Powerful features designed for content creators
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-gray-900" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Loved by Content Creators
            </h2>
            <p className="text-gray-300 text-lg">
              Join thousands of creators who trust InvisiReel
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-600 to-yellow-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Create Your First Video?
          </h2>
          <p className="text-gray-800 text-lg mb-8">
            Join thousands of creators who are already using InvisiReel to grow their audience
          </p>
          <Link to="/register" className="bg-gray-900 text-white font-semibold py-4 px-8 rounded-lg hover:bg-gray-800 transition-colors duration-200 inline-flex items-center">
            Start Creating Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Demo Video Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={closeDemo}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="aspect-video bg-gray-800 rounded-2xl overflow-hidden">
              <video 
                className="w-full h-full object-cover"
                controls
                autoPlay
                poster="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=450&fit=crop&crop=center"
              >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-white text-lg font-semibold mb-2">InvisiReel Demo</h3>
              <p className="text-gray-300 text-sm">
                See how easy it is to create engaging faceless videos with AI
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home 