import { ArrowRight, CalendarDays } from 'lucide-react'
import { events } from '../data/events'
import Eyebrow from '../components/ui/Eyebrow'
import Lines from '../components/ui/Lines'
// import Media from '../components/ui/Media'
import { scrollToId } from '../utils/scroll'

const fmt = (iso: string, placeholder?: boolean) => {
  if (placeholder) return { day: '00', mon: 'Month 20XX' }
  const d = new Date(iso)
  return { day: d.toLocaleDateString('en-IN', { day: '2-digit' }), mon: d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) }
}
const enquire = (e: React.MouseEvent) => { e.preventDefault(); scrollToId('contact') }

export default function PerformancesSection() {
  return (
    <section id="performances" className="relative overflow-hidden bg-ivory px-6 py-28 md:px-12 md:py-40">
      <div className="pointer-events-none absolute -right-48 top-8 aspect-square w-[44rem] rounded-full border border-gold/30" aria-hidden />
      <div className="pointer-events-none absolute -right-24 top-32 aspect-square w-[30rem] rounded-full border border-gold/30" aria-hidden />
      <div className="relative mx-auto max-w-[1500px]">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>Live</Eyebrow>
            <Lines as="h2" lines={['Performances &', 'appearances']} accentLast className="display mt-8 text-[clamp(3rem,7vw,6.5rem)]" />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="font-light leading-loose text-charcoal/70">Confirmed concerts, festivals and appearances. Only verified engagements are listed.</p>
            <a href="#contact" onClick={enquire} className="label group mt-8 inline-flex items-center gap-5 border-b border-maroon pb-3 text-maroon hover:border-gold hover:text-bronze">
              Live-performance enquiries <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="mt-20 flex flex-col items-center rounded-md border border-charcoal/15 bg-sand/30 px-6 py-20 text-center">
            <CalendarDays className="text-maroon" size={28} aria-hidden />
            <p className="mt-6 font-serif text-3xl font-light italic md:text-5xl">No dates announced yet.</p>
            <p className="mt-4 max-w-md text-charcoal/60">New dates will appear here as soon as they’re confirmed.</p>
          </div>
        ) : (
          <ul className="mt-20 border-b border-charcoal/15">
            {events.map((e) => {
              const { day, mon } = fmt(e.date, e.placeholder)
              return (
                <li key={e.id} className="group relative grid items-center gap-5 border-t border-charcoal/15 py-8 transition-colors hover:bg-sand/40 md:grid-cols-[9rem_1fr_6.5rem_11rem] md:gap-10 md:px-4">
                  <span className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-700 group-hover:scale-x-100" aria-hidden />
                  <div>
                    <p className="font-serif text-6xl font-light leading-none transition-colors group-hover:text-bronze">{day}</p>
                    <p className="label mt-2 text-charcoal/60">{mon}</p>
                  </div>
                  <div>
                    <h3 className="font-serif text-3xl font-light md:text-4xl">{e.title}</h3>
                    <p className="mt-2 text-charcoal/60">{[e.venue, e.city, e.time].filter(Boolean).join(' · ')}</p>
                    {e.placeholder && <p className="label mt-3 text-[0.6rem] text-maroon/70">Placeholder — replace in data/events.ts</p>}
                  </div>
                  {/* <div className="hidden aspect-[4/5] overflow-hidden rounded-sm md:block"><Media src={e.poster} alt={`${e.title} poster`} label="Poster" tone="sand" /></div> */}
                  <div className="hidden aspect-[4/5] overflow-hidden rounded-sm md:block">
  {e.poster ? (
    <img
      src={e.poster}
      alt={`${e.title} poster`}
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      loading="lazy"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-sand/50">
      <CalendarDays size={28} className="text-maroon/40" />
    </div>
  )}
</div>
                  <div className="md:text-right">
                    {e.ticketUrl
                      ? <a href={e.ticketUrl} target="_blank" rel="noopener noreferrer" className="btn border border-maroon text-maroon hover:bg-maroon hover:text-ivory">Tickets</a>
                      : <span className="label text-charcoal/40">Details soon</span>}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
