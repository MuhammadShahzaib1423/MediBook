import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import DoctorDetail from './pages/DoctorDetail'
import Book from './pages/Book'
import Confirmation from './pages/Confirmation'
import Appointments from './pages/Appointments'
import About from './pages/About'
import Contact from './pages/Contact'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorDetail />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/booking-confirmed/:ref" element={<Confirmation />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1">
          <AnimatedRoutes />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
