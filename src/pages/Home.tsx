import { onMount } from "solid-js";

function Home() {
  onMount(() => {
    document.title = 'Home | Ionic';
  });

  return (
    <p>
      Welcome to Ionic!
    </p>
  )
}

export default Home
