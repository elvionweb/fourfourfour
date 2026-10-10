import { useEffect, useState, useCallback, createContext, useContext } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import {
  Eye, Heart, Sparkles, Gem, Moon, Star, MessageCircle, ChevronLeft, ChevronRight, Shell, HeartHandshake,
  Menu, X, Check, Compass, ShieldCheck, Sun, Quote, Banknote, Feather,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

/* ---------- CONFIG ---------- */
const WHATSAPP = '+447871259314'
// Pound per 1 US dollar. Update this number whenever you want to change Pound prices (≈ £0.76 on 8 Oct 2026).
const GBP_RATE = 0.76
const CurrencyCtx = createContext({ cur: 'USD', setCur: () => { } })
const useCurrency = () => useContext(CurrencyCtx)
const money = (usd, cur) => {
  if (cur === 'USD') return `$${usd.toLocaleString('en-US')}`
  if (usd === 44) return '£44' // the reading fee is a flat £44
  return `£${(Math.round((usd * GBP_RATE) / 100) * 100).toLocaleString('en-GB')}`
}
const wa = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`
const img = (n) => `/images/${n}`


const PRODUCTS = [
  {
    title: 'Beads for Energy & Chakra Alignment',
    tag: 'Energy · Balance',
    blurb: 'Hand-strung, consecrated beads worn to restore balance, calm the spirit and align your energy centres.',
    image: img('waist-beads.jpg'),
    icon: Sparkles,
  },
  {
    title: 'Crystal Necklace for Protection & Peaceful Sleep',
    tag: 'Protection · Rest',
    blurb: 'Raw crystal points blessed to shield your spirit and invite deep, peaceful, undisturbed sleep.',
    image: img('crystal-necklaces.jpg'),
    icon: Moon,
  },
  {
    title: 'Eye of Horus & Evil Eye Talisman Pendant',
    tag: 'Shield · Ward',
    blurb: 'A powerful talisman that wards off the evil eye and spiritual attack from others.',
    image: img('eye-of-horus.jpg'),
    icon: ShieldCheck,
  },
  {
    title: 'Consecrated Cowrie Shell Neckpiece',
    tag: 'Wealth · Prosperity',
    blurb: 'Ancient symbol of abundance, consecrated to attract wealth, prosperity and open doors.',
    image: img('cowrie-bracelet.webp'),
    icon: Gem,
  },
  {
    title: 'Eye of Providence Pendant',
    tag: 'Awakening · Guidance',
    blurb: 'Worn for spiritual awakening and divine guidance  the all-seeing eye lighting your path.',
    image: img('protection-set.jpg'),
    icon: Eye,
  },
  {
    title: 'Cowrie Shell & Black Bead Necklace',
    tag: 'Abundance · Grounding',
    blurb: 'Hand-knotted cowrie shells and black beads, consecrated to draw prosperity, steady your spirit and keep your path open.',
    image: img('cowrie-necklace.jpeg'),
    icon: Shell,
  },
  {
    title: 'Ancestral Carved Pendant Necklace',
    tag: 'Heritage · Guidance',
    blurb: 'Hand-carved mask, cross and totem pendants on black beaded strands, worn to honour your roots and call on ancestral protection and guidance.',
    image: img('ancestral-guidance.jpeg'),
    icon: Compass,
  },
  {
    title: 'Yin-Yang Harmony Bracelet Set',
    tag: 'Balance · Unity',
    blurb: 'A matching pair of frosted white and black bead bracelets, blessed to restore balance, strengthen bonds and bring harmony between two people.',
    image: img('yin-yang-bracelets.jpeg'),
    icon: HeartHandshake,
  },
]

const SERVICES = [
  { icon: Eye, title: 'Spiritual Readings', text: 'Clear, honest insight into your path, your relationships, your blockages and what is coming next.', cta: 'Book a reading', msg: 'Hello 444 spirituality, I would like to book a full spiritual reading ($44).' },
  { icon: Sparkles, title: 'Soul Awakening', text: 'A transformative journey to rise into your true purpose and unlock your inner wisdom and spiritual discernment.', cta: 'Learn more', msg: 'Hello 444 spirituality, I would like to know more about your soul awakening programs.' },
  { icon: Heart, title: 'Love Spiritual Work', text: 'Spiritual work to draw, restore and protect love done with intention, respect and care.', cta: 'Ask about love work', msg: 'Hello 444 spirituality, I would like to know more about your love spiritual work.' },
  { icon: Gem, title: 'Good Luck Beads', text: 'Consecrated beads, talismans and crystals charged for luck, protection, wealth and clarity.', cta: 'Shop the beads', msg: 'Hello 444 spirituality, I would like to order good luck beads.' },
  { icon: Compass, title: 'Spiritual Mentorship', text: 'A guided 1-on-1 journey of 3, 6 or 9 months to awaken your gifts and ground your life.', cta: 'See programs', msg: 'Hello 444 spirituality, I would like to join the spiritual mentorship.' },
]

const PLANS = [
  { name: 'Awakening', duration: '3 months', sessions: 12, usd: 2500, feats: ['12 private sessions', 'Personal spiritual assessment', 'Weekly guidance & practices', 'WhatsApp check-ins'] },
  { name: 'Ascension', duration: '6 months', sessions: 24, usd: 3300, popular: true, feats: ['24 private sessions', 'Everything in Awakening', 'Protection & cleansing rituals', 'Priority WhatsApp support', 'Starter talisman included'] },
  { name: 'Mastery', duration: '9 months', sessions: 36, usd: 4500, feats: ['36 private sessions', 'Everything in Ascension', 'Deep gift & purpose activation', 'Seasonal energy readings', 'Full consecrated bead set'] },
]


const TESTIMONIALS = [


  {
    client: true,
    name: 'Olivia K',
    place: 'London',
    service: 'Spiritual Reading',
    text: 'The clarity I gained from my session was mind-blowing. Things I had been struggling with for months suddenly made total sense. Truly a transformative and powerful experience!'
  },
  {
    client: true,
    name: 'Benjamin V',
    place: 'Stockholm',
    service: 'Mentorship',
    text: 'Walking this journey under such insightful guidance has completely reframed how I approach my life and purpose. My personal growth over the past 6 months has been incredible.'
  },
  {
    client: true,
    name: 'Elena R',
    place: 'San Francisco',
    service: 'Talisman',
    text: 'The energy off this talisman was palpable from the moment I opened the package. Beautiful craftsmanship and authentic power. Now I carry it with me everywhere.'
  },
  {
    client: true,
    name: 'Mateusz O',
    place: 'Warsaw',
    service: 'Mentorship',
    text: 'The depth of wisdom shared in every meeting is unmatched. This mentorship pushed me past my limiting beliefs and helped me step fully into my own power.'
  },
  {
    client: true,
    name: 'Siddharth M',
    place: 'Dubai',
    service: 'Spiritual Reading',
    text: 'Incredibly accurate and delivered with so much compassion. The session gave me the exact reassurance and direction I needed during a very uncertain phase.'
  },
  {
    client: true,
    name: 'Aikaterini L',
    place: 'Athens',
    service: 'Talisman',
    text: 'The beads are absolutely stunning and deeply grounding. You can tell they were crafted with intention and genuine care. I couldn’t be happier with my purchase!'
  }

]

const GALLERY = ['rudraksha.jpg', 'evil-eye-cord.jpg', 'peaceful-sleep.jpg', 'cowrie-bracelet.webp', 'protection-set.jpg', 'cowrie-necklace.jpeg',]

const STEPS = [
  { n: '01', t: 'Reach out', d: 'Tap the WhatsApp button and tell us what is on your spirit.' },
  { n: '02', t: 'Choose your path', d: 'A reading, spiritual work, a talisman, or a mentorship program.' },
  { n: '03', t: 'Receive guidance', d: 'Get clear direction, protection and practices made for you.' },
]

const fade = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }
const stagger = { show: { transition: { staggerChildren: 0.12 } } }
const item = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}
const reveal = { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.15 } }

/* ---------- SMALL PIECES ---------- */
function Stars() {
  const [pts] = useState(() => Array.from({ length: 60 }, () => ({
    l: Math.random() * 100, t: Math.random() * 100, s: Math.random() * 2 + 1, d: Math.random() * 4,
  })))
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pts.map((p, i) => (
        <span key={i} className="absolute rounded-full bg-gold-300 animate-twinkle"
          style={{ left: `${p.l}%`, top: `${p.t}%`, width: p.s, height: p.s, animationDelay: `${p.d}s` }} />
      ))}
    </div>
  )
}

function SectionHead({ eyebrow, title, sub }) {
  return (
    <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="mx-auto mb-14 max-w-2xl text-center">
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">{title}</h2>
      {sub && <p className="mt-5 text-white/60">{sub}</p>}
      <div className="mx-auto mt-6 flex items-center justify-center gap-3 text-gold-500"><span className="h-px w-12 bg-gold-500/50" /><Star size={14} /><span className="h-px w-12 bg-gold-500/50" /></div>
    </motion.div>
  )
}

/* ---------- NAV ---------- */

function Nav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const { cur } = useCurrency()

  useEffect(() => {
    const handleScroll = () => setSolid(window.scrollY > 40)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    ['About', '#about'],
    ['Services', '#services'],
    ['Talismans', '#shop'],
    ['Mentorship', '#mentorship'],
    ['Reviews', '#reviews'],
    ['How it works', '#how'],
  ]

  const handleMobileNavigation = (event, hash) => {
    event.preventDefault()

    const targetId = hash.replace('#', '')

    // Close the mobile menu first.
    setOpen(false)

    // Wait for the mobile menu's closing animation to finish.
    window.setTimeout(() => {
      const target = document.getElementById(targetId)

      if (!target) {
        console.error(`Navigation target not found: ${targetId}`)
        return
      }

      // Calculate the target position, accounting for the fixed header.
      const headerOffset = 88
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerOffset

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth',
      })

      // Update the URL hash without triggering a second jump.
      window.history.replaceState(null, '', hash)
    }, 300)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? 'glass border-x-0 border-t-0 bg-night-950/70' : ''
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="flex items-center gap-2">
          <img
            src="/logo-mark.svg"
            alt="444 spirituality logo"
            className="h-12 w-12"
          />
          <span className="font-display text-xl tracking-wide">
            444 <span className="text-gold-400">Spirituality</span>
          </span>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([label, hash]) => (
            <a
              key={label}
              href={hash}
              className="text-sm text-white/70 transition hover:text-gold-300"
            >
              {label}
            </a>
          ))}

          <a
            href={wa('Hello 444 spirituality, I would like to book a reading.')}
            target="_blank"
            rel="noreferrer"
            className="btn-gold !py-2.5"
          >
            Book a Reading
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setOpen((previous) => !previous)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="glass overflow-hidden border-x-0 md:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-4 px-5 py-6"
            >
              {links.map(([label, hash]) => (
                <a
                  key={label}
                  href={hash}
                  onClick={(event) =>
                    handleMobileNavigation(event, hash)
                  }
                  className="text-lg text-white/80 transition hover:text-gold-300"
                >
                  {label}
                </a>
              ))}

              <a
                href={wa('Hello 444 spirituality, I would like to book a reading.')}
                target="_blank"
                rel="noreferrer"
                className="btn-gold"
              >
                Book a Reading · {money(44, cur)}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
// function Nav() {
//   const [open, setOpen] = useState(false)
//   const [solid, setSolid] = useState(false)
//   useEffect(() => {
//     const f = () => setSolid(window.scrollY > 40)
//     f(); window.addEventListener('scroll', f); return () => window.removeEventListener('scroll', f)
//   }, [])
//   const { cur } = useCurrency()
//   const links = [['About', '#about'], ['Services', '#services'], ['Talismans', '#shop'], ['Mentorship', '#mentorship'], ['Reviews', '#reviews'], ['How it works', '#how']]
//   return (
//     <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? 'glass border-x-0 border-t-0 bg-night-950/70' : ''}`}>
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

