import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <p className="eyebrow">oops!</p>
        <h1>page not found</h1>
        <p className="not-found-copy">
          the page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Link className="button button-dark not-found-link" href="/">
          <ArrowLeft size={16} aria-hidden="true" />
          back home
        </Link>
      </div>
    </main>
  )
}