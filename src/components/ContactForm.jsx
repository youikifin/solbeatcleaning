import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { submitContactForm } from '../lib/api.js'
import { EASE } from './motion-helpers.jsx'
import './forms.css'

const EMAIL_RE = /^\S+@\S+\.\S+$/
const PHONE_RE = /^[+]?[\d\s().-]{7,}$/

const INITIAL = { name: '', email: '', phone: '', serviceType: '', message: '' }

export default function ContactForm() {
  const [data, setData] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const reduce = useReducedMotion()

  function set(field) {
    return (e) => setData({ ...data, [field]: e.target.value })
  }

  function validate() {
    const errs = {}
    if (data.name.trim().length < 2) errs.name = 'Please enter your name.'
    if (!EMAIL_RE.test(data.email)) errs.email = 'Please enter a valid email address.'
    if (data.phone.trim() && !PHONE_RE.test(data.phone.trim()))
      errs.phone = 'That phone number doesn’t look right.'
    if (!data.serviceType) errs.serviceType = 'Please choose residential or commercial.'
    if (data.message.trim().length < 10)
      errs.message = 'Tell us a little about the space — a sentence or two helps us quote accurately.'
    return errs
  }

  async function onSubmit(e) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) return
    setStatus('sending')
    try {
      await submitContactForm({
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        serviceType: data.serviceType,
        message: data.message.trim(),
      })
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <motion.div
        className="cf-done pcard"
        role="status"
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <p className="hand cf-done-hand">Got it, {data.name.trim()} — thank you!</p>
        <p>
          Your request is in Beatrice&rsquo;s inbox. You&rsquo;ll hear back with a free
          estimate soon — usually the same day, between 8&nbsp;AM and 6&nbsp;PM.
        </p>
        <p className="cf-done-alt">
          In a hurry? Call <a href="tel:+12043818505"><strong>+1 (204) 381-8505</strong></a>.
        </p>
      </motion.div>
    )
  }

  return (
    <form className="cf" onSubmit={onSubmit} noValidate aria-label="Request a free estimate">
      <div className="cf-row">
        <div className="field">
          <label htmlFor="cf-name">Name *</label>
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            value={data.name}
            onChange={set('name')}
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? 'cf-name-err' : undefined}
          />
          {errors.name && <p className="field-error" id="cf-name-err">{errors.name}</p>}
        </div>
        <div className="field">
          <label htmlFor="cf-email">Email *</label>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            value={data.email}
            onChange={set('email')}
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'cf-email-err' : undefined}
          />
          {errors.email && <p className="field-error" id="cf-email-err">{errors.email}</p>}
        </div>
      </div>

      <div className="cf-row">
        <div className="field">
          <label htmlFor="cf-phone">Phone (optional)</label>
          <input
            id="cf-phone"
            type="tel"
            autoComplete="tel"
            value={data.phone}
            onChange={set('phone')}
            aria-invalid={errors.phone ? 'true' : undefined}
            aria-describedby={errors.phone ? 'cf-phone-err' : undefined}
          />
          {errors.phone && <p className="field-error" id="cf-phone-err">{errors.phone}</p>}
        </div>
        <div className="field">
          <label htmlFor="cf-service">Service type *</label>
          <select
            id="cf-service"
            value={data.serviceType}
            onChange={set('serviceType')}
            aria-invalid={errors.serviceType ? 'true' : undefined}
            aria-describedby={errors.serviceType ? 'cf-service-err' : undefined}
          >
            <option value="">Choose one…</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>
          {errors.serviceType && (
            <p className="field-error" id="cf-service-err">{errors.serviceType}</p>
          )}
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-message">What needs cleaning? *</label>
        <textarea
          id="cf-message"
          rows={5}
          placeholder="e.g. 3-bedroom house in Mitchell, move-out clean at the end of the month…"
          value={data.message}
          onChange={set('message')}
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={errors.message ? 'cf-message-err' : undefined}
        />
        {errors.message && (
          <p className="field-error" id="cf-message-err">{errors.message}</p>
        )}
      </div>

      <div className="cf-actions">
        <button type="submit" className="btn" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Request my free estimate'}
        </button>
        <p className="cf-note hand">Free estimate. No obligation. No spam.</p>
      </div>

      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            className="form-status form-status--error"
            role="alert"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Your message didn&rsquo;t send — please try again, or call{' '}
            <a href="tel:+12043818505" style={{ textDecoration: 'underline' }}>+1 (204) 381-8505</a>.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  )
}