//         <a href="#top" className="flex items-center gap-2">
//   <img src="/logo-mark.svg" alt="444 spirituality logo" className="h-12 w-12" />
//   <span className="font-display text-xl tracking-wide">444 <span className="text-gold-400">Spirituality</span></span>
// </a>
//         <nav className="hidden items-center gap-8 md:flex">
//           {links.map(([l, h]) => <a key={l} href={h} className="text-sm text-white/70 transition hover:text-gold-300">{l}</a>)}
//           <a href={wa('Hello 444 spirituality, I would like to book a reading.')} target="_blank" rel="noreferrer" className="btn-gold !py-2.5">Book a Reading</a>
//         </nav>
//         <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
//       </div>
//       <AnimatePresence>
//         {open && (
//           <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="glass overflow-hidden border-x-0 md:hidden">
//             <div className="flex flex-col gap-4 px-5 py-6">
//               {links.map(([l, h]) => <a key={l} href={h} onClick={() => setOpen(false)} className="text-lg text-white/80">{l}</a>)}
//               <a href={wa('Hello 444 spirituality, I would like to book a reading.')} target="_blank" rel="noreferrer" className="btn-gold">Book a Reading · {money(44, cur)}</a>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   )
// }

/* ---------- HERO ---------- */
function Hero() {
  const { cur } = useCurrency()
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#2a1a6b_0%,#0d0a2b_45%,#07051a_100%)]" />
      <Stars />
      <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-mystic-600/30 blur-[120px] animate-float" />
      <div className="absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-gold-500/20 blur-[120px] animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.p variants={fade} className="eyebrow mb-6 flex items-center gap-3"><span className="h-px w-10 bg-gold-400" /> Spiritual Seer · Reader · Mentor</motion.p>
          <motion.h1 variants={fade} className="font-display text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            Awaken your spirit.<br /><span className="gold-text italic">Protect your path.</span>
          </motion.h1>
          <motion.p variants={fade} className="mt-7 max-w-xl text-lg leading-relaxed text-white/65">
            Soul awakening, spiritual readings, love spiritual work, consecrated good luck beads and one-on-one mentorship guidance rooted in ancient wisdom, delivered with clarity and care.
          </motion.p>
          <motion.div variants={fade} className="mt-10 flex flex-wrap gap-4">
            <a href={wa('Hello 444 spirituality, I would like to book a full spiritual reading ($44).')} target="_blank" rel="noreferrer" className="btn-gold">
              <MessageCircle size={18} /> Book a Reading · {money(44, cur)}
            </a>
            <a href="#mentorship" className="btn-ghost"> Mentorship</a>
          </motion.div>
          <motion.div variants={fade} className="mt-12 flex flex-wrap gap-x-10 gap-y-4 text-sm text-white/55">
            {['Private & confidential', 'Soul awakening', 'Reply on WhatsApp', 'Consecrated talismans'].map((t) => (
              <span key={t} className="flex items-center gap-2"><Check size={16} className="text-gold-400" />{t}</span>
            ))}
          </motion.div>
        </motion.div>

        <HeroCarousel />
      </div>

      <a href="#services" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-white/40 sm:block" aria-label="Scroll">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="h-10 w-6 rounded-full border border-white/30 p-1.5"><div className="mx-auto h-2 w-1 rounded-full bg-gold-400" /></motion.div>
      </a>
    </section>
  )
}

