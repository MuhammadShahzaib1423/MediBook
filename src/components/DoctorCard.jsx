import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import DoctorAvatar from './DoctorAvatar'
import Stars from './Stars'
import SpecIcon from './SpecIcon'

export default function DoctorCard({ doctor, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index, 3) * 0.07 }}
      className="group flex h-full flex-col rounded-3xl border border-pine-100 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="flex items-start gap-4">
        <DoctorAvatar doctor={doctor} />
        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold text-pine-950">{doctor.name}</h3>
          <p className="text-sm font-medium text-pine-600">{doctor.title}</p>
          <div className="mt-1.5 flex items-center gap-2">
            <Stars rating={doctor.rating} className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold text-pine-900">{doctor.rating.toFixed(1)}</span>
            <span className="text-xs text-stone-500">({doctor.reviewsCount} reviews)</span>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-pine-50 px-2 py-2.5">
          <p className="text-sm font-bold text-pine-900">{doctor.experience} yrs</p>
          <p className="text-[11px] uppercase tracking-wide text-stone-500">Experience</p>
        </div>
        <div className="rounded-xl bg-pine-50 px-2 py-2.5">
          <p className="text-sm font-bold text-pine-900">{(doctor.patients / 1000).toFixed(1)}k+</p>
          <p className="text-[11px] uppercase tracking-wide text-stone-500">Patients</p>
        </div>
        <div className="rounded-xl bg-pine-50 px-2 py-2.5">
          <p className="text-sm font-bold text-pine-900">Rs {doctor.fee.toLocaleString()}</p>
          <p className="text-[11px] uppercase tracking-wide text-stone-500">Visit fee</p>
        </div>
      </div>

      <p className="mt-4 flex items-center gap-2 text-sm text-stone-600">
        <SpecIcon icon="pin" className="h-4 w-4 text-pine-500" />
        {doctor.clinic} · {doctor.city}
      </p>
      <p className="mt-1.5 flex items-center gap-2 text-sm font-medium text-pine-700">
        <SpecIcon icon="clock" className="h-4 w-4 text-pine-500" />
        Next available: {doctor.nextAvailable}
      </p>

      <div className="mt-auto flex gap-2.5 pt-6">
        <Link
          to={`/doctors/${doctor.id}`}
          className="flex-1 rounded-full border border-pine-200 px-4 py-2.5 text-center text-sm font-semibold text-pine-800 transition hover:bg-pine-50"
        >
          View profile
        </Link>
        <Link
          to={`/book/${doctor.id}`}
          className="flex-1 rounded-full bg-pine-700 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-pine-800"
        >
          Book visit
        </Link>
      </div>
    </motion.article>
  )
}
