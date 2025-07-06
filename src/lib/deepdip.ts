export type Leaderboard = UserLeaderboard[];

export type UserLeaderboard = {
  rank: number;
  wsid: string;
  pos: [number, number, number];
  ts: number;
  name: string;
  update_count: number;
  race_time: number;
};

const mapUid = "DeepSlip_1fwwLrYCb7Ku7Tqcl0";

export function fetchLeaderboard(): Promise<Leaderboard> {
  return fetch(`https://dips-plus-plus.xk.io/map/${mapUid}/leaderboard`, {
    next: { revalidate: 60 },
    headers: {
      "User-Agent": "deepdip.tv;kerwan.",
    },
  }).then((r) => r.json());
}

export type LiveHeight = {
  display_name: string;
  user_id: string;
  height: number;
};

export function fetchLiveHeights(): Promise<LiveHeight[]> {
  return fetch(`https://dips-plus-plus.xk.io/map/${mapUid}/live_heights`, {
    next: { revalidate: 15 },
    headers: {
      "User-Agent": "deepdip.tv;kerwan.",
    },
  }).then((r) => r.json());
}

export type TwitchInfo = {
  display_name: string;
  twitch_name: string;
};

export function fetchTwitchList(): Promise<TwitchInfo[]> {
  return fetch(`https://dips-plus-plus.xk.io/twitch/list`, {
    next: { revalidate: 240 },
    headers: {
      "User-Agent": "deepdip.tv;kerwan.",
    },
  }).then((r) => r.json());
}