function HeroCarousel() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = PRODUCTS.length
  const next = useCallback(() => setI((v) => (v + 1) % n), [n])
  const prev = () => setI((v) => (v - 1 + n) % n)
  useEffect(() => {
    if (paused) return
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [paused, next])
  const p = PRODUCTS[i]
  return (
    <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-gold-500/30 via-mystic-600/20 to-transparent blur-2xl" />
      <div className="glass relative overflow-hidden rounded-[2rem] p-3">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-night-800">
          <AnimatePresence mode="wait">
            <motion.img key={p.image} src={p.image} alt={p.title}
              initial={{ opacity: 0, scale: 1.12 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9 }}
              className="absolute inset-0 h-full w-full object-cover" />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/20 to-transparent" />
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }} className="absolute inset-x-0 bottom-0 p-6">
              <span className="eyebrow !text-[10px]">{p.tag}</span>
              <h3 className="mt-2 font-display text-2xl font-semibold leading-snug">{p.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-white/65">{p.blurb}</p>

              <a href={wa(`Hello 4 spirituality, I am interested in the ${p.title}.`)} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold-300 hover:text-gold-400">
                Order on WhatsApp <ChevronRight size={16} />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-between px-3 pb-2 pt-4">
          <div className="flex gap-2">
            {PRODUCTS.map((_, k) => (
              <button key={k} onClick={() => setI(k)} aria-label={`Slide ${k + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? 'w-8 bg-gold-400' : 'w-3 bg-white/25'}`} />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={prev} aria-label="Previous" className="grid h-9 w-9 place-items-center rounded-full border border-white/20 transition hover:border-gold-400 hover:text-gold-400"><ChevronLeft size={18} /></button>
            <button onClick={next} aria-label="Next" className="grid h-9 w-9 place-items-center rounded-full border border-white/20 transition hover:border-gold-400 hover:text-gold-400"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ---------- MARQUEE ---------- */
function Marquee() {
  const words = ['Protection', 'Prosperity', 'Love', 'Clarity', 'Peaceful Sleep', 'Awakening', 'Divine Guidance', 'Good Luck']
  const row = [...words, ...words]
  return (
    <div className="overflow-hidden border-y border-gold-500/20 bg-night-900 py-5">
      <div className="flex w-max animate-marquee gap-12">
        {row.concat(row).map((w, k) => (
          <span key={k} className="flex items-center gap-12 font-display text-2xl italic text-white/70">{w}<Star size={14} className="text-gold-500" /></span>
        ))}
      </div>
    </div>
  )
}

/* ---------- SERVICES ---------- */
function Services() {
  return (
    <section id="services" className="scroll-mt-24 relative bg-night-900 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead eyebrow="What we offer" title="Five ways we walk with you" sub="Whether you need answers, protection, love or a long-term guide, there is a path made for you." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, text, cta, msg }, idx) => (
            <motion.div key={title} variants={item} custom={idx} {...reveal} whileHover={{ y: -8 }} className="glass group relative overflow-hidden rounded-3xl p-7 transition-colors hover:border-gold-500/50">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-500/10 blur-2xl transition-all duration-500 group-hover:bg-gold-500/30" />
              <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold-400/20 to-mystic-600/20 text-gold-400"><Icon size={26} /></div>
              <h3 className="font-display text-2xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{text}</p>
              <a href={wa(msg)} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-gold-300 hover:gap-2 transition-all">{cta} <ChevronRight size={16} /></a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- SLEEP / PROTECTION FEATURE ---------- */
function Feature() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-night-900 via-night-950 to-night-950" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="relative">
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-mystic-600/30 to-gold-500/20 blur-2xl" />
          <img src={img('peaceful-sleep.jpg')} alt="Spiritual protection during sleep" loading="lazy" className="relative aspect-[4/5] w-full rounded-[2rem] object-cover" />
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          <motion.p variants={fade} className="eyebrow mb-4">Rest · Protection</motion.p>
          <motion.h2 variants={fade} className="font-display text-4xl font-semibold leading-tight sm:text-5xl">Sleep in peace.<br /><span className="gold-text italic">Guarded all night.</span></motion.h2>
          <motion.p variants={fade} className="mt-6 text-white/65 leading-relaxed">
            Restless nights, heavy dreams, or a feeling that something is watching? Your spirit is most open while you sleep. Our crystal necklaces and eye talismans are consecrated to surround you with protection and bring calm, peaceful rest.
          </motion.p>
          <ul className="mt-8 space-y-4">
            {['Crystal necklaces blessed for protection', 'Evil eye & Eye of Horus talismans against spiritual attack', 'Cleansing guidance for your space and your spirit'].map((t, idx) => (
              <motion.li variants={item} custom={idx} {...reveal} key={t} className="flex items-start gap-3 text-white/80"><span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-500/20 text-gold-400"><Check size={13} /></span>{t}</motion.li>
            ))}
          </ul>
          <motion.div variants={fade} className="mt-10"><a href={wa('Hello 444 spirituality, I need spiritual protection and peaceful sleep.')} target="_blank" rel="noreferrer" className="btn-gold"><ShieldCheck size={18} /> Get protected</a></motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- SHOP ---------- */
function Shop() {
  return (
    <section id="shop" className="scroll-mt-24 bg-night-950 py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead eyebrow="Consecrated talismans" title="Good luck beads & spiritual jewellery" sub="Every piece is cleansed, consecrated and prayed over before it reaches you." />
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, idx) => {
            const Icon = p.icon
            return (
              <motion.article key={p.title} variants={item} custom={idx} {...reveal} whileHover={{ y: -10 }} className="glass group overflow-hidden rounded-3xl transition-colors hover:border-gold-500/50">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 to-transparent" />
                  <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-night-950/70 px-3 py-1 text-[11px] uppercase tracking-widest text-gold-300 backdrop-blur"><Icon size={12} />{p.tag}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-2xl font-semibold leading-snug">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{p.blurb}</p>
                  <div className="mt-6 flex justify-center">
                    <a href={wa(`Hello 444 spirituality, I would like to order the ${p.title}.`)} target="_blank" rel="noreferrer" className="btn-gold !py-3">Order Now</a>
                  </div>

                </div>
              </motion.article>
            )
          })}
          <motion.article variants={item} {...reveal} className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-gold-500/30 bg-gradient-to-br from-gold-500/10 to-mystic-600/20 p-8 text-center">
            <Sun className="mb-4 text-gold-400" size={34} />
            <h3 className="font-display text-2xl font-semibold">Not sure which one you need?</h3>
            <p className="mt-3 text-sm text-white/60">Tell us what you are facing and we will guide you to the right piece.</p>
            <a href={wa('Hello 444 spirituality, please help me choose the right talisman.')} target="_blank" rel="noreferrer" className="btn-gold mt-6">Ask for guidance</a>
          </motion.article>
        </div>
      </div>
    </section>
  )
}

/* ---------- GALLERY ---------- */
function Gallery() {
  return (
    <section className="bg-night-900 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead eyebrow="The collection" title="Crystals, beads & heritage pieces" />
        <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {GALLERY.map((g, k) => (
            <motion.div key={g} initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: k * 0.07 }} className="group relative break-inside-avoid overflow-hidden rounded-2xl">
              <img src={img(g)} alt="fourfourfour spirituality collection" loading="lazy" className="w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950/60 to-transparent opacity-0 transition group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- MENTORSHIP ---------- */
function CurrencyToggle() {
  const { cur, setCur } = useCurrency()
  return (
    <div className="mx-auto mb-12 flex w-fit items-center gap-3">
      <Banknote size={18} className="text-gold-400" />
      <div className="relative flex rounded-full border border-white/15 bg-white/5 p-1">
        {['USD', 'GBP'].map((c) => (
          <button key={c} onClick={() => setCur(c)} className="relative z-10 rounded-full px-5 py-2 text-sm font-medium transition-colors" style={{ color: cur === c ? '#07051a' : 'rgba(255,255,255,0.7)' }}>
            {cur === c && <motion.span layoutId="curPill" className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-gold-300 to-gold-500" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            {c === 'USD' ? '$ Dollar' : '£ Pound'}
          </button>
        ))}
      </div>
    </div>
  )
}

function Mentorship() {
  const { cur } = useCurrency()
  return (
    <section id="mentorship" className="scroll-mt-24 relative overflow-hidden bg-night-950 py-16 md:py-28">
      <div className="absolute left-1/2 top-0 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-mystic-600/20 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead eyebrow="1-on-1 spiritual mentorship" title="A guided journey, session by session" sub="Private mentorship to awaken your gifts, protect your energy and build a life aligned with your purpose." />
        <CurrencyToggle />
        <div className="grid items-stretch gap-7 lg:grid-cols-3">
          {PLANS.map((p, idx) => (
            <motion.div key={p.name} variants={item} custom={idx} {...reveal} whileHover={{ y: -10 }}
              className={`relative flex flex-col rounded-3xl p-8 ${p.popular ? 'border border-gold-400/70 bg-gradient-to-b from-gold-500/15 to-night-800 shadow-[0_0_60px_rgba(212,168,74,0.2)]' : 'glass'}`}>
              {p.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-night-950">Most chosen</span>}
              <p className="eyebrow">{p.duration}</p>
              <h3 className="mt-3 font-display text-3xl font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-white/50">{p.sessions} private sessions</p>
              <p className="mt-6 font-display text-4xl font-semibold gold-text sm:text-5xl">{money(p.usd, cur)}</p>
              <ul className="my-8 flex-1 space-y-3">
                {p.feats.map((f) => <li key={f} className="flex items-start gap-3 text-sm text-white/75"><Check size={16} className="mt-0.5 shrink-0 text-gold-400" />{f}</li>)}
              </ul>
              <div className='flex justify-center'>
                <a href={wa(`Hello fourfourfour spirituality, I would like to join the ${p.name} mentorship (${p.sessions} sessions / ${p.duration} — ${money(p.usd, cur)}).`)} target="_blank" rel="noreferrer" className={p.popular ? 'btn-gold' : 'btn-ghost'}>Start {p.name}</a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="glass mx-auto mt-14 flex max-w-4xl flex-col items-center justify-between gap-6 rounded-3xl p-8 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="eyebrow">Single session</p>
            <h3 className="mt-2 font-display text-3xl font-semibold">Full Spiritual Reading <span className="gold-text">{money(44, cur)}</span></h3>
            <p className="mt-2 text-sm text-white/60">Love, career, family, protection, purpose ask what your spirit needs answered.</p>
          </div>
          <div className='flex justify-center'>
            <a href={wa('Hello fourfourfour spirituality, I would like to book a full spiritual reading ($44).')} target="_blank" rel="noreferrer" className="btn-gold shrink-0"><MessageCircle size={18} /> Book now</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- ABOUT MR JOSHUA ---------- */
function About() {
  // To show Mr Joshua's own portrait, save it as public/images/mr-joshua.jpg
  const [src, setSrc] = useState(img('mr-joshua.jpg'))
  return (
    <section id="about" className="relative overflow-hidden bg-night-950 py-16 md:py-28">
      <div className="absolute -right-40 top-10 h-96 w-96 rounded-full bg-mystic-600/20 blur-[130px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-gold-500/40 via-mystic-600/20 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-gold-500/30 p-2">
            <img src={src} onError={() => setSrc(img('eye-of-horus.jpg'))} alt="Mr Joshua, seer and spiritual advisor" className="aspect-[4/5] w-full rounded-[2rem] object-cover" />
          </div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="glass absolute -bottom-6 -right-2 rounded-2xl px-5 py-4 sm:-right-6">
            <p className="font-display text-3xl font-semibold gold-text">444</p>
            <p className="text-xs text-white/60">Protection · Foundation · Guidance</p>
          </motion.div>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          <motion.p variants={fade} className="eyebrow mb-4">About the seer</motion.p>
          <motion.h2 variants={fade} className="font-display text-4xl font-semibold leading-tight sm:text-5xl">Mr <span className="gold-text italic">Joshua God Uwadiale</span></motion.h2>
          <motion.p variants={fade} className="mt-3 text-sm uppercase tracking-[0.25em] text-white/50">Seer · Spiritual Advisor · Intuitive Reader</motion.p>
          <motion.p variants={fade} className="mt-7 leading-relaxed text-white/70">
            Mr Joshua God Uwadiale is a seer, soul Awakener and the spiritual advisor behind 444 spirituality. As an intuitive reader, he helps people see what is happening beneath the surface of their lives in love, in family, in money, in purpose and what to do about it.
          </motion.p>
          <motion.p variants={fade} className="mt-4 leading-relaxed text-white/70">
            His work moves in five directions: honest spiritual readings, soul awakening, love spiritual work, consecrated good luck beads and talismans for protection and prosperity, and long-term one-on-one mentorship for those ready to awaken their gifts and walk a more protected, purposeful path.
          </motion.p>
          <motion.p variants={fade} className="mt-4 leading-relaxed text-white/70">
            The name <em className="font-display text-lg text-gold-300">444</em> comes from the angel number 444 a sign of protection, solid foundations and divine support. That is what every reading, every talisman and every session is meant to give you.
          </motion.p>

          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            {[[Eye, 'Clear sight', 'Direct, honest readings'], [Sparkles, 'Soul awakening', 'Rise into your true purpose'], [ShieldCheck, 'Protection', 'Consecrated talismans'], [Feather, 'Guidance', 'Mentorship that lasts']].map(([Icon, t, d], idx) => (
              <motion.div key={t} variants={item} custom={idx} {...reveal} className="glass rounded-2xl p-4">
                <Icon size={20} className="mb-3 text-gold-400" />
                <p className="font-display text-xl font-semibold">{t}</p>
                <p className="mt-1 text-xs text-white/55">{d}</p>
              </motion.div>
            ))}

          </div>

          <motion.div variants={fade} className="mt-10 flex flex-wrap gap-4">
            <a href={wa('Hello Mr Joshua, I would like to speak with you about a reading.')} target="_blank" rel="noreferrer" className="btn-gold"><MessageCircle size={16} /> Speak with Mr Joshua</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- TESTIMONIALS ---------- */
function Testimonials() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = TESTIMONIALS.length
  useEffect(() => {
    if (paused || n < 2) return
    const t = setInterval(() => setI((v) => (v + 1) % n), 6000)
    return () => clearInterval(t)
  }, [paused, n])
  if (!n) return null
  const t = TESTIMONIALS[i]
  return (
    <section id="reviews" className="scroll-mt-24 relative overflow-hidden bg-night-900 py-12 md:py-28">
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/10 blur-[130px]" />
      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHead eyebrow="Kind words" title="What clients say" />
        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="glass relative rounded-[2rem] p-8 sm:p-14">
          <Quote size={44} className="absolute left-6 top-6 text-gold-500/30" />
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }} className="relative text-center">
              <div className="mb-6 flex justify-center gap-1 text-gold-400">{Array.from({ length: 5 }).map((_, k) => <Star key={k} size={18} fill="currentColor" />)}</div>
              <p className="font-display text-2xl italic leading-relaxed sm:text-3xl">“{t.text}”</p>
              <p className="mt-8 font-medium text-gold-300">{t.name}<span className="text-white/45"> · {t.place}</span></p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/40">{t.service}</p>
              {t.client && <span className="mt-4 inline-block rounded-full border border-white/20 px-3 py-1 text-[10px] uppercase tracking-widest text-white/50">Client</span>}
            </motion.div>
          </AnimatePresence>
        </div>
        {n > 1 && (
          <div className="mt-8 flex items-center justify-center gap-5">
            <button onClick={() => setI((i - 1 + n) % n)} aria-label="Previous review" className="grid h-10 w-10 place-items-center rounded-full border border-white/20 transition hover:border-gold-400 hover:text-gold-400"><ChevronLeft size={18} /></button>
            <div className="flex gap-2">{TESTIMONIALS.map((_, k) => <button key={k} onClick={() => setI(k)} aria-label={`Review ${k + 1}`} className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? 'w-8 bg-gold-400' : 'w-3 bg-white/25'}`} />)}</div>
            <button onClick={() => setI((i + 1) % n)} aria-label="Next review" className="grid h-10 w-10 place-items-center rounded-full border border-white/20 transition hover:border-gold-400 hover:text-gold-400"><ChevronRight size={18} /></button>
          </div>
        )}
        <p className="mt-10 text-center text-sm text-white/50">Had a reading or ordered a talisman? <a href={wa('Hello 444 spirituality, I would like to share my testimony.')} target="_blank" rel="noreferrer" className="text-gold-300 underline-offset-4 hover:underline">Share your experience on WhatsApp</a></p>
      </div>
    </section>
  )
}

/* ---------- HOW IT WORKS ---------- */
function How() {
  return (
    <section id="how" className="scroll-mt-24 bg-night-900 py-12 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead eyebrow="Simple & private" title="How it works" />
        <div className="grid gap-10 md:grid-cols-3">
          {STEPS.map((s, idx) => (
            <motion.div key={s.n} variants={item} custom={idx} {...reveal} className="relative text-center">
              <div className="font-display text-7xl font-semibold text-gold-500/25">{s.n}</div>
              <h3 className="-mt-4 font-display text-2xl font-semibold">{s.t}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm text-white/60">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- CTA + FOOTER ---------- */
function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-12 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#2a1a6b_0%,#07051a_70%)]" />
      <Stars />
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative mx-auto max-w-3xl px-5 text-center">

        <motion.div variants={fade} className="mx-auto mb-6 h-16 w-16 overflow-hidden rounded-full border border-gold-500/50">
          <img src="/eye1.jpeg" alt="444 Spirituality" className="h-full w-full object-cover" />
        </motion.div>

        <motion.h2 variants={fade} className="font-display text-4xl font-semibold leading-tight sm:text-6xl">The signs are already <span className="gold-text italic">calling you.</span></motion.h2>
        <motion.p variants={fade} className="mx-auto mt-6 max-w-xl text-white/65">Angel number 444 stands for protection, foundation and divine support. Take the next step message us on WhatsApp today.</motion.p>
        <motion.div variants={fade} className="mt-6 md:mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href={wa('Hello 444 spirituality, I would like to book a full spiritual reading ($44).')} target="_blank" rel="noreferrer" className="btn-gold !px-9 !py-4 text-base"> Know It</a>
        </motion.div>

      </motion.div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-night-950 py-10">
      <div className="mx-auto max-w-7xl px-5 text-center sm:px-8">
        <p className="font-display text-xl">444 <span className="text-gold-400">spirituality</span></p>
        <p className="mx-auto mt-4 max-w-2xl text-xs leading-relaxed text-white/40">
          Our services are offered for spiritual restoration, soul awakening and spiritual guidance. They are not a substitute for professional medical, mental-health or financial advice.
        </p>
        <p className="mt-5 text-xs text-white/30">© {new Date().getFullYear()} 444 spirituality. All rights reserved.</p>
      </div>
    </footer>
  )
}

function WhatsAppFab() {
  return (
    <a href={wa('Hello 444 spirituality, I would like to make an enquiry.')} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.5)] transition hover:scale-110">
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulseRing" />
      <FaWhatsapp className="relative" size={22} />
    </a>
  )
}

function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-gold-500 via-gold-300 to-mystic-400" />
}

export default function App() {
  const [cur, setCur] = useState(() => {
    try { return localStorage.getItem('fff-cur') || 'GBP' } catch { return 'GBP' }
  })
  const set = (c) => { setCur(c); try { localStorage.setItem('fff-cur', c) } catch { /* ignore */ } }
  return (
    <CurrencyCtx.Provider value={{ cur, setCur: set }}>
      <ProgressBar />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Feature />
        <Shop />
        <Gallery />
        <Mentorship />
        <Testimonials />
        <How />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFab />
    </CurrencyCtx.Provider>
  )
}
