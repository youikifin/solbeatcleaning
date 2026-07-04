import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import { Reveal } from '../components/motion-helpers.jsx'
import './legal.css'

export default function Privacy() {
  return (
    <>
      <PageHero
        tone="sage"
        eyebrow="The fine print"
        title={
          <>
            Privacy, <span className="serif-i">plainly</span> put
          </>
        }
        lede="What we collect, why we collect it, where it lives, and how to make us change or delete it. No legalese where plain words will do."
      />

      <section className="section section--tight">
        <div className="wrap legal">
          <Reveal as="p" className="legal-updated" y={14}>
            Last updated: July 3, 2026
          </Reveal>

          <Reveal as="div" className="legal-block" y={18}>
            <h2>Who we are</h2>
            <p>
              SOLBEATCLEANING INC (&ldquo;SolBeat Cleaning&rdquo;, &ldquo;we&rdquo;,
              &ldquo;us&rdquo;) is a Canadian company founded and operated by Beatrice
              Akinleye, based at 300 First St, Steinbach, MB R5G 0T6, Canada. This policy
              covers our website, <strong>solbeatcleaning.online</strong>, and the forms
              on it. For anything privacy-related, email{' '}
              <a href="mailto:beatrice@solbeatcleaning.online">beatrice@solbeatcleaning.online</a>.
            </p>
          </Reveal>

          <Reveal as="div" className="legal-block" y={18}>
            <h2>What we collect, and why</h2>
            <ul>
              <li>
                <strong>Newsletter signup</strong> — your first name and email address, so
                we can send you the SolBeat newsletter you asked for.
              </li>
              <li>
                <strong>Seasonal Deep-Clean Guide download</strong> — your email address,
                so we can send you the guide. When signing up you can{' '}
                <em>optionally</em> consent to receive marketing emails and promotional
                updates from SolBeat Cleaning; if you do, you are also subscribed to the
                SolBeat newsletter. If you leave that box unticked, you get the guide and
                nothing else.
              </li>
              <li>
                <strong>Contact / estimate form</strong> — your name, email, phone
                (optional), service type, and message. These submissions are saved so we
                can follow up with you about your estimate and booking.
              </li>
              <li>
                <strong>Payments</strong> — payment information is processed by Stripe.
                We never see or store your card details ourselves (see below).
              </li>
            </ul>
            <p>
              We collect nothing else, and we never sell, rent, or trade your information
              to anyone.
            </p>
          </Reveal>

          <Reveal as="div" className="legal-block" y={18}>
            <h2>Where your data is stored</h2>
            <p>
              Form submissions and signups are stored in <strong>Supabase</strong>, a
              secure hosted database service, with access restricted to us. Emails we
              send are delivered through our email provider using the address you gave
              us. We keep your information only as long as it is needed for the purposes
              above, or until you ask us to delete it.
            </p>
          </Reveal>

          <Reveal as="div" className="legal-block" y={18}>
            <h2>Email marketing and how to unsubscribe</h2>
            <p>
              We only send marketing emails or the newsletter if you explicitly opted in
              — the consent boxes on our forms are never pre-ticked. You can withdraw
              that consent at any time by clicking the unsubscribe link in any email we
              send, or by emailing{' '}
              <a href="mailto:beatrice@solbeatcleaning.online">beatrice@solbeatcleaning.online</a>.
              Unsubscribing stops all marketing; it does not affect emails we must send
              about a service you booked (like confirming an appointment).
            </p>
          </Reveal>

          <Reveal as="div" className="legal-block" y={18}>
            <h2>Payments (Stripe)</h2>
            <p>
              Online card payments are handled entirely by{' '}
              <a href="https://stripe.com" target="_blank" rel="noreferrer">Stripe</a> on
              Stripe-hosted pages. Your card number never touches our website or our
              database. Stripe processes your payment data as an independent service
              provider under its own{' '}
              <a href="https://stripe.com/privacy" target="_blank" rel="noreferrer">
                privacy policy
              </a>.
            </p>
          </Reveal>

          <Reveal as="div" className="legal-block" y={18}>
            <h2>Cookies and analytics</h2>
            <p>
              On your first visit we ask whether you accept analytics tracking. Google
              Analytics is loaded <em>only if you accept</em> — if you decline, no
              analytics cookies are set at all. You can change your choice any time via
              the &ldquo;Cookie preferences&rdquo; link in the footer.
            </p>
          </Reveal>

          <Reveal as="div" className="legal-block" y={18}>
            <h2>Your rights</h2>
            <p>
              Under the GDPR (if it applies to you) and Canada&rsquo;s PIPEDA, you have
              the right to:
            </p>
            <ul>
              <li><strong>Access</strong> — ask for a copy of the personal data we hold about you.</li>
              <li><strong>Correction</strong> — ask us to fix anything that&rsquo;s inaccurate.</li>
              <li><strong>Deletion</strong> — ask us to erase your data from our records.</li>
              <li><strong>Withdraw consent</strong> — unsubscribe from marketing at any time.</li>
              <li><strong>Complain</strong> — raise a concern with your data protection authority.</li>
            </ul>
            <p>
              To exercise any of these, email{' '}
              <a href="mailto:beatrice@solbeatcleaning.online">beatrice@solbeatcleaning.online</a>{' '}
              — you&rsquo;ll get a response within 30 days, usually much sooner.
            </p>
          </Reveal>

          <Reveal as="div" className="legal-block" y={18}>
            <h2>Changes to this policy</h2>
            <p>
              If this policy changes, the new version will be posted here with an updated
              date. See also our{' '}
              <Link to="/terms">Terms &amp; Conditions</Link>.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
