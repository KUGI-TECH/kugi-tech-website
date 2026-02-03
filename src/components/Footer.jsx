import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  const links = [
    { name: 'Projects', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  const socialLinks = [
    { label: 'X (Twitter)', text: '𝕏', url: '#' },
    { label: 'LinkedIn', text: 'in', url: '#' },
    { label: 'GitHub', text: 'GH', url: '#' },
  ]

  return (
    <footer className="py-10 md:py-12 border-t border-gray-800 bg-black relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
            <div className="text-yellow-400 font-bold text-2xl md:text-3xl tracking-tight">KUGI TECH</div>
            <div className="flex flex-wrap justify-center gap-6">
              {['Projects', 'Services', 'About', 'Contact', 'Careers', 'Blog'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="text-gray-400 hover:text-yellow-400 transition-colors font-medium text-base"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="flex space-x-5">
              {['𝕏', 'in', 'GH', 'FB', 'IG'].map((icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="w-11 h-11 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:border-yellow-400 transition-all text-lg"
                  aria-label={`${icon === 'in' ? 'LinkedIn' : icon === 'GH' ? 'GitHub' : icon === 'FB' ? 'Facebook' : icon === 'IG' ? 'Instagram' : 'Twitter'} link`}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div>
              <h3 className="text-lg font-bold text-yellow-400 mb-4">About Us</h3>
              <p className="text-gray-500 text-sm">
                We create beautiful, functional digital experiences that help businesses grow and thrive in the digital landscape.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-yellow-400 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Sitemap</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Accessibility</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-yellow-400 mb-4">Newsletter</h3>
              <p className="text-gray-500 text-sm mb-4">
                Subscribe to our newsletter for industry insights and company updates.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-900 border border-gray-800 rounded-l-lg px-4 py-2 w-full text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
                <button className="bg-yellow-400 text-black px-4 rounded-r-lg font-medium hover:bg-yellow-300 transition-colors text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-600 text-sm pt-8 border-t border-gray-800">
            &copy; {new Date().getFullYear()} Kugi Tech. Nairobi, Kenya. All rights reserved.
          </div>
        </div>
      </footer>
  )
}

export default Footer
