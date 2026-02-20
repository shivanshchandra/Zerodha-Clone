import { useState } from "react";
import api from "../../api";

export default function Signup({ onSignupSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // ✅ signup only (do NOT redirect to dashboard)
      await api.post("/auth/signup", form);

      // ✅ Tell AuthPage to switch to Sign in + prefill values
      onSignupSuccess?.({ email: form.email, password: form.password });
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <label className="auth-label">Full name</label>
      <input
        type="text"
        name="name"
        placeholder="Enter name"
        value={form.name}
        onChange={handleChange}
        required
        className="auth-input"
      />

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

      <label className="auth-label">Confirm password</label>
      <input
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        className="auth-input"
      />

      {error ? <p className="auth-error">{error}</p> : null}

      <button type="submit" className="auth-btn" disabled={loading}>
        {loading ? "Signing up..." : "Sign up"}
      </button>
    </form>
  );
}