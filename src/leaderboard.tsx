import { useEffect, useState } from 'preact/hooks';
import { useParams } from 'react-router-dom';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { GuildLeaderboard } from './interfaces';

export function Leaderboard() {
    const [loaded, setLoaded] = useState(false);
    const [guild, setGuild] = useState<GuildLeaderboard>();
    let page = 0;
    const quantity = Math.floor((screen.availHeight / 64) + 64);
    let scrollDone = true;
    const params = useParams();

    useEffect(() => {
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
        {loaded ? <>
            <div class="leaderboardBanner">
                <div>
                    <img src={typeof guild?.guild.icon === 'string' ? ('https://cdn.discordapp.com/icons/' + params.guildId + '/' + guild?.guild.icon + '.png?size=128') : 'https://cdn.discordapp.com/embed/avatars/1.png'} />
                    <h2>{guild?.guild.name}</h2>
                    <h4><i>{guild?.guild.description ?? 'No description'}</i></h4>
                </div>
            </div>
            <div class="leaderboardContainer">
                <div class="members">
                    {guild?.members.map((member, i) => {
                        const rank = i + 1;
                        return (<div>
                            <div class={'rankCircle ' + (rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronce' : 'normal')}>
                                <h4>{rank}</h4>
                            </div>
                            <img src={'https://cdn.discordapp.com/avatars/' + member.id + '/' + member.avatar + '.png'} />
                            <h3>{member.username}#{member.discriminator}</h3>
                            <div class="right">
                                <h5>{member.xp}<h5>XP</h5></h5>
                                <div class="levelProgress">
                                    <CircularProgressbarWithChildren value={(member.xp / (5 * Math.pow((member.level + 1), 2) + 50 * (member.level + 1) + 100)) * 100} styles={{
                                        trail: {
                                            stroke: '#EF8354'
                                        },
                                        path: {
                                            stroke: '#AF1B3F'
                                        }
                                    }}>
                                        <h5>{member.level}</h5>
                                        <h5>LEVEL</h5>
                                    </CircularProgressbarWithChildren>
                                </div>
                            </div>
                        </div>);
                    })}
                </div>
                <div class="rightyContainer">
                    {(guild?.roles.length ?? 0) > 0 ? <div class="righty">
                        <h2>Role rewards</h2>
                        {guild?.roles.map(role => <h4 class="bottomSpacer8t">Level {role.level} - {role.name}</h4>)}
                    </div> : null}
                    <div class="righty">
                        <h2>How do I get XP?</h2>
                        <p>Every minute, you get between {guild?.settings.minRange} and {guild?.settings.maxRange} XP.</p>
                    </div>
                </div>
            </div>
        </> : <h2>Please wait...</h2>}
    </>
    )
}
