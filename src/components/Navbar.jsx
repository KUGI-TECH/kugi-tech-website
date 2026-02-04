// src/components/Navbar.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const links = [
    { name: 'Projects', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  const linkClass = ({ isActive }) =>
    `relative font-medium transition-colors
     ${isActive ? 'text-yellow-400' : 'hover:text-yellow-400'}
     after:content-[''] after:absolute after:bottom-[-4px] after:left-0
     after:h-0.5 after:bg-yellow-400 after:transition-all
     ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-95 backdrop-blur-sm border-b border-gray-800 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-yellow-400 font-bold text-xl tracking-tight">
          KUGI TECH
        </NavLink>

        {/* Desktop */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {links.map((item) => (
            <NavLink key={item.name} to={item.path} className={linkClass}>
              {item.name}
            </NavLink>
          ))}

          <NavLink
            to="/estimateproject"
            className="bg-yellow-400 text-black px-5 py-2 rounded-full font-medium hover:bg-yellow-300 transition-all shadow-lg"
          >
            Estimate project
          </NavLink>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="space-y-1.5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-6 h-0.5 bg-white rounded-full" />
            ))}
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 py-6 px-4">
          <ul className="space-y-4">
            {links.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className="block text-xl font-medium hover:text-yellow-400 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar
