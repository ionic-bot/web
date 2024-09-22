import { onMount } from "solid-js";
import { useParams } from "@solidjs/router"

function Dashboard() {
  const params = useParams();

  onMount(() => {
    document.title = "GUILDNAME's dashboard | Ionic";
  });

  return (
    <p>
      Dashboard of {params.guildId}
    </p>
  )
}

export default Dashboard
