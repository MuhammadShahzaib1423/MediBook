import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/doctors', label: 'Find a Doctor' },
  { to: '/appointments', label: 'My Appointments' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkCls = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      isActive ? 'bg-pine-700 text-white' : 'text-pine-900 hover:bg-pine-100'
    }`

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur transition ${
        scrolled ? 'border-pine-100 bg-ivory/90 shadow-card' : 'border-transparent bg-ivory/70'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pine-800">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-pine-200" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
          <span className="font-display text-2xl font-semibold tracking-tight text-pine-950">
            Medi<span className="text-pine-600">Book</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkCls} end={l.to === '/'}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/doctors"
            className="rounded-full bg-clay-500 px-5 py-2.5 text-sm font-semibold text-white shadow-card transition hover:bg-clay-600"
          >
            Book an appointment
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-pine-200 text-pine-900 lg:hidden"
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-pine-100 bg-ivory lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-sm font-medium ${
                      isActive ? 'bg-pine-700 text-white' : 'text-pine-900 hover:bg-pine-100'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link
                to="/doctors"
                className="mt-2 block rounded-xl bg-clay-500 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Book an appointment
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
