import { artist } from '../data/artist'
import Eyebrow from '../components/ui/Eyebrow'
import Lines from '../components/ui/Lines'
import ContactForm from '../components/contact/ContactForm'

const kinds = [
  ['Professional', 'Brand, film and music-industry enquiries.'],
  ['Live performance', 'Concerts, festivals and private events.'],
  ['Music & collaboration', 'Sessions, features and creative projects.'],
  ['Press', 'Interviews, features and media requests.'],
]

export default function ContactSection() {
  const { contact } = artist
  return (
    <section id="contact" className="bg-sand/40 px-6 py-28 text-ink md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Eyebrow>Contact</Eyebrow>
          <Lines as="h2" lines={['Let’s create', 'something', 'memorable.']} accentLast className="display mt-8 text-5xl md:text-8xl" />
          <dl className="mt-14 grid max-w-xl gap-6 sm:grid-cols-2">
            {kinds.map(([t, d]) => (
              <div key={t}><dt className="label text-maroon">{t}</dt><dd className="mt-2 text-sm text-charcoal/70">{d}</dd></div>
            ))}
          </dl>
          <p className="mt-12 text-charcoal/70">
            {contact.management || contact.email
              ? [contact.management, contact.email && <a key="e" className="underline" href={`mailto:${contact.email}`}>{contact.email}</a>]
              : 'Official management details will appear here once supplied.'}
          </p>
        </div>
        <div className="relative rounded-md bg-ivory p-8 shadow-[0_24px_60px_-24px_rgba(16,16,18,0.3)] md:p-12 lg:col-span-5 lg:col-start-8"><ContactForm /></div>
      </div>
    </section>
  )
}
