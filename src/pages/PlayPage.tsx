import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../app/store";
import Wheel from "../components/Wheel";
import { addReward } from "../features/rewards/rewardSlice";
import { useState } from "react";
import type { Reward } from "../features/rewards/rewardSlice";

const SEGMENTS = [
  "Try Again",
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Try Again",
  "Silver",
  "Bronze",
];

export default function PlayPage() {
  const dispatch = useDispatch();
  const user = useSelector((s: RootState) => s.auth.user);

  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  const [result, setResult] = useState<{
    label: string;
    points: number;
  } | null>(null);
  const [pending, setPending] = useState<Reward | null>(null);

  const disabled = !user || loading || spinning;

  const spin = async () => {
    if (!user || disabled) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/play/spin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: user.mobile }),
      });
      if (!res.ok) throw new Error("Spin failed");
      const data = await res.json(); // { reward }

      // Hold the reward until animation ends
      setPending(data.reward as Reward);

      // --- compute landing index (handle duplicate labels on the wheel) ---
      const matches = SEGMENTS.map((s, i) =>
        s.toLowerCase() === String(data.reward.label).toLowerCase() ? i : -1
      ).filter((i) => i !== -1);

      let idx =
        matches.length > 0
          ? matches[Math.floor(Math.random() * matches.length)]
          : 0;

      // --- compute a target angle relative to the CURRENT angle ---
      const n = SEGMENTS.length;
      const per = 360 / n;
      const norm = (a: number) => ((a % 360) + 360) % 360;
      const desiredMod = norm(-(idx + 0.5) * per);
      const currentMod = norm(angle);
      let delta = desiredMod - currentMod;
      if (delta < 0) delta += 360;
      if (delta < 5) delta += 360;

      const spins = 6;
      const target = angle + spins * 360 + delta;
      setSpinning(true);
      requestAnimationFrame(() => setAngle(target));
    } catch {
      alert("Network error while spinning. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSpinEnd = () => {
    if (!spinning) return;
    setSpinning(false);

    if (pending) {
      dispatch(addReward(pending));
      setResult({ label: pending.label, points: pending.points });
      setPending(null);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Spin the Wheel</h1>

      <Wheel
        segments={SEGMENTS}
        rotationDeg={angle}
        spinning={spinning}
        onDone={onSpinEnd}
      />

      {!user ? (
        <p className="text-sm">
          You’re not logged in.{" "}
          <Link to="/login" className="underline">
            Login to play
          </Link>
        </p>
      ) : (
        <p className="text-sm text-gray-600">
          Status: {spinning ? "Spinning..." : "Ready"}
        </p>
      )}

      <button
        className="w-full rounded-lg bg-black py-2 text-white disabled:opacity-50"
        disabled={disabled}
        onClick={spin}
      >
        {loading || spinning ? "Spinning..." : "Spin Now"}
      </button>

      {result && (
        <div className="rounded-lg border bg-white p-3 text-sm shadow-sm">
          <p>
            You won: <span className="font-semibold">{result.label}</span>
            {result.points > 0 && <> (+{result.points})</>}
          </p>
          <p className="text-xs text-gray-500">
            Check the Rewards page to see history.
          </p>
        </div>
      )}
    </div>
  );
}
