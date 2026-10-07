'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const NAME = 'Swati Gupta'
const ROLES = ['Engineering Manager', 'Full Stack Engineer']
const HEADLINE = 'I untangle complexity and build systems that scale.'

/**
 * The portrait is a gaze-tracking set: five frames of one photograph, registered to the
 * pixel, differing mainly in where the eyes look. Measured against `center`, the strong
 * differences sit on the eyes and the rest is low-amplitude regeneration noise on hair and
 * foliage. That is what makes an opacity crossfade the right effect here — identical flat
 * regions blend invisibly and the eyes appear to travel.
 *
 * Because the frames are registered, ALL transform lives on the shared container
 * (`.hero-parallax`). Transforming an individual layer would slide it out of register with
 * the other four and the crossfade would smear.
 */
const DIRECTIONS = ['center', 'left', 'right', 'up', 'down'] as const
type Direction = typeof DIRECTIONS[number]

const WIDTHS = [640, 1200] as const
const PORTRAIT_SIZES =
  '(min-width: 1024px) 448px, (min-width: 640px) 62vw, 86vw'
const PORTRAIT_ALT =
  'Portrait of Swati Gupta, seated at a desk with a laptop and looking toward the viewer.'

const src = (dir: Direction, width: number) =>
  `/images/hero/swati-${dir}-${width}.webp`

const srcSet = (dir: Direction) =>
  WIDTHS.map((w) => `${src(dir, w)} ${w}w`).join(', ')

/** Hypothetical max distance from the portrait centre, in units of half-width/half-height. */
const DEAD_ENTER = 0.26
const DEAD_EXIT = 0.16
const AXIS_MARGIN = 1.2

/** How long a click holds its emphasis before easing back to the pointer-driven state. */
const PULSE_MS = 520
/** Seconds the parallax takes to settle, as a per-frame lerp factor. */
const PARALLAX_EASE = 0.14

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v))

const axisMagnitude = (dir: Direction, nx: number, ny: number) =>
  dir === 'left' || dir === 'right' ? Math.abs(nx) : Math.abs(ny)

/**
 * Maps a pointer offset to a direction.
 *
 * Two independent Schmitt triggers keep it from chattering: `DEAD_ENTER > DEAD_EXIT` gives
 * the centre a band of stability, and `AXIS_MARGIN` stops the diagonal (where neither axis
 * wins) from flapping between two directions. Both are distance-based rather than timed, so
 * the response stays immediate.
 *
 * The axes are normalised separately, so the dead zone is an ellipse in screen space — on a
 * tall portrait that reads more naturally than a circle.
 */
function classify(nx: number, ny: number, current: Direction): Direction {
  const distance = Math.hypot(nx, ny)

  if (current === 'center' ? distance < DEAD_ENTER : distance < DEAD_EXIT) {
    return 'center'
  }

  const next: Direction =
    Math.abs(nx) > Math.abs(ny)
      ? nx > 0
        ? 'right'
        : 'left'
      : ny > 0
      ? 'down'
      : 'up'

  if (current === 'center' || next === current) return next

  return axisMagnitude(next, nx, ny) >
    axisMagnitude(current, nx, ny) * AXIS_MARGIN
    ? next
    : current
}

