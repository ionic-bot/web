import { createEffect, createSignal } from "solid-js";
import { useParams } from "@solidjs/router"
import { CircularProgressbarWithChildren } from '@ionic-bot/solidjs-circular-progressbar';
import '@ionic-bot/solidjs-circular-progressbar/dist/styles.css';
import { GuildLeaderboard } from '../interfaces';

function Leaderboard() {
  const [loaded, setLoaded] = createSignal(false);
  const [guild, setGuild] = createSignal<GuildLeaderboard>();
  let page = 0;
  const quantity = Math.floor((screen.availHeight / 64) + 64);
  let scrollDone = true;
  const params = useParams();

  createEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/leaderboard/' + params.guildId + '?page=' + page + '&quantity=' + quantity)
      .then(res => res.json())
      .then(json => {
        setGuild(json);
        page++;
        setLoaded(true);
      });

    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && scrollDone) {
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
  }, []);

  return (<>
    {loaded() ? <>
      <div class="bg-gradient-to-b from-[#EF8354] to-[#AF1B3F] rounded-xl p-4 mb-4">
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
            return (<div class="flex items-center bg-[#F6E2F8] rounded-xl p-2 m-1">
              <div class={'flex justify-center items-center w-8 h-8 rounded-full mr-4 ' + (rank === 1 ? 'bg-amber-400' : rank === 2 ? 'bg-zinc-300' : rank === 3 ? 'bg-amber-700 text-white' : 'bg-white')}>
                <h6>{rank}</h6>
              </div>
              <img class="h-16 w-16 bg-white rounded-full mr-4" src={'https://cdn.discordapp.com/avatars/' + member.id + '/' + member.avatar + '.png'} onError={event => event.currentTarget.src = 'https://cdn.discordapp.com/embed/avatars/1.png'} />
              <h3 class="text-lg font-semibold">{member.username}</h3>
              <div class="flex ml-auto items-center">
                <h6 class="flex flex-col items-center text-sm mr-4">
                  {member.xp}
                  <p class="font-bold">XP</p>
                </h6>
                <div class="w-16 h-16">
                  <CircularProgressbarWithChildren value={(member.xp / (5 * Math.pow((member.level + 1), 2) + 50 * (member.level + 1) + 100)) * 100} styles={{
                    trail: {
                      stroke: '#6C96DA'
                    },
                    path: {
                      stroke: '#224886'
                    }
                  }}>
                    <h6 class="flex flex-col items-center text-sm">
                      {member.level}
                      <p class="font-bold">LEVEL</p>
                    </h6>
                  </CircularProgressbarWithChildren>
                </div>
              </div>
            </div>);
          })}
        </div>
        <div class="flex flex-col w-1/5 ">
          {(guild()?.roles.length ?? 0) > 0 ? <div class="rounded-xl p-4 mb-4 bg-[#F6E2F8]">
            <h2 class="text-xl font-bold">Role Rewards</h2>
            {guild()?.roles.map(role => <h6 class="bg-white mt-2 p-2 rounded-xl" style={{
              'color': role.color,
            }}>Level {role.level} - {role.name}</h6>)}
          </div> : null}
          <div class="rounded-xl p-4 bg-[#F6E2F8]">
            <h2 class="text-xl font-bold">How do I get XP?</h2>
            <p>Every minute, you can get between <b>{guild()?.settings.minRange}</b> and <b>{guild()?.settings.maxRange}</b> XP by chatting on this server.</p>
          </div>
        </div>
      </div>
    </> : <h2>Please wait...</h2>}
  </>
  )
}

export default Leaderboard
