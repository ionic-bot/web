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

// Discord

export interface User {
    id: string;
    username: string;
    discriminator: string;
    global_name?: string;
    avatar?: string;
    bot?: boolean;
    system?: boolean;
    mfa_enabled?: boolean;
    banner?: string;
    accent_color?: number;
    locale?: string;
    verified?: boolean;
    email?: string;
    flags?: number;
    premium_type?: number;
    public_flags?: number;
    avatar_decoration_data?: AvatarDecoration;
}

interface AvatarDecoration {
    asset: string;
    sku_id: string;
}
