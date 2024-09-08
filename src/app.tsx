import { A } from '@solidjs/router';
import ionicLogo from './assets/ionic.png';

function App(props: any) {
  return (
    <div class="min-w-screen min-h-screen bg-[#FEFBFE]">
        <nav class="flex flex-row items-center p-4 border-b border-black">
          <div class="flex flex-row items-center mr-8">
            <img src={ionicLogo} alt="Ionic logo" class="max-h-20 mr-4" />
            <h1 class="font-semibold text-4xl">Ionic</h1>
          </div>
          <ul class="flex flex-row w-full space-x-4 text-xl items-center">
            <li><A class="hover:underline" activeClass="underline" end href="/">Home</A></li>
            <li><a class="hover:underline" target="_blank" href={import.meta.env.VITE_DISCORD_INVITE_URL}>Invite</a></li>
            <li class="!ml-auto"><A href="/dashboard" class="bg-[#6C96DA] hover:bg-[#3066BE] text-white p-4 rounded-xl" activeClass="bg-[#3066BE]">Dashboard</A></li>
          </ul>
        </nav>
        <div class="p-4">
          {props.children}
        </div>
    </div>
  )
}

export default App
