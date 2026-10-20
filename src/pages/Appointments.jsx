import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import SpecIcon from '../components/SpecIcon'
import { initialsOf } from '../data/doctors'
import { cancelBooking, loadBookings } from '../lib/bookings'

export default function Appointments() {
  const [bookings, setBookings] = useState(() => loadBookings())
  const [confirmRef, setConfirmRef] = useState(null)
  const [filter, setFilter] = useState('all')

  const sorted = [...bookings].sort((a, b) => b.createdAt - a.createdAt)
  const visible = sorted.filter((b) =>
    filter === 'all' ? true : filter === 'upcoming' ? b.status === 'confirmed' : b.status === 'cancelled'
  )
  const upcomingCount = bookings.filter((b) => b.status === 'confirmed').length

  const doCancel = (ref) => {
    setBookings(cancelBooking(ref))
    setConfirmRef(null)
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-clay-500">Your bookings</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-pine-950 sm:text-5xl">My Appointments</h1>
        <p className="mt-3 text-stone-600">
          {bookings.length === 0
            ? 'Your booked visits will appear here.'
            : `You have ${upcomingCount} upcoming appointment${upcomingCount === 1 ? '' : 's'}.`}
        </p>
      </Reveal>

      {bookings.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {[
            ['all', 'All'],
            ['upcoming', 'Upcoming'],
            ['cancelled', 'Cancelled'],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                filter === id ? 'bg-pine-700 text-white' : 'bg-white text-pine-800 shadow-card hover:bg-pine-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <div className="mt-8 rounded-[2rem] border border-dashed border-pine-200 bg-white/60 px-6 py-16 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pine-50 text-pine-600">
            <SpecIcon icon="calendar" className="h-8 w-8" />
          </span>
          <p className="mt-5 font-display text-2xl font-semibold text-pine-950">
            {bookings.length === 0 ? 'No appointments yet' : 'Nothing here'}
          </p>
          <p className="mx-auto mt-2 max-w-md text-stone-500">
            {bookings.length === 0
              ? 'When you book a doctor, your appointment will be saved here so you can find it any time.'
              : 'No appointments match this filter.'}
          </p>
          <Link to="/doctors" className="mt-7 inline-block rounded-full bg-pine-700 px-7 py-3 font-semibold text-white hover:bg-pine-800">
            Find a doctor
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-5">
          <AnimatePresence initial={false}>
            {visible.map((b) => (
              <motion.article
                key={b.reference}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`overflow-hidden rounded-3xl border bg-white shadow-card ${
                  b.status === 'cancelled' ? 'border-stone-200 opacity-75' : 'border-pine-100'
                }`}
              >
                <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
                  <span
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br font-display text-xl font-semibold text-white ${b.gradient || 'from-pine-400 to-pine-600'}`}
                  >
                    {initialsOf(b.doctorName)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h2 className="font-display text-xl font-semibold text-pine-950">{b.doctorName}</h2>
                      <span
                        className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
                          b.status === 'cancelled'
                            ? 'bg-rose-50 text-rose-600'
                            : 'bg-pine-50 text-pine-700'
                        }`}
                      >
                        {b.status === 'cancelled' ? 'Cancelled' : 'Confirmed'}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-stone-500">{b.doctorTitle} · {b.clinic}, {b.city}</p>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-stone-600">
                      <span className="flex items-center gap-1.5"><SpecIcon icon="calendar" className="h-4 w-4 text-pine-500" />{b.dateLabel}</span>
                      <span className="flex items-center gap-1.5"><SpecIcon icon="clock" className="h-4 w-4 text-pine-500" />{b.time}</span>
                      <span>Ref: <span className="font-semibold text-pine-900">{b.reference}</span></span>
                      <span>Fee: <span className="font-semibold text-pine-900">Rs {b.fee.toLocaleString()}</span></span>
                    </div>
                    <p className="mt-2 text-sm text-stone-500">
                      Patient: {b.patientName} · {b.reason}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col gap-2">
                    <Link
                      to={`/doctors/${b.doctorId}`}
                      className="rounded-full border border-pine-200 px-5 py-2.5 text-center text-sm font-semibold text-pine-800 hover:bg-pine-50"
                    >
                      Doctor profile
                    </Link>
                    {b.status === 'confirmed' &&
                      (confirmRef === b.reference ? (
                        <span className="flex gap-2">
                          <button
                            onClick={() => doCancel(b.reference)}
                            className="flex-1 rounded-full bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700"
                          >
                            Confirm cancel
                          </button>
                          <button
                            onClick={() => setConfirmRef(null)}
                            className="rounded-full border border-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-600"
                          >
                            Keep
                          </button>
                        </span>
                      ) : (
                        <button
                          onClick={() => setConfirmRef(b.reference)}
                          className="rounded-full px-5 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50"
                        >
                          Cancel booking
                        </button>
                      ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}
    </main>
  )
}
