import React, { useState, useEffect, useRef } from 'react';
import InteractiveBackground from '../components/InteractiveBackground'

const EstimateProject = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: '',
    projectName: '',
    description: '',
    features: [],
    timeline: '',
    budget: '',
    name: '',
    email: '',
    company: '',
    phone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => {
        const currentFeatures = prev.features || [];
        if (checked) {
          return { ...prev, features: [...currentFeatures, value] };
        } else {
          return { ...prev, features: currentFeatures.filter(f => f !== value) };
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const nextStep = () => {
    if (step === 1 && !formData.projectType) return;
    if (step === 2 && (!formData.projectName || !formData.description)) return;
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setStep(1);
      setFormData({
        projectType: '',
        projectName: '',
        description: '',
        features: [],
        timeline: '',
        budget: '',
        name: '',
        email: '',
        company: '',
        phone: ''
      });
    }, 5000);
  };

  const projectTypes = [
    { id: 'web', label: 'Web Application', icon: '🌐' },
    { id: 'mobile', label: 'Mobile Application', icon: '📱' },
    { id: 'ecommerce', label: 'E-Commerce Platform', icon: '🛒' },
    { id: 'saas', label: 'SaaS Platform', icon: '☁️' },
    { id: 'design', label: 'UI/UX Design', icon: '🎨' },
    { id: 'other', label: 'Other Project', icon: '✨' }
  ];

  const featureOptions = [
    'User Authentication',
    'Payment Integration',
    'Real-time Features',
    'Admin Dashboard',
    'Mobile Responsive',
    'API Development',
    'Database Design',
    'Third-party Integrations',
    'SEO Optimization',
    'Analytics & Reporting'
  ];

  const timelineOptions = [
    { value: 'urgent', label: 'ASAP (Under 1 month)' },
    { value: 'short', label: '1-3 months' },
    { value: 'medium', label: '3-6 months' },
    { value: 'long', label: '6+ months' }
  ];

  const budgetOptions = [
    { value: 'small', label: 'Under $10,000' },
    { value: 'medium', label: '$10,000 - $50,000' },
    { value: 'large', label: '$50,000 - $100,000' },
    { value: 'enterprise', label: '$100,000+' }
  ];

  return (
    <div className="font-sans text-white bg-black min-h-screen overflow-x-hidden">
      {/* Interactive Background Canvas */}
      <InteractiveBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen pt-16 pb-8 md:pt-20 md:pb-16 flex flex-col justify-center overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block px-5 py-2 mb-8 bg-yellow-400/10 border border-yellow-400/30 rounded-full backdrop-blur-sm">
            <span className="text-yellow-300 font-medium text-sm tracking-wider">PROJECT ESTIMATE</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight px-2">
            GET YOUR<br />
            <span className="text-yellow-400">FREE ESTIMATE</span>
          </h1>
          
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12 text-gray-300 px-2">
            Tell us about your project and receive a detailed estimate within 24 hours. No obligation, just expert insights.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 text-center max-w-4xl mx-auto">
            <div className="px-6">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">24h</div>
              <div className="text-sm md:text-base text-gray-400">Response Time</div>
            </div>
            <div className="px-6">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">100%</div>
              <div className="text-sm md:text-base text-gray-400">Confidential</div>
            </div>
            <div className="px-6">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">Free</div>
              <div className="text-sm md:text-base text-gray-400">No Cost Estimate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Estimate Form Section */}
      <section className="py-20 md:py-24 bg-black relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                {[1, 2, 3, 4].map((s) => (
                  <div 
                    key={s} 
                    className={`flex items-center ${s !== 4 ? 'mr-4' : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      s < step ? 'bg-yellow-400 text-black' : 
                      s === step ? 'bg-yellow-400/70 text-black' : 
                      'bg-gray-800 text-gray-500'
                    }`}>
                      {s}
                    </div>
                    {s !== 4 && (
                      <div className={`w-12 h-1 ${s < step ? 'bg-yellow-400' : 'bg-gray-800'}`}></div>
                    )}
                  </div>
                ))}
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-yellow-400">
                {step === 1 && 'Project Type'}
                {step === 2 && 'Project Details'}
                {step === 3 && 'Timeline & Budget'}
                {step === 4 && 'Your Information'}
              </h2>
              <p className="text-base md:text-lg text-gray-400">
                {step === 1 && 'What kind of project are you planning?'}
                {step === 2 && 'Tell us more about your project requirements'}
                {step === 3 && 'What\'s your expected timeline and budget range?'}
                {step === 4 && 'How can we get in touch with you?'}
              </p>
            </div>
            
            {isSubmitted ? (
              <div className="bg-gray-900 border border-yellow-400/30 rounded-2xl p-8 md:p-12 text-center">
                <div className="text-6xl mb-4">✨</div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-400">Estimate Request Received!</h3>
                <p className="text-gray-300 mb-6 text-lg">
                  Thank you for submitting your project details. Our team will review your requirements and send a detailed estimate to your email within 24 business hours.
                </p>
                <div className="inline-block bg-yellow-400/10 text-yellow-300 px-4 py-2 rounded-full text-sm mb-8">
                  Reference ID: EST-{Math.floor(100000 + Math.random() * 900000)}
                </div>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all shadow-lg hover:shadow-yellow-500/50"
                >
                  SUBMIT ANOTHER PROJECT
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8">
                {step === 1 && (
                  <div className="space-y-6">
                    <p className="text-gray-400 mb-6">Select the type of project you're interested in:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {projectTypes.map((type) => (
                        <div 
                          key={type.id}
                          onClick={() => setFormData({...formData, projectType: type.id})}
                          className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                            formData.projectType === type.id 
                              ? 'border-yellow-400 bg-yellow-400/10' 
                              : 'border-gray-800 hover:border-yellow-400/50'
                          }`}
                        >
                          <div className="text-4xl mb-3">{type.icon}</div>
                          <h3 className="font-bold text-lg">{type.label}</h3>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Project Name</label>
                      <input
                        type="text"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="e.g., E-commerce Platform for Fashion Brand"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Project Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows="5"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                        placeholder="Describe your project goals, target audience, and key requirements..."
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">Key Features Needed</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {featureOptions.map((feature) => (
                          <label key={feature} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              value={feature}
                              checked={formData.features.includes(feature)}
                              onChange={handleInputChange}
                              className="w-5 h-5 rounded border-gray-600 text-yellow-400 focus:ring-yellow-400"
                            />
                            <span>{feature}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expected Timeline</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {timelineOptions.map((option) => (
                          <div 
                            key={option.value}
                            onClick={() => setFormData({...formData, timeline: option.value})}
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                              formData.timeline === option.value 
                                ? 'border-yellow-400 bg-yellow-400/10' 
                                : 'border-gray-700 hover:border-yellow-400/50'
                            }`}
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Budget Range</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {budgetOptions.map((option) => (
                          <div 
                            key={option.value}
                            onClick={() => setFormData({...formData, budget: option.value})}
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                              formData.budget === option.value 
                                ? 'border-yellow-400 bg-yellow-400/10' 
                                : 'border-gray-700 hover:border-yellow-400/50'
                            }`}
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Additional Notes</label>
                      <textarea
                        name="notes"
                        value={formData.notes || ''}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                        placeholder="Any other details that might help us understand your project better..."
                      ></textarea>
                    </div>
                  </div>
                )}
                
                {step === 4 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Company</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          placeholder="Your Company Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          placeholder="+254 700 000 000"
                        />
                      </div>
                    </div>
                    <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="text-yellow-400 text-xl mr-3 mt-1">🔒</div>
                        <p className="text-sm text-gray-300">
                          Your information is completely confidential. We never share your details with third parties. 
                          By submitting this form, you agree to our Privacy Policy and Terms of Service.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 border border-gray-700 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                      Previous Step
                    </button>
                  )}
                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={step === 1 && !formData.projectType}
                      className={`ml-auto px-6 py-3 bg-yellow-400 text-black rounded-lg font-bold hover:bg-yellow-300 transition-all ${
                        (step === 1 && !formData.projectType) ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Next Step →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="ml-auto px-8 py-4 bg-yellow-400 text-black rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all shadow-lg hover:shadow-yellow-500/50"
                    >
                      GET MY FREE ESTIMATE
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-black to-gray-900 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-yellow-400">Our Estimation Process</h2>
            <p className="text-base md:text-lg text-gray-400">
              Transparent, detailed, and tailored to your specific needs
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-800"></div>
              
              {[
                {
                  step: "01",
                  title: "Initial Assessment",
                  description: "Our experts review your project requirements and clarify any details through a brief consultation call if needed."
                },
                {
                  step: "02",
                  title: "Technical Analysis",
                  description: "We evaluate the technical complexity, identify potential challenges, and determine the resources required for your project."
                },
                {
                  step: "03",
                  title: "Detailed Proposal",
                  description: "You'll receive a comprehensive estimate including timeline, cost breakdown, technology stack, and project milestones."
                },
                {
                  step: "04",
                  title: "Next Steps",
                  description: "Once you approve the estimate, we'll schedule a kickoff meeting and begin transforming your vision into reality."
                }
              ].map((phase, index) => (
                <div 
                  key={index} 
                  className={`relative mb-12 ${
                    index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'
                  }`}
                >
                  <div className="md:hidden mb-4">
                    <div className="text-4xl font-black text-yellow-400">{phase.step}</div>
                  </div>
                  
                  <div className={`md:w-1/2 mx-auto ${
                    index % 2 === 0 ? 'md:pr-16 md:ml-auto' : 'md:pl-16'
                  }`}>
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-yellow-400/50 transition-all">
                      <div className="hidden md:block text-4xl font-black text-yellow-400 mb-4">{phase.step}</div>
                      <h3 className="text-xl font-bold mb-3">{phase.title}</h3>
                      <p className="text-gray-400">{phase.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-24 bg-black relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-yellow-400">Frequently Asked Questions</h2>
            <p className="text-base md:text-lg text-gray-400">
              Everything you need to know about our estimation process
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How accurate are your estimates?",
                answer: "Our estimates are based on extensive experience with similar projects. We provide a range that accounts for potential variables, and we refine the estimate as we learn more about your specific requirements."
              },
              {
                question: "Is there any cost for getting an estimate?",
                answer: "No, our project estimates are completely free with no obligation. We believe in transparency and want you to make an informed decision before committing to any project."
              },
              {
                question: "How long does it take to receive the estimate?",
                answer: "We typically deliver detailed estimates within 24 business hours. For complex projects requiring additional analysis, we'll communicate any extended timeline upfront."
              },
              {
                question: "What if my project requirements change?",
                answer: "That's completely normal! Our estimates include flexibility for reasonable scope adjustments. We work closely with you throughout the project to accommodate evolving needs while maintaining transparency about any impact on timeline or budget."
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-yellow-400/50 transition-all"
              >
                <h3 className="text-lg font-bold mb-3 flex items-center">
                  <span className="w-6 h-6 bg-yellow-400/20 rounded-full flex items-center justify-center text-yellow-400 text-sm mr-3">
                    {index + 1}
                  </span>
                  {faq.question}
                </h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EstimateProject;
