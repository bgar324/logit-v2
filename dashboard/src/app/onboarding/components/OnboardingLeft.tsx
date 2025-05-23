"use client";

import { motion } from "framer-motion";

type LandingLeftProps = {
  isSignUp: boolean;
  onIntroComplete: () => void;
  step?: number;
};

export default function OnboardingLeft({
  isSignUp,
  onIntroComplete,
  step,
}: LandingLeftProps) {
  const getGradientForStep = (step?: number) => {
    switch (step) {
      case 1:
        return "radial-gradient(circle at center, #F5F3FF, #E0D4FD, #C4B5FD)";
      case 2:
        return "radial-gradient(circle at center, #FEE2E2, #FCA5A5, #EF4444)";
      case 3:
        return "radial-gradient(circle at center, #D1FAE5, #6EE7B7, #10B981)";
      case 4:
        return "radial-gradient(circle at center, #DBEAFE, #93C5FD, #3B82F6)";
      default:
        return "radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(246,245,255,1) 50%, rgba(239,236,255,1) 100%)";
    }
  };
  return (
    <motion.div
      className="relative p-12 flex flex-col justify-center rounded-4xl overflow-hidden items-center"
      initial={{ width: "100%", opacity: 0 }}
      animate={{
        width: "40%",
        opacity: 1,
      }}
      transition={{
        duration: 1,
        width: { delay: 4.8, duration: 0.8, ease: "easeInOut" },
      }}
      onAnimationComplete={() => {
        onIntroComplete();
      }}
    >
      {/* Aura Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0.9 }}
          animate={{ opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 left-0 w-full h-full opacity-90"
          style={{ background: getGradientForStep(step) }}
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 text-center">
        <motion.h1
          className="text-4xl font-medium mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          We just have a few questions
        </motion.h1>

        <motion.h2
          className="text-4xl font-light mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Hope that's okay.
        </motion.h2>

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <h3 className="text-2xl font-semibold mt-6">Get Started with Us</h3>
          <p className="text-sm text-black/60 max-w-xs mx-auto">
            Complete these easy steps to register your account
          </p>

          <div className="space-y-2 mx-auto mt-8">
            {/* Step 1 */}
            <motion.div
              className="flex items-center gap-3 p-4 bg-black/10 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3, duration: 0.5 }}
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-black/70 text-sm">
                1
              </div>
              <h4 className="font-medium text-black/60 text-sm sm:text-base">
                Create your account
              </h4>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.4, duration: 0.5 }}
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-sm">
                2
              </div>
              <h4 className="font-medium text-sm sm:text-base">
                Complete onboarding
              </h4>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className="flex items-center gap-3 p-4 bg-black/10 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.8, duration: 0.5 }}
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-black/70 text-sm">
                3
              </div>
              <h4 className="font-medium text-black/60 text-sm sm:text-base">
                Access AI fueled insights and training
              </h4>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
