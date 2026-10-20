import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import DoctorAvatar from '../components/DoctorAvatar'
import SpecIcon from '../components/SpecIcon'
import { doctorById, isSlotTaken, nextDays } from '../data/doctors'
import { addBooking, loadBookings, makeReference } from '../lib/bookings'

const inputCls =
  'w-full rounded-2xl border border-pine-100 bg-ivory px-4 py-3 text-sm text-pine-950 outline-none placeholder:text-stone-400 focus:border-pine-400 focus:bg-white'
const labelCls = 'mb-1.5 block text-sm font-semibold text-pine-900'

function validate(form) {
  const errors = {}
  if (form.patientName.trim().length < 3) errors.patientName = 'Please enter the patient’s full name.'
  if (!/^(\+92|0)?3\d{9}$/.test(form.phone.replace(/[\s-]/g, '')))
    errors.phone = 'Enter a valid Pakistani mobile, e.g. 0334 1234567.'
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'That email doesn’t look right.'
  const age = Number(form.age)
  if (!form.age || Number.isNaN(age) || age < 0 || age > 120) errors.age = 'Enter a valid age.'
  if (!form.gender) errors.gender = 'Please select an option.'
  if (form.reason.trim().length < 4) errors.reason = 'Tell the doctor briefly what the visit is about.'
  return errors
}

