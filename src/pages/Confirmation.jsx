import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import SpecIcon from '../components/SpecIcon'
import { bookingByRef } from '../lib/bookings'

export default function Confirmation() {
  const { ref } = useParams()
  const booking = bookingByRef(ref)

  if (!booking) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-semibold text-pine-950">Booking not found</h1>
        <p className="mt-3 text-stone-500">
          We couldn’t find a booking with reference {ref}. It may have been made on another device or browser.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/appointments" className="rounded-full bg-pine-700 px-7 py-3 font-semibold text-white hover:bg-pine-800">
            My Appointments
          </Link>
          <Link to="/doctors" className="rounded-full border border-pine-200 px-7 py-3 font-semibold text-pine-800 hover:bg-pine-50">
            Find a doctor
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="overflow-hidden rounded-[2rem] border border-pine-100 bg-white shadow-soft"
      >
        <div className="bg-gradient-to-br from-pine-700 to-pine-900 px-7 py-10 text-center sm:px-10">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 220, damping: 14 }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/15"
          >
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </motion.span>
          <h1 className="mt-5 font-display text-3xl font-semibold text-white sm:text-4xl">You’re booked in, {booking.patientName.split(' ')[0]}.</h1>
          <p className="mt-2 text-pine-200">Your appointment is confirmed. Keep your reference handy for the clinic desk.</p>
          <p className="mt-6 inline-block rounded-full bg-white px-6 py-2.5 font-display text-xl font-semibold tracking-wide text-pine-900">
            {booking.reference}
          </p>
        </div>

        <div className="grid gap-4 p-7 sm:grid-cols-2 sm:p-9">
          {[
            ['Doctor', `${booking.doctorName} — ${booking.doctorTitle}`],
            ['Speciality', booking.speciality],
            ['Date', booking.dateLabel],
            ['Time', booking.time],
            ['Clinic', `${booking.clinic}, ${booking.city}`],
            ['Fee (pay at clinic)', `Rs ${booking.fee.toLocaleString()}`],
            ['Patient', `${booking.patientName} · ${booking.gender}, age ${booking.age}`],
            ['Mobile', booking.phone],
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl bg-ivory px-5 py-4">
              <p className="text-xs uppercase tracking-wide text-stone-500">{k}</p>
              <p className="mt-1 font-semibold text-pine-950">{v}</p>
            </div>
          ))}
          <div className="rounded-2xl bg-ivory px-5 py-4 sm:col-span-2">
            <p className="text-xs uppercase tracking-wide text-stone-500">Reason for visit</p>
            <p className="mt-1 font-semibold text-pine-950">{booking.reason}</p>
          </div>
        </div>

        <div className="border-t border-dashed border-pine-200 px-7 py-6 sm:px-9">
          <p className="flex items-start gap-2 text-sm leading-relaxed text-stone-500">
            <SpecIcon icon="clock" className="mt-0.5 h-4 w-4 shrink-0 text-pine-500" />
            Please arrive 10 minutes before your slot. Need to change plans? You can cancel free of
            charge from My Appointments, up to the appointment day.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/appointments" className="flex-1 rounded-full bg-pine-700 px-6 py-3.5 text-center font-semibold text-white hover:bg-pine-800">
              View My Appointments
            </Link>
            <Link to="/doctors" className="flex-1 rounded-full border border-pine-200 px-6 py-3.5 text-center font-semibold text-pine-800 hover:bg-pine-50">
              Book another visit
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
