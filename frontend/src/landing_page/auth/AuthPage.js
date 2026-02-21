import { useState } from "react";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import "./AuthPage.css";

const DASHBOARD_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3001"
    : "https://zerodha-dashboard-43bw.onrender.com";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  // ✅ store prefills after signup
  const [prefill, setPrefill] = useState({ email: "", password: "" });

  const goToDashboard = (token) => {
    window.location.href = `${DASHBOARD_URL}/?token=${encodeURIComponent(token)}`;
  };

  const handleSignupSuccess = ({ email, password }) => {
    setPrefill({ email, password });
    setIsLogin(true); // ✅ switch to Sign in screen
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">{isLogin ? "Sign in" : "Create Account"}</h1>

        {isLogin ? (
          <Login
            onDone={goToDashboard}
            initialEmail={prefill.email}
            initialPassword={prefill.password}
          />
        ) : (
          <Signup onSignupSuccess={handleSignupSuccess} />
        )}

        <p className="auth-footer">
          {isLogin ? (
            <>
              Don&apos;t have an account?{" "}
              <button className="auth-link" onClick={() => setIsLogin(false)}>
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button className="auth-link" onClick={() => setIsLogin(true)}>
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}