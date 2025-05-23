"use client";

import { useState } from "react";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";

type AuthFormProps = {
  isSignUp: boolean;
  setIsSignUp: (val: boolean) => void;
};

export default function AuthForm({ isSignUp, setIsSignUp }: AuthFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
            },
          },
        });
        if (error) throw error;
        setIsSuccess(true);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w-9/20 bg-black text-white p-12 flex items-center gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0, duration: 1 }}
    >
      <div className="w-full max-w-md mx-auto">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center gap-6"
          >
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-space-grotesk">Check your inbox</h2>
              <p className="text-sm text-white/60 max-w-sm">
                We've sent a confirmation email to{" "}
                <span className="text-white">{email}</span>. Click the link
                inside to get started with your fitness journey.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                setIsSignUp(false);
                setEmail("");
                setPassword("");
              }}
              className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              Back to login
            </button>
          </motion.div>
        ) : (
          <>
            <div className="flex flex-col text-center mb-8 gap-2">
              <h2 className="text-2xl font-space-grotesk">
                {isSignUp ? "Sign Up Account" : "Welcome Back"}
              </h2>
              <p className="text-sm text-white/60">
                {isSignUp
                  ? "Enter your personal data to create your account"
                  : "Ready when you are."}
              </p>
            </div>

            {isSignUp && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/20 focus:outline-none text-white"
                    required
                    placeholder="eg. Benjamin"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/20 focus:outline-none text-white"
                    required
                    placeholder="eg. Garcia"
                  />
                </div>
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-6 mt-6">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/20 focus:outline-none text-white"
                  required
                  placeholder="eg. bentgarcia05@gmail.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/20 focus:outline-none text-white pr-10"
                    required
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeClosed className="h-5 w-5 text-white/60" />
                    ) : (
                      <Eye className="h-5 w-5 text-white/60" />
                    )}
                  </button>
                </div>
                {isSignUp && (
                  <p className="text-sm text-white/60 mt-1">
                    Must be at least 8 characters
                  </p>
                )}
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-medium p-3 rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Please wait...
                  </span>
                ) : isSignUp ? (
                  "Create Account"
                ) : (
                  "Sign In"
                )}
              </button>

              <p className="text-sm text-center text-white/60">
                {isSignUp
                  ? "Already have an account? "
                  : "Don't have an account? "}
                <button
                  type="button"
                  className="text-white hover:underline cursor-pointer"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError("");
                  }}
                >
                  {isSignUp ? "Log In." : "Sign Up."}
                </button>
              </p>
            </form>
          </>
        )}
      </div>
    </motion.div>
  );
}
