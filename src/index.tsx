/* @refresh reload */
import { lazy } from 'solid-js';
import { render } from 'solid-js/web';
import { Router, Route, useLocation, Navigate } from "@solidjs/router";

import './index.css';
import '@phosphor-icons/web/regular';

import App from './App';
const DashboardHome = lazy(() => import("./pages/DashboardHome"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Home = lazy(() => import("./pages/Home"));
const Error = lazy(() => import("./pages/Error"));

const root = document.getElementById('root');

render(() => (<Router root={App}>
    <Route path="/dashboard" component={DashboardHome} />
    <Route path="/dashboard/:guildId" component={Dashboard} />
    <Route path="/leaderboard/:guildId" component={Leaderboard} />
    <Route path="/callback" preload={() => {
        const fragment = new URLSearchParams(useLocation().hash.slice(1));
        const [accessToken, tokenType, expiresIn] = [fragment.get('access_token'), fragment.get('token_type'), fragment.get('expires_in')];
        if (accessToken) {
            document.cookie = `token=${tokenType} ${accessToken}; expires=${new Date(Date.now() + Number(expiresIn) * 1000).toUTCString()}; path=/`;
        }

        Navigate({
            href: '/dashboard'
        });

    }} />
    <Route path="/" component={Home} />
    <Route path="*" component={Error as any} />
</Router>), root!);
