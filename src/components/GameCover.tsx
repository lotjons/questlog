import TitleCover from './TitleCover'

type GameCoverProps = {
  title: string
  coverUrl: string
}

// The real cover from the API, in the green duotone.
// Falls back to a drawn cover if the game has no cover.
const GameCover = ({ title, coverUrl }: GameCoverProps) => {
  if (!coverUrl) return <TitleCover title={title} />

  return (
    <div className="aspect-3/4 w-full overflow-hidden rounded bg-forest-deep">
      <img
        src={coverUrl}
        alt={`Cover of ${title}`}
        className="size-full object-cover mix-blend-screen brightness-90 contrast-130 grayscale"
      />
    </div>
  )
}

export default GameCover
