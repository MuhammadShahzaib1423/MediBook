export const SPECIALITIES = [
  {
    name: 'Cardiology',
    blurb: 'Heart health, ECGs and long-term cardiac care.',
    icon: 'heart',
    gradient: 'from-rose-400 to-rose-600',
  },
  {
    name: 'Dermatology',
    blurb: 'Skin, hair and nail concerns, treated gently.',
    icon: 'sparkle',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    name: 'Paediatrics',
    blurb: 'Warm, patient care for babies, children and teens.',
    icon: 'smile',
    gradient: 'from-sky-400 to-sky-600',
  },
  {
    name: 'Orthopaedics',
    blurb: 'Bones, joints, sports injuries and mobility.',
    icon: 'bone',
    gradient: 'from-teal-400 to-teal-600',
  },
  {
    name: 'General Medicine',
    blurb: 'Everyday illness, check-ups and ongoing care.',
    icon: 'stethoscope',
    gradient: 'from-emerald-400 to-emerald-600',
  },
  {
    name: 'Dentistry',
    blurb: 'Check-ups, cosmetic work and pain-free dentistry.',
    icon: 'tooth',
    gradient: 'from-indigo-400 to-indigo-600',
  },
  {
    name: 'Ophthalmology',
    blurb: 'Eye tests, vision correction and eye health.',
    icon: 'eye',
    gradient: 'from-violet-400 to-violet-600',
  },
  {
    name: 'Neurology',
    blurb: 'Headaches, nerves, sleep and brain health.',
    icon: 'brain',
    gradient: 'from-fuchsia-400 to-fuchsia-600',
  },
]

const TIMES = ['09:00 AM', '09:40 AM', '10:20 AM', '11:00 AM', '12:30 PM', '01:10 PM', '03:00 PM', '03:40 PM', '04:20 PM', '05:00 PM']

