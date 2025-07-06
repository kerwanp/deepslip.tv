import { Metadata } from "next";
import { TopClimber } from "./top-climber";

export const metadata: Metadata = {
  title: "Deep Slip TV - Top climber",
  description: "Follow the current top climber of the Deep Slip tower.",
};

export default function Page() {
  return <TopClimber />;
}
