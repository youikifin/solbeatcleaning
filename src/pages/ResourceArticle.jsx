import { Link, useParams } from 'react-router-dom'
import { resources } from '../content/content.js'
import NotFound from './NotFound.jsx'
import NewsletterSignup from '../components/NewsletterSignup.jsx'
import { Reveal } from '../components/motion-helpers.jsx'
import { Sticker } from '../components/Paper.jsx'
import './blog.css'

/* Stub pages for the "Resources & guides" cards.
   TODO: write the full articles and replace the coming-soon note. */
export default function ResourceArticle() {
  const { slug } = useParams()
  const resource = resources.find((r) => r.slug === slug)
  if (!resource) return <NotFound />

  return (
    <>
      <article className="post-hero">
        <div className="wrap post-hero-inner">
          <Reveal as="p" className="post-meta" y={16}>
            <Link to="/blog" className="post-back">← Blog &amp; resources</Link>
            <span className="blog-card-tag">AI for small businesses</span>
          </Reveal>
          <Reveal as="h1" className="h-xl post-title" delay={0.08}>
            {resource.title}
          </Reveal>
          <Reveal as="p" className="lede" delay={0.14}>
            {resource.blurb}
          </Reveal>
          <Reveal delay={0.2}>
            <Sticker tone="sage" rotate={-6}>coming soon</Sticker>
          </Reveal>
          <Reveal as="p" className="lede" delay={0.24}>
            This guide is being written between cleans. Join the newsletter below and
            you&rsquo;ll be the first to know when it&rsquo;s published.
          </Reveal>
        </div>
      </article>
      <NewsletterSignup />
    </>
  )
}
