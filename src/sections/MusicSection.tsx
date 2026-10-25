import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { artist } from '../data/artist'
import { tracks } from '../data/music'
import Eyebrow from '../components/ui/Eyebrow'
import Lines from '../components/ui/Lines'
import Media from '../components/ui/Media'
import AudioPreview from '../components/music/AudioPreview'
import TrackMeta from '../components/music/TrackMeta'

// Coverflow positions by distance from the active card: x offset (% of card width), scale, tilt, opacity.
const cfg = [{ x: 0, s: 1, r: 0, o: 1 }, { x: 58, s: 0.86, r: 1.8, o: 1 }, { x: 98, s: 0.74, r: 2.4, o: 0.95 }]

export default function MusicSection() {
  const n = tracks.length
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hover, setHover] = useState(false)
  const reduce = useReducedMotion()
  const root = useRef<HTMLElement>(null)
  const inView = useInView(root, { amount: 0.35 })

  // Autoplay: only while visible, never while hovered/focused, paused by the user, or a preview is playing.
  useEffect(() => {
    if (reduce || paused || hover || !inView || n < 2) return
    const id = setInterval(() => {
      if (Array.from(document.querySelectorAll('audio')).some((a) => !a.paused)) return
      setI((v) => (v + 1) % n)
    }, 4500)
    return () => clearInterval(id)
  }, [reduce, paused, hover, inView, n])

  if (n === 0) return null
  const go = (d: number) => setI((v) => (v + d + n) % n)
  const dist = (idx: number) => { let d = (((idx - i) % n) + n) % n; if (d > n - d) d -= n; return d }
  const span = Math.min(2, Math.floor((n - 1) / 2))
  const active = tracks[i]
  const more = artist.streaming[0]
  const pill = 'btn rounded-full border border-ink/40 px-14 text-ink'

  return (
    <section
      ref={root} id="music" aria-roledescription="carousel" aria-label="The music"
      className="bg-sand/40 px-6 py-16 md:py-20"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)} onBlur={() => setHover(false)}
      onKeyDown={(e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }}
    >
      <div className="mx-auto max-w-[1500px] text-center">
        <Eyebrow className="justify-center">Selected works</Eyebrow>
        <Lines as="h2" lines={['Latest Releases']} className="display mt-6 text-6xl md:text-8xl" />

        <div className=" overflow-hidden py-10">
          <div className="relative mx-auto h-[min(72vw,420px)]">
            {tracks.map((t, idx) => {
              const d = dist(idx)
              const c = cfg[Math.min(Math.abs(d), 2)]
              const sign = d < 0 ? -1 : 1
              const show = Math.abs(d) <= span
              return (
                <motion.button
                  key={t.id} type="button" tabIndex={-1} onClick={() => setI(idx)}
                  aria-label={`${t.title}, ${idx + 1} of ${n}`} aria-hidden={!show}
                  initial={false}
                  animate={{ x: `${sign * c.x}%`, scale: c.s, rotate: sign * c.r, opacity: show ? c.o : 0 }}
                  transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 110, damping: 20 }}
                  style={{ zIndex: 10 - Math.abs(d) }}
                  className={`absolute inset-x-0 top-0 mx-auto aspect-square w-[min(72vw,420px)] overflow-hidden rounded-2xl border-4 border-ivory shadow-[0_24px_60px_-20px_rgba(16,16,18,0.45)] ${show ? '' : 'pointer-events-none'}`}
                >
                  <Media src={t.artwork} alt="" label="Artwork placeholder" tone="maroon" />
                  <span className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent p-5 text-left text-ivory transition-opacity duration-500 ${d === 0 ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="block font-serif text-2xl">{t.title}</span>
                    <span className="label mt-1 block text-[0.6rem] opacity-80">{[t.source, t.language].join(' · ')}</span>
                  </span>
                </motion.button>
              )
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 sm:gap-4">
          <button onClick={() => go(-1)} aria-label="Previous track" className="flex h-11 w-11 items-center justify-center text-ink hover:text-maroon"><ChevronLeft size={22} /></button>
          <div className="flex items-center">
            {tracks.map((t, idx) => (
              <button key={t.id} onClick={() => setI(idx)} aria-label={`Show track ${idx + 1}`} aria-current={idx === i} className="flex h-9 w-9 items-center justify-center sm:h-10 sm:w-10">
                <span className={`h-3.5 w-3.5 rounded-full transition-colors duration-300 ${idx === i ? 'bg-ink' : 'bg-ink/15'}`} />
              </button>
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next track" className="flex h-11 w-11 items-center justify-center text-ink hover:text-maroon"><ChevronRight size={22} /></button>
          {!reduce && (
            <button onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Resume autoplay' : 'Pause autoplay'} className="ml-2 flex h-11 w-11 items-center justify-center text-ink/60 hover:text-maroon">
              {paused ? <Play size={16} /> : <Pause size={16} />}
            </button>
          )}
        </div>

        <div aria-live="polite" className="mx-auto mt-10 max-w-md">
          <div className="text-2xl md:text-3xl"><TrackMeta t={active} center /></div>
          {active.previewUrl && <div key={active.id} className="mt-5"><AudioPreview src={active.previewUrl} title={active.title} /></div>}
        </div>

        <div className="mt-10">
          {more
            ? <a href={more.href} target="_blank" rel="noopener noreferrer" className={`${pill} hover:bg-ink hover:text-ivory`}>View more</a>
            : <button type="button" disabled title="Add an official streaming link in data/artist.ts" className={`${pill} cursor-not-allowed opacity-50`}>View more</button>}
        </div>
      </div>
    </section>
  )
}
