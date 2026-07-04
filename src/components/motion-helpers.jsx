import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Scroll-triggered reveal (IntersectionObserver via whileInView).
 * With prefers-reduced-motion, content renders visible immediately.
 */
export function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 32,
  rotate = 0,
  once = true,
  className,
  ...rest
}) {
  const reduce = useReducedMotion()
  const Comp = motion[as] || motion.div
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y, rotate }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.85, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

/**
 * Gentle scroll parallax for decorative collage layers.
 * Translates between `from`px and `to`px while the layer's
 * parent scrolls through the viewport.
 */
export function Drift({ children, from = 26, to = -26, className, style }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [from, to])
  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? style : { ...style, y }}
    >
      {children}
    </motion.div>
  )
}

/** Magnetic hover for buttons — pointer-following translate with a spring. */
export function Magnetic({ children, strength = 0.2, className }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 17, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 220, damping: 17, mass: 0.5 })

  function onMove(e) {
    if (reduce || e.pointerType === 'touch' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }

  function onLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export { EASE }
