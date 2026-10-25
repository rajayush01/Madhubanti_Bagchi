import { gallery } from '../../data/gallery'
import Media from '../ui/Media'

const width = { portrait: 'w-44 md:w-56', landscape: 'w-72 md:w-96', square: 'w-56 md:w-72' } as const
const tones = ['sand', 'maroon', 'ivory', 'charcoal'] as const

// Endless horizontal reel. Two identical lists; the track slides by exactly one list's width.
// Pauses on hover/focus; with reduced motion it becomes a normal swipeable row.
export default function ImageMarquee() {
  const list = (dup: boolean) => (
    <ul className="flex shrink-0" aria-hidden={dup || undefined}>
      {gallery.map((g, i) => (
        <li key={g.id} className={`mr-4 h-56 shrink-0 overflow-hidden md:h-72 ${width[g.ratio]}`}>
          <Media src={g.src} alt={dup ? '' : g.alt} label={g.caption} tone={tones[i % tones.length]} />
        </li>
      ))}
    </ul>
  )
  return (
    <section aria-label="Image reel" className="marquee overflow-hidden bg-ivory py-16 md:py-24">
      <div className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex">{list(false)}{list(true)}</div>
      </div>
    </section>
  )
}
