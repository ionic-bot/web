import { useParams } from "@solidjs/router"

function Dashboard() {
  const params = useParams();

  return (
    <p>
      Dashboard of {params.guildId}
    </p>
  )
}

export default Dashboard
