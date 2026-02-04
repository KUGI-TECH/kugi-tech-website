import { Routes, Route } from 'react-router-dom'

import Layout from './layouts/Layout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import Services from './pages/Services'
import Projects from './pages/Projects'
import EstimateProject from './pages/EstimateProject'


export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/estimateproject" element={<EstimateProject />} />
      </Route>
    </Routes>
  )
}
