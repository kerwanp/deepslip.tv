"use client";

import { Mosaic } from "@/components/twitch/mosaic";
import { TwitchChat } from "@/components/twitch/twitch-chat";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { usePlayers } from "@/providers/streamers.provider";
import { Maximize } from "lucide-react";
import { useMemo, useState } from "react";

type PageProps = {
  params: { streamers: string[] };
};

export default function Page({ params }: PageProps) {
  const [fullScreen, setFullscreen] = useState(false);
  const { players } = usePlayers();

  const shown = useMemo(() => {
    return players.filter(
      (p) => p.twitchName && params.streamers.includes(p.twitchName),
    );
  }, []);

  return (
    <div className="flex-1 flex">
      <div
        className={cn("flex-1 relative group", {
          "h-screen w-screen absolute top-0 left-0": fullScreen,
        })}
      >
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-75">
          <Button size="icon" onClick={() => setFullscreen((v) => !v)}>
            <Maximize />
          </Button>
        </div>
        <Mosaic streamers={shown.map((s) => s.twitchName!)} />
      </div>
      <Tabs className="flex flex-col" defaultValue={shown[0].trackmaniaId}>
        <TabsList>
          {shown.map((s) => (
            <TabsTrigger key={s.trackmaniaId} value={s.trackmaniaId}>
              {s.displayName}
            </TabsTrigger>
          ))}
        </TabsList>
        {shown.map((s) => (
          <TabsContent
            key={s.trackmaniaId}
            className="flex-1 w-[350px]"
            value={s.trackmaniaId}
          >
            <TwitchChat channel={s.twitchName!} height="100%" />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
