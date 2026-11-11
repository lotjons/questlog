type GameCoverProps = {
  title: string
  coverUrl: string
  alt: string
}

const GameCover = ({ title, coverUrl, alt }: GameCoverProps) => {
  if (coverUrl) {
    return (
      <div className="aspect-3/4 w-full overflow-hidden rounded bg-forest-deep">
        <img
          src={coverUrl}
          alt={alt}
          className="size-full object-cover mix-blend-screen brightness-90 contrast-130 grayscale"
        />
      </div>
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
