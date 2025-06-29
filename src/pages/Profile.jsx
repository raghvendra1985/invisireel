import { useState, useEffect } from 'react'
import { User, Mail, Calendar, Crown, Settings, Key, Bell, Shield, CreditCard, Download } from 'lucide-react'
import { supabase } from '../lib/supabase'
import LoadingSpinner from '../components/LoadingSpinner'

const Profile = ({ user }) => {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState({
    full_name: user?.user_metadata?.full_name || '',
    username: user?.user_metadata?.username || '',
    bio: user?.user_metadata?.bio || '',
    website: user?.user_metadata?.website || '',
    notifications: {
      email: true,
      push: true,
      marketing: false
    }
  })
  const [subscription, setSubscription] = useState({
    plan: 'STARTER',
    status: 'active',
    nextBilling: '2024-02-01',
    usage: {
      videos: 5,
      limit: 10,
      storage: '2.5GB',
      limitStorage: '5GB'
    }
  })

  const handleSaveProfile = async () => {
    setSaving(true)
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: profile.full_name,
          username: profile.username,
          bio: profile.bio,
          website: profile.website
        }
      })
      
      if (error) throw error
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleExportData = () => {
    // Mock data export
    const data = {
      profile: profile,
      subscription: subscription,
      exportDate: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'invisireel-data.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!user) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
          <p className="text-gray-300">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <div className="card">
              <div className="flex items-center mb-6">
                <User className="w-6 h-6 text-yellow-500 mr-3" />
                <h2 className="text-xl font-semibold text-white">Profile Information</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.full_name}
                    onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                    className="input-field w-full"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={profile.username}
                    onChange={(e) => setProfile({...profile, username: e.target.value})}
                    className="input-field w-full"
                    placeholder="Choose a username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Bio
                  </label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    className="input-field w-full h-24 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={profile.website}
                    onChange={(e) => setProfile({...profile, website: e.target.value})}
                    className="input-field w-full"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="btn-primary w-full"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="card">
              <div className="flex items-center mb-6">
                <Bell className="w-6 h-6 text-yellow-500 mr-3" />
                <h2 className="text-xl font-semibold text-white">Notification Settings</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-300">Receive updates about your videos</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.notifications.email}
                      onChange={(e) => setProfile({
                        ...profile,
                        notifications: {...profile.notifications, email: e.target.checked}
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Push Notifications</h3>
                    <p className="text-sm text-gray-300">Get notified when videos are ready</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.notifications.push}
                      onChange={(e) => setProfile({
                        ...profile,
                        notifications: {...profile.notifications, push: e.target.checked}
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Marketing Emails</h3>
                    <p className="text-sm text-gray-300">Receive updates about new features</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.notifications.marketing}
                      onChange={(e) => setProfile({
                        ...profile,
                        notifications: {...profile.notifications, marketing: e.target.checked}
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Info */}
            <div className="card">
              <div className="flex items-center mb-4">
                <Shield className="w-5 h-5 text-yellow-500 mr-2" />
                <h3 className="text-lg font-semibold text-white">Account Info</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-300">{user.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-300">
                    Joined {new Date(user.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Subscription */}
            <div className="card">
              <div className="flex items-center mb-4">
                <Crown className="w-5 h-5 text-yellow-500 mr-2" />
                <h3 className="text-lg font-semibold text-white">Subscription</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Plan:</span>
                  <span className="text-white font-medium">{subscription.plan}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Status:</span>
                  <span className="text-green-400 font-medium">{subscription.status}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Next billing:</span>
                  <span className="text-white">{subscription.nextBilling}</span>
                </div>
                
                <div className="pt-3 border-t border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 text-sm">Videos used:</span>
                    <span className="text-white text-sm">{subscription.usage.videos}/{subscription.usage.limit}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{width: `${(subscription.usage.videos / subscription.usage.limit) * 100}%`}}
                    ></div>
                  </div>
                </div>
                
                <button className="btn-secondary w-full text-sm">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Manage Subscription
                </button>
              </div>
            </div>

            {/* Data Export */}
            <div className="card">
              <div className="flex items-center mb-4">
                <Download className="w-5 h-5 text-yellow-500 mr-2" />
                <h3 className="text-lg font-semibold text-white">Data Export</h3>
              </div>
              
              <p className="text-sm text-gray-300 mb-4">
                Download all your data including videos, settings, and preferences.
              </p>
              
              <button onClick={handleExportData} className="btn-secondary w-full text-sm">
                Export My Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile 