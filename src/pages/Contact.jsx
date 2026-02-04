import React, { useState, useEffect, useRef } from 'react';
import InteractiveBackground from '../components/InteractiveBackground'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '', company: '' });
    }, 3000);
  };

  return (
    <div className="font-sans text-white bg-black min-h-screen overflow-x-hidden">
      {/* Interactive Background Canvas */}
      <InteractiveBackground />


      {/* Hero Section */}
      <section className="relative min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 flex flex-col justify-center overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block px-5 py-2 mb-8 bg-yellow-400/10 border border-yellow-400/30 rounded-full backdrop-blur-sm">
            <span className="text-yellow-300 font-medium text-sm tracking-wider">GET IN TOUCH</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight px-2">
            LET'S CREATE<br />
            <span className="text-yellow-400">SOMETHING AMAZING</span>
          </h1>
          
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12 text-gray-300 px-2">
            Have a project in mind? We'd love to hear about it. Reach out and let's start a conversation about your next digital experience.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 max-w-4xl mx-auto">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center hover:border-yellow-400/50 transition-all">
              <div className="text-4xl mb-3">✉️</div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-gray-400 mb-1">hello@kugitech.co.ke</p>
              <p className="text-gray-400">support@kugitech.co.ke</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center hover:border-yellow-400/50 transition-all">
              <div className="text-4xl mb-3">📍</div>
              <h3 className="text-xl font-bold mb-2">Our Office</h3>
              <p className="text-gray-400">Westlands, Nairobi</p>
              <p className="text-gray-400">Kenya, East Africa</p>
            </div>
          </div>
          
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-yellow-500/50 transition-all cursor-pointer">
            SCROLL DOWN TO CONTACT US
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 md:py-24 bg-black relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-yellow-400">Send Us a Message</h2>
              <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
                Fill out the form below and we'll get back to you as soon as possible. We look forward to hearing from you!
              </p>
            </div>
            
            {isSubmitted && (
              <div className="mb-8 p-6 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-400 text-center animate-fade-in">
                <div className="text-4xl mb-3">✨</div>
                <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
                <p>Thank you for reaching out. We'll respond to your inquiry within 24 business hours.</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
              <div className="space-y-8">
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8">
                  <h3 className="text-2xl font-bold mb-6 text-yellow-400">Business Hours</h3>
                  <div className="space-y-4">
                    {[
                      { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM EAT" },
                      { day: "Saturday", hours: "10:00 AM - 2:00 PM EAT" },
                      { day: "Sunday", hours: "Closed" }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between border-b border-gray-800 pb-3 last:border-0 last:pb-0">
                        <span className="font-medium">{item.day}</span>
                        <span className="text-yellow-300 font-medium">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8">
                  <h3 className="text-2xl font-bold mb-6 text-yellow-400">Why Work With Us?</h3>
                  <ul className="space-y-4">
                    {[
                      "🚀 48-hour project kickoff guarantee",
                      "💡 Dedicated project manager",
                      "🔒 NDA & confidentiality assured",
                      "🌍 Remote collaboration experts",
                      "✨ 98% client retention rate"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-400 text-xl mr-3 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-base"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-base"
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-base"
                  />
                  <input
                    type="text"
                    name="company"
                    placeholder="Company (Optional)"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-base"
                  />
                </div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="6"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent w-full text-base resize-none"
                ></textarea>
                <button 
                  type="submit" 
                  disabled={isSubmitted}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform hover:-translate-y-1 ${
                    isSubmitted 
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                      : 'bg-yellow-400 text-black hover:bg-yellow-300 shadow-lg hover:shadow-yellow-500/50'
                  }`}
                >
                  {isSubmitted ? 'MESSAGE SENT!' : 'SEND MESSAGE'}
                </button>
                
                <p className="text-center text-gray-500 text-sm mt-2">
                  We respect your privacy. Your information will only be used to contact you about your inquiry.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Location Section */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-black to-gray-900 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-yellow-400">Our Location</h2>
            <p className="text-base md:text-lg text-gray-400">
              While we work with clients globally, our headquarters is located in the vibrant tech hub of Nairobi, Kenya.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="h-80 md:h-96 bg-gradient-to-br from-yellow-400/10 to-transparent flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-6">📍</div>
                <h3 className="text-2xl font-bold mb-2">Nairobi, Kenya</h3>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Westlands Business Plaza, 5th Floor<br />
                  Nairobi, Kenya 00100
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <span className="inline-block bg-yellow-400/10 text-yellow-300 px-4 py-1 rounded-full text-sm">
                    East Africa HQ
                  </span>
                  <span className="inline-block bg-yellow-400/10 text-yellow-300 px-4 py-1 rounded-full text-sm">
                    UTC+3 Time Zone
                  </span>
                  <span className="inline-block bg-yellow-400/10 text-yellow-300 px-4 py-1 rounded-full text-sm">
                    Remote Teams Worldwide
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-800">
              {[
                { icon: "📞", title: "Phone", content: "+254 700 000 000" },
                { icon: "✉️", title: "Email", content: "hello@kugitech.co.ke" },
                { icon: "🕒", title: "Response Time", content: "Within 24 hours" }
              ].map((item, index) => (
                <div key={index} className="p-6 text-center hover:bg-gray-800/50 transition-colors">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                  <p className="text-gray-400">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Can't find what you're looking for? We're always open to new opportunities and partnerships. 
              Feel free to reach out even if you don't see a service that matches your needs exactly.
            </p>
            <button className="mt-8 bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all shadow-lg hover:shadow-yellow-500/50 inline-flex items-center">
              <span>START A CONVERSATION</span>
              <span className="ml-2 text-xl">→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
