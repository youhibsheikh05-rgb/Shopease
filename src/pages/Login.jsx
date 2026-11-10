import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.auth);
  const [creds, setCreds] = useState({ username: "emilys", password: "emilyspass" });

  const submit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(creds));
    if (res.meta.requestStatus === "fulfilled") navigate("/products");
  };

  return (
    <div className="max-w-sm mx-auto mt-20 px-5">
      <div className="bg-white rounded-3xl border border-stone-200/70 p-8 shadow-[0_20px_50px_-30px_rgba(28,25,23,0.3)]">
        <h2 className="font-display text-3xl mb-1">Welcome back</h2>
        <p className="text-sm text-stone-500 mb-6">Sign in to continue shopping.</p>
        <form onSubmit={submit} className="space-y-3">
          <input value={creds.username} onChange={(e) => setCreds({ ...creds, username: e.target.value })}
            placeholder="Username"
            className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-cream focus:outline-none focus:border-terra text-sm" />
          <input type="password" value={creds.password} onChange={(e) => setCreds({ ...creds, password: e.target.value })}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-cream focus:outline-none focus:border-terra text-sm" />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button disabled={loading}
            className="w-full py-3 rounded-xl bg-ink text-cream font-medium hover:bg-terra transition disabled:opacity-50">
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="text-xs text-stone-400 mt-4 text-center">Demo · emilys / emilyspass</p>
      </div>
    </div>
  );
}