export interface PlayerData {
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
}

export interface QueueData {
  size: number;
  hash: string;
  tracks: {
    title: string;
    author: string;
    duration: number;
    thumbnail: string;
  }[];
}

export type ClientToServerEvents = {
  "player:addTrack": (payload: string) => void;
  "player:clearQueue": () => void;
  "player:moveTrack": (payload: {
    removedIndex: number;
    addedIndex: number;
  }) => void;
  "player:pause": (payload: boolean) => void;
  "player:removeTrack": (payload: number) => void;
  "player:seek": (payload: number) => void;
  "player:skip": (payload?: number) => void;
  "player:stop": () => void;
  "player:test": (payload: any) => void;
};

export type ServerToClientEvents = {
  "player:data": (payload: PlayerData) => void;
  "player:queueData": (payload: QueueData) => void;
  "api:rateLimit": (payload: string) => void;
  "player:error": (payload: string) => void;
  "player:trackAdded": (payload: string) => void;
};
