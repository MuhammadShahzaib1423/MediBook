import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SpecIcon from '../components/SpecIcon'

const VALUES = [
  {
    icon: 'shield',
    title: 'Verified, always',
    text: 'Every doctor on MediBook is credential-checked before their profile goes live, and reviews come only from completed visits.',
  },
  {
    icon: 'wallet',
    title: 'Honest pricing',
    text: 'Consultation fees are shown before you book. You pay at the clinic — MediBook never adds a booking charge on top.',
  },
  {
    icon: 'heart',
    title: 'Patients first',
    text: 'Healthcare is stressful enough. We design every screen to be calm, clear and usable by the whole family.',
  },
]

const TIMELINE = [
  { year: '2023', title: 'A simple idea', text: 'MediBook began after one too many mornings spent on hold with clinic reception desks in Islamabad.' },
  { year: '2024', title: 'First 40 doctors', text: 'We onboarded our first specialists across eight specialities, with transparent fees agreed upfront.' },
  { year: '2025', title: '38,000 appointments', text: 'Patients across the twin cities booked, attended and reviewed visits — with an average rating of 4.9.' },
  { year: '2026', title: 'Same-day care, standard', text: 'Most MediBook doctors now offer same-day slots, so getting seen quickly is the norm, not the exception.' },
]

export default function About() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Reveal className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-clay-500">About MediBook</p>
        <h1 className="mt-2 font-display text-4xl font-semibold leading-tight text-pine-950 sm:text-5xl">
          Healthcare booking that respects your <span className="italic text-pine-600">time</span>.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-600">
          Finding a good doctor should not mean forty minutes on hold, a guessed-at fee and a
          two-hour wait in a crowded room. MediBook brings verified specialists, honest prices and
          real appointment slots together in one calm place — so you can book in a minute and get
          on with your day.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {VALUES.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.08}>
            <div className="h-full rounded-3xl border border-pine-100 bg-white p-7 shadow-card">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pine-700 text-pine-100">
                <SpecIcon icon={v.icon} className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-xl font-semibold text-pine-950">{v.title}</h2>
              <p className="mt-2 leading-relaxed text-stone-600">{v.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <section className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-pine-950">Our story</h2>
          <div className="mt-7 space-y-0">
            {TIMELINE.map((t, i) => (
              <div key={t.year} className="relative flex gap-6 pb-9 last:pb-0">
                {i < TIMELINE.length - 1 && (
                  <span className="absolute left-[52px] top-12 h-[calc(100%-3rem)] w-px bg-pine-200" />
                )}
                <span className="z-10 flex h-11 w-[72px] shrink-0 items-center justify-center rounded-full bg-pine-800 font-display text-sm font-semibold text-white">
                  {t.year}
                </span>
                <div className="pt-1.5">
                  <h3 className="font-display text-lg font-semibold text-pine-950">{t.title}</h3>
                  <p className="mt-1 leading-relaxed text-stone-600">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-[2rem] bg-gradient-to-br from-pine-800 to-pine-950 p-8 text-pine-100 shadow-soft">
            <h2 className="font-display text-2xl font-semibold text-white">By the numbers</h2>
            <div className="mt-7 grid grid-cols-2 gap-6">
              {[
                ['120+', 'Verified doctors'],
                ['8', 'Specialities'],
                ['38k', 'Appointments booked'],
                ['4.9 / 5', 'Average visit rating'],
                ['92%', 'Patients seen on time'],
                ['< 1 min', 'Average booking time'],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="font-display text-3xl font-semibold text-white">{v}</p>
                  <p className="mt-1 text-sm text-pine-300">{l}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 rounded-2xl bg-pine-900/70 p-4 text-sm leading-relaxed text-pine-200">
              MediBook is a portfolio demonstration. The doctors, clinics, statistics and reviews on
              this site are fictional and created for illustration.
            </p>
            <Link
              to="/doctors"
              className="mt-6 inline-block rounded-full bg-clay-500 px-7 py-3 font-semibold text-white transition hover:bg-clay-600"
            >
              Meet the doctors
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
