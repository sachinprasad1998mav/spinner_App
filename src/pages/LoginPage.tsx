import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, otp }),
      });

      if (!res.ok) {
        setError("Invalid OTP. Try 123456");
        return;
      }

      const data = await res.json();
      dispatch(setUser(data.user));
      navigate("/");
    } catch {
      setError("Network error, please try again.");
    }
  };

  return (
    <div className="min-h-dvh grid place-items-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-sm border"
      >
        <h1 className="text-xl font-semibold mb-4 text-center">Login</h1>

        <label className="block mb-2 text-sm font-medium">Mobile Number</label>
        <input
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="e.g. 9876543210"
          className="w-full border rounded px-3 py-2 mb-3"
          required
        />

        <label className="block mb-2 text-sm font-medium">OTP</label>
        <input
          type="password"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="123456"
          className="w-full border rounded px-3 py-2 mb-4"
          required
        />

        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full bg-black text-white rounded-lg py-2 hover:opacity-90"
        >
          Login
        </button>
      </form>
    </div>
  );
}
