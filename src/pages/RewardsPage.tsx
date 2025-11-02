import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../app/store";
import { setRewards } from "../features/rewards/rewardSlice";

export default function RewardsPage() {
  const dispatch = useDispatch();
  const rewards = useSelector((s: RootState) => s.rewards.items);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/rewards");
      if (!res.ok) return;
      const data = await res.json();
      dispatch(setRewards(data.rewards));
    })();
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Rewards</h1>

      {rewards.length === 0 ? (
        <p className="text-sm text-gray-600">
          No rewards yet. Spin the wheel to earn some!
        </p>
      ) : (
        <ul className="space-y-2">
          {rewards.map((r) => (
            <li
              key={r.id}
              className="flex items-center justify-between rounded-lg border bg-white p-3 shadow-sm"
            >
              <div>
                <p className="font-medium">{r.label}</p>
                <p className="text-xs text-gray-500">
                  {new Date(r.ts).toLocaleString()}
                </p>
              </div>
              <span className="text-sm font-semibold">+{r.points}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
