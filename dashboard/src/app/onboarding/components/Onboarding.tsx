"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type OnboardingLayoutProps = {
  children: React.ReactNode[];
  onStepChange?: (step: number) => void;
};

export default function Onboarding({ children, onStepChange }: OnboardingLayoutProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerTop = container.getBoundingClientRect().top;
      let newStep = 1;

      stepRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const elementTop = ref.getBoundingClientRect().top - containerTop;
        if (elementTop <= container.clientHeight * 0.3) {
          newStep = index + 1;
        }
      });

      if (newStep !== currentStep) {
        setCurrentStep(newStep);
        onStepChange?.(newStep);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentStep, onStepChange]);

  return (
    <div className="flex-1 relative ml-[40vw]">
      {/* Fixed Progress Bar */}
      <div className="fixed top-0 left-[40vw] right-0 h-2 bg-gray-800 z-10">
        <motion.div 
          className="h-full bg-blue-500"
          initial={{ width: '25%' }}
          animate={{ width: `${(currentStep / children.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Scrollable Content */}
      <motion.div
        ref={containerRef}
        className="h-screen overflow-y-auto bg-black py-2 px-6 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0, duration: 1 }}
      >
        {children.map((child, index) => (
          <div 
            key={index}
            ref={(el: HTMLDivElement | null) => { stepRefs.current[index] = el; }}
            className="min-h-screen py-16 flex items-center"
          >
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
