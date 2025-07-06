"use client";

import { TwitchChat } from "@/components/twitch/twitch-chat";
import { TwitchPlayer } from "@/components/twitch/twitch-player";
import { usePlayers } from "@/providers/streamers.provider";
import Image from "next/image";
import { useMemo } from "react";

export function TopClimber() {
  const { players } = usePlayers();

  const top = useMemo(() => {
    return players
      .filter((s) => s.isLive)
      .sort((a, b) => b.currentHeight - a.currentHeight)[0];
  }, [players]);

  return (
    <div className="flex flex-1 relative">
      <Image
        src="/spinner.svg"
        width={32}
        height={32}
        alt="spinner"
        className="invert absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1]"
      />
      <div className="flex-1">
        <TwitchPlayer height="100%" width="100%" channel={top.twitchName} />
      </div>
      <TwitchChat channel={top.twitchName!} height="100%" />
    </div>
  );
}
