import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate, NavLink } from "react-router";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import { saveOrUpdateUser } from "../utils";

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  if (loading) return <LoadingSpinner />;
  // if (user) return <Navigate to={from} replace={true} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    // 🔐 Password validation (ONLY LOGIC)
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!regex.test(password)) {
      setPasswordError(
        "Must include uppercase, lowercase & minimum 6 characters"
      );
      return;
    } else {
      setPasswordError("");
    }

    try {
      const { user } = await signIn(email, password);
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 transition-colors duration-300 bg-base-100 dark:bg-slate-950">
      <div className="flex flex-col w-full max-w-md p-6 text-gray-900 transition-all border border-gray-100 shadow-2xl bg-base-100 dark:bg-slate-900 dark:border-slate-800 rounded-3xl">

        {/* Logo */}
        <div className="flex flex-col items-center mb-4">
          <NavLink to="/" className="flex flex-col items-center group">
            <img
              className="transition-transform duration-300 w-14 h-14 group-hover:scale-110"
              src="https://i.ibb.co.com/bR2Kqky6/logo4-removebg-preview.png"
              alt="logo"
            />
            <h2 className="mt-1 text-2xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                Ticket
              </span>
              Bari
            </h2>
          </NavLink>
        </div>

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-black text-gray-600 uppercase dark:text-gray-100">
            Welcome Back
          </h1>
          <p className="mt-0.5 text-[10px] font-bold text-gray-400 uppercase">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 text-[10px] font-black text-gray-500 uppercase dark:text-gray-400">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="email@example.com"
              className="w-full px-4 py-2.5 text-sm transition-all border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-100 dark:placeholder-gray-500"
            />
          </div>

          {/* Password (DESIGN SAME) */}
          <div>
            <label className="block mb-1 text-[10px] font-black text-gray-500 uppercase dark:text-gray-400">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-2.5 text-sm transition-all border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-100 dark:placeholder-gray-500"
              />

              {/* 👁 Eye Icon (non-intrusive) */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-gray-400 cursor-pointer right-4 top-3"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Password Error */}
            {passwordError && (
              <p className="mt-1 text-[10px] font-bold text-red-500 uppercase">
                {passwordError}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 text-xs font-black text-white uppercase tracking-[0.2em] rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg shadow-emerald-200/50 hover:shadow-emerald-500/40 transition-all active:scale-95 disabled:opacity-70"
          >
            {loading ? (
              <TbFidgetSpinner className="m-auto text-lg animate-spin" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Google */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-100 dark:bg-slate-800"></div>
          <p className="px-3 text-[9px] font-black uppercase text-gray-300 dark:text-gray-600">
            Or social login
          </p>
          <div className="flex-1 h-px bg-gray-100 dark:bg-slate-800"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full py-2.5 space-x-3 text-xs font-bold text-gray-700 transition-all border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50 active:scale-95 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
        >
          <FcGoogle size={22} />
          <span>Continue with Google</span>
        </button>

        <p className="mt-8 text-[10px] font-bold text-center text-gray-400 uppercase">
          New to TicketBari?{" "}
          <Link
            to="/signup"
            className="text-emerald-600 hover:underline dark:text-emerald-400"
          >
            Sign Up Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
