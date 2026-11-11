import { Link } from 'react-router'
import { backLink, pageTitle } from '../ui'

const NotFoundPage = () => {
  return (
    <>
      <p className="mb-2 font-mono text-xs uppercase tracking-wider text-sage">
        404
      </p>
      <h1 className={pageTitle}>Page not found</h1>
      <p className="mb-6 max-w-prose text-muted">
        This page doesn't exist. Maybe the game was deleted, or the address is
        wrong.
      </p>
      <Link to="/" className={backLink}>
        Back to all games
      </Link>
    </>
  )
}

export default NotFoundPage
