import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import InteractiveBackground from '../components/InteractiveBackground'


const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);



  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "web-application",
      client: "Fashion Retail Brand",
      year: "2025",
      description: "A complete e-commerce solution with advanced product filtering, personalized recommendations, and seamless checkout experience.",
      features: ["React & Node.js", "Payment Integration", "Mobile-First Design", "Analytics Dashboard"],
      image: "https://placehold.co/600x400/1a1a1a/ffff00?text=E-Commerce",
      bg: "bg-gradient-to-br from-yellow-400/10 to-transparent"
    },
    {
      id: 2,
      title: "Healthcare Management",
      category: "mobile-application",
      client: "Regional Hospital Network",
      year: "2025",
      description: "Secure patient management system with real-time appointment scheduling, medical records access, and telehealth capabilities.",
      features: ["React Native", "HIPAA Compliance", "Real-time Sync", "Push Notifications"],
      image: "https://placehold.co/600x400/1a1a1a/ffff00?text=Healthcare",
      bg: "bg-gradient-to-br from-yellow-400/5 to-transparent"
    },
    {
      id: 3,
      title: "Financial Analytics",
      category: "data-visualization",
      client: "Investment Firm",
      year: "2024",
      description: "Interactive dashboard for real-time financial data visualization with predictive analytics and portfolio management tools.",
      features: ["D3.js & Chart.js", "Real-time Data", "Predictive Algorithms", "Export Capabilities"],
      image: "https://placehold.co/600x400/1a1a1a/ffff00?text=Analytics",
      bg: "bg-gradient-to-br from-yellow-400/15 to-transparent"
    },
    {
      id: 4,
      title: "Learning Management",
      category: "saas-platform",
      client: "Online Education Provider",
      year: "2024",
      description: "Comprehensive LMS platform with course creation tools, student progress tracking, and certification management.",
      features: ["Vue.js & Laravel", "Video Streaming", "Quiz Engine", "Admin Dashboard"],
      image: "https://placehold.co/600x400/1a1a1a/ffff00?text=LMS",
      bg: "bg-gradient-to-br from-yellow-400/20 to-transparent"
    },
    {
      id: 5,
      title: "Restaurant Ordering App",
      category: "mobile-application",
      client: "Food Delivery Chain",
      year: "2023",
      description: "User-friendly mobile app for restaurant ordering with real-time tracking, loyalty programs, and table reservations.",
      features: ["Flutter", "Geolocation", "Push Notifications", "Payment Processing"],
      image: "https://placehold.co/600x400/1a1a1a/ffff00?text=Restaurant",
      bg: "bg-gradient-to-br from-yellow-400/8 to-transparent"
    },
    {
      id: 6,
      title: "Corporate Website Redesign",
      category: "web-application",
      client: "Manufacturing Company",
      year: "2023",
      description: "Modern, responsive corporate website with integrated blog, contact forms, and multilingual support.",
      features: ["Next.js", "SEO Optimized", "CMS Integration", "Accessibility Compliant"],
      image: "https://placehold.co/600x400/1a1a1a/ffff00?text=Corporate",
      bg: "bg-gradient-to-br from-yellow-400/12 to-transparent"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web-application', name: 'Web Applications' },
    { id: 'mobile-application', name: 'Mobile Apps' },
    { id: 'data-visualization', name: 'Data Visualization' },
    { id: 'saas-platform', name: 'SaaS Platforms' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const ProjectModal = ({ project, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-64 md:h-80 object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white text-xl transition-all"
          >
            ✕
          </button>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{project.title}</h2>
              <p className="text-yellow-400">{project.client} • {project.year}</p>
            </div>
            <span className="inline-block bg-yellow-400/10 text-yellow-300 px-3 py-1 rounded-full text-sm mt-2 md:mt-0">
              {categories.find(cat => cat.id === project.category)?.name || project.category}
            </span>
          </div>
          
          <p className="text-gray-300 mb-6 text-lg">{project.description}</p>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-center text-gray-300">
                  <span className="text-yellow-400 mr-3">✓</span>
                  {feature}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-300 transition-all">
              View Live Demo
            </button>
            <button className="border border-gray-700 text-white px-6 py-3 rounded-xl font-bold hover:border-yellow-400 hover:text-yellow-400 transition-all">
              View Case Study
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans text-white bg-black min-h-screen overflow-x-hidden">
      {/* Interactive Background Canvas */}
      <InteractiveBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen pt-16 pb-8 md:pt-20 md:pb-16 flex flex-col justify-center overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block px-5 py-2 mb-8 bg-yellow-400/10 border border-yellow-400/30 rounded-full backdrop-blur-sm">
            <span className="text-yellow-300 font-medium text-sm tracking-wider">OUR WORK</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight px-2">
            FEATURED<br />
            <span className="text-yellow-400">PROJECTS</span>
          </h1>
          
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12 text-gray-300 px-2">
            A showcase of our recent work across various industries and technologies. Each project represents our commitment to excellence and innovation.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-center max-w-4xl mx-auto">
            <div className="px-4">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-1">50+</div>
              <div className="text-xs sm:text-sm text-gray-400">Completed Projects</div>
            </div>
            <div className="px-4">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-1">98%</div>
              <div className="text-xs sm:text-sm text-gray-400">Client Satisfaction</div>
            </div>
            <div className="px-4">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-1">4.9/5</div>
              <div className="text-xs sm:text-sm text-gray-400">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Filter Section */}
      <section className="py-12 md:py-16 bg-black relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-500/50'
                    : 'bg-gray-900 text-gray-300 border border-gray-800 hover:border-yellow-400/50 hover:text-yellow-400'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="group relative rounded-xl overflow-hidden h-80 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-500/20"
                onClick={() => setSelectedProject(project)}
              >
                <div className={`absolute inset-0 ${project.bg} border border-yellow-400/20`} />
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="relative z-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                    <p className="text-yellow-300 text-sm font-medium">{project.client}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs bg-yellow-400/20 text-yellow-300 px-2 py-1 rounded-full">
                        {categories.find(cat => cat.id === project.category)?.name || project.category}
                      </span>
                      <span className="text-xs text-gray-400 ml-2">{project.year}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 bg-yellow-400/20 rounded-full flex items-center justify-center text-yellow-400">
                    <span className="text-xl">↗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-black to-gray-900 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {[
              { number: "50+", label: "Successful Projects" },
              { number: "150+", label: "Happy Clients" },
              { number: "24/7", label: "Technical Support" },
              { number: "98%", label: "Client Retention" }
            ].map((stat, index) => (
              <div key={index} className="p-4 md:p-6">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-yellow-400 mb-2">{stat.number}</div>
                <div className="text-sm md:text-base text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-24 bg-black relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-yellow-400">Client Success Stories</h2>
            <p className="text-base md:text-lg text-gray-400">
              Hear directly from our clients about their experience working with us
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                text: "Kugi Tech transformed our outdated website into a modern, high-performing platform that has significantly increased our conversion rates. Their attention to detail and commitment to excellence is unmatched.",
                author: "Sarah Johnson",
                title: "CEO, TechStart Inc.",
                project: "E-Commerce Platform"
              },
              {
                text: "Working with Kugi Tech was a game-changer for our business. They delivered our mobile app ahead of schedule and under budget, while maintaining exceptional quality throughout the entire process.",
                author: "Michael Chen",
                title: "Founder, HealthTech Solutions",
                project: "Healthcare Management"
              },
              {
                text: "Their ongoing support and maintenance services have been invaluable. Our application runs smoothly, and any issues are resolved immediately. I highly recommend their services.",
                author: "Emily Rodriguez",
                title: "CTO, FinServe Global",
                project: "Financial Analytics"
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 relative before:content-[''] before:absolute before:top-0 before:left-4 before:w-1 before:h-10 md:before:h-12 before:bg-yellow-400 before:rounded-full"
              >
                <p className="text-gray-300 italic text-sm md:text-base mb-6 relative z-10">{testimonial.text}</p>
                <div>
                  <div className="font-bold text-yellow-300 text-sm md:text-base">{testimonial.author}</div>
                  <div className="text-gray-500 text-xs md:text-sm">{testimonial.title}</div>
                  <div className="text-yellow-400 text-xs mt-1">Project: {testimonial.project}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-black to-gray-900 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-yellow-400/10 to-transparent border border-yellow-400/30 rounded-3xl p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-yellow-400">
              Have a Project in Mind?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Let's discuss how we can bring your vision to life. We're ready to tackle your next big challenge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/estimateproject">
                <button className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all shadow-lg hover:shadow-yellow-500/50">
                  START A PROJECT
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
};

export default Projects;
