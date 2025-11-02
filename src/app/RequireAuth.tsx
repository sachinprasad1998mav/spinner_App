import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { type RootState } from "./store";

export default function RequireAuth() {
  const user = useSelector((s: RootState) => s.auth.user);
  const loc = useLocation();
  if (!user)
    return <Navigate to="/login" replace state={{ from: loc.pathname }} />;
  return <Outlet />;
}
