import config from "@/config";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const streamerPages: MetadataRoute.Sitemap = config.streamers.map((s) => ({
    url: `https://deepslip.tv/${s.twitch}`,
    lastModified: new Date(),
    priority: 0.8,
    changeFrequency: "always",
  }));

  return [
    {
      url: "https://deepslip.tv",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
    {
      url: "https://deepslip.tv/leaderboard",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.9,
    },
    {
      url: "https://deepslip.tv/top",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.6,
    },
    ...streamerPages,
  ];
}
