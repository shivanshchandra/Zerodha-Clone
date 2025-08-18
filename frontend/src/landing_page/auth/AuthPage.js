import { useState } from "react";
import Login from "../login/Login";
import Signup from "../signup/Signup";


export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-[400px]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {isLogin ? <Login /> : <Signup />}

        <div className="text-center mt-6 text-gray-600">
          {isLogin ? (
            <p>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-purple-600 hover:underline"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-purple-600 hover:underline"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

