/* @refresh reload */
import { lazy } from 'solid-js';
import { render } from 'solid-js/web';
import { Router, Route } from "@solidjs/router";

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
    <Route path="/" component={Home} />
    <Route path="*" component={Error as any} />
</Router>), root!);
