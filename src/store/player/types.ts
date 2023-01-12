export type Track = {
  title: string;
  author: string;
  duration: number;
  thumbnail: string;
};

export type State = {
  state?: boolean;
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
  queue?:{
    size: number;
    hash: string;
    tracks: Track[];
  };
  hqThumb?: string;
};
