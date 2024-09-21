import { A } from '@solidjs/router';
import ionicLogo from './assets/ionic.png';

function App(props: any) {
  return (
    <div class="flex flex-col min-w-screen min-h-screen bg-[#FEFBFE]">
      <nav class="flex flex-row items-center p-4 bg-white border-b border-[#EF8354]">
        <div class="flex flex-row items-center mr-8">
          <img src={ionicLogo} alt="Ionic logo" class="max-h-12 mr-4" />
          <h1 class="font-semibold text-4xl">Ionic</h1>
        </div>
        <ul class="flex flex-row w-full space-x-4 text-xl items-center">
          <li><A class="hover:underline" activeClass="underline" end href="/">Home</A></li>
          <li><a class="hover:underline" target="_blank" href={import.meta.env.VITE_DISCORD_INVITE_URL}>Invite</a></li>
          <li class="!ml-auto"><A href="/dashboard" class="bg-[#3066BE] hover:bg-[#2957A3] active:bg-[#224886] text-white px-6 py-4 rounded-full flex items-center" activeClass="bg-[#224886]">
            <i class="ph ph-gauge mr-2 text-2xl"></i>
            Dashboard
          </A></li>
        </ul>
      </nav>
      <div class="p-4 flex grow">
        {props.children}
      </div>
    </div>
  )
}

export default App
