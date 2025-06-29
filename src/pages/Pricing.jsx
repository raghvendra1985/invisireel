import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Star, Zap, Crown, Users, Video, Download, Upload, ChevronDown } from 'lucide-react'
import { SUBSCRIPTION_PLANS } from '../lib/supabase'

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [selectedPlan, setSelectedPlan] = useState('STARTER')
  const [openFaqs, setOpenFaqs] = useState([])

  const toggleFaq = (index) => {
    setOpenFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

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
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Start creating amazing faceless videos with our flexible pricing plans
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800 rounded-lg p-1 flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                billingCycle === 'monthly'
                  ? 'bg-yellow-500 text-gray-900'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                billingCycle === 'yearly'
                  ? 'bg-yellow-500 text-gray-900'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Yearly
              <span className="ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`card relative ${
                plan.popular ? 'ring-2 ring-yellow-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-500 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">
                    ${billingCycle === 'yearly' ? Math.round(plan.price * 10 * 0.8) : plan.price}
                  </span>
                  <span className="text-gray-400">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                </div>
                <p className="text-gray-300">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                  plan.popular
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                {plan.id === 'FREE' ? 'Start Free' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 px-4 text-gray-300 font-medium">Feature</th>
                  <th className="text-center py-4 px-4 text-gray-300 font-medium">Free</th>
                  <th className="text-center py-4 px-4 text-gray-300 font-medium">Starter</th>
                  <th className="text-center py-4 px-4 text-gray-300 font-medium">Pro</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700/50">
                  <td className="py-4 px-4 text-white">Videos per month</td>
                  <td className="py-4 px-4 text-center text-gray-300">3</td>
                  <td className="py-4 px-4 text-center text-gray-300">30</td>
                  <td className="py-4 px-4 text-center text-gray-300">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-4 px-4 text-white">AI Voices</td>
                  <td className="py-4 px-4 text-center text-gray-300">2</td>
                  <td className="py-4 px-4 text-center text-gray-300">5</td>
                  <td className="py-4 px-4 text-center text-gray-300">10</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-4 px-4 text-white">Video Quality</td>
                  <td className="py-4 px-4 text-center text-gray-300">720p</td>
                  <td className="py-4 px-4 text-center text-gray-300">1080p</td>
                  <td className="py-4 px-4 text-center text-gray-300">4K</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-4 px-4 text-white">Watermark</td>
                  <td className="py-4 px-4 text-center text-gray-300">Yes</td>
                  <td className="py-4 px-4 text-center text-gray-300">No</td>
                  <td className="py-4 px-4 text-center text-gray-300">No</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-4 px-4 text-white">Batch Generation</td>
                  <td className="py-4 px-4 text-center text-gray-300">No</td>
                  <td className="py-4 px-4 text-center text-gray-300">No</td>
                  <td className="py-4 px-4 text-center text-gray-300">Yes</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-4 px-4 text-white">YouTube Auto-upload</td>
                  <td className="py-4 px-4 text-center text-gray-300">No</td>
                  <td className="py-4 px-4 text-center text-gray-300">No</td>
                  <td className="py-4 px-4 text-center text-gray-300">Yes</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-white">Support</td>
                  <td className="py-4 px-4 text-center text-gray-300">Email</td>
                  <td className="py-4 px-4 text-center text-gray-300">Priority</td>
                  <td className="py-4 px-4 text-center text-gray-300">Priority + Phone</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-300">Everything you need to know about our pricing</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="card">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      openFaqs.includes(index) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaqs.includes(index) && (
                  <p className="text-gray-300 mt-4">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Creating?</h2>
          <p className="text-gray-300 mb-8">
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