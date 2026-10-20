import { initialsOf } from '../data/doctors'

export default function DoctorAvatar({ doctor, size = 'md' }) {
  const sizes = {
    sm: 'h-11 w-11 text-sm',
    md: 'h-16 w-16 text-xl',
    lg: 'h-24 w-24 text-3xl',
    xl: 'h-32 w-32 text-4xl',
  }
  return (
    <div
      aria-hidden="true"
      className={`relative flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${doctor.gradient} font-display font-semibold text-white shadow-card ${sizes[size]}`}
    >
      {initialsOf(doctor.name)}
      <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-pine-500">
        <svg viewBox="0 0 24 24" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
    </div>
  )
}
