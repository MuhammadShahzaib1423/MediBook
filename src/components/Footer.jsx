import { Link } from 'react-router-dom'
import { SPECIALITIES } from '../data/doctors'

export default function Footer() {
  return (
    <footer className="bg-pine-950 text-pine-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pine-800">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-pine-200" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
            <span className="font-display text-2xl font-semibold text-white">
              Medi<span className="text-pine-300">Book</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-pine-200">
            Book trusted doctors in Islamabad and Rawalpindi in minutes — transparent fees, real
            reviews and instant confirmation. No queues, no phone tag.
          </p>
        </div>

        <div>
          <h4 className="font-display text-base font-semibold text-white">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link className="hover:text-white" to="/doctors">Find a Doctor</Link></li>
            <li><Link className="hover:text-white" to="/appointments">My Appointments</Link></li>
            <li><Link className="hover:text-white" to="/about">About MediBook</Link></li>
            <li><Link className="hover:text-white" to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base font-semibold text-white">Specialities</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SPECIALITIES.slice(0, 5).map((s) => (
              <li key={s.name}>
                <Link className="hover:text-white" to={`/doctors?speciality=${encodeURIComponent(s.name)}`}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base font-semibold text-white">Support</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-pine-200">
            <li>Mon–Sat, 8:00 AM – 10:00 PM</li>
            <li>care@medibook.example.pk</li>
            <li>+92 51 111 222 333</li>
            <li>Blue Area, Islamabad, Pakistan</li>
          </ul>
          <p className="mt-4 rounded-xl bg-pine-900 px-3.5 py-2.5 text-xs leading-relaxed text-pine-200">
            MediBook is a demonstration project. All doctors, clinics and reviews are fictional.
          </p>
        </div>
      </div>
      <div className="border-t border-pine-900">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-pine-300 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} MediBook. All rights reserved.</p>
          <p>Built by <a className="hover:text-white" href="https://shahzaib-portfolio-muhammad-shahzaibs-projects-16858ef3.vercel.app" target="_blank" rel="noreferrer">Muhammad Shahzaib</a> with React, Vite, Tailwind CSS & Framer Motion.</p>
        </div>
      </div>
    </footer>
  )
}
