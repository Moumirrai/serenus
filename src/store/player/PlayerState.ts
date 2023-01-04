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

export type Track = {
  title: string;
  author: string;
  duration: number;
  thumbnail: string;
};

export type State = {
  playerState?: boolean;
  playing?: boolean;
  position?: number;
  paused?: boolean;
  queueRepeat?: boolean;
  guild?: {
    name: string;
    avatar: string;
  };
  player?: {
    current?: {
      title: string;
      author: string;
      duration: number;
      thumbnail: string;
      identifier: string;
    };
    queue?: {
      size: number;
      hash: string;
    };
  };
  queue?: Track[];
};

export const state: State = {};
