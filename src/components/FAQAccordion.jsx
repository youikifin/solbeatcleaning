import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { faq } from '../content/content.js'
import { EASE } from './motion-helpers.jsx'
import './faq.css'

export default function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState(0)
  const reduce = useReducedMotion()

  return (
    <ul className="faq">
      {faq.map((item, i) => {
        const open = openIdx === i
        return (
          <li key={i} className={`faq-item ${open ? 'is-open' : ''}`}>
            <h3>
              <button
                className="faq-q"
                aria-expanded={open}
                aria-controls={`faq-panel-${i}`}
                id={`faq-button-${i}`}
                onClick={() => setOpenIdx(open ? -1 : i)}
              >
                <span>{item.q}</span>
                <span className="faq-mark" aria-hidden="true">{open ? '–' : '+'}</span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="panel"
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.38, ease: EASE }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="faq-a">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}
