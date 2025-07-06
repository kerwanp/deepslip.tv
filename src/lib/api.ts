import config, { Streamer } from "@/config";
import { fetchLiveHeights } from "./deepdip";
import { fetchStreamsData } from "./twitch";

export type PlayerData = {
  id: string;
  name: string;
  streamer?: Streamer;
  isLive?: boolean;
  currentHeight: number;
};

export async function fetchPlayersData(): Promise<PlayerData[]> {
  const streamers = config.streamers;

  // const leaderboard = await fetchLeaderboard();
  const streams = await fetchStreamsData(streamers.map((s) => s.twitch));
  const heights = await fetchLiveHeights();

  return heights.map((height) => {
    const streamer = streamers.find((s) => s.trackmania === height.user_id);
    return {
      id: height.user_id,
      name: height.display_name,
      streamer: streamer,
      isLive: streamer
        ? Boolean(streams.find((s) => streamer.twitch === s.user_login))
        : undefined,
      currentHeight: height.height,
    };
  });
}
