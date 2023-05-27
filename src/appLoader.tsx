import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './app';
import { Home } from './home';
import { Leaderboard } from './leaderboard';
import { NotFound } from './notFound';

export function AppLoader() {

    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="/" element={<Home />} />
                <Route path="leaderboard/:guildId" element={<Leaderboard />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>);
}
