import { onMount, createSignal, lazy } from "solid-js";
import { useParams } from "@solidjs/router"
import { CircularProgressbarWithChildren } from '@ionic-bot/solidjs-circular-progressbar';
import '@ionic-bot/solidjs-circular-progressbar/dist/styles.css';
const Error = lazy(() => import("./Error"));
import { GuildLeaderboard } from '../interfaces';

import colorPalette from '../../colorPalette.json';

function Leaderboard() {
  const [loaded, setLoaded] = createSignal(false);
  const [failed, setFailed] = createSignal('');
  const [guild, setGuild] = createSignal<GuildLeaderboard>();
  let page = 0;
  const quantity = Math.floor((screen.availHeight / 64) + 64);
  let scrollDone = true;
  const params = useParams();

  onMount(() => {
    fetch(import.meta.env.VITE_API_URL + '/leaderboard/' + params.guildId + '?page=' + page + '&quantity=' + quantity)
      .then(res => res.json())
      .then(json => {
        if (!json.error) {
          document.title = json?.guild.name + "'s leaderboard | Ionic";

          setGuild(json);
          page++;
          setLoaded(true);
        } else {
          setFailed(json.error);
        }
      }).catch(() => setFailed('Network error.'));

    window.addEventListener('scroll', () => {
      if (!failed && ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && scrollDone)) {
        scrollDone = false
        fetch(import.meta.env.VITE_API_URL + '/leaderboard/' + params.guildId + '?page=' + page + '&quantity=' + quantity)
          .then(res => res.json())
          .then(json => {
            setGuild(oldGuild => {
              const newGuild = Object.assign({}, oldGuild);
              newGuild.members = newGuild.members.concat(json.members);
              return newGuild;
            })
            page++;
          });
        scrollDone = true
      }
    })
  });

  return (<div class="flex flex-col grow">
    {loaded() ? <>
      <div class="bg-themeDarker rounded-xl p-4 mb-4">
        <div>
          <img class="rounded-xl mb-4 w-32 h-32" src={typeof guild()?.guild.icon === 'string' ? ('https://cdn.discordapp.com/icons/' + params.guildId + '/' + guild()?.guild.icon + '.png?size=128') : 'https://cdn.discordapp.com/embed/avatars/1.png'} />
          <h2 class="font-semibold text-3xl text-white">{guild()?.guild.name}</h2>
          <h3 class="text-white">{guild()?.guild.description ?? 'No description.'}</h3>
        </div>
      </div>
      <div class="flex items-start">
        <div class="flex flex-col w-4/5 mr-4">
          {guild()?.members.map((member, i) => {
            const rank = i + 1;
            return (<div class="flex items-center bg-themeLight rounded-xl p-2 m-1">
              <div class={'flex justify-center items-center w-8 h-8 rounded-full mr-4 ' + (rank === 1 ? 'bg-amber-400' : rank === 2 ? 'bg-zinc-300' : rank === 3 ? 'bg-amber-700 text-white' : 'bg-white')}>
                <p>{rank}</p>
              </div>
              <img class="h-16 w-16 bg-white rounded-full mr-4" src={'https://cdn.discordapp.com/avatars/' + member.id + '/' + member.avatar + '.png'} onError={event => event.currentTarget.src = 'https://cdn.discordapp.com/embed/avatars/1.png'} />
              <p class="text-lg font-semibold">{member.username}</p>
              <div class="flex ml-auto items-center">
                <p class="flex flex-col items-center text-sm mr-4">
                  {member.xp}
                  <span class="font-bold">XP</span>
                </p>
                <div class="w-16 h-16">
                  <CircularProgressbarWithChildren value={(member.xp / (5 * Math.pow((member.level + 1), 2) + 50 * (member.level + 1) + 100)) * 100} styles={{
                    trail: {
                      stroke: colorPalette.themeTertiary
                    },
                    path: {
                      stroke: colorPalette.themeDarker
                    }
                  }}>
                    <p class="flex flex-col items-center text-sm">
                      {member.level}
                      <span class="font-bold">LEVEL</span>
                    </p>
                  </CircularProgressbarWithChildren>
                </div>
              </div>
            </div>);
          })}
        </div>
        <div class="flex flex-col w-1/5 ">
          {(guild()?.roles.length ?? 0) > 0 ? <div class="rounded-xl p-4 mb-4 bg-themeLight">
            <h2 class="text-xl font-bold flex items-center">
              <i class="ph ph-trophy mr-2"></i>
              Role Rewards
            </h2>
            {guild()?.roles.map(role => <div>
              <p class="mt-2 text-sm">Level {role.level}</p>
              <div class="bg-themeLighter p-2 rounded-xl inline-flex items-center">
                <div class="inline-block w-4 min-w-4 h-4 mr-2 rounded-full" style={{
                  'background-color': role.color,
                }}></div>
                <p class="break-all">{role.name}</p>
              </div>
            </div>)}
          </div> : null}
          <div class="rounded-xl p-4 bg-themeLight">
            <h2 class="text-xl font-bold flex items-center">
              <i class="ph ph-sparkle mr-2"></i>
              How do I get XP?
            </h2>
            <p>Every minute, you can get between <b>{guild()?.settings.minRange}</b> and <b>{guild()?.settings.maxRange}</b> XP by chatting on this server.</p>
          </div>
        </div>
      </div>
    </> : !failed() ? <p>Please wait...</p> : <Error error={failed()}></Error>}
  </div>
  )
}

export default Leaderboard
