import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import { Reveal } from '../components/motion-helpers.jsx'
import './legal.css'

export default function Terms() {
  return (
    <>
      <PageHero
        tone="gold"
        eyebrow="The fine print"
        title={
          <>
            Terms, without the <span className="serif-i">tangle</span>
          </>
        }
        lede="The agreement between you and SolBeat Cleaning when you use this website or book our services — written to be actually read."
      />

      <section className="section section--tight">
        <div className="wrap legal">
          <Reveal as="p" className="legal-updated" y={14}>
            Last updated: July 3, 2026
          </Reveal>

          <Reveal as="div" className="legal-block" y={18}>
            <h2>Who you&rsquo;re dealing with</h2>
            <p>
              These terms are an agreement between you and SOLBEATCLEANING INC
              (&ldquo;SolBeat Cleaning&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), a
              Canadian company operated by Beatrice Akinleye at 300 First St, Steinbach,
              MB R5G 0T6. By using <strong>solbeatcleaning.online</strong> or booking our
              services, you agree to them.
            </p>
          </Reveal>

          <Reveal as="div" className="legal-block" y={18}>
            <h2>Estimates and services</h2>
            <p>
              Estimates are free and provided in writing. The written estimate defines
              the scope of work and the price — if you&rsquo;d like something outside
              that scope, just ask and we&rsquo;ll quote it before doing it. We bring our
              own supplies and equipment; your preferred products are used on request.
            </p>
          </Reveal>

          <Reveal as="div" className="legal-block" y={18}>
            <h2>Payment</h2>
            <p>
              Payment is due after your service unless you&rsquo;re on a recurring plan.
              We accept cash, credit/debit, and e-transfer, and online card payment
              through Stripe&rsquo;s secure checkout in the amount of your written
              estimate.
            </p>
          </Reveal>

          <Reveal as="div" className="legal-block" y={18}>
            <h2>Our guarantee — including your money back</h2>
            <p>
              If anything about your clean isn&rsquo;t right, report it within{' '}
              <strong>24 hours</strong> and we&rsquo;ll correct it at no extra charge.
              If, after we&rsquo;ve had that chance to make it right, you&rsquo;re still
              not satisfied, we&rsquo;ll refund what you paid for the affected service.
              We&rsquo;d rather lose an invoice than your trust.
            </p>
          </Reveal>

          <Reveal as="div" className="legal-block" y={18}>
            <h2>Prepaid services and consulting sessions</h2>
            <p>
              Any prepaid service or consulting session must be booked within{' '}
              <strong>12 months of purchase</strong>. After 12 months, unredeemed
              purchases expire and are non-refundable, except where the law says
              otherwise.
            </p>
          </Reveal>

          <Reveal as="div" className="legal-block" y={18}>
            <h2>Access, safety, and insurance</h2>
            <p>
              We are background-checked, trained, and insured. If you won&rsquo;t be home
              or on site, you can provide secure entry instructions; the property is
              locked up after the clean. If you believe something was damaged during a
              service, tell us within 24 hours so it can be put right under the guarantee
              above.
            </p>
          </Reveal>

          <Reveal as="div" className="legal-block" y={18}>
            <h2>Scheduling changes</h2>
            <p>
              Life happens — if you need to cancel or reschedule, give us as much notice
              as you can by phone at +1 (204) 381-8505 and we&rsquo;ll find a new time
              that works.
            </p>
          </Reveal>

          <Reveal as="div" className="legal-block" y={18}>
            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws of the Province of Manitoba and the
              federal laws of Canada that apply there. Any dispute will be handled in the
              courts of Manitoba, Canada.
            </p>
          </Reveal>

          <Reveal as="div" className="legal-block" y={18}>
            <h2>Questions</h2>
            <p>
              Email{' '}
              <a href="mailto:beatrice@solbeatcleaning.com">beatrice@solbeatcleaning.com</a>{' '}
              or call +1 (204) 381-8505. Our <Link to="/privacy">Privacy Policy</Link>{' '}
              explains how we handle your information.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
