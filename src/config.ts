type Config = {
  languages: LanguageConfig[];
  streamers: Streamer[];
  twitch: {
    clientId: string;
    clientSecret: string;
  };
};

type LanguageConfig = {
  id: string;
  label: string;
};

export type Streamer = {
  displayName: string;
  language: string;
  twitch: string;
  trackmania: string;
  youtube?: string;
  casting?: boolean;
};

const config: Config = {
  twitch: {
    clientId: process.env.TWITCH_CLIENT_ID!,
    clientSecret: process.env.TWITCH_CLIENT_SECRET!,
  },
  languages: [
    {
      id: "en",
      label: "English",
    },
    {
      id: "fr",
      label: "Français",
    },
  ],
  streamers: [
    {
      displayName: "BrenTM",
      twitch: "bren_tm2",
      language: "en",
      trackmania: "5d6b14db-4d41-47a4-93e2-36a3bf229f9b",
    },
    {
      displayName: "Larstm",
      twitch: "lars_tm",
      language: "en",
      trackmania: "e3ff2309-bc24-414a-b9f1-81954236c34b",
    },
    {
      displayName: "CarlJr",
      twitch: "carljrtm",
      language: "en",
      trackmania: "0c857beb-fd95-4449-a669-21fb310cacae",
    },
    {
      displayName: "MonsieurBolet",
      twitch: "monsieurbolet",
      language: "fr",
      trackmania: "2a9faa84-5928-4eeb-a000-b44f46a50530",
    },
    {
      displayName: "Scrapie",
      twitch: "scrapie",
      language: "en",
      trackmania: "da4642f9-6acf-43fe-88b6-b120ff1308ba",
    },
    {
      displayName: "Hazardu.",
      twitch: "hazardu",
      language: "en",
      trackmania: "e5a9863b-1844-4436-a8a8-cea583888f8b",
    },
    {
      displayName: "WosileTM",
      twitch: "WosileTM",
      language: "fr",
      trackmania: "813a3917-8850-4393-92a0-cc442d9cc4a2",
    },
    {
      displayName: "AR_Mudda",
      twitch: "mudda_tm",
      language: "en",
      trackmania: "d320a237-1b0a-4069-af83-f2c09fbf042e",
    },
    {
      displayName: "TarporTM",
      twitch: "tarpor",
      language: "en",
      trackmania: "e387f7d8-afb0-4bf6-bb29-868d1a62de3b",
    },
    {
      displayName: "eLconn21",
      twitch: "elconn21",
      language: "en",
      trackmania: "d46fb45d-d422-47c9-9785-67270a311e25",
    },
    {
      displayName: "Jave.4PF",
      twitch: "JaveTheDeemon",
      language: "en",
      trackmania: "ce9e4eb6-be30-429c-9487-20ce620c2de8",
    },
    {
      displayName: "Massa.4PF",
      twitch: "massa",
      language: "en",
      trackmania: "b05db0f8-d845-47d2-b0e5-795717038ac6",
    },
    {
      displayName: "mtat_tm",
      twitch: "mtat_tm",
      language: "en",
      trackmania: "fc54a67c-7bd3-4b33-aa7d-a77f13a7b621",
    },
    {
      displayName: "cll0verr",
      twitch: "cll0verr",
      language: "en",
      trackmania: "076d23a5-51a6-48aa-8d99-9d618cd13c93",
    },
    {
      displayName: "RafTorTV",
      twitch: "raftortv",
      language: "en",
      trackmania: "0e386730-ea74-4e39-8cec-b26c6e7ebb83",
    },
    {
      displayName: "jxliano",
      twitch: "jxliano",
      language: "en",
      trackmania: "ed14ac85-1252-4cc7-8efd-49cd72938f9d",
    },
    {
      displayName: "simo_900",
      twitch: "simo_900",
      language: "en",
      trackmania: "803695f6-8319-4b8e-8c28-44856834fe3b",
    },
    {
      displayName: "Spammiej",
      twitch: "spammiej",
      language: "en",
      trackmania: "3bb0d130-637d-46a6-9c19-87fe4bda3c52",
    },
    {
      displayName: "Samifying",
      twitch: "samifying",
      language: "en",
      trackmania: "f37147a8-36f3-4c58-9577-bf0faff3aafa",
    },
    {
      displayName: "Karlberg",
      twitch: "karlberg",
      language: "en",
      trackmania: "db3affaa-a69b-4c48-aa48-0d1216e257af",
    },
    {
      displayName: "GranaDy",
      twitch: "granadyy",
      language: "en",
      trackmania: "05477e79-25fd-48c2-84c7-e1621aa46517",
    },
    {
      displayName: "SkandeaR",
      twitch: "skandear",
      language: "en",
      trackmania: "c1e8bbec-8bb3-40b3-9b0e-52e3cb36015e",
    },
    {
      displayName: "Talliebird",
      twitch: "talliebird",
      language: "en",
      trackmania: "a4699c4c-e6c1-4005-86f6-55888f854e6f",
    },
    {
      displayName: "Majijej",
      twitch: "majijej",
      language: "en",
      trackmania: "bfcf62ff-0f9e-40aa-b924-11b9c70b8a09",
    },
    {
      displayName: "Schmaniol",
      twitch: "schmaniol",
      language: "en",
      trackmania: "0fd26a9f-8f70-4f51-85e1-fe99a4ed6ffb",
    },
    {
      displayName: "Yamii._.",
      twitch: "yamiitm",
      language: "en",
      trackmania: "7dbb1f78-0360-472f-ab09-8037c89e505e",
    },
    {
      displayName: "Jnic",
      twitch: "jnic",
      language: "en",
      trackmania: "82783a8b-5e20-44c1-8ae9-b2ac123b3c40",
    },
    {
      displayName: "Vaelyn",
      twitch: "vaelyn",
      language: "en",
      trackmania: "f4f42e27-83c7-48bf-833f-f9d27904d127",
    },
  ],
};

export default config;
