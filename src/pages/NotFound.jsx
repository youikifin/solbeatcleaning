import { Link } from 'react-router-dom'
import { Reveal } from '../components/motion-helpers.jsx'
import { Sticker } from '../components/Paper.jsx'

export default function NotFound() {
  return (
    <section className="section" aria-labelledby="nf-heading">
      <div
        className="wrap"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 22,
          paddingBlock: '8vh',
        }}
      >
        <Reveal>
          <Sticker tone="terra" rotate={-8}>swept away</Sticker>
        </Reveal>
        <Reveal as="h1" className="h-xl" delay={0.08} id="nf-heading">
          This page got tidied out of existence
        </Reveal>
        <Reveal as="p" className="lede" delay={0.14}>
          Whatever was here has been dusted, boxed, and hauled off. Let&rsquo;s get you
          back somewhere useful.
        </Reveal>
        <Reveal delay={0.2}>
          <Link to="/" className="btn">Back to the homepage</Link>
        </Reveal>
      </div>
    </section>
  )
}
