// hooks/useScrollReveal.ts
// Reusable hook that adds IntersectionObserver‑based scroll‑reveal classes.
// It toggles the `.reveal-hidden` → `.reveal-visible` CSS states defined in globals.css.
// Staggered child animation is handled by setting `transition-delay` on direct children.

import { useEffect } from 'react'

type UseScrollRevealOptions = {
  /** Threshold for the observer (default 0.15) */
  threshold?: number
  /** rootMargin for the observer (default "0px 0px -60px 0px") */
  rootMargin?: string
  /** Whether to stagger direct children (default true) */
  stagger?: boolean
  /** Incremental delay per child in ms (default 120) */
  delayIncrement?: number
  /** Maximum total delay in ms (default 600) */
  maxDelay?: number
  /** If true, the element will become visible immediately after `initialDelay` ms instead of waiting for scroll */
  initialDelay?: number
}

/**
 * Attach the scroll‑reveal behaviour to a DOM element.
 * All DOM manipulation is performed inside `useEffect` → SSR‑safe.
 */
export function useScrollReveal(
  ref: React.RefObject<HTMLElement | null>,
  opts: UseScrollRevealOptions = {},
) {

  const {
    threshold = 0.15,
    rootMargin = '0px 0px -60px 0px',
    stagger = true,
    delayIncrement = 120,
    maxDelay = 600,
    initialDelay,
  } = opts

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return
    const el = ref.current

    // ensure the hidden state is present on the wrapper and its direct children
    const children = Array.from(el.children) as HTMLElement[]
    children.forEach((c) => c.classList.add('reveal-hidden'))

    const applyVisible = () => {
      // wrapper becomes visible
      el.classList.remove('reveal-hidden')
      el.classList.add('reveal-visible')

      children.forEach((c, i) => {
        // calculate staggered delay, capped at maxDelay
        const delay = stagger ? Math.min(i * delayIncrement, maxDelay) : 0
        if (delay) c.style.transitionDelay = `${delay}ms`
        c.classList.remove('reveal-hidden')
        c.classList.add('reveal-visible')
      })
    }

    if (initialDelay != null) {
      // Hero‑type immediate reveal after a short timeout
      const timer = setTimeout(applyVisible, initialDelay)
      return () => clearTimeout(timer)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            applyVisible()
            observer.disconnect()
          }
        })
      },
      { threshold, rootMargin },
    )

    observer.observe(el)

    // cleanup on unmount
    return () => observer.disconnect()
  }, [
    ref,
    threshold,
    rootMargin,
    stagger,
    delayIncrement,
    maxDelay,
    initialDelay,
  ])
}
