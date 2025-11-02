import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "../app/store";

export default function DashboardPage() {
  const user = useSelector((s: RootState) => s.auth.user);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      {user ? (
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">Welcome back</p>
          <p className="font-medium mt-1">{user.name}</p>
          <p className="text-xs text-gray-500">{user.mobile}</p>
        </div>
      ) : (
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-sm">You’re not logged in.</p>
          <Link to="/login" className="inline-block mt-2 text-sm underline">
            Go to login
          </Link>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Link
          to="/play"
          className="rounded-xl border bg-white p-4 text-center shadow-sm hover:shadow"
        >
          Play
        </Link>
        <Link
          to="/rewards"
          className="rounded-xl border bg-white p-4 text-center shadow-sm hover:shadow"
        >
          Rewards
        </Link>
      </div>
    </div>
  );
}
