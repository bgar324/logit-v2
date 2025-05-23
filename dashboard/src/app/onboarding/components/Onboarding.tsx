"use client";

import { motion } from "framer-motion";

type OnboardingLayoutProps = {
  step: number;
  children: React.ReactNode;
};

export default function Onboarding({ step, children }: OnboardingLayoutProps) {
  return (
    <motion.div
      className="w-12/20 bg-black py-2 px-6 text-white items-center gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0, duration: 1 }}
    >
      {children}
    </motion.div>
  );
}
