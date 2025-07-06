"use client";

import { PlayerData } from "@/lib/api";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type StreamersState = {
  players: PlayerData[];
  streamers: StreamerData[];
};

const StreamersContext = createContext<StreamersState | null>(null);

export type StreamersProviderProps = {
  children: ReactNode;
  players: PlayerData[];
};

export type StreamerData = PlayerData & { streamer: {} };

export const StreamersProvider = (props: StreamersProviderProps) => {
  const [players, setPlayers] = useState(props.players);

  const streamers = useMemo(() => {
    return players.filter((p) => p.streamer) as StreamerData[];
  }, [players]);

  useEffect(() => {
    setInterval(() => {
      fetch("/api/streamers", { next: { revalidate: 15 } })
        .then((r) => r.json())
        .then((d) => setPlayers(d));
    }, 15000);
  }, []);

  return (
    <StreamersContext.Provider value={{ players, streamers }}>
      {props.children}
    </StreamersContext.Provider>
  );
};

export const usePlayers = () => {
  const context = useContext(StreamersContext);
  if (!context) throw new Error("StreamersContext not found");
  return context;
};