export const DOCTORS = [
  {
    id: 'amina-chaudhry',
    name: 'Dr Amina Chaudhry',
    title: 'Consultant Cardiologist',
    speciality: 'Cardiology',
    rating: 4.9,
    reviewsCount: 412,
    patients: 5200,
    fee: 3500,
    experience: 14,
    nextAvailable: 'Today, 3:00 PM',
    clinic: 'MediBook Heart Clinic, Blue Area',
    city: 'Islamabad',
    languages: ['English', 'Urdu'],
    gradient: 'from-rose-400 via-rose-500 to-rose-700',
    about:
      'Dr Chaudhry has spent fourteen years helping patients understand and protect their heart health. She specialises in preventive cardiology, hypertension and cholesterol management, and is known for explaining test results in plain, reassuring language.',
    education: ['MBBS, King Edward Medical University', 'FCPS Cardiology, CPSP', 'Fellowship in Preventive Cardiology, London'],
    services: ['ECG & stress testing', 'Hypertension management', 'Cholesterol & lipid clinics', 'Heart health screening', 'Post-surgery cardiac follow-up'],
    times: TIMES,
    bookedPattern: [1, 4, 7],
    reviews: [
      { name: 'Bilal Raza', rating: 5, date: 'October 2026', text: 'She explained my ECG report line by line and never rushed me. My blood pressure is finally under control.' },
      { name: 'Sana Iqbal', rating: 5, date: 'September 2026', text: 'Booked in the morning, seen the same afternoon. Calm, thorough and kind throughout.' },
      { name: 'Omar Farooq', rating: 4, date: 'September 2026', text: 'Very knowledgeable. The clinic ran ten minutes late, but the consultation itself was excellent.' },
    ],
  },
  {
    id: 'danish-mehmood',
    name: 'Dr Danish Mehmood',
    title: 'Dermatologist & Skin Specialist',
    speciality: 'Dermatology',
    rating: 4.8,
    reviewsCount: 356,
    patients: 4800,
    fee: 2500,
    experience: 10,
    nextAvailable: 'Today, 4:20 PM',
    clinic: 'GlowDerm Studio, F-7 Markaz',
    city: 'Islamabad',
    languages: ['English', 'Urdu', 'Punjabi'],
    gradient: 'from-amber-400 via-orange-400 to-orange-600',
    about:
      'Dr Mehmood treats medical and cosmetic skin concerns with a light touch and honest advice. From stubborn acne to eczema and hair loss, he builds simple routines patients can actually stick to — no twelve-step product lists.',
    education: ['MBBS, Rawalpindi Medical University', 'MCPS Dermatology, CPSP', 'Diploma in Aesthetic Medicine, Dubai'],
    services: ['Acne & scar treatment', 'Eczema and psoriasis care', 'Hair loss assessment', 'Mole checks & skin screening', 'Chemical peels'],
    times: TIMES,
    bookedPattern: [0, 3, 8],
    reviews: [
      { name: 'Mahnoor Ali', rating: 5, date: 'October 2026', text: 'My acne cleared within two months on the routine he set. He told me what NOT to buy, which I appreciated.' },
      { name: 'Usman Tariq', rating: 5, date: 'August 2026', text: 'Quick, professional mole check with clear follow-up advice. Highly recommended.' },
      { name: 'Ayesha Khan', rating: 4, date: 'August 2026', text: 'Lovely manner and honest pricing. The waiting area gets busy, so book the early slots.' },
    ],
  },
  {
    id: 'sara-lindholm',
    name: 'Dr Sara Lindholm',
    title: 'Consultant Paediatrician',
    speciality: 'Paediatrics',
    rating: 5.0,
    reviewsCount: 489,
    patients: 6100,
    fee: 2800,
    experience: 12,
    nextAvailable: 'Tomorrow, 9:00 AM',
    clinic: 'Little Oaks Children Clinic, G-9',
    city: 'Islamabad',
    languages: ['English', 'Swedish'],
    gradient: 'from-sky-400 via-sky-500 to-blue-600',
    about:
      'Dr Lindholm believes children do best when they are not afraid of the doctor. Her consultations are unhurried and playful, and parents leave with clear written guidance on feeding, sleep, vaccinations and development milestones.',
    education: ['MBBS, Karolinska Institutet, Stockholm', 'MRCPCH, Royal College of Paediatrics', 'Diploma in Child Nutrition'],
    services: ['Vaccinations & immunisation', 'Growth & development checks', 'Feeding and sleep guidance', 'Childhood infections', 'Asthma & allergy care'],
    times: TIMES,
    bookedPattern: [2, 5],
    reviews: [
      { name: 'Fatima Nawaz', rating: 5, date: 'October 2026', text: 'My toddler actually looks forward to visits now. Dr Sara is patient beyond words.' },
      { name: 'Ali Hamza', rating: 5, date: 'September 2026', text: 'Detailed vaccination plan and a written summary after every visit. Superb with first-time parents.' },
      { name: 'Ingrid Johansson', rating: 5, date: 'July 2026', text: 'Wonderful to find a paediatrician who listens to both the child and the parents.' },
    ],
  },
  {
    id: 'hassan-riaz',
    name: 'Dr Hassan Riaz',
    title: 'Orthopaedic Surgeon',
    speciality: 'Orthopaedics',
    rating: 4.7,
    reviewsCount: 298,
    patients: 3900,
    fee: 3200,
    experience: 11,
    nextAvailable: 'Today, 5:00 PM',
    clinic: 'Riaz Ortho Centre, Saddar',
    city: 'Rawalpindi',
    languages: ['English', 'Urdu', 'Punjabi'],
    gradient: 'from-teal-400 via-teal-500 to-teal-700',
    about:
      'Dr Riaz specialises in knee and shoulder problems, sports injuries and fracture care. He favours physiotherapy and rehabilitation first, and only recommends surgery when it is genuinely the best option for the patient.',
    education: ['MBBS, Army Medical College', 'FCPS Orthopaedic Surgery, CPSP', 'Fellowship in Sports Medicine, Singapore'],
    services: ['Knee & shoulder pain', 'Sports injury assessment', 'Fracture care & casting', 'Arthritis management', 'Post-surgery rehabilitation plans'],
    times: TIMES,
    bookedPattern: [0, 6, 9],
    reviews: [
      { name: 'Kamran Shahid', rating: 5, date: 'October 2026', text: 'Recovered from my ACL injury under his plan without surgery. Honest and realistic from day one.' },
      { name: 'Nadia Hussain', rating: 4, date: 'September 2026', text: 'My father’s knee arthritis is much better managed now. Clear exercises, clear expectations.' },
      { name: 'Zain Ul Abideen', rating: 5, date: 'August 2026', text: 'Straight-talking surgeon. Explained every option and the costs before deciding anything.' },
    ],
  },
  {
    id: 'maryam-aslam',
    name: 'Dr Maryam Aslam',
    title: 'Family Physician',
    speciality: 'General Medicine',
    rating: 4.9,
    reviewsCount: 527,
    patients: 8400,
    fee: 1800,
    experience: 9,
    nextAvailable: 'Today, 3:40 PM',
    clinic: 'Aslam Family Practice, Bahria Town Phase 7',
    city: 'Rawalpindi',
    languages: ['English', 'Urdu'],
    gradient: 'from-emerald-400 via-emerald-500 to-green-700',
    about:
      'Dr Aslam is the first port of call for hundreds of local families. She manages everyday illness, diabetes and thyroid care, annual health checks and referrals — and she keeps notes so thorough that your history is never a mystery.',
    education: ['MBBS, Foundation University Medical College', 'MRCGP, Royal College of General Practitioners', 'Diploma in Diabetes Care'],
    services: ['Annual health check-ups', 'Diabetes & thyroid management', 'Flu, fever & infections', 'Blood pressure reviews', 'Travel health advice'],
    times: TIMES,
    bookedPattern: [1, 2, 6],
    reviews: [
      { name: 'Rabia Siddiqui', rating: 5, date: 'October 2026', text: 'Our whole family sees Dr Maryam. She remembers everything and follows up by phone.' },
      { name: 'Imran Yousaf', rating: 5, date: 'September 2026', text: 'My diabetes numbers improved within three months of her plan. Practical, no lectures.' },
      { name: 'Hira Shahid', rating: 4, date: 'July 2026', text: 'Thorough check-up with results explained the same day. Booking through MediBook was effortless.' },
    ],
  },
  {
    id: 'tomasz-nowak',
    name: 'Dr Tomasz Nowak',
    title: 'Dental Surgeon',
    speciality: 'Dentistry',
    rating: 4.8,
    reviewsCount: 264,
    patients: 3500,
    fee: 2200,
    experience: 13,
    nextAvailable: 'Tomorrow, 10:20 AM',
    clinic: 'Nowak Dental Studio, DHA Phase 2',
    city: 'Islamabad',
    languages: ['English', 'Polish'],
    gradient: 'from-indigo-400 via-indigo-500 to-indigo-700',
    about:
      'Dr Nowak runs a calm, modern dental studio specialising in pain-free treatment, implants and cosmetic dentistry. Nervous patients are his speciality — sedation options and a strict no-rush policy come as standard.',
    education: ['DDS, Medical University of Warsaw', 'MSc Implantology, Frankfurt', 'Certification in Cosmetic Dentistry'],
    services: ['Check-ups & hygiene cleans', 'Dental implants', 'Teeth whitening', 'Root canal treatment', 'Braces & aligner consults'],
    times: TIMES,
    bookedPattern: [3, 4],
    reviews: [
      { name: 'Daniyal Ahmed', rating: 5, date: 'October 2026', text: 'Root canal with genuinely zero pain. I had put it off for a year out of fear — wish I hadn’t.' },
      { name: 'Elena Petrova', rating: 5, date: 'August 2026', text: 'Beautiful, natural-looking implant work and transparent pricing throughout.' },
      { name: 'Shan Rehman', rating: 4, date: 'July 2026', text: 'Very modern studio and gentle technique. Slightly pricier, worth it for the calm experience.' },
    ],
  },
  {
    id: 'priya-menon',
    name: 'Dr Priya Menon',
    title: 'Consultant Ophthalmologist',
    speciality: 'Ophthalmology',
    rating: 4.9,
    reviewsCount: 331,
    patients: 4600,
    fee: 2600,
    experience: 15,
    nextAvailable: 'Today, 4:20 PM',
    clinic: 'Menon Eye Institute, Jinnah Super',
    city: 'Islamabad',
    languages: ['English', 'Hindi', 'Malayalam'],
    gradient: 'from-violet-400 via-violet-500 to-purple-700',
    about:
      'With fifteen years in eye care, Dr Menon covers everything from routine vision tests to cataract and glaucoma management. Her clinic uses modern imaging, and every patient receives a printed summary of their eye health.',
    education: ['MBBS, Kasturba Medical College', 'MS Ophthalmology', 'Fellowship in Glaucoma Management, Chennai'],
    services: ['Comprehensive eye exams', 'Cataract assessment', 'Glaucoma screening & care', 'Dry eye treatment', 'Children’s vision testing'],
    times: TIMES,
    bookedPattern: [0, 5, 8],
    reviews: [
      { name: 'Rukhsana Bibi', rating: 5, date: 'October 2026', text: 'She caught my glaucoma early. I am grateful every single day for her thoroughness.' },
      { name: 'Vikram Sethi', rating: 5, date: 'September 2026', text: 'Clear explanation of my cataract options with no pressure to decide on the spot.' },
      { name: 'Mehwish Tariq', rating: 4, date: 'August 2026', text: 'Excellent eye exam for my daughter. The printed report for school was a thoughtful touch.' },
    ],
  },
  {
    id: 'jonas-weber',
    name: 'Dr Jonas Weber',
    title: 'Consultant Neurologist',
    speciality: 'Neurology',
    rating: 4.8,
    reviewsCount: 219,
    patients: 2900,
    fee: 4000,
    experience: 16,
    nextAvailable: 'Tomorrow, 11:00 AM',
    clinic: 'Weber Neurology Clinic, F-10 Markaz',
    city: 'Islamabad',
    languages: ['English', 'German'],
    gradient: 'from-fuchsia-400 via-fuchsia-500 to-fuchsia-700',
    about:
      'Dr Weber investigates headaches, migraine, dizziness, sleep disorders and nerve pain with careful, methodical assessments. He works closely with imaging centres and always explains what a test can — and cannot — tell you.',
    education: ['MD, Heidelberg University', 'Specialist Training in Neurology, Berlin', 'Fellowship in Headache Medicine, Copenhagen'],
    services: ['Migraine & headache clinics', 'Dizziness & balance assessment', 'Sleep disorder screening', 'Nerve pain & neuropathy', 'Memory concerns clinic'],
    times: TIMES,
    bookedPattern: [2, 7],
    reviews: [
      { name: 'Christoph Braun', rating: 5, date: 'September 2026', text: 'After years of migraines, his plan reduced my attacks dramatically within two months.' },
      { name: 'Areeba Malik', rating: 5, date: 'August 2026', text: 'Extremely thorough first consultation — nearly an hour. Finally felt properly listened to.' },
      { name: 'Fahad Javed', rating: 4, date: 'July 2026', text: 'Sorted my sleep issues with a sensible plan, not just medication. Very professional.' },
    ],
  },
]

