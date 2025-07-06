import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/sidebar";
import { StreamersProvider } from "@/providers/streamers.provider";
import { fetchPlayersData } from "@/lib/api";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Deep Slip TV - Multiplex",
  description: "Follow your favorite streamers climbing the Deep Slip tower.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const streamers = await fetchPlayersData();

  return (
    <html lang="en">
      <body
        className={cn(
          "dark min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <StreamersProvider players={streamers}>
          <div className="min-h-screen flex">
            <Sidebar />
            {children}
          </div>
        </StreamersProvider>
        <Analytics />
      </body>
    </html>
  );
}
