import React, { useState } from "react";
import { Link, useLocation, useNavigate, NavLink } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { imageUpload, saveOrUpdateUser } from "../utils";

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, image, email, password } = data;
    const imageFile = image[0];

    try {
      const imageURL = await imageUpload(imageFile);
      await createUser(email, password);
      await saveOrUpdateUser({ name, email, image: imageURL });
      await updateUserProfile(name, imageURL);

      navigate(from, { replace: true });
      toast.success("Signup Successful");
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
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-base-100">
      <div className="flex flex-col w-full max-w-md p-6 text-gray-900 transition-all border border-gray-100 shadow-2xl bg-base-100 rounded-3xl">

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

        <div className="mb-4 text-center">
          <h1 className="text-2xl font-black text-gray-800 uppercase">
            Create Account
          </h1>
          <p className="mt-0.5 text-[10px] font-bold text-gray-400 uppercase">
            Start your journey today
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-3">
            {/* Name */}
            <div>
              <label className="block mb-1 text-[10px] font-black text-gray-500 uppercase">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2.5 text-sm transition-all border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                {...register("name", {
                  required: "Name is required",
                  maxLength: 20,
                })}
              />
              {errors.name && (
                <p className="mt-1 text-[10px] font-bold text-red-500 uppercase italic">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Image */}
            <div>
              <label className="block mb-1 text-[10px] font-black text-gray-500 uppercase">
                Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                className="block w-full p-1 text-xs text-gray-400 border border-gray-200 cursor-pointer file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 bg-gray-50 rounded-xl"
                {...register("image", { required: "Photo is required" })}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-[10px] font-black text-gray-500 uppercase">
                Email Address
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full px-4 py-2.5 text-sm transition-all border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-[10px] font-bold text-red-500 uppercase italic">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-[10px] font-black text-gray-500 uppercase">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 text-sm transition-all border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                      message:
                        "Must include uppercase, lowercase & 6 characters",
                    },
                  })}
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-gray-400 cursor-pointer right-4 top-3"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {errors.password && (
                <p className="mt-1 text-[10px] font-bold text-red-500 uppercase italic">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-xs font-black text-white uppercase tracking-[0.2em] rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all active:scale-95 disabled:opacity-70"
          >
            {loading ? (
              <TbFidgetSpinner className="m-auto text-lg animate-spin" />
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-100"></div>
          <p className="px-3 text-[9px] font-black uppercase text-gray-300">
            Or social login
          </p>
          <div className="flex-1 h-px bg-gray-100"></div>
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full py-2.5 space-x-3 text-xs font-bold text-gray-700 transition-all border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50 active:scale-95"
        >
          <FcGoogle size={20} />
          <span>Continue with Google</span>
        </button>

        <p className="mt-6 text-[10px] font-bold tracking-widest text-center text-gray-400 uppercase">
          Member of TicketBari?{" "}
          <Link
            to="/login"
            className="text-emerald-600 hover:underline hover:text-green-700"
          >
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