export const TESTIMONIALS = [
  {
    name: 'Shazia Parveen',
    role: 'Booked a cardiologist',
    text: 'I booked my father’s cardiology appointment at breakfast and he was seen the same afternoon. No phone queues, no guessing — the confirmation arrived instantly.',
    gradient: 'from-teal-400 to-emerald-600',
  },
  {
    name: 'Hamza Khalid',
    role: 'Regular MediBook user',
    text: 'Fees and ratings are shown upfront, so there are no surprises at the clinic. Rescheduling my dental visit took less than a minute.',
    gradient: 'from-indigo-400 to-indigo-600',
  },
  {
    name: 'Grace Mwangi',
    role: 'Booked for her daughter',
    text: 'Finding a paediatrician we trust used to mean asking everyone we know. The reviews on MediBook pointed us to Dr Lindholm, and she has been wonderful.',
    gradient: 'from-amber-400 to-orange-500',
  },
]

export const doctorById = (id) => DOCTORS.find((d) => d.id === id)

export const initialsOf = (name) =>
  name
    .replace(/^Dr\s+/, '')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

/** Returns the next `count` days (starting tomorrow-safe) as { date, label, weekday }. */
export function nextDays(count = 3) {
  const days = []
  const now = new Date()
  for (let i = 0; i < count; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i)
    days.push({
      iso: d.toISOString().slice(0, 10),
      weekday: d.toLocaleDateString('en-GB', { weekday: 'short' }),
      dayLabel:
        i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-GB', { weekday: 'long' }),
      dateLabel: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
    })
  }
  return days
}

/** Deterministic "already booked" slots so the UI feels real and stable. */
export function isSlotTaken(doctor, dayIndex, timeIndex, bookings = []) {
  if (doctor.bookedPattern.includes((timeIndex + dayIndex * 2) % doctor.times.length)) return true
  return bookings.some(
    (b) =>
      b.doctorId === doctor.id &&
      b.dayIndex === dayIndex &&
      b.time === doctor.times[timeIndex] &&
      b.status !== 'cancelled'
  )
}
