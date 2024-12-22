import { createSignal, onMount } from 'solid-js';
import { A } from '@solidjs/router';
import ionicLogo from './assets/ionic.png';
import { User } from './interfaces';

function App(props: any) {

  const [loggedInUser, setLoggedInUser] = createSignal<User>();
  const [loaded, setLoaded] = createSignal(false);

  onMount(() => {
    const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];

    if (token) {
      fetch('https://discord.com/api/users/@me', {
        headers: {
          authorization: token,
        },
      })
        .then(res => res.json())
        .then(json => {
          setLoggedInUser(json);
          setLoaded(true);
        })
        .catch(() => {
          setLoaded(true);
        });
    } else {
      setLoaded(true);
    }
  });

  return (
    <div class="flex flex-col min-w-screen min-h-screen bg-themeLighter">
      <nav class="flex flex-row items-center p-4 bg-white border-b border-themeDarker">
      <A end href="/">
        <div class="flex flex-row items-center mr-8">
          <img src={ionicLogo} alt="Ionic logo" class="max-h-12 mr-4" />
          <h1 class="font-semibold text-4xl">Ionic</h1>
        </div>
      </A>
        <ul class="flex flex-row w-full space-x-4 text-xl items-center">
          <li><A class="hover:underline" activeClass="underline" end href="/">Home</A></li>
          <li><A class="hover:underline" activeClass="underline" href="/dashboard">Dashboard</A></li>
          <li><a class="hover:underline" target="_blank" href={`https://discord.com/oauth2/authorize?client_id=${import.meta.env.VITE_DISCORD_CLIENT_ID}&permissions=8&integration_type=0&scope=bot`}>Invite</a></li>
          <li class="!ml-auto" style={!loaded() ? { visibility: 'hidden' } : {}}>
            {loggedInUser() ? (
              <a href="#" class="bg-themePrimary hover:bg-themeSecondary active:bg-themeTertiary text-white px-6 py-4 rounded-full flex items-center">
                <img class="h-6 w-6 bg-white rounded-full mr-2" src={'https://cdn.discordapp.com/avatars/' + loggedInUser()?.id + '/' + loggedInUser()?.avatar + '.png'} onError={event => event.currentTarget.src = 'https://cdn.discordapp.com/embed/avatars/1.png'}></img>
                {loggedInUser()?.username}
              </a>) : (
              <a href={`https://discord.com/oauth2/authorize?client_id=${import.meta.env.VITE_DISCORD_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(`${window.location.origin}/callback`)}&scope=identify+guilds`} class="bg-themePrimary hover:bg-themeSecondary active:bg-themeTertiary text-white px-6 py-4 rounded-full flex items-center">
                <i class="ph ph-sign-in mr-2 text-2xl"></i>
                Sign in
              </a>)}
          </li>
        </ul>
      </nav>
      <div class="p-4 flex grow">
        {props.children}
      </div>
    </div>
  )
}

export default App
