"use client";

import config from "@/config";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useSettings } from "@/providers/settings.provider";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export const Overlay = () => {
  const { shown, setShown } = useSettings();

  const { register, watch } = useForm({
    defaultValues: {
      shown,
    },
    mode: "onChange",
  });

  const shownWatcher = watch("shown");

  useEffect(() => {
    setShown(shownWatcher);
  }, [shownWatcher, setShown]);

  return (
    <div className="w-screen fixed top-0 left-0 flex justify-end items-center p-4 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button>Settings</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Settings</SheetTitle>
          </SheetHeader>
          <form className="py-8 flex flex-col gap-y-6">
            <div>
              <div className="font-lg font-bold mb-3">Streamers</div>
              <div className="flex flex-col gap-y-2">
                {config.streamers
                  .sort((a, b) => a.displayName.localeCompare(b.displayName))
                  .map((streamer) => (
                    <div
                      key={streamer.twitch}
                      className="flex items-center space-x-2"
                    >
                      <input
                        id={streamer.twitch}
                        className="cursor-pointer peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        type="checkbox"
                        {...register("shown")}
                        value={streamer.twitch}
                      />
                      <Label htmlFor={streamer.twitch}>
                        {streamer.displayName}
                      </Label>
                    </div>
                  ))}
              </div>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};
