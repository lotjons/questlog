type GameCoverProps = {
  title: string
  coverUrl: string
  alt: string
}

const GameCover = ({ title, coverUrl, alt }: GameCoverProps) => {
  if (coverUrl) {
    return (
      <img
        src={coverUrl}
        alt={alt}
        className="aspect-3/4 w-full rounded object-cover"
      />
    )
  }

  return (
    <div
      aria-hidden="true"
      className="grid aspect-3/4 w-full place-items-center rounded bg-forest-dark font-display text-6xl text-sage"
    >
      {title.charAt(0).toUpperCase()}
    </div>
  )
}

export default GameCover
