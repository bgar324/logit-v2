"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import LandingLeft from "./components/landing/LandingLeft";
import AuthForm from "./components/auth/AuthForm";

export default function LandingPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setIsSignUp(false);
      } else {
        setIsSignUp(true);
      }
    };

    checkSession();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-black p-2 overflow-hidden">
      <div className="min-h-[calc(100vh-1rem)] flex flex-row">
        <LandingLeft isSignUp={isSignUp} onIntroComplete={() => setShowAuthForm(true)} />
        <AnimatePresence>
          {showAuthForm && (
            <AuthForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
