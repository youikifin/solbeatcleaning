import { Link } from 'react-router-dom'
import { blogPosts } from '../content/content.js'
import PageHero from '../components/PageHero.jsx'
import NewsletterSignup from '../components/NewsletterSignup.jsx'
import { Reveal } from '../components/motion-helpers.jsx'
import { Tape, PlaceholderPhoto } from '../components/Paper.jsx'
import './blog.css'

const tones = ['terracotta', 'sage', 'gold']

export default function Blog() {
  return (
    <>
      <PageHero
        tone="terra"
        eyebrow="The SolBeat notebook"
        title={
          <>
            Notes from a <span className="serif-i">very</span> tidy notebook
          </>
        }
        lede="Practical, no-filler cleaning guidance from Beatrice — checklists you can actually use, written for homes and businesses in southeastern Manitoba."
      />

      <section className="section section--tight" aria-label="Blog posts">
        <div className="wrap blog-grid">
          {blogPosts.map((post, i) => (
            <Reveal
              as="article"
              key={post.slug}
              className="blog-card"
              delay={i * 0.08}
              rotate={i % 2 ? 1 : -1}
            >
              <Link to={`/blog/${post.slug}`} className="blog-card-link">
                <div className="blog-card-photo photo" style={{ '--tilt': `${i % 2 ? 1.4 : -1.4}deg` }}>
                  <Tape tone={['terra', 'sage', 'gold'][i % 3]} angle={i % 2 ? 5 : -5} style={{ top: -12, left: '50%', marginLeft: -52 }} />
                  <PlaceholderPhoto
                    alt={post.photoLabel}
                    label={post.photoLabel.length > 34 ? post.photoLabel.split(' ').slice(0, 4).join(' ') : post.photoLabel}
                    tone={tones[i % 3]}
                    ratio={[3, 2]}
                  />
                </div>
                <div className="blog-card-body">
                  <p className="blog-card-meta">
                    <span className="blog-card-tag">{post.tag}</span>
                    {post.date} · {post.readTime}
                  </p>
                  <h2 className="h-lg blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <span className="blog-card-more">Read the post →</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <NewsletterSignup />
    </>
  )
}
