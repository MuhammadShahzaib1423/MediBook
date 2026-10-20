import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import DoctorCard from '../components/DoctorCard'
import Reveal from '../components/Reveal'
import { DOCTORS, SPECIALITIES } from '../data/doctors'

const SORTS = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'rating', label: 'Highest rated' },
  { id: 'fee-low', label: 'Fee: low to high' },
  { id: 'fee-high', label: 'Fee: high to low' },
  { id: 'experience', label: 'Most experienced' },
]

export default function Doctors() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') || ''
  const speciality = params.get('speciality') || 'All specialities'
  const sort = params.get('sort') || 'recommended'

  const update = (key, value) => {
    const next = new URLSearchParams(params)
    if (!value || value === 'All specialities' || (key === 'sort' && value === 'recommended')) next.delete(key)
    else next.set(key, value)
    setParams(next, { preventScrollReset: true })
  }

  const results = useMemo(() => {
    let list = DOCTORS.filter((d) => {
      const matchesSpeciality = speciality === 'All specialities' || d.speciality === speciality
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.speciality.toLowerCase().includes(q) ||
        d.title.toLowerCase().includes(q) ||
        d.services.some((s) => s.toLowerCase().includes(q))
      return matchesSpeciality && matchesQuery
    })
    switch (sort) {
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating)
        break
      case 'fee-low':
        list = [...list].sort((a, b) => a.fee - b.fee)
        break
      case 'fee-high':
        list = [...list].sort((a, b) => b.fee - a.fee)
        break
      case 'experience':
        list = [...list].sort((a, b) => b.experience - a.experience)
        break
      default:
        list = [...list].sort((a, b) => b.rating * Math.log(b.reviewsCount) - a.rating * Math.log(a.reviewsCount))
    }
    return list
  }, [query, speciality, sort])

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-widest text-clay-500">Our doctors</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-pine-950 sm:text-5xl">Find a doctor</h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          Every MediBook doctor is verified, with transparent fees and real patient reviews.
          Pick a slot today — most doctors have same-day availability.
        </p>
      </Reveal>

      {/* Controls */}
      <div className="mt-9 rounded-3xl border border-pine-100 bg-white p-4 shadow-card sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              value={query}
              onChange={(e) => update('q', e.target.value)}
              placeholder="Search by name, speciality or treatment…"
              className="w-full rounded-full border border-pine-100 bg-ivory py-3 pl-11 pr-4 text-sm text-pine-950 outline-none placeholder:text-stone-400 focus:border-pine-300"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => update('sort', e.target.value)}
            className="rounded-full border border-pine-100 bg-ivory px-4 py-3 text-sm font-medium text-pine-900 outline-none"
            aria-label="Sort doctors"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {['All specialities', ...SPECIALITIES.map((s) => s.name)].map((name) => (
            <button
              key={name}
              onClick={() => update('speciality', name)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                speciality === name
                  ? 'bg-pine-700 text-white'
                  : 'bg-pine-50 text-pine-800 hover:bg-pine-100'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-8 text-sm text-stone-500">
        Showing <span className="font-semibold text-pine-900">{results.length}</span> of {DOCTORS.length} doctors
        {speciality !== 'All specialities' && <> in <span className="font-semibold text-pine-900">{speciality}</span></>}
      </p>

      {results.length > 0 ? (
        <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {results.map((d, i) => (
            <DoctorCard key={d.id} doctor={d} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-3xl border border-dashed border-pine-200 bg-white/60 px-6 py-16 text-center">
          <p className="font-display text-2xl font-semibold text-pine-950">No doctors match your search</p>
          <p className="mx-auto mt-2 max-w-md text-stone-500">
            Try a different name or treatment, or clear the speciality filter to see everyone.
          </p>
          <button
            onClick={() => setParams({})}
            className="mt-6 rounded-full bg-pine-700 px-6 py-3 text-sm font-semibold text-white hover:bg-pine-800"
          >
            Clear filters
          </button>
        </div>
      )}
    </main>
  )
}
