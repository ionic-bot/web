export interface Guild {
    name: string;
    description?: string;
    icon: string;
}

export interface Settings {
    minRange: number;
    maxRange: number;
}

export interface Role {
    id: string;
    name: string;
    color: string;
    level: number;
}

export interface Member {
    id: string;
    username: string;
    avatar: string;
    xp: number;
    level: number;
}

export interface GuildLeaderboard {
    guild: Guild;
    settings: Settings;
    roles: Role[];
    members: Member[];
}
