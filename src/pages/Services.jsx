import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'


const Services = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeService, setActiveService] = useState(0);
  const canvasRef = useRef(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Mouse + touch interaction for particles
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        setMousePosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Canvas animation & resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particles = [];
    const particleCount = 55;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `rgba(250, 204, 21, ${Math.random() * 0.5 + 0.1})`;
        this.baseSize = this.size;
      }

      update() {
        const dx = mousePosition.x - this.x;
        const dy = mousePosition.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const angle = Math.atan2(dy, dx);
          const force = (150 - distance) / 150;
          this.speedX += Math.cos(angle) * force * 0.1;
          this.speedY += Math.sin(angle) * force * 0.1;
          
          // Pulse effect when near mouse
          this.size = this.baseSize + (1 - distance / 150) * 3;
        } else {
          this.size = this.baseSize;
        }

        this.speedX *= 0.95;
        this.speedY *= 0.95;

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = 1 - distance / 100;
            ctx.strokeStyle = `rgba(250, 204, 21, ${opacity * 0.3})`;
            ctx.lineWidth = 0.5 + opacity * 1.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition]);

  const services = [
    {
      id: 0,
      title: "Strategic Design",
      description: "User-centered design that creates meaningful connections and drives engagement through intuitive interfaces and compelling visual storytelling.",
      features: [
        "UX/UI Design & Research",
        "Brand Identity Development",
        "Design Systems & Guidelines",
        "Interactive Prototyping",
        "User Testing & Validation"
      ],
      icon: (
        <svg className="w-16 h-16 text-yellow-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
      gradient: "from-yellow-400/15 to-transparent",
      details: [
        {
          title: "User Experience Strategy",
          description: "We start by understanding your users' needs, behaviors, and pain points to create intuitive and engaging experiences that drive business results."
        },
        {
          title: "Visual Design Excellence",
          description: "Our design team crafts beautiful, consistent interfaces that reflect your brand identity while ensuring usability and accessibility."
        },
        {
          title: "Rapid Prototyping",
          description: "We validate concepts early with interactive prototypes, saving development time and ensuring we build the right solution from the start."
        }
      ]
    },
    {
      id: 1,
      title: "Custom Development",
      description: "Scalable, secure, and high-performance applications built with modern technologies and best practices for optimal user experience.",
      features: [
        "Web Applications",
        "Mobile Apps (iOS & Android)",
        "API Integration & Development",
        "Cloud Solutions & DevOps",
        "E-commerce Platforms"
      ],
      icon: (
        <svg className="w-16 h-16 text-yellow-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" strokeWidth="1.5"></rect>
          <line x1="8" y1="21" x2="16" y2="21" strokeWidth="1.5"></line>
          <line x1="12" y1="17" x2="12" y2="21" strokeWidth="1.5"></line>
        </svg>
      ),
      gradient: "from-yellow-400/10 to-transparent",
      details: [
        {
          title: "Modern Tech Stack",
          description: "We leverage cutting-edge technologies like React, Node.js, Python, and cloud platforms to build robust, scalable applications."
        },
        {
          title: "Agile Development",
          description: "Our iterative approach ensures transparency, flexibility, and continuous delivery of value throughout the development process."
        },
        {
          title: "Quality Assurance",
          description: "Rigorous testing at every stage ensures your application is bug-free, performant, and ready for real-world use."
        }
      ]
    },
    {
      id: 2,
      title: "Ongoing Support",
      description: "Continuous optimization, updates, and technical support to ensure your digital products remain secure, performant, and up-to-date.",
      features: [
        "Performance Monitoring",
        "Security Updates & Patches",
        "Bug Fixes & Troubleshooting",
        "Feature Enhancements",
        "Technical Consulting"
      ],
      icon: (
        <svg className="w-16 h-16 text-yellow-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="1.5"></circle>
          <path d="M12 6v6l4 2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      ),
      gradient: "from-yellow-400/20 to-transparent",
      details: [
        {
          title: "Proactive Maintenance",
          description: "We monitor your systems 24/7 to identify and resolve issues before they impact your users or business operations."
        },
        {
          title: "Continuous Improvement",
          description: "Regular updates and feature enhancements keep your product competitive and aligned with evolving business needs."
        },
        {
          title: "Dedicated Support Team",
          description: "Our experts are always available to address your concerns, provide guidance, and implement necessary changes quickly."
        }
      ]
    },
    {
      id: 3,
      title: "Digital Strategy",
      description: "Comprehensive digital roadmaps that align technology initiatives with your business goals for sustainable growth and competitive advantage.",
      features: [
        "Technology Consulting",
        "Digital Transformation",
        "Product Strategy",
        "Competitive Analysis",
        "ROI Optimization"
      ],
      icon: (
        <svg className="w-16 h-16 text-yellow-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      ),
      gradient: "from-yellow-400/5 to-transparent",
      details: [
        {
          title: "Business Alignment",
          description: "We ensure every technology decision supports your core business objectives and delivers measurable value."
        },
        {
          title: "Future-Proof Planning",
          description: "Our strategies anticipate market trends and technological shifts to keep your business ahead of the curve."
        },
        {
          title: "Data-Driven Decisions",
          description: "We leverage analytics and market insights to inform our recommendations and optimize your digital investments."
        }
      ]
    }
  ];

  return (
    <div className="font-sans text-white bg-black min-h-screen overflow-x-hidden">
      {/* Interactive Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 z-0"
        style={{ background: 'radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)' }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen pt-16 pb-8 md:pt-20 md:pb-16 flex flex-col justify-center overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block px-5 py-2 mb-8 bg-yellow-400/10 border border-yellow-400/30 rounded-full backdrop-blur-sm">
            <span className="text-yellow-300 font-medium text-sm tracking-wider">OUR EXPERTISE</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight px-2">
            END-TO-END<br />
            <span className="text-yellow-400">DIGITAL SOLUTIONS</span>
          </h1>
          
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12 text-gray-300 px-2">
            From strategic planning to ongoing support, we provide comprehensive services tailored to your unique business needs and goals.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-center max-w-4xl mx-auto">
            <div className="px-4">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-1">500+</div>
              <div className="text-xs sm:text-sm text-gray-400">Projects Delivered</div>
            </div>
            <div className="px-4">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-1">98%</div>
              <div className="text-xs sm:text-sm text-gray-400">Client Retention</div>
            </div>
            <div className="px-4">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-1">24/7</div>
              <div className="text-xs sm:text-sm text-gray-400">Technical Support</div>
            </div>
            <div className="px-4">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-1">4.9/5</div>
              <div className="text-xs sm:text-sm text-gray-400">Client Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-20 md:py-24 bg-black relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-yellow-400">Our Service Offerings</h2>
            <p className="text-base md:text-lg text-gray-400">
              Comprehensive digital solutions designed to help your business thrive in today's competitive landscape
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20">
            {services.map((service) => (
              <div 
                key={service.id} 
                className={`group relative bg-gray-900 border border-gray-800 rounded-2xl p-8 cursor-pointer transition-all duration-300 ${
                  activeService === service.id 
                    ? 'border-yellow-400/70 scale-105 z-10' 
                    : 'hover:border-yellow-400/30 hover:scale-105'
                }`}
                onClick={() => setActiveService(service.id)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 ${activeService === service.id ? 'opacity-20' : ''} transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  {service.icon}
                  <h3 className="text-xl md:text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-sm md:text-base text-gray-400 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-yellow-300 text-sm">
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          
          {/* Detailed Service Description */}
          <div className="max-w-5xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl md:text-3xl font-black mb-2 text-yellow-400">{services[activeService].title}</h3>
                <p className="text-gray-400 max-w-2xl">
                  {services[activeService].description}
                </p>
              </div>
              <div className="flex space-x-2">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setActiveService(service.id)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      activeService === service.id 
                        ? 'bg-yellow-400 w-6' 
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    aria-label={`View details for ${service.title}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services[activeService].details.map((detail, index) => (
                <div key={index} className="border-l-4 border-yellow-400 pl-4 py-2">
                  <h4 className="text-lg font-bold mb-2 text-yellow-300">{detail.title}</h4>
                  <p className="text-gray-400">{detail.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-black to-gray-900 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-yellow-400">Our Process</h2>
            <p className="text-base md:text-lg text-gray-400">
              A transparent, collaborative approach that ensures your vision becomes reality
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-800"></div>
              
              {[
                {
                  step: "01",
                  title: "Discovery & Strategy",
                  description: "We start by understanding your business goals, target audience, and technical requirements to create a comprehensive project roadmap."
                },
                {
                  step: "02",
                  title: "Design & Prototyping",
                  description: "Our design team creates wireframes, mockups, and interactive prototypes to validate concepts and ensure alignment before development begins."
                },
                {
                  step: "03",
                  title: "Development",
                  description: "Using agile methodologies, we build your solution with clean code, regular testing, and continuous integration to ensure quality and performance."
                },
                {
                  step: "04",
                  title: "Launch & Support",
                  description: "We deploy your solution with minimal disruption and provide ongoing maintenance, monitoring, and enhancements to ensure long-term success."
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

      {/* Case Studies Section */}
      <section className="py-20 md:py-24 bg-black relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-yellow-400">Success Stories</h2>
            <p className="text-base md:text-lg text-gray-400">
              Real-world examples of how we've helped businesses achieve their digital goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {[
              {
                title: "E-Commerce Transformation",
                client: "Fashion Retail Brand",
                challenge: "Outdated platform with poor mobile experience and low conversion rates",
                solution: "Built a custom React/Node.js e-commerce platform with PWA capabilities and integrated payment systems",
                results: [
                  "150% increase in mobile conversion rate",
                  "40% reduction in cart abandonment",
                  "35% faster page load times"
                ]
              },
              {
                title: "Healthcare Management System",
                client: "Regional Hospital Network",
                challenge: "Fragmented patient records and inefficient appointment scheduling",
                solution: "Developed a secure cloud-based patient management system with real-time analytics dashboard",
                results: [
                  "60% reduction in administrative workload",
                  "99.9% system uptime with HIPAA compliance",
                  "30% improvement in patient satisfaction scores"
                ]
              }
            ].map((caseStudy, index) => (
              <div 
                key={index} 
                className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-yellow-400/50 transition-all hover:transform hover:-translate-y-1"
              >
                <h3 className="text-2xl font-bold mb-2 text-yellow-400">{caseStudy.title}</h3>
                <p className="text-yellow-300 mb-4">{caseStudy.client}</p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-2 flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    The Challenge
                  </h4>
                  <p className="text-gray-400">{caseStudy.challenge}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-2 flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    Our Solution
                  </h4>
                  <p className="text-gray-400">{caseStudy.solution}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold mb-3 flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    Results
                  </h4>
                  <ul className="space-y-2">
                    {caseStudy.results.map((result, i) => (
                      <li key={i} className="flex items-start text-gray-300">
                        <span className="text-yellow-400 mr-3 mt-1">✓</span>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
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
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Let's discuss how our services can help you achieve your business goals. We're here to answer your questions and provide a customized solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/estimateproject">
                <button className="bg-yellow-400 text-black px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-sm sm:text-base hover:bg-yellow-300 transition-all shadow-lg hover:shadow-yellow-500/50 transform hover:-translate-y-1 whitespace-nowrap">
                  ESTIMATE PROJECT
                </button>
              </Link>
              <Link to="/projects">
                <button className="border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-sm sm:text-base hover:bg-white hover:text-black transition-all transform hover:-translate-y-1 whitespace-nowrap">
                  VIEW OUR WORK
                </button>
              </Link>
           </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
