import { useParams } from 'react-router'

const GameDetailPage = () => {
    const { id } = useParams()
    return <h1 className="text-3xl font-bold">Game {id}</h1>
}

export default GameDetailPage