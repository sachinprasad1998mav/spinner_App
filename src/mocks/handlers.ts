import { http, HttpResponse } from "msw";

const rewards: {
  id: string;
  label: string;
  points: number;
  status: "earned" | "pending";
  ts: number;
}[] = [];

const buckets = [
  { label: "Try Again", points: 0 },
  { label: "Bronze", points: 10 },
  { label: "Silver", points: 25 },
  { label: "Gold", points: 50 },
  { label: "Platinum", points: 100 },
];

const weights = [0.4, 0.25, 0.2, 0.1, 0.05];

function pickWeighted() {
  const r = crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
  let acc = 0;
  for (let i = 0; i < buckets.length; i++) {
    acc += weights[i];
    if (r < acc) return buckets[i];
  }
  return buckets[buckets.length - 1];
}

export const handlers = [
  http.post("/api/login", async ({ request }) => {
    const { mobile, otp } = (await request.json()) as {
      mobile: string;
      otp: string;
    };
    if (otp !== "123456")
      return HttpResponse.json({ message: "Invalid OTP" }, { status: 401 });
    const user = { name: `User ${mobile.slice(-4)}`, mobile };
    return HttpResponse.json({ user, token: "mock-token" });
  }),

  http.get("/api/rewards", () => HttpResponse.json({ rewards })),

  http.post("/api/play/spin", async () => {
    const pick = pickWeighted();
    const item = {
      id: crypto.randomUUID(),
      label: pick.label,
      points: pick.points,
      status: "earned" as const,
      ts: Date.now(),
    };
    rewards.unshift(item);
    return HttpResponse.json({ reward: item });
  }),
];
