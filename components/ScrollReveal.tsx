// components/ScrollReveal.tsx
// Simple wrapper that applies the useScrollReveal hook to its children.
// It forwards styling props so each section can customise stagger, delay, etc.

import React, { useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

type ScrollRevealProps = {
  children: React.ReactNode
  className?: string
  /** Enable staggered child animation (default true) */
  stagger?: boolean
  /** Incremental delay per child in ms (default 120) */
  delayIncrement?: number
  /** IntersectionObserver threshold (default 0.15) */
  threshold?: number
  /** rootMargin for the observer (default "0px 0px -60px 0px") */
  rootMargin?: string
  /** For sections that should appear on page load (e.g., Hero) */
  initialDelay?: number
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  stagger = true,
  delayIncrement = 120,
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px',
  initialDelay,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useScrollReveal(ref, {
    threshold,
    rootMargin,
    stagger,
    delayIncrement,
    initialDelay,
  })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export default ScrollReveal