export default function Book() {
  const { id } = useParams()
  const navigate = useNavigate()
  const doctor = doctorById(id)
  const days = useMemo(() => nextDays(3), [])

  const [step, setStep] = useState(1)
  const [dayIndex, setDayIndex] = useState(0)
  const [time, setTime] = useState('')
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    patientName: '',
    phone: '',
    email: '',
    age: '',
    gender: '',
    reason: '',
    notes: '',
  })
  const [existing] = useState(() => loadBookings())

  if (!doctor) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-semibold text-pine-950">Doctor not found</h1>
        <Link to="/doctors" className="mt-7 inline-block rounded-full bg-pine-700 px-7 py-3 font-semibold text-white">
          Browse doctors
        </Link>
      </main>
    )
  }

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((err) => ({ ...err, [key]: undefined }))
  }

  const chosenDay = days[dayIndex]

  const submitDetails = (e) => {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length === 0) setStep(3)
  }

  const confirm = () => {
    const booking = {
      reference: makeReference(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorTitle: doctor.title,
      speciality: doctor.speciality,
      clinic: doctor.clinic,
      city: doctor.city,
      fee: doctor.fee,
      gradient: doctor.gradient,
      dayIndex,
      dateISO: chosenDay.iso,
      dateLabel: `${chosenDay.dayLabel}, ${chosenDay.dateLabel}`,
      time,
      patientName: form.patientName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      age: form.age,
      gender: form.gender,
      reason: form.reason.trim(),
      notes: form.notes.trim(),
      status: 'confirmed',
      createdAt: Date.now(),
    }
    addBooking(booking)
    navigate(`/booking-confirmed/${booking.reference}`)
  }

  const stepBtn = (n, label) => (
    <div className={`flex items-center gap-2.5 ${step >= n ? 'text-pine-900' : 'text-stone-400'}`}>
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
          step > n ? 'bg-pine-500 text-white' : step === n ? 'bg-pine-700 text-white' : 'bg-pine-100 text-pine-500'
        }`}
      >
        {step > n ? '✓' : n}
      </span>
      <span className="hidden text-sm font-semibold sm:block">{label}</span>
    </div>
  )

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Link to={`/doctors/${doctor.id}`} className="text-sm font-semibold text-pine-700 underline-offset-4 hover:underline">
        ← Back to profile
      </Link>

      <h1 className="mt-4 font-display text-4xl font-semibold text-pine-950">Book an appointment</h1>

      {/* Stepper */}
      <div className="mt-7 flex items-center gap-3 sm:gap-5">
        {stepBtn(1, 'Choose a slot')}
        <span className="h-px flex-1 bg-pine-200" />
        {stepBtn(2, 'Patient details')}
        <span className="h-px flex-1 bg-pine-200" />
        {stepBtn(3, 'Confirm')}
      </div>

      {/* Doctor summary */}
      <div className="mt-8 flex items-center gap-4 rounded-3xl border border-pine-100 bg-white p-5 shadow-card">
        <DoctorAvatar doctor={doctor} size="md" />
        <div className="min-w-0 flex-1">
          <p className="font-display text-xl font-semibold text-pine-950">{doctor.name}</p>
          <p className="text-sm text-stone-500">{doctor.title} · {doctor.clinic}, {doctor.city}</p>
        </div>
        <div className="hidden text-right sm:block">
          <p className="text-xs uppercase tracking-wide text-stone-500">Fee</p>
          <p className="font-display text-xl font-semibold text-pine-900">Rs {doctor.fee.toLocaleString()}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.section
            key="step1"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
            className="mt-8 rounded-[2rem] border border-pine-100 bg-white p-6 shadow-card sm:p-8"
          >
            <h2 className="font-display text-2xl font-semibold text-pine-950">1 · Choose a day & time</h2>
            <div className="mt-5 grid grid-cols-3 gap-2.5">
              {days.map((d, i) => (
                <button
                  key={d.iso}
                  onClick={() => { setDayIndex(i); setTime('') }}
                  className={`rounded-2xl border px-3 py-3.5 text-center transition ${
                    dayIndex === i
                      ? 'border-pine-700 bg-pine-700 text-white'
                      : 'border-pine-100 bg-ivory text-pine-900 hover:border-pine-300'
                  }`}
                >
                  <span className="block text-xs uppercase tracking-wide opacity-80">{d.weekday}</span>
                  <span className="block font-display text-lg font-semibold">{d.dayLabel}</span>
                  <span className="block text-xs opacity-80">{d.dateLabel}</span>
                </button>
              ))}
            </div>

            <p className="mt-7 text-sm font-semibold text-pine-900">
              Available times — {chosenDay.dayLabel}, {chosenDay.dateLabel}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-5">
              {doctor.times.map((t, ti) => {
                const taken = isSlotTaken(doctor, dayIndex, ti, existing)
                const selected = time === t
                return (
                  <button
                    key={t}
                    disabled={taken}
                    onClick={() => setTime(t)}
                    className={`rounded-full px-3 py-2.5 text-sm font-medium transition ${
                      taken
                        ? 'cursor-not-allowed bg-stone-100 text-stone-400 line-through'
                        : selected
                          ? 'bg-clay-500 text-white shadow-card'
                          : 'bg-pine-50 text-pine-800 hover:bg-pine-100'
                    }`}
                  >
                    {t}
                  </button>
                )
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-stone-500">
                {time ? <>Selected: <span className="font-semibold text-pine-900">{chosenDay.dayLabel}, {chosenDay.dateLabel} at {time}</span></> : 'Select a time slot to continue.'}
              </p>
              <button
                disabled={!time}
                onClick={() => setStep(2)}
                className="rounded-full bg-pine-700 px-7 py-3 font-semibold text-white transition enabled:hover:bg-pine-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue →
              </button>
            </div>
          </motion.section>
        )}

        {step === 2 && (
          <motion.form
            key="step2"
            onSubmit={submitDetails}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
            className="mt-8 rounded-[2rem] border border-pine-100 bg-white p-6 shadow-card sm:p-8"
            noValidate
          >
            <h2 className="font-display text-2xl font-semibold text-pine-950">2 · Patient details</h2>
            <p className="mt-1.5 flex items-center gap-2 text-sm text-pine-700">
              <SpecIcon icon="calendar" className="h-4 w-4" />
              {chosenDay.dayLabel}, {chosenDay.dateLabel} at {time} with {doctor.name}
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelCls} htmlFor="patientName">Patient full name *</label>
                <input id="patientName" className={inputCls} value={form.patientName} onChange={set('patientName')} placeholder="e.g. Ahmed Raza" />
                {errors.patientName && <p className="mt-1.5 text-sm text-rose-600">{errors.patientName}</p>}
              </div>
              <div>
                <label className={labelCls} htmlFor="phone">Mobile number *</label>
                <input id="phone" className={inputCls} value={form.phone} onChange={set('phone')} placeholder="0334 1234567" inputMode="tel" />
                {errors.phone && <p className="mt-1.5 text-sm text-rose-600">{errors.phone}</p>}
              </div>
              <div>
                <label className={labelCls} htmlFor="email">Email (optional)</label>
                <input id="email" className={inputCls} value={form.email} onChange={set('email')} placeholder="you@example.com" inputMode="email" />
                {errors.email && <p className="mt-1.5 text-sm text-rose-600">{errors.email}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls} htmlFor="age">Age *</label>
                  <input id="age" className={inputCls} value={form.age} onChange={set('age')} placeholder="34" inputMode="numeric" />
                  {errors.age && <p className="mt-1.5 text-sm text-rose-600">{errors.age}</p>}
                </div>
                <div>
                  <label className={labelCls} htmlFor="gender">Gender *</label>
                  <select id="gender" className={inputCls} value={form.gender} onChange={set('gender')}>
                    <option value="">Select…</option>
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                    <option>Prefer not to say</option>
                  </select>
                  {errors.gender && <p className="mt-1.5 text-sm text-rose-600">{errors.gender}</p>}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="reason">Reason for visit *</label>
                <input id="reason" className={inputCls} value={form.reason} onChange={set('reason')} placeholder="e.g. Chest discomfort on exertion, follow-up" />
                {errors.reason && <p className="mt-1.5 text-sm text-rose-600">{errors.reason}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="notes">Notes for the doctor (optional)</label>
                <textarea id="notes" rows="3" className={`${inputCls} resize-none`} value={form.notes} onChange={set('notes')} placeholder="Current medication, allergies, previous reports…" />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-between gap-3">
              <button type="button" onClick={() => setStep(1)} className="rounded-full border border-pine-200 px-6 py-3 font-semibold text-pine-800 hover:bg-pine-50">
                ← Change slot
              </button>
              <button type="submit" className="rounded-full bg-pine-700 px-7 py-3 font-semibold text-white hover:bg-pine-800">
                Review booking →
              </button>
            </div>
          </motion.form>
        )}

        {step === 3 && (
          <motion.section
            key="step3"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
            className="mt-8 rounded-[2rem] border border-pine-100 bg-white p-6 shadow-card sm:p-8"
          >
            <h2 className="font-display text-2xl font-semibold text-pine-950">3 · Review & confirm</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ['Doctor', `${doctor.name} — ${doctor.title}`],
                ['Clinic', `${doctor.clinic}, ${doctor.city}`],
                ['Date', `${chosenDay.dayLabel}, ${chosenDay.dateLabel}`],
                ['Time', time],
                ['Patient', `${form.patientName} (${form.gender}, age ${form.age})`],
                ['Mobile', form.phone],
                ['Reason', form.reason],
                ['Fee (pay at clinic)', `Rs ${doctor.fee.toLocaleString()}`],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-ivory px-5 py-4">
                  <p className="text-xs uppercase tracking-wide text-stone-500">{k}</p>
                  <p className="mt-1 font-semibold text-pine-950">{v}</p>
                </div>
              ))}
            </div>
            {form.notes && (
              <div className="mt-4 rounded-2xl bg-ivory px-5 py-4">
                <p className="text-xs uppercase tracking-wide text-stone-500">Notes for the doctor</p>
                <p className="mt-1 text-pine-950">{form.notes}</p>
              </div>
            )}
            <p className="mt-5 flex items-start gap-2 text-sm text-stone-500">
              <SpecIcon icon="shield" className="mt-0.5 h-4 w-4 shrink-0 text-pine-500" />
              Nothing is charged now. Please arrive 10 minutes early and bring any previous reports and your CNIC.
            </p>
            <div className="mt-8 flex flex-wrap justify-between gap-3">
              <button onClick={() => setStep(2)} className="rounded-full border border-pine-200 px-6 py-3 font-semibold text-pine-800 hover:bg-pine-50">
                ← Edit details
              </button>
              <button onClick={confirm} className="rounded-full bg-clay-500 px-8 py-3 font-semibold text-white shadow-card transition hover:bg-clay-600">
                Confirm booking
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  )
}
