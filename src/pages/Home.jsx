import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'


const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '' // Added missing field
  });
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
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `rgba(250, 204, 21, ${Math.random() * 0.5 + 0.1})`;
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

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = 1 - distance / 100;
            ctx.strokeStyle = `rgba(250, 204, 21, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '', company: '' });
  };

  return (
    <div className="font-sans text-white bg-black min-h-screen overflow-x-hidden">
      {/* Interactive Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 z-0"
        style={{ background: 'radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)' }}
      />


      {/* Hero Section */}
      <section className="relative min-h-screen pt-16 pb-8 md:pt-20 md:pb-16 flex flex-col justify-start overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center mt-4 md:mt-8">
          <div className="inline-block px-4 py-1.5 mb-6 sm:mb-8 bg-yellow-400/10 border border-yellow-400/30 rounded-full backdrop-blur-sm">
            <span className="text-yellow-300 font-medium text-xs sm:text-sm tracking-wider">EST. 2026</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight px-2">
            DESIGN. DEVELOPMENT.<br />
            <span className="text-white">MAINTENANCE</span>
          </h1>
          
          <p className="text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 text-gray-300 px-2">
            We handle the entire product journey — from early planning and idea validation to final delivery.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-10">
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
          
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-center max-w-3xl mx-auto px-2">
            <div className="px-2 sm:px-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-1">1857</div>
              <div className="text-xs sm:text-sm text-gray-400">Reviews across platforms</div>
            </div>
            <div className="px-2 sm:px-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-1">50</div>
              <div className="text-xs sm:text-sm text-gray-400">Top development companies</div>
            </div>
            <div className="px-2 sm:px-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-1">4.9/5</div>
              <div className="text-xs sm:text-sm text-gray-400">Average client rating</div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="pt-12 pb-16 md:pt-20 md:pb-24 bg-black relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-yellow-400">Our Services</h2>
            <p className="text-base md:text-lg text-gray-400">
              End-to-end digital solutions tailored to your unique business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Strategic Design",
                description: "User-centered design that creates meaningful connections and drives engagement through intuitive interfaces and compelling visual storytelling.",
                features: ["UX/UI Design", "Brand Identity", "Design Systems", "Prototyping"],
                icon: (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 mx-auto mb-4 sm:mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                ),
                gradient: "from-yellow-400/10 to-transparent"
              },
              {
                title: "Custom Development",
                description: "Scalable, secure, and high-performance applications built with modern technologies and best practices for optimal user experience.",
                features: ["Web Applications", "Mobile Apps", "API Integration", "Cloud Solutions"],
                icon: (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 mx-auto mb-4 sm:mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                ),
                gradient: "from-yellow-400/5 to-transparent"
              },
              {
                title: "Ongoing Support",
                description: "Continuous optimization, updates, and technical support to ensure your digital products remain secure, performant, and up-to-date.",
                features: ["Performance Monitoring", "Security Updates", "Bug Fixes", "Feature Enhancements"],
                icon: (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 mx-auto mb-4 sm:mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                ),
                gradient: "from-yellow-400/15 to-transparent"
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className="group relative bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 hover:border-yellow-400/50 cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  {service.icon}
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{service.title}</h3>
                  <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-yellow-300 text-sm">
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="projects" className="py-20 md:py-24 bg-gradient-to-b from-black to-gray-900 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-yellow-400">Featured Projects</h2>
            <p className="text-base md:text-lg text-gray-400">
              A showcase of our recent work across various industries
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { title: "E-Commerce Platform", category: "Web Application", bg: "bg-gradient-to-br from-yellow-400/10 to-transparent" },
              { title: "Healthcare Management", category: "Mobile Application", bg: "bg-gradient-to-br from-yellow-400/5 to-transparent" },
              { title: "Financial Analytics", category: "Data Visualization", bg: "bg-gradient-to-br from-yellow-400/15 to-transparent" },
              { title: "Learning Management", category: "SaaS Platform", bg: "bg-gradient-to-br from-yellow-400/20 to-transparent" }
            ].map((project, index) => (
              <div key={index} className="group relative rounded-xl overflow-hidden h-56 sm:h-64 md:h-72 transform transition-all duration-300 hover:scale-[1.02]">
                <div className={`absolute inset-0 ${project.bg} border border-yellow-400/20`} />
                <div className="absolute inset-0 flex items-end p-4 sm:p-6">
                  <div className="relative z-10 text-white">
                    <h3 className="text-base sm:text-lg font-bold mb-1">{project.title}</h3>
                    <p className="text-yellow-300 text-xs sm:text-sm font-medium">{project.category}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-black border-y border-gray-800 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {[
              { number: "500+", label: "Successful Projects" },
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
      <section className="py-20 md:py-24 bg-gradient-to-b from-black to-gray-900 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-yellow-400">What Our Clients Say</h2>
            <p className="text-base md:text-lg text-gray-400">
              Don't just take our word for it – hear from our satisfied clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                text: "Kugi Tech transformed our outdated website into a modern, high-performing platform that has significantly increased our conversion rates. Their attention to detail and commitment to excellence is unmatched.",
                author: "Sarah Johnson",
                title: "CEO, TechStart Inc."
              },
              {
                text: "Working with Kugi Tech was a game-changer for our business. They delivered our mobile app ahead of schedule and under budget, while maintaining exceptional quality throughout the entire process.",
                author: "Michael Chen",
                title: "Founder, HealthTech Solutions"
              },
              {
                text: "Their ongoing support and maintenance services have been invaluable. Our application runs smoothly, and any issues are resolved immediately. I highly recommend their services.",
                author: "Emily Rodriguez",
                title: "CTO, FinServe Global"
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-24 bg-black relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
            <div className="space-y-6 md:space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-yellow-400">Let's Build Something Amazing Together</h2>
              <p className="text-base md:text-lg text-gray-400 max-w-xl">
                Ready to start your next project? Get in touch with us today and let's discuss how we can bring your vision to life.
              </p>
              
              <div className="space-y-4 md:space-y-6">
                {[
                  { icon: "📞", label: "Phone", value: "+254 700 000 000" },
                  { icon: "✉️", label: "Email", value: "hello@kugitech.co.ke" },
                  { icon: "📍", label: "Location", value: "Westlands, Nairobi, Kenya" }
                ].map((contact, index) => (
                  <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                    <div className="text-xl sm:text-2xl mt-0.5">{contact.icon}</div>
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500 mb-1">{contact.label}</div>
                      <div className="font-medium text-sm sm:text-base">{contact.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 md:px-6 md:py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 md:px-6 md:py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 md:px-6 md:py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 md:px-6 md:py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 md:px-6 md:py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent w-full text-sm sm:text-base"
              ></textarea>
              <button 
                type="submit" 
                className="bg-yellow-400 text-black w-full py-3 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-yellow-300 transition-all shadow-lg hover:shadow-yellow-500/50 transform hover:-translate-y-1"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;