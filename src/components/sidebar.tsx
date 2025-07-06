"use client";

import { cn } from "@/lib/utils";
import { usePlayers } from "@/providers/streamers.provider";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, useMemo } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { MicVocal } from "lucide-react";

export const Sidebar = () => {
  const { streamers } = usePlayers();
  const pathname = usePathname();

  const sorted = useMemo(() => {
    return streamers
      .sort((a, b) =>
        a.streamer.displayName.localeCompare(b.streamer.displayName),
      )
      .sort((a, b) => {
        return b.currentHeight - a.currentHeight;
      })
      .sort((a, b) =>
        a.streamer.casting === b.streamer.casting
          ? 0
          : a.streamer.casting
            ? -1
            : 1,
      )
      .sort((a, b) => (a.isLive === b.isLive ? 0 : a.isLive ? -1 : 1));
  }, [streamers]);

  return (
    <div className="px-4 py-6 flex flex-col gap-4 w-[300px] max-h-screen">
      <div className="flex justify-center">
        <h1 className="text-6xl font-black tracking-tighter leading-[0.8em] text-center scale-x-120 text-primary">
          DEEP SLIP
        </h1>
      </div>
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
        <div className="overflow-y-auto">
          {sorted.map((s) => (
            <SidebarItem
              key={s.streamer.twitch}
              href={`/${s.streamer.twitch}`}
              aria-selected={pathname === `/${s.streamer.twitch}`}
            >
              <div className="flex-1 flex gap-2 items-center">
                <span
                  className={cn(
                    "inline-block w-4 h-4 rounded-full bg-primary",
                    {
                      "bg-primary group-hover:bg-white group-aria-selected:bg-white":
                        s.isLive,
                      "bg-destructive": !s.isLive,
                    },
                  )}
                />
                {s.streamer.displayName}
                {s.streamer.casting && (
                  <MicVocal className="w-4 h-4 text-white/60 group-hover:text-black group-aria-selected:text-black" />
                )}
              </div>
              {s.currentHeight > 0 && (
                <div className="font-normal text-muted-foreground group-hover:text-black group-aria-selected:text-black">
                  {s.currentHeight.toFixed()}M
                </div>
              )}
            </SidebarItem>
          ))}
        </div>
        <SidebarItem
          href="/"
          className="justify-center bg-white/10"
          aria-selected={pathname === "/"}
        >
          Multiplex
        </SidebarItem>
        <SidebarItem
          href="/top"
          className="justify-center bg-white/10"
          aria-selected={pathname === "/top"}
        >
          Top climber
        </SidebarItem>
        <SidebarItem
          href="/leaderboard"
          className="justify-center bg-white/10"
          aria-selected={pathname === "/leaderboard"}
        >
          Leaderboard
        </SidebarItem>
        <Dialog>
          <DialogTrigger asChild>
            <button className="group flex font-semibold items-center justify-center bg-white/10 gap-2 px-3 py-2 rounded-md transition-all duration-75 hover:bg-primary hover:text-black aria-selected:bg-primary aria-selected:text-black">
              Donate
            </button>
          </DialogTrigger>
          <DialogContent>
            <h3 className="text-xl font-bold text-center mb-6">Donate</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button asChild>
                <a
                  href="https://matcherino.com/tournaments/149201"
                  target="_blank"
                >
                  Donate to Prizepool
                </a>
              </Button>
              <Button asChild>
                <a
                  href="https://www.gofundme.com/f/support-the-deepslip-creators"
                  target="_blank"
                >
                  Donate to Organizers
                </a>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <a
        href="https://twitter.com/PaucotMartin"
        target="_blank"
        className="block text-center"
      >
        Made with ❤ by @PaucotMartin
      </a>
    </div>
  );
};

type SidebarItemProps = ComponentProps<typeof Link>;

const SidebarItem = ({ className, ...props }: SidebarItemProps) => {
  return (
    <MotionLink
      layout
      className={cn(
        "group text-sm flex font-semibold items-center gap-2 px-3 py-2 rounded-md transition-all duration-75 hover:bg-primary hover:text-black aria-selected:bg-primary aria-selected:text-black",
        className,
      )}
      {...props}
    />
  );
};

const MotionLink = motion(Link) as any;
