import { onMount } from "solid-js";

function DashboardHome() {
  onMount(() => {
    document.title = "Your servers | Ionic";
  });

  return (
    <p>
      DashboardHome
    </p>
  )
}

export default DashboardHome
