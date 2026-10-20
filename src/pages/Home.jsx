import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import SpecIcon from '../components/SpecIcon'
import DoctorCard from '../components/DoctorCard'
import { DOCTORS, SPECIALITIES, TESTIMONIALS } from '../data/doctors'

const STATS = [
  { value: '120+', label: 'Verified doctors' },
  { value: '38k', label: 'Appointments booked' },
  { value: '4.9', label: 'Average rating' },
  { value: '15 min', label: 'Average wait saved' },
]

const STEPS = [
  {
    icon: 'stethoscope',
    title: 'Find your doctor',
    text: 'Search by speciality, compare verified ratings, experience and upfront fees — no surprises at the clinic.',
  },
  {
    icon: 'calendar',
    title: 'Pick a time slot',
    text: 'Live availability for the next three days. Choose the slot that fits your day and reserve it in seconds.',
  },
  {
    icon: 'shield',
    title: 'Attend & relax',
    text: 'Get an instant booking reference, a reminder before your visit, and your history saved in My Appointments.',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [speciality, setSpeciality] = useState('All specialities')

  const featured = useMemo(() => [...DOCTORS].sort((a, b) => b.rating - a.rating).slice(0, 3), [])

  const submitSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (speciality !== 'All specialities') params.set('speciality', speciality)
    navigate(`/doctors${params.toString() ? `?${params}` : ''}`)
  }

  return (
    <main>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-sage-200/60 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-pine-100 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-24 lg:pt-20">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-pine-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-pine-700"
            >
              <span className="h-2 w-2 rounded-full bg-pine-500" />
              8 specialists available today
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="mt-5 font-display text-5xl font-semibold leading-[1.05] text-pine-950 sm:text-6xl"
            >
              Book a doctor,<br />
              <span className="italic text-pine-600">without the queue.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="mt-5 max-w-lg text-lg leading-relaxed text-stone-600"
            >
              MediBook lets you find trusted specialists in Islamabad and Rawalpindi, compare real
              fees and ratings, and reserve your slot in under a minute.
            </motion.p>

            <motion.form
              onSubmit={submitSearch}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="mt-8 flex flex-col gap-2 rounded-3xl border border-pine-100 bg-white p-2 shadow-soft sm:flex-row sm:items-center sm:rounded-full"
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search doctor or concern…"
                className="w-full flex-1 rounded-full px-4 py-3 text-sm text-pine-950 outline-none placeholder:text-stone-400"
              />
              <select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="rounded-full bg-pine-50 px-4 py-3 text-sm font-medium text-pine-900 outline-none"
              >
                <option>All specialities</option>
                {SPECIALITIES.map((s) => (
                  <option key={s.name}>{s.name}</option>
                ))}
              </select>
              <button
                type="submit"
                className="rounded-full bg-pine-700 px-7 py-3 text-sm font-semibold text-white transition hover:bg-pine-800"
              >
                Search
              </button>
            </motion.form>

            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <p className="font-display text-3xl font-semibold text-pine-900">{s.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-stone-500">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Decorative appointment card stack (pure CSS/SVG — no images) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-6 rotate-3 rounded-[2rem] bg-sage-200" />
            <div className="relative -rotate-2 rounded-[2rem] border border-pine-100 bg-white p-7 shadow-soft">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-pine-500">Next appointment</p>
                <span className="rounded-full bg-pine-50 px-3 py-1 text-xs font-semibold text-pine-700">Confirmed</span>
              </div>
              <div className="mt-5 flex items-center gap-4">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-rose-700 font-display text-xl font-semibold text-white">AC</span>
                <div>
                  <p className="font-display text-xl font-semibold text-pine-950">Dr Amina Chaudhry</p>
                  <p className="text-sm text-stone-500">Consultant Cardiologist</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-ivory p-3.5">
                  <p className="text-xs text-stone-500">Date</p>
                  <p className="font-semibold text-pine-900">Today</p>
                </div>
                <div className="rounded-2xl bg-ivory p-3.5">
                  <p className="text-xs text-stone-500">Time</p>
                  <p className="font-semibold text-pine-900">3:00 PM</p>
                </div>
                <div className="rounded-2xl bg-ivory p-3.5">
                  <p className="text-xs text-stone-500">Reference</p>
                  <p className="font-semibold text-pine-900">MB-DEMO42</p>
                </div>
                <div className="rounded-2xl bg-ivory p-3.5">
                  <p className="text-xs text-stone-500">Fee</p>
                  <p className="font-semibold text-pine-900">Rs 3,500</p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 rounded-2xl bg-pine-800 px-4 py-3 text-sm font-medium text-pine-100">
                <SpecIcon icon="shield" className="h-5 w-5 text-pine-300" />
                Verified doctor · Pay at the clinic, nothing upfront
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- Specialities ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-clay-500">Browse by speciality</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-pine-950 sm:text-4xl">What brings you in today?</h2>
            </div>
            <Link to="/doctors" className="text-sm font-semibold text-pine-700 underline-offset-4 hover:underline">
              View all doctors →
            </Link>
          </div>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {SPECIALITIES.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.05}>
              <Link
                to={`/doctors?speciality=${encodeURIComponent(s.name)}`}
                className="group block h-full rounded-3xl border border-pine-100 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-soft"
              >
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.gradient} text-white`}>
                  <SpecIcon icon={s.icon} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-pine-950">{s.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-stone-500">{s.blurb}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Featured doctors ---------- */}
      <section className="bg-white/60 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-clay-500">Top rated</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-pine-950 sm:text-4xl">Featured doctors</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((d, i) => (
              <DoctorCard key={d.id} doctor={d} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-clay-500">How MediBook works</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-pine-950 sm:text-4xl">Three steps to feeling better</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <div className="relative h-full rounded-3xl bg-pine-800 p-7 text-pine-100 shadow-soft">
                <span className="absolute right-6 top-5 font-display text-5xl font-semibold text-pine-700">0{i + 1}</span>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pine-700 text-pine-200">
                  <SpecIcon icon={step.icon} className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-pine-200">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Testimonials ---------- */}
      <section className="bg-cream/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-clay-500">Patient stories</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-pine-950 sm:text-4xl">Loved by patients like you</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <figure className="flex h-full flex-col rounded-3xl border border-pine-100 bg-white p-7 shadow-card">
                  <div className="font-display text-4xl leading-none text-pine-300">“</div>
                  <blockquote className="mt-2 flex-1 leading-relaxed text-stone-600">{t.text}</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-sm font-bold text-white`}>
                      {t.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                    </span>
                    <span>
                      <span className="block font-semibold text-pine-950">{t.name}</span>
                      <span className="block text-sm text-stone-500">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-pine-800 to-pine-950 px-7 py-12 text-center shadow-soft sm:px-12">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-pine-700/50 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-sage-300/20 blur-2xl" />
            <h2 className="relative font-display text-3xl font-semibold text-white sm:text-4xl">Your health can’t wait in a queue.</h2>
            <p className="relative mx-auto mt-3 max-w-xl text-pine-200">
              Find a specialist, pick a slot and get your confirmation instantly — it takes less than a minute.
            </p>
            <Link
              to="/doctors"
              className="relative mt-7 inline-block rounded-full bg-clay-500 px-8 py-3.5 font-semibold text-white transition hover:bg-clay-600"
            >
              Find a doctor now
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
