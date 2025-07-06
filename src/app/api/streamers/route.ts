import { fetchPlayersData } from "@/lib/api";

export async function GET() {
  const data = await fetchPlayersData();
  return new Response(JSON.stringify(data));
}