export default function InteractiveHero() {
  const hostRef = useRef<HTMLElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)

  // Pointer state is split in two speeds. The *direction* is React state: it changes a
  // handful of times per session, so a render per change is free. The *parallax* never
  // touches React — it is written to CSS custom properties from a rAF loop, so moving the
  // mouse does not re-render the tree.
  const [zone, setZone] = useState<Direction>('center')
  const [pulse, setPulse] = useState<Direction | null>(null)

  const zoneRef = useRef<Direction>('center')
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rectRef = useRef<DOMRect | null>(null)
  const rafRef = useRef(0)
  const runningRef = useRef(false)
  const pulseTimerRef = useRef<number | null>(null)

  // Read by the imperative handlers, which are attached once and would otherwise capture a
  // stale value.
  const canHoverRef = useRef(false)
  const reducedMotionRef = useRef(false)

  const commitZone = useCallback((next: Direction) => {
    if (zoneRef.current === next) return
    zoneRef.current = next
    setZone(next)
  }, [])

  useEffect(() => {
    const host = hostRef.current
    const stage = stageRef.current
    if (!host || !stage) return

    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    /** Lerps the parallax toward its target and stops once settled, so no rAF idles. */
    const frame = () => {
      const current = currentRef.current
      const target = targetRef.current

      current.x += (target.x - current.x) * PARALLAX_EASE
      current.y += (target.y - current.y) * PARALLAX_EASE

      stage.style.setProperty('--px', current.x.toFixed(4))
      stage.style.setProperty('--py', current.y.toFixed(4))

      if (
        Math.abs(target.x - current.x) > 0.001 ||
        Math.abs(target.y - current.y) > 0.001
      ) {
        rafRef.current = requestAnimationFrame(frame)
      } else {
        runningRef.current = false
        rafRef.current = 0
      }
    }

    const kick = () => {
      if (reducedMotionRef.current || runningRef.current) return
      runningRef.current = true
      rafRef.current = requestAnimationFrame(frame)
    }

    /** The portrait can move under the pointer (scroll, resize), so the box is re-measured
     *  on those events rather than on every move. */
    const measure = () => {
      rectRef.current = stage.getBoundingClientRect()
    }

    const setParallax = (x: number, y: number) => {
      targetRef.current.x = x
      targetRef.current.y = y
      kick()
    }

    const onPointerEnter = () => measure()

    const onPointerMove = (event: PointerEvent) => {
      if (!rectRef.current) measure()
      const rect = rectRef.current
      if (!rect) return

      const nx =
        (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
      const ny =
        (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)

      setParallax(clamp(nx, -1, 1), clamp(ny, -1, 1))
      commitZone(classify(nx, ny, zoneRef.current))
    }

    const onPointerLeave = () => {
      commitZone('center')
      setParallax(0, 0)
    }

    /**
     * Click emphasises a direction briefly, then releases. Attached imperatively rather
     * than via JSX `onClick` because the portrait is decorative (`role="img"`), not a
     * control — there is no keyboard equivalent to offer, so it should not look like one.
     */
    const onClick = (event: MouseEvent) => {
      if (reducedMotionRef.current) return

      let next: Direction

      if (canHoverRef.current) {
        // Pointer-driven: echo whichever direction the pointer is already asking for.
        next = zoneRef.current
      } else {
        // Touch has no pointer-driven state, so a tap sets a sticky direction instead of a
        // timed pulse, and tapping the same side again clears it.
        const rect = stage.getBoundingClientRect()
        const nx =
          (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
        const tapped: Direction =
          nx < -0.15 ? 'left' : nx > 0.15 ? 'right' : 'center'
        commitZone(zoneRef.current === tapped ? 'center' : tapped)
        return
      }

      if (pulseTimerRef.current !== null)
        window.clearTimeout(pulseTimerRef.current)
      setPulse(next)
      pulseTimerRef.current = window.setTimeout(() => {
        setPulse(null)
        pulseTimerRef.current = null
      }, PULSE_MS)
    }

    const onLayoutChange = () => measure()

    /**
     * Pointer listeners are attached only where a real pointer exists, so a touch device can
     * never strand a direction it has no way to clear. Both queries are subscribed to
     * because either can flip at runtime: docking a mouse, or toggling reduced-motion in the
     * OS.
     */
    const syncPointer = () => {
      canHoverRef.current = hoverQuery.matches

      host.removeEventListener('pointerenter', onPointerEnter)
      host.removeEventListener('pointermove', onPointerMove)
      host.removeEventListener('pointerleave', onPointerLeave)

      if (hoverQuery.matches) {
        host.addEventListener('pointerenter', onPointerEnter)
        host.addEventListener('pointermove', onPointerMove)
        host.addEventListener('pointerleave', onPointerLeave)
      } else {
        commitZone('center')
      }
    }

    /**
     * Reduced motion drops the parallax entirely — a transform driven from JS is invisible
     * to the global `transition-duration` clamp, so it has to be gated here. The crossfade
     * needs no handling: that same clamp already reduces it to an instant swap.
     */
    const syncMotion = () => {
      reducedMotionRef.current = motionQuery.matches
      if (!motionQuery.matches) return

      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
      runningRef.current = false
      currentRef.current.x = 0
      currentRef.current.y = 0
      stage.style.setProperty('--px', '0')
      stage.style.setProperty('--py', '0')
    }

    syncPointer()
    syncMotion()
    hoverQuery.addEventListener('change', syncPointer)
    motionQuery.addEventListener('change', syncMotion)
    stage.addEventListener('click', onClick)
    window.addEventListener('resize', onLayoutChange, { passive: true })
    window.addEventListener('scroll', onLayoutChange, { passive: true })

    return () => {
      hoverQuery.removeEventListener('change', syncPointer)
      motionQuery.removeEventListener('change', syncMotion)
      stage.removeEventListener('click', onClick)
      window.removeEventListener('resize', onLayoutChange)
      window.removeEventListener('scroll', onLayoutChange)
      host.removeEventListener('pointerenter', onPointerEnter)
      host.removeEventListener('pointermove', onPointerMove)
      host.removeEventListener('pointerleave', onPointerLeave)

      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
      runningRef.current = false
      if (pulseTimerRef.current !== null)
        window.clearTimeout(pulseTimerRef.current)

      // StrictMode tears the effect down and re-runs it against the same DOM, so a stale
      // offset written by the first mount would otherwise persist into the second.
      stage.style.setProperty('--px', '0')
      stage.style.setProperty('--py', '0')
      currentRef.current.x = 0
      currentRef.current.y = 0
    }
  }, [commitZone])

  /**
   * The four non-centre layers start as `loading="lazy"`, and a browser is free to defer work
   * for elements it considers occluded. Warming them on idle guarantees every gaze frame is
   * decoded before the first pointer move, so a direction change never reveals a blank frame.
   *
   * Only the width this viewport would actually request is warmed — pulling the 1200px set on
   * a phone would spend bandwidth on an image the browser will never choose.
   */
  useEffect(() => {
    const width = window.innerWidth >= 1024 ? WIDTHS[1] : WIDTHS[0]

    const warm = () => {
      DIRECTIONS.forEach((dir) => {
        if (dir === 'center') return
        const img = new Image()
        img.decoding = 'async'
        img.src = src(dir, width)
      })
    }

    // `requestIdleCallback` is still absent from lib.dom, so it is described rather than
    // assumed. Safari only shipped it recently, hence the timeout fallback.
    const idleWindow = window as Window & {
      requestIdleCallback?: (
        callback: () => void,
        options?: { timeout: number }
      ) => number
      cancelIdleCallback?: (handle: number) => void
    }

    if (idleWindow.requestIdleCallback) {
      const handle = idleWindow.requestIdleCallback(warm, { timeout: 2000 })
      return () => idleWindow.cancelIdleCallback?.(handle)
    }

    const handle = window.setTimeout(warm, 800)
    return () => window.clearTimeout(handle)
  }, [])

  const active = pulse ?? zone

  return (
    <section
      ref={hostRef}
      className="dark-band bleed-x relative overflow-hidden"
    >
      <div className="relative mx-auto flex min-h-[78svh] max-w-5xl flex-col justify-center gap-14 px-6 py-20 lg:flex-row lg:items-center lg:gap-16 lg:py-24">
        <div className="relative z-10 lg:flex-1">
          <p className="text-xs uppercase tracking-[0.34em] text-[var(--band-muted)]">
            Portfolio / 2026
          </p>

          <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            {NAME}
          </h1>

          <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--band-muted)]">
            {ROLES.map((role, i) => (
              <React.Fragment key={role}>
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="text-[var(--band-line-strong)]"
                  >
                    ·
                  </span>
                )}
                <span className="uppercase tracking-[0.18em]">{role}</span>
              </React.Fragment>
            ))}
          </p>

          <p className="mt-10 max-w-xl font-display text-2xl leading-snug sm:text-3xl sm:leading-tight">
            {HEADLINE}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/blog"
              className="rounded-full bg-[var(--band-fg)] px-6 py-3 text-sm font-medium tracking-wide text-[var(--band-bg)] transition-colors hover:bg-white"
            >
              Read the blog
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-[var(--band-line-strong)] px-6 py-3 text-sm font-medium tracking-wide text-[var(--band-fg)] transition-colors hover:border-[var(--band-fg)]"
            >
              About me
            </Link>
          </div>
        </div>

        <div className="relative lg:flex-1">
          {/* A faint dot grid and a drifting hairline; both purely decorative. */}
          <div
            aria-hidden="true"
            className="hero-grid pointer-events-none absolute -inset-x-8 -inset-y-10"
          />
          <span
            aria-hidden="true"
            className="hero-rule absolute -left-2 top-6 hidden h-24 w-px bg-[var(--band-accent)] lg:block"
          />

          <div
            ref={stageRef}
            role="img"
            aria-label={PORTRAIT_ALT}
            className="hero-stage relative mx-auto aspect-[4/5] w-full max-w-md select-none"
          >
            <div className="hero-parallax absolute inset-0">
              {DIRECTIONS.map((dir) => (
                <img
                  key={dir}
                  src={src(dir, WIDTHS[1])}
                  srcSet={srcSet(dir)}
                  sizes={PORTRAIT_SIZES}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  decoding="async"
                  // Only the centre is needed for first paint; the rest are in the viewport
                  // at zero opacity, so they fetch at low priority without blocking it, and
                  // are warmed again on idle to be ready before the first pointer move.
                  loading={dir === 'center' ? 'eager' : 'lazy'}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    opacity: active === dir ? 1 : 0,
                    zIndex: active === dir ? 2 : 1,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
