const KEY = 'medibook-bookings'

export function loadBookings() {
  try {
    const raw = localStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveBookings(bookings) {
  localStorage.setItem(KEY, JSON.stringify(bookings))
}

export function makeReference() {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return `MB-${code}`
}

export function addBooking(booking) {
  const bookings = loadBookings()
  bookings.push(booking)
  saveBookings(bookings)
  return booking
}

export function cancelBooking(ref) {
  const bookings = loadBookings().map((b) =>
    b.reference === ref ? { ...b, status: 'cancelled' } : b
  )
  saveBookings(bookings)
  return bookings
}

export function bookingByRef(ref) {
  return loadBookings().find((b) => b.reference === ref)
}
