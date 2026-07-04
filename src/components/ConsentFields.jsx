import { Link } from 'react-router-dom'
import './forms.css'

/**
 * GDPR consent checkboxes shared by the site's forms.
 * - Marketing consent is OPTIONAL and never pre-ticked.
 * - Privacy/Terms agreement is REQUIRED; forms must refuse to submit
 *   without it (validated by the parent form, error passed in here).
 * - `marketing: null` hides the marketing checkbox (used by the
 *   newsletter form, where joining the list IS the marketing consent).
 */
export default function ConsentFields({
  idPrefix,
  marketing,
  onMarketing,
  privacy,
  onPrivacy,
  error,
}) {
  const errId = `${idPrefix}-privacy-err`
  return (
    <fieldset className="consent">
      <legend className="visually-hidden">Consent</legend>

      {marketing !== null && (
        <label className="consent-row" htmlFor={`${idPrefix}-marketing`}>
          <input
            type="checkbox"
            id={`${idPrefix}-marketing`}
            checked={marketing}
            onChange={(e) => onMarketing(e.target.checked)}
          />
          <span>
            I agree to receive marketing emails and promotional updates from
            solbeatcleaning. I can unsubscribe at any time.
          </span>
        </label>
      )}

      <label className="consent-row" htmlFor={`${idPrefix}-privacy`}>
        <input
          type="checkbox"
          id={`${idPrefix}-privacy`}
          checked={privacy}
          onChange={(e) => onPrivacy(e.target.checked)}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errId : undefined}
        />
        <span>
          I have read and agree to the <Link to="/privacy">Privacy Policy</Link> and{' '}
          <Link to="/terms">Terms &amp; Conditions</Link>. *
        </span>
      </label>

      {error && (
        <p className="field-error" id={errId}>
          {error}
        </p>
      )}
    </fieldset>
  )
}
