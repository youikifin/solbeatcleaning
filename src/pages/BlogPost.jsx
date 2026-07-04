import { Link, useParams } from 'react-router-dom'
import { blogPosts, business } from '../content/content.js'
import NotFound from './NotFound.jsx'
import LeadMagnet from '../components/LeadMagnet.jsx'
import { Reveal } from '../components/motion-helpers.jsx'
import { TornEdge, TapedPhoto, PlaceholderPhoto } from '../components/Paper.jsx'
import './blog.css'

function Block({ block }) {
  switch (block.t) {
    case 'h2':
      return <h2 className="h-lg post-h2">{block.c}</h2>
    case 'ul':
      return (
        <ul className="post-ul">
          {block.c.map((li, i) => (
            <li key={i}>{li}</li>
          ))}
        </ul>
      )
    case 'check':
      return (
        <ul className="post-check">
          {block.c.map((li, i) => (
            <li key={i}>{li}</li>
          ))}
        </ul>
      )
    default:
      return <p className="post-p">{block.c}</p>
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return <NotFound />

  return (
    <>
      <article>
        <header className="post-hero">
          <div className="wrap post-hero-inner">
            <Reveal as="p" className="post-meta" y={16}>
              <Link to="/blog" className="post-back">← All posts</Link>
              <span className="blog-card-tag">{post.tag}</span>
              {post.date} · {post.readTime}
            </Reveal>
            <Reveal as="h1" className="h-xl post-title" delay={0.08}>
              {post.title}
            </Reveal>
            <Reveal as="p" className="post-byline hand" delay={0.16}>
              by Beatrice Akinleye, {business.shortName} founder
            </Reveal>
          </div>
        </header>
        <TornEdge color="var(--paper)" bg="var(--paper-2)" />

        <div className="wrap post-layout section section--tight">
          <div className="post-body">
            {post.body.map((block, i) => (
              <Reveal key={i} delay={0.03} y={22}>
                <Block block={block} />
              </Reveal>
            ))}
            <Reveal className="post-cta pcard" y={24}>
              <p className="hand post-cta-hand">Rather hand this list to a professional?</p>
              <p>
                Estimates are free, and the checklist comes with me.{' '}
                <a href={business.phoneHref} className="post-cta-phone">{business.phone}</a>
              </p>
              <Link to="/contact" className="btn">Get a Free Estimate</Link>
            </Reveal>
          </div>
          <aside className="post-aside" aria-label="About the photo">
            <Reveal rotate={2}>
              <TapedPhoto tilt={2} caption={post.photoLabel} tapeTones={['gold', 'sage']}>
                <PlaceholderPhoto alt={post.photoLabel} label="from the notebook" tone="cream" ratio={[4, 5]} />
              </TapedPhoto>
            </Reveal>
          </aside>
        </div>
      </article>

      <LeadMagnet />
    </>
  )
}
