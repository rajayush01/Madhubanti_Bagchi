import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { artist } from '../data/artist'
import Eyebrow from '../components/ui/Eyebrow'
import Lines from '../components/ui/Lines'
import Media from '../components/ui/Media'
import { scrollToId } from '../utils/scroll'

export default function AboutSection() {
  const { intro } = artist
  const reduce = useReducedMotion()
  const collage = useRef<HTMLDivElement>(null)
  const { scrollYProgress: p } = useScroll({ target: collage, offset: ['start end', 'end start'] })
  const yA = useTransform(p, [0, 1], [40, -40])
  const yB = useTransform(p, [0, 1], [20, -20])
  const yC = useTransform(p, [0, 1], [-30, 50])

  const cards = [
    { cls: 'left-0 top-0 z-10 h-[52%] w-[36%]', y: yA, tone: 'maroon', delay: 0.1 },
    { cls: 'left-[24%] top-[19%] z-20 h-[74%] w-[52%]', y: yB, tone: 'sand', delay: 0 },
    { cls: 'right-0 top-[5%] z-10 h-[56%] w-[36%]', y: yC, tone: 'charcoal', delay: 0.2 },
  ] as const

  return (
    <section id="about" className="relative overflow-hidden bg-ivory text-ink">
      <div className="mx-auto grid max-w-[1500px] items-center gap-16 px-6 pb-28 md:px-12 md:pb-40 lg:grid-cols-12 lg:gap-8 mt-10">
        <div className="lg:col-span-5">
          <Eyebrow>The Artist</Eyebrow>
          <Lines as="h2" lines={['A journey', 'shaped by music.']} accentLast className="display mt-8 text-[clamp(3rem,7vw,6rem)]" />
          <div className="mt-10 max-w-xl space-y-4 text-lg font-light leading-loose text-charcoal/70">
            {intro.body.map((t) => <p key={t}>{t}</p>)}
          </div>
          <a
            href="#journey" onClick={(e) => { e.preventDefault(); scrollToId('journey') }}
            className="label group mt-12 inline-flex items-center gap-6 border-b border-ink pb-4 text-ink transition-colors hover:border-gold hover:text-bronze"
          >
            Discover Her Story <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden />
          </a>
          <div className="mt-16 flex items-start gap-5">
            <span className="font-serif text-3xl leading-none text-bronze" aria-hidden>M</span>
            <p className="label leading-8 text-charcoal/50">
              {artist.descriptor.split(' · ').map((d) => <span key={d} className="block">{d}.</span>)}
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div ref={collage} className="relative mx-auto aspect-[1/1.05] w-full max-w-[760px]">
            {cards.map((c, i) => (
              <motion.div key={i} style={{ y: reduce ? 0 : c.y }} className={`absolute ${c.cls}`}>
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: c.delay }}
                  className="h-full w-full overflow-hidden rounded-md shadow-[0_24px_60px_-20px_rgba(16,16,18,0.45)]"
                >
                  <Media src={intro.collage[i]} alt={`Portrait ${i + 1} of Madhubanti Bagchi`} label="Portrait — replace in data/artist.ts" tone={c.tone} />
                </motion.div>
              </motion.div>
            ))}
            <div className="absolute bottom-0 right-[2%] z-30 flex aspect-square w-[20%] items-center justify-center rounded-full bg-ivory shadow-lg ring-1 ring-gold/40" aria-hidden>
              <span className="absolute inset-[7%] rounded-full border border-gold/30" />
              <span className="font-serif text-2xl text-bronze md:text-4xl">MB</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
