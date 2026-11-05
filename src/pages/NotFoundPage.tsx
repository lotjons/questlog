import { Link } from 'react-router'

const NotFoundPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold">404 – Page not found</h1>
      <Link to="/" className="underline">
        Back to all games
      </Link>
    </>
  )
}

export default NotFoundPage
