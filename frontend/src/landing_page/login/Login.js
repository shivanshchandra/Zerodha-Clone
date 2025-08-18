import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form submitted:", form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <div className="flex items-center space-x-2">
        <input type="checkbox" id="remember" className="h-4 w-4" />
        <label htmlFor="remember" className="text-sm text-gray-600">
          Remember me
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
      >
        LOGIN
      </button>
    </form>
  );
}
