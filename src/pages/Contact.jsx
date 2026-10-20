import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import SpecIcon from '../components/SpecIcon'

const KEY = 'medibook-enquiries'

const inputCls =
  'w-full rounded-2xl border border-pine-100 bg-ivory px-4 py-3 text-sm text-pine-950 outline-none placeholder:text-stone-400 focus:border-pine-400 focus:bg-white'
const labelCls = 'mb-1.5 block text-sm font-semibold text-pine-900'

const FAQS = [
  {
    q: 'Do I pay when I book?',
    a: 'No. Booking is free — you pay the consultation fee directly at the clinic on the day of your visit.',
  },
  {
    q: 'How do I cancel or reschedule?',
    a: 'Open My Appointments and cancel in two taps, free of charge up to the appointment day. To reschedule, cancel and book a new slot.',
  },
  {
    q: 'Are the doctors verified?',
    a: 'Yes. Every profile is credential-checked before listing, and reviews are collected only from patients who completed a visit.',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', topic: 'General question', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((err) => ({ ...err, [key]: undefined }))
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (form.name.trim().length < 3) errs.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address.'
    if (form.message.trim().length < 10) errs.message = 'Please write a little more detail (10+ characters).'
    setErrors(errs)
    if (Object.keys(errs).length) return
    try {
      const existing = JSON.parse(localStorage.getItem(KEY) || '[]')
      existing.push({ ...form, at: Date.now() })
      localStorage.setItem(KEY, JSON.stringify(existing))
    } catch {
      /* storage unavailable — the message still "sends" in this demo */
    }
    setSent(true)
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-clay-500">Contact</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-pine-950 sm:text-5xl">We reply within one working day</h1>
        <p className="mt-3 text-stone-600">
          Questions about a booking, a doctor, or joining MediBook as a clinic? Send us a message.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_420px]">
        <Reveal>
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-[2rem] border border-pine-100 bg-white p-10 text-center shadow-card"
            >
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pine-50 text-pine-700">
                <SpecIcon icon="check" className="h-8 w-8" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-semibold text-pine-950">Message received, {form.name.split(' ')[0]}.</h2>
              <p className="mx-auto mt-2 max-w-md text-stone-500">
                Thank you for getting in touch about “{form.topic}”. Our team will reply to {form.email} within one working day.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: '', email: '', topic: 'General question', message: '' }) }}
                className="mt-7 rounded-full border border-pine-200 px-6 py-3 font-semibold text-pine-800 hover:bg-pine-50"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={submit}
              noValidate
              className="rounded-[2rem] border border-pine-100 bg-white p-7 shadow-card sm:p-9"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelCls} htmlFor="name">Your name *</label>
                  <input id="name" className={inputCls} value={form.name} onChange={set('name')} placeholder="Full name" />
                  {errors.name && <p className="mt-1.5 text-sm text-rose-600">{errors.name}</p>}
                </div>
                <div>
                  <label className={labelCls} htmlFor="email">Email *</label>
                  <input id="email" className={inputCls} value={form.email} onChange={set('email')} placeholder="you@example.com" />
                  {errors.email && <p className="mt-1.5 text-sm text-rose-600">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls} htmlFor="topic">Topic</label>
                  <select id="topic" className={inputCls} value={form.topic} onChange={set('topic')}>
                    <option>General question</option>
                    <option>Help with a booking</option>
                    <option>I am a doctor / clinic</option>
                    <option>Feedback</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls} htmlFor="message">Message *</label>
                  <textarea id="message" rows="5" className={`${inputCls} resize-none`} value={form.message} onChange={set('message')} placeholder="How can we help?" />
                  {errors.message && <p className="mt-1.5 text-sm text-rose-600">{errors.message}</p>}
                </div>
              </div>
              <button type="submit" className="mt-7 rounded-full bg-pine-700 px-8 py-3.5 font-semibold text-white transition hover:bg-pine-800">
                Send message
              </button>
            </form>
          )}
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.05}>
            <div className="rounded-[2rem] bg-pine-800 p-7 text-pine-100 shadow-soft">
              <h2 className="font-display text-xl font-semibold text-white">Support hours</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-3"><SpecIcon icon="phone" className="h-5 w-5 text-pine-300" />+92 51 111 222 333</li>
                <li className="flex items-center gap-3"><SpecIcon icon="clock" className="h-5 w-5 text-pine-300" />Mon–Sat, 8:00 AM – 10:00 PM</li>
                <li className="flex items-center gap-3"><SpecIcon icon="pin" className="h-5 w-5 text-pine-300" />Blue Area, Islamabad, Pakistan</li>
              </ul>
              <p className="mt-5 rounded-2xl bg-pine-900/70 p-4 text-sm leading-relaxed text-pine-200">
                For medical emergencies, please call 1122 (Rescue) or go directly to your nearest
                hospital — MediBook is a booking service, not an emergency service.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[2rem] border border-pine-100 bg-white p-7 shadow-card">
              <h2 className="font-display text-xl font-semibold text-pine-950">Common questions</h2>
              <div className="mt-4 space-y-5">
                {FAQS.map((f) => (
                  <div key={f.q}>
                    <h3 className="font-semibold text-pine-900">{f.q}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-stone-600">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  )
}
