type GameCoverProps = {
  title: string
  coverUrl: string
  alt: string
}

const isRealCover = (url: string) => url !== '' && !url.includes('placehold.co')

const GameCover = ({ title, coverUrl, alt }: GameCoverProps) => {
  if (isRealCover(coverUrl)) {
    return (
      <div className="aspect-3/4 w-full overflow-hidden rounded bg-forest-deep">
        <img
          src={coverUrl}
          alt={alt}
          className="size-full object-cover mix-blend-screen brightness-90 contrast-130 grayscale transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
        />
      </div>
    )
  }

  return (
    <div
      aria-hidden="true"
      className="grid aspect-3/4 w-full place-items-center overflow-hidden rounded bg-forest-deep p-4"
    >
      <span className="text-center font-display text-3xl leading-tight text-balance text-sage transition duration-700 ease-out group-hover:scale-110 group-hover:text-fg group-hover:[text-shadow:0_0_24px_rgb(168_213_181/0.55)] motion-reduce:transition-none">
        {title}
      </span>
    </div>
  )
}

export default GameCover
