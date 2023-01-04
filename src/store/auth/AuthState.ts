export type User = {
    id: string;
    username: string;
    avatar: string;
    avatar_decoration: any;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner: any;
    banner_color: any;
    accent_color: any;
    locale: string;
    mfa_enabled: boolean;
};


export type State = {
  code?: string;
  stateParam?: string;
  ongoingAuth?: boolean;
  user?: User;
};

export const state: State = {};
