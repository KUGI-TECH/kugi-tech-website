import InteractiveBackground from '../components/InteractiveBackground'

const About = () => {
 
  return (
    <div className="font-sans text-white bg-black min-h-screen overflow-x-hidden">
      {/* Interactive Background Canvas */}
      <InteractiveBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen pt-16 pb-8 md:pt-20 md:pb-16 flex flex-col justify-center overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block px-5 py-2 mb-8 bg-yellow-400/10 border border-yellow-400/30 rounded-full backdrop-blur-sm">
            <span className="text-yellow-300 font-medium text-sm tracking-wider">EST. 2026</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight px-2">
            OUR STORY<br />
            <span className="text-yellow-400">BEGINS HERE</span>
          </h1>
          
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12 text-gray-300 px-2">
            We're not just another tech company. We're a team of passionate creators, builders, and problem-solvers dedicated to crafting digital experiences that make a real difference.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 text-center max-w-4xl mx-auto">
            <div className="px-6">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">50+</div>
              <div className="text-sm md:text-base text-gray-400">Happy Clients</div>
            </div>
            <div className="px-6">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">500+</div>
              <div className="text-sm md:text-base text-gray-400">Projects Delivered</div>
            </div>
            <div className="px-6">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-sm md:text-base text-gray-400">Support Available</div>
            </div>
            <div className="px-6">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">98%</div>
              <div className="text-sm md:text-base text-gray-400">Client Retention</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 md:py-24 bg-black relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-yellow-400">Our Mission</h2>
              <p className="text-base md:text-lg text-gray-400 mb-6">
                To empower businesses through innovative digital solutions that drive growth, enhance user experiences, and create lasting value in an ever-evolving technological landscape.
              </p>
              <p className="text-base md:text-lg text-gray-400">
                We believe that technology should serve people, not the other way around. Our mission is to bridge the gap between complex technical challenges and simple, elegant solutions.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-yellow-400/50 transition-all">
              <div className="text-5xl mb-4 text-yellow-400">🎯</div>
              <h3 className="text-xl font-bold mb-4">What Drives Us</h3>
              <ul className="space-y-3">
                {[
                  "Creating meaningful digital experiences",
                  "Solving real-world business problems",
                  "Pushing the boundaries of innovation",
                  "Building long-term client relationships",
                  "Continuous learning and improvement"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-400 mr-3 mt-1">•</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-black to-gray-900 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-yellow-400">Our Core Values</h2>
            <p className="text-base md:text-lg text-gray-400">
              These principles guide everything we do, from how we work with clients to how we build our products.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Excellence",
                description: "We never settle for good enough. Every project, every line of code, every interaction is crafted with precision and care.",
                icon: "✨"
              },
              {
                title: "Integrity",
                description: "Honesty and transparency are non-negotiable. We build trust through consistent actions and clear communication.",
                icon: "🛡️"
              },
              {
                title: "Innovation",
                description: "We embrace change and constantly seek better ways to solve problems. Stagnation is not in our vocabulary.",
                icon: "🚀"
              },
              {
                title: "Collaboration",
                description: "Great things happen when smart people work together. We value diverse perspectives and collective intelligence.",
                icon: "🤝"
              },
              {
                title: "Client Success",
                description: "Your success is our success. We measure our performance by the results we deliver for our clients.",
                icon: "🏆"
              },
              {
                title: "Sustainability",
                description: "We build solutions that stand the test of time, both technically and environmentally.",
                icon: "🌱"
              }
            ].map((value, index) => (
              <div 
                key={index} 
                className="group bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-yellow-400/50 transition-all hover:transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4 text-yellow-400">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-yellow-300">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-24 bg-black relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-yellow-400">Meet Our Team</h2>
            <p className="text-base md:text-lg text-gray-400">
              A diverse group of talented individuals united by a shared passion for creating exceptional digital experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                name: "Alex Morgan",
                role: "Founder & CEO",
                bio: "Visionary leader with 15+ years in tech",
                image: "https://placehold.co/300x300/1a1a1a/ffff00?text=AM"
              },
              {
                name: "Sarah Kim",
                role: "Lead Designer",
                bio: "Award-winning UX/UI designer",
                image: "https://placehold.co/300x300/1a1a1a/ffff00?text=SK"
              },
              {
                name: "Michael Chen",
                role: "CTO",
                bio: "Full-stack architect and open-source contributor",
                image: "https://placehold.co/300x300/1a1a1a/ffff00?text=MC"
              },
              {
                name: "Emily Rodriguez",
                role: "Project Manager",
                bio: "Agile expert with perfect delivery record",
                image: "https://placehold.co/300x300/1a1a1a/ffff00?text=ER"
              }
            ].map((member, index) => (
              <div 
                key={index} 
                className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-yellow-400/50 transition-all hover:transform hover:-translate-y-2"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                  <p className="text-yellow-400 text-sm mb-2">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              We're always looking for talented individuals who share our passion for excellence and innovation.
            </p>
            <button className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all shadow-lg hover:shadow-yellow-500/50 inline-flex items-center">
              <span>JOIN OUR TEAM</span>
              <span className="ml-2 text-xl">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-black to-gray-900 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-yellow-400">Our Journey</h2>
            <p className="text-base md:text-lg text-gray-400">
              From humble beginnings to becoming a trusted partner for businesses worldwide.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-800 hidden md:block"></div>
              
              {[
                {
                  year: "2026",
                  title: "Company Founded",
                  description: "Kugi Tech was born from a simple idea: to create digital experiences that truly matter.",
                  side: "left"
                },
                {
                  year: "2027",
                  title: "First Major Client",
                  description: "Landed our first enterprise client and delivered a groundbreaking e-commerce platform.",
                  side: "right"
                },
                {
                  year: "2028",
                  title: "Team Expansion",
                  description: "Grew from 3 to 15 team members and opened our Nairobi office.",
                  side: "left"
                },
                {
                  year: "2029",
                  title: "Global Recognition",
                  description: "Named among top 50 development companies worldwide by industry publications.",
                  side: "right"
                }
              ].map((milestone, index) => (
                <div 
                  key={index} 
                  className={`relative mb-12 ${milestone.side === 'left' ? 'md:pr-8' : 'md:pl-8'}`}
                >
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full border-4 border-black z-10 hidden md:block`}></div>
                  
                  <div className={`${milestone.side === 'left' ? 'md:pr-16 text-right' : 'md:pl-16'} md:w-1/2 mx-auto`}>
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-yellow-400/50 transition-all">
                      <div className="text-yellow-400 font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold mb-3">{milestone.title}</h3>
                      <p className="text-gray-400">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
