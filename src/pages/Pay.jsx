import PageHero from '../components/PageHero.jsx'
import PayNow from '../components/PayNow.jsx'
import { faq } from '../content/content.js'
import { Reveal } from '../components/motion-helpers.jsx'

export default function Pay() {
  const payFaq = faq.find((f) => f.q === 'How do I pay?')
  return (
    <>
      <PageHero
        tone="gold"
        eyebrow="Payments"
        title={
          <>
            Settling up should be the <span className="serif-i">easy</span> part
          </>
        }
        lede={payFaq ? `${payFaq.q} ${payFaq.a}` : undefined}
      />
      <PayNow compact />
      <section className="section section--tight" aria-label="Payment note">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <Reveal as="p" className="lede">
            Card payments are processed by Stripe on a secure, Stripe-hosted page — we
            never see or store your card details. You&rsquo;ll get an emailed receipt the
            moment the payment goes through.
          </Reveal>
        </div>
      </section>
    </>
  )
}
