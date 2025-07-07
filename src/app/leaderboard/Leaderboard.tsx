"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PlayerData } from "@/lib/api";
import { UserLeaderboard } from "@/lib/deepdip";
import { cn, toOrdinal } from "@/lib/utils";
import { usePlayers } from "@/providers/streamers.provider";
import { CheckedState } from "@radix-ui/react-checkbox";
import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode, useEffect, useMemo, useState } from "react";

export type PageProps = {
  leaderboard: UserLeaderboard[];
};

export const LeaderboardPage = (props: PageProps) => {
  const { players } = usePlayers();

  return (
    <div className="flex-1 grid grid-cols-2 place-items-center items-center justify-center">
      <LiveLeaderboard players={players} />
      <GlobalLeaderboard leaderboard={props.leaderboard} />
    </div>
  );
};

const GlobalLeaderboard = (props: { leaderboard: UserLeaderboard[] }) => {
  const [leaderboard, setLeaderboard] = useState(props.leaderboard);

  useEffect(() => {
    setInterval(() => {
      fetch("/api/leaderboard", { next: { revalidate: 15 } })
        .then((r) => r.json())
        .then((d) => setLeaderboard(d));
    }, 60000);
  }, [setLeaderboard]);

  return (
    <Leaderboard title="Global Leaderboard">
      {leaderboard
        .sort((a, b) => {
          return b.pos[1] - a.pos[1];
        })
        .map((streamer, i) => (
          <LeaderboardItem
            key={streamer.wsid}
            height={streamer.pos[1]}
            rank={i + 1}
            trackmania={streamer.wsid}
          >
            {streamer.name}
          </LeaderboardItem>
        ))}
    </Leaderboard>
  );
};

const LiveLeaderboard = ({ players }: { players: PlayerData[] }) => {
  const [onlyStreamers, setOnlyStreamers] = useState<CheckedState>(false);

  const filtered = useMemo(() => {
    if (!onlyStreamers) return players;
    return players.filter((p) => p.twitchName);
  }, [onlyStreamers, players]);

  return (
    <div>
      <Leaderboard title="Live Leaderboard">
        {filtered
          .filter((s) => s.currentHeight > 0)
          .sort((a, b) => {
            return b.currentHeight - a.currentHeight;
          })
          .map((player, i) => (
            <LeaderboardItem
              key={player.trackmaniaId}
              height={player.currentHeight}
              rank={i + 1}
              trackmania={player.trackmaniaId}
            >
              {player.displayName}
            </LeaderboardItem>
          ))}
      </Leaderboard>
      <Label className="cursor-pointer flex items-center justify-center gap-3 mt-3">
        <Checkbox
          checked={onlyStreamers}
          onCheckedChange={(v) => setOnlyStreamers(v)}
        />
        <div>Only show streamers</div>
      </Label>
    </div>
  );
};

type LeaderboardProps = {
  children: ReactNode;
  title: string;
};

const Leaderboard = ({ children, title }: LeaderboardProps) => {
  return (
    <div className="flex flex-col justify-center w-[400px] max-h-[80vh] overflow-y-auto">
      <h2 className="text-center mb-4 text-lg font-bold text-primary">
        {title}
      </h2>
      <div className="flex flex-col gap-2 overflow-y-auto">{children}</div>
    </div>
  );
};

type LeaderboardItemProps = {
  height: number;
  rank: number;
  trackmania: string;
  twitch?: string;
  children: ReactNode;
  isLive?: boolean;
};

const LeaderboardItem = ({
  children,
  height,
  rank,
  trackmania,
  twitch,
  isLive,
}: LeaderboardItemProps) => {
  const { target, href } = useMemo(() => {
    if (twitch) {
      return { href: `/${twitch}`, target: "_self" };
    }

    return {
      href: `https://trackmania.io/#/player/${trackmania}`,
      target: "_blank",
    };
  }, [twitch, trackmania]);

  return (
    <MotionLink
      layout
      href={href}
      target={target}
      className={cn(
        "group border border-transparent bg-black items-center rounded-md py-3 px-4 flex gap-2 hover:bg-primary hover:text-primary-foreground transition-colors duration-75",
        {
          "border-yellow-500": rank === 1,
          "border-slate-400": rank === 2,
          "border-orange-500": rank === 3,
        },
      )}
    >
      <div className="w-8">{toOrdinal(rank)}</div>
      <div className="flex-1">{children}</div>
      {height.toFixed()}M
      <span
        className={cn("inline-block w-4 h-4 rounded-full bg-muted", {
          "bg-primary group-hover:bg-white group-aria-selected:bg-white":
            isLive,
          "bg-destructive": isLive === false,
        })}
      />
    </MotionLink>
  );
};

const MotionLink = motion(Link);
