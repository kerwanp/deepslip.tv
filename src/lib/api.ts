import { fetchLiveHeights, fetchTwitchList } from "./deepdip";
import { fetchStreamsData } from "./twitch";

export type PlayerData = {
  trackmaniaId: string;
  displayName: string;
  twitchName?: string;
  currentHeight: number;
  isLive?: boolean;
};

export async function fetchPlayersData(): Promise<PlayerData[]> {
  const [streamers, heights] = await Promise.all([
    await fetchTwitchList(),
    await fetchLiveHeights(),
  ]);

  const playerData: PlayerData[] = heights.map((height) => {
    return {
      trackmaniaId: height.user_id,
      displayName: height.display_name,
      twitchName: streamers.find((s) => s.display_name === height.display_name)
        ?.twitch_name,
      currentHeight: height.height,
    };
  });

  const streams = await fetchStreamsData(
    playerData.map((f) => f.twitchName).filter(Boolean) as string[],
  );

  return playerData.map((player) => {
    return {
      ...player,
      isLive: !!streams.find(
        (s) => s.user_login === player.twitchName?.toLowerCase(),
      ),
    };
  });
}
