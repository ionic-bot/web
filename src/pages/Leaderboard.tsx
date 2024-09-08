import { useParams } from "@solidjs/router"

function Leaderboard() {
  const params = useParams();

  return (
    <p>
      Leaderboard of {params.guildId}
    </p>
  )
}

export default Leaderboard
