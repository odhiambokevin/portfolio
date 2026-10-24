'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="error-page">
      <p className="error-page__code">Something went wrong</p>
      <h1 className="error-page__title">We couldn&apos;t load this page</h1>
      <p className="error-page__text">
        The content may be temporarily unavailable. Please try again, or head back and
        come back in a moment.
      </p>

      <div className="error-page__actions">
        <button type="button" onClick={() => reset()} className="error-page__btn error-page__btn--primary">
          Try again
        </button>
        <Link href="/" className="error-page__btn">
          Back home
        </Link>
      </div>

      {error.digest && <p className="error-page__ref">Reference: {error.digest}</p>}
    </main>
  )
}