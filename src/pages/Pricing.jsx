import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Star, Zap, Crown, Users, Video, Download, Upload } from 'lucide-react'
import { SUBSCRIPTION_PLANS } from '../lib/supabase'

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [selectedPlan, setSelectedPlan] = useState('STARTER')

  const plans = [
    {
      id: 'FREE',
      name: 'Free',
      price: 0,
      originalPrice: 0,
      description: 'Perfect for getting started',
      icon: Video,
      popular: false,
      features: [
        '3 videos per month',
        '2 AI voices',
        'Basic templates',
        'Watermark on videos',
        '720p quality',
        'Email support'
      ],
      limitations: [
        'Limited to 3 videos',
        'Watermark on all videos',
        'Basic voice options'
      ]
    },
    {
      id: 'STARTER',
      name: 'Starter',
      price: billingCycle === 'monthly' ? 499 : 4990,
      originalPrice: billingCycle === 'monthly' ? 599 : 5990,
      description: 'Great for content creators',
      icon: Zap,
      popular: true,
      features: [
        '30 videos per month',
        '5 premium AI voices',
        'All templates',
        'No watermark',
        'HD quality (1080p)',
        'Priority support',
        'Custom branding',
        'Video analytics'
      ],
      limitations: [
        'Limited to 30 videos',
        'No batch generation'
      ]
    },
    {
      id: 'PRO',
      name: 'Pro',
      price: billingCycle === 'monthly' ? 999 : 9990,
      originalPrice: billingCycle === 'monthly' ? 1199 : 11990,
      description: 'For serious creators and businesses',
      icon: Crown,
      popular: false,
      features: [
        'Unlimited videos',
        '10 premium AI voices',
        'All templates + custom',
        'No watermark',
        '4K quality',
        'Priority support',
        'Custom branding',
        'Advanced analytics',
        'Batch generation',
        'YouTube auto-upload',
        'API access',
        'White-label option'
      ],
      limitations: []
    }
  ]

  const faqs = [
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access to your plan features until the end of your billing period.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 7-day money-back guarantee for all paid plans. If you\'re not satisfied, contact our support team for a full refund.'
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated and reflected in your next billing cycle.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are processed securely.'
    },
    {
      question: 'Is there a limit on video length?',
      answer: 'Free plan: 60 seconds, Starter plan: 5 minutes, Pro plan: 15 minutes. Custom lengths available for enterprise customers.'
    },
    {
      question: 'Can I use the videos commercially?',
      answer: 'Yes, all videos created with InvisiReel can be used for commercial purposes. You own the rights to your generated content.'
    }
  ]

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Choose the perfect plan for your content creation needs. Start free and upgrade as you grow.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-dark-800 rounded-lg p-1 flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-primary-500 text-dark-900'
                  : 'text-dark-300 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-primary-500 text-dark-900'
                  : 'text-dark-300 hover:text-white'
              }`}
            >
              Yearly
              <span className="ml-1 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`card relative ${
                plan.popular
                  ? 'ring-2 ring-primary-500 scale-105'
                  : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-dark-900 px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <plan.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-dark-300 mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">₹{plan.price}</span>
                  {billingCycle === 'monthly' ? (
                    <span className="text-dark-300">/month</span>
                  ) : (
                    <span className="text-dark-300">/year</span>
                  )}
                  {plan.originalPrice > plan.price && (
                    <div className="text-sm text-dark-400 line-through">
                      ₹{plan.originalPrice}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h4 className="font-semibold text-white">What's included:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-dark-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {plan.limitations.length > 0 && (
                  <div className="pt-4 border-t border-dark-700">
                    <h4 className="font-semibold text-white mb-3">Limitations:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          <span className="text-dark-400 text-sm">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <Link
                to={plan.id === 'FREE' ? '/register' : '/register'}
                className={`w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-primary-500 text-dark-900 hover:bg-primary-600'
                    : 'bg-dark-700 text-white hover:bg-dark-600'
                }`}
              >
                {plan.id === 'FREE' ? 'Start Free' : 'Get Started'}
              </Link>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="text-left py-4 px-4 text-dark-300 font-medium">Feature</th>
                  <th className="text-center py-4 px-4 text-dark-300 font-medium">Free</th>
                  <th className="text-center py-4 px-4 text-dark-300 font-medium">Starter</th>
                  <th className="text-center py-4 px-4 text-dark-300 font-medium">Pro</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-dark-700/50">
                  <td className="py-4 px-4 text-white">Videos per month</td>
                  <td className="py-4 px-4 text-center text-dark-300">3</td>
                  <td className="py-4 px-4 text-center text-dark-300">30</td>
                  <td className="py-4 px-4 text-center text-dark-300">Unlimited</td>
                </tr>
                <tr className="border-b border-dark-700/50">
                  <td className="py-4 px-4 text-white">AI Voices</td>
                  <td className="py-4 px-4 text-center text-dark-300">2</td>
                  <td className="py-4 px-4 text-center text-dark-300">5</td>
                  <td className="py-4 px-4 text-center text-dark-300">10</td>
                </tr>
                <tr className="border-b border-dark-700/50">
                  <td className="py-4 px-4 text-white">Video Quality</td>
                  <td className="py-4 px-4 text-center text-dark-300">720p</td>
                  <td className="py-4 px-4 text-center text-dark-300">1080p</td>
                  <td className="py-4 px-4 text-center text-dark-300">4K</td>
                </tr>
                <tr className="border-b border-dark-700/50">
                  <td className="py-4 px-4 text-white">Watermark</td>
                  <td className="py-4 px-4 text-center text-dark-300">Yes</td>
                  <td className="py-4 px-4 text-center text-dark-300">No</td>
                  <td className="py-4 px-4 text-center text-dark-300">No</td>
                </tr>
                <tr className="border-b border-dark-700/50">
                  <td className="py-4 px-4 text-white">Batch Generation</td>
                  <td className="py-4 px-4 text-center text-dark-300">No</td>
                  <td className="py-4 px-4 text-center text-dark-300">No</td>
                  <td className="py-4 px-4 text-center text-dark-300">Yes</td>
                </tr>
                <tr className="border-b border-dark-700/50">
                  <td className="py-4 px-4 text-white">YouTube Auto-upload</td>
                  <td className="py-4 px-4 text-center text-dark-300">No</td>
                  <td className="py-4 px-4 text-center text-dark-300">No</td>
                  <td className="py-4 px-4 text-center text-dark-300">Yes</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-white">Support</td>
                  <td className="py-4 px-4 text-center text-dark-300">Email</td>
                  <td className="py-4 px-4 text-center text-dark-300">Priority</td>
                  <td className="py-4 px-4 text-center text-dark-300">Priority + Phone</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="card">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-dark-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Creating?</h2>
          <p className="text-xl text-dark-300 mb-8">
            Join thousands of creators who trust InvisiReel for their video content
          </p>
          <Link to="/register" className="btn-primary text-lg px-8 py-4">
            Start Creating Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Pricing 