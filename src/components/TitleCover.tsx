type TitleCoverProps = {
  title: string
}

// A drawn cover: the game's title in the app's font and colours
const TitleCover = ({ title }: TitleCoverProps) => {
  return (
    <div
      aria-hidden="true"
      className="grid aspect-3/4 w-full place-items-center overflow-hidden rounded bg-forest-deep p-4"
    >
      <span className="text-center font-display text-3xl leading-tight text-balance text-sage transition duration-700 ease-out group-hover:scale-110 group-hover:text-fg motion-reduce:transition-none">
        {title}
      </span>
    </div>
  )
}

export default TitleCover
