import { STRIPE_PAYMENT_LINK } from '../lib/api.js'
import { business } from '../content/content.js'
import { Reveal, Magnetic } from './motion-helpers.jsx'
import { Tape } from './Paper.jsx'
import './paynow.css'

/* "Pay Now" — a paper receipt taped to the page. The button opens a
   Stripe-hosted checkout (Payment Link) where the customer enters the
   amount from their written estimate. */
export default function PayNow({ compact = false }) {
  return (
    <section
      className={`section ${compact ? 'section--tight' : ''}`}
      aria-labelledby="paynow-heading"
    >
      <div className="wrap pay-grid">
        <Reveal className="pay-receipt" rotate={1}>
          <Tape tone="cream" angle={-4} style={{ top: -14, left: '50%', marginLeft: -50 }} />
          <div className="pay-receipt-inner" aria-hidden="true">
            <p className="pay-receipt-head">SOLBEAT CLEANING INC.</p>
            <p className="pay-receipt-sub">300 First St · Steinbach, MB</p>
            <div className="pay-receipt-rule" />
            <dl className="pay-receipt-lines">
              <div><dt>Your cleaning</dt><dd>as quoted</dd></div>
              <div><dt>Corners</dt><dd>cleaned</dd></div>
              <div><dt>Hidden fees</dt><dd>$0.00</dd></div>
            </dl>
            <div className="pay-receipt-rule" />
            <p className="pay-receipt-total"><span>TOTAL</span><span>your estimate</span></p>
            <p className="pay-receipt-thanks">— thank you kindly —</p>
          </div>
        </Reveal>

        <div className="pay-copy">
          <Reveal as="p" className="eyebrow" y={18}>Settle up, simply</Reveal>
          <Reveal as="h2" className="h-xl" delay={0.06} id="paynow-heading">
            Pay for your clean online
          </Reveal>
          <Reveal as="p" className="lede" delay={0.12}>
            Payment is due after your service unless you&rsquo;re on a recurring plan. Pay
            with cash, credit/debit, or e-transfer — or right here by card, in the
            amount from your written estimate, through Stripe&rsquo;s secure checkout.
          </Reveal>
          <Reveal delay={0.18} className="pay-actions">
            <Magnetic>
              <a
                className="btn btn--ink pay-btn"
                href={STRIPE_PAYMENT_LINK}
                target="_blank"
                rel="noreferrer"
              >
                Pay now with Stripe&nbsp;→
              </a>
            </Magnetic>
            <p className="pay-alt">
              Prefer e-transfer or cash? Call{' '}
              <a href={business.phoneHref} className="pay-alt-link">{business.phone}</a> and
              we&rsquo;ll sort it out.
            </p>
          </Reveal>
          <Reveal as="p" className="pay-fine" delay={0.22}>
            Not happy with something? Report it within 24 hours and it&rsquo;s corrected at
            no extra charge — before you pay a cent more.
          </Reveal>
        </div>
      </div>
    </section>
  )
}
