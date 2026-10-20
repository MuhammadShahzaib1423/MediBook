import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import DoctorAvatar from '../components/DoctorAvatar'
import Stars from '../components/Stars'
import SpecIcon from '../components/SpecIcon'
import DoctorCard from '../components/DoctorCard'
import { DOCTORS, doctorById, isSlotTaken, nextDays } from '../data/doctors'
import { loadBookings } from '../lib/bookings'

export default function DoctorDetail() {
  const { id } = useParams()
  const doctor = doctorById(id)

  if (!doctor) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-semibold text-pine-950">Doctor not found</h1>
        <p className="mt-3 text-stone-500">This profile may have moved. Browse all doctors instead.</p>
        <Link to="/doctors" className="mt-7 inline-block rounded-full bg-pine-700 px-7 py-3 font-semibold text-white hover:bg-pine-800">
          Browse doctors
        </Link>
      </main>
    )
  }

  const days = nextDays(3)
  const bookings = loadBookings()
  const related = DOCTORS.filter((d) => d.id !== doctor.id && d.speciality === doctor.speciality)
  const others = related.length
    ? related
    : DOCTORS.filter((d) => d.id !== doctor.id).slice(0, 2)

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/doctors" className="text-sm font-semibold text-pine-700 underline-offset-4 hover:underline">
        ← All doctors
      </Link>

      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6 overflow-hidden rounded-[2rem] border border-pine-100 bg-white shadow-card"
      >
        <div className={`h-2.5 bg-gradient-to-r ${doctor.gradient}`} />
        <div className="flex flex-col gap-7 p-7 sm:p-9 lg:flex-row lg:items-center">
          <DoctorAvatar doctor={doctor} size="xl" />
          <div className="flex-1">
            <span className="inline-block rounded-full bg-pine-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wide text-pine-700">
              {doctor.speciality}
            </span>
            <h1 className="mt-3 font-display text-4xl font-semibold text-pine-950">{doctor.name}</h1>
            <p className="mt-1 text-lg text-stone-500">{doctor.title}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
              <Stars rating={doctor.rating} />
              <span className="font-semibold text-pine-900">{doctor.rating.toFixed(1)}</span>
              <span className="text-sm text-stone-500">{doctor.reviewsCount} patient reviews</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-600">
              <span className="flex items-center gap-2"><SpecIcon icon="pin" className="h-4 w-4 text-pine-500" />{doctor.clinic}, {doctor.city}</span>
              <span className="flex items-center gap-2"><SpecIcon icon="clock" className="h-4 w-4 text-pine-500" />Next available: {doctor.nextAvailable}</span>
            </div>
          </div>
          <div className="rounded-3xl bg-ivory p-6 text-center lg:w-60">
            <p className="text-xs uppercase tracking-wide text-stone-500">Consultation fee</p>
            <p className="mt-1 font-display text-3xl font-semibold text-pine-900">Rs {doctor.fee.toLocaleString()}</p>
            <p className="mt-1 text-xs text-stone-500">Pay at the clinic · No booking fee</p>
            <Link
              to={`/book/${doctor.id}`}
              className="mt-5 block rounded-full bg-clay-500 px-6 py-3 font-semibold text-white transition hover:bg-clay-600"
            >
              Book appointment
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-px border-t border-pine-100 bg-pine-100 text-center sm:grid-cols-4">
          {[
            [`${doctor.experience} years`, 'Experience'],
            [`${doctor.patients.toLocaleString()}+`, 'Patients treated'],
            [doctor.languages.join(' · '), 'Languages'],
            ['Verified', 'MediBook checked'],
          ].map(([v, l]) => (
            <div key={l} className="bg-white px-4 py-4">
              <p className="font-semibold text-pine-900">{v}</p>
              <p className="text-xs uppercase tracking-wide text-stone-500">{l}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* Left column */}
        <div className="space-y-12">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-pine-950">About {doctor.name.split(' ')[1] ? `Dr ${doctor.name.replace(/^Dr\s+/, '').split(' ').slice(-1)[0]}` : doctor.name}</h2>
            <p className="mt-3 leading-relaxed text-stone-600">{doctor.about}</p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-pine-950">Education & training</h2>
            <ul className="mt-4 space-y-3">
              {doctor.education.map((e) => (
                <li key={e} className="flex items-start gap-3 rounded-2xl border border-pine-100 bg-white px-5 py-4 shadow-card">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pine-50 text-pine-700">
                    <SpecIcon icon="shield" className="h-5 w-5" />
                  </span>
                  <span className="font-medium text-pine-950">{e}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-pine-950">Services & treatments</h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {doctor.services.map((s) => (
                <span key={s} className="rounded-full border border-pine-200 bg-white px-4 py-2 text-sm font-medium text-pine-800 shadow-card">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-pine-950">Patient reviews</h2>
            <div className="mt-4 space-y-4">
              {doctor.reviews.map((r) => (
                <article key={r.name} className="rounded-3xl border border-pine-100 bg-white p-6 shadow-card">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-pine-100 text-sm font-bold text-pine-800">
                        {r.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                      </span>
                      <div>
                        <p className="font-semibold text-pine-950">{r.name}</p>
                        <p className="text-xs text-stone-500">{r.date} · Verified visit</p>
                      </div>
                    </div>
                    <Stars rating={r.rating} className="h-3.5 w-3.5" />
                  </div>
                  <p className="mt-3 leading-relaxed text-stone-600">{r.text}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Availability sidebar */}
        <Reveal delay={0.1}>
          <aside className="sticky top-24 rounded-[2rem] border border-pine-100 bg-white p-6 shadow-card">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-pine-950">
              <SpecIcon icon="calendar" className="h-5 w-5 text-pine-600" /> Availability
            </h2>
            <p className="mt-1 text-sm text-stone-500">Next 3 days · grey slots are taken</p>
            <div className="mt-5 space-y-6">
              {days.map((day, dayIndex) => (
                <div key={day.iso}>
                  <p className="text-sm font-semibold text-pine-900">
                    {day.dayLabel} <span className="font-normal text-stone-500">· {day.dateLabel}</span>
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {doctor.times.slice(0, 6).map((time, ti) => {
                      const taken = isSlotTaken(doctor, dayIndex, ti, bookings)
                      return (
                        <span
                          key={time}
                          className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                            taken
                              ? 'bg-stone-100 text-stone-400 line-through'
                              : 'bg-pine-50 text-pine-800'
                          }`}
                        >
                          {time}
                        </span>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
            <Link
              to={`/book/${doctor.id}`}
              className="mt-7 block rounded-full bg-pine-700 px-6 py-3.5 text-center font-semibold text-white transition hover:bg-pine-800"
            >
              Choose a slot
            </Link>
            <p className="mt-3 text-center text-xs text-stone-500">Free cancellation up to the appointment day.</p>
          </aside>
        </Reveal>
      </div>

      {/* Related */}
      <section className="mt-16">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-pine-950">You may also consider</h2>
        </Reveal>
        <div className="mt-7 grid gap-6 md:grid-cols-2">
          {others.map((d, i) => (
            <DoctorCard key={d.id} doctor={d} index={i} />
          ))}
        </div>
      </section>
    </main>
  )
}
