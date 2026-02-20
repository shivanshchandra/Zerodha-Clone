import { useEffect, useState } from "react";
import api from "../../api";

export default function Login({ onDone, initialEmail = "", initialPassword = "" }) {
  const [form, setForm] = useState({ email: initialEmail, password: initialPassword });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ when AuthPage sends prefills after signup
  useEffect(() => {
    setForm({ email: initialEmail, password: initialPassword });
  }, [initialEmail, initialPassword]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);
      const token = res?.data?.token;
      if (!token) throw new Error("Token not received from login");

      onDone?.(token);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <label className="auth-label">Email address</label>
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={form.email}
        onChange={handleChange}
        required
        className="auth-input"
      />

      <label className="auth-label">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={form.password}
        onChange={handleChange}
        required
        className="auth-input"
      />

      {error ? <p className="auth-error">{error}</p> : null}

      <button type="submit" className="auth-btn" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}