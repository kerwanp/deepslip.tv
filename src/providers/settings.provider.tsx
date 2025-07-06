"use client";

import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { StreamerData, usePlayers } from "./streamers.provider";

type SettingsState = {
  shown: string[];
  setShown: (shown: string[]) => void;
  shownStreamers: StreamerData[];
};

const SettingsContext = createContext<SettingsState | null>(null);

type SettingsProviderProps = {
  children: ReactNode;
};

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const { streamers } = usePlayers();

  const [shown, setShown] = useState<string[]>(
    streamers.map((s) => s.twitchName),
  );

  const shownStreamers = useMemo(() => {
    let shownStreamers = streamers.filter((s) => s.isLive);

    shownStreamers = shownStreamers.filter((s) => shown.includes(s.twitchName));

    shownStreamers.sort((a, b) => a.twitchName.localeCompare(b.twitchName));

    return shownStreamers;
  }, [streamers, shown]);

  return (
    <SettingsContext.Provider
      value={{
        shownStreamers,
        shown,
        setShown,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("SettingsContext not found");
  return context;
};
