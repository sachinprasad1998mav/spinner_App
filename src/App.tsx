import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "./app/store";
import { logout } from "./features/auth/authSlice";

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((s: RootState) => s.auth.user);

  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900">
      <nav className="sticky top-0 bg-white border-b">
        <div className="mx-auto max-w-md px-4 py-3 flex items-center justify-between gap-3">
          <span className="font-semibold">Spin Rewards</span>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/">Home</Link>
            <Link to="/play">Play</Link>
            <Link to="/rewards">Rewards</Link>

            {!user ? (
              <Link to="/login" className="underline">
                Login
              </Link>
            ) : (
              <button
                onClick={() => dispatch(logout())}
                className="rounded border px-2 py-1 hover:bg-gray-50"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-md px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
