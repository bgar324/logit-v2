"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import Step1_AboutYou from "./components/Step1_AboutYou";
import Step2_Training from "./components/Step2_Training";
import Step3_Goals from "./components/Step3_Goals";
import Step4_Experience from "./components/Step4_Experience";
import OnboardingLeft from "./components/OnboardingLeft";
import Onboarding from "./components/Onboarding";
import { OnboardingFormData } from "./types/onboarding";

export default function OnboardingPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [showOnboardingForm, setShowOnboardingForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const supabase = createClient();
  const router = useRouter();

  const [formData, setFormData] = useState<OnboardingFormData>({
    height: null,
    weight: null,
    bodyFatPercentage: null,
    gender: null,
    age: null,
    activityLevel: null,
    gymExperience: null,
    gymFrequency: null,
    healthConditions: [],
    workoutEnvironment: null,
    preferredWorkoutTime: null,
    weightGoal: null,
    calorieIntake: null,
    dietaryPreferences: [],
    favoriteFoods: [],
    feedbackStyle: null,
    calorieTrackingFrequency: null,
  });

  const updateForm = (fields: Partial<typeof formData>) =>
    setFormData((prev) => ({ ...prev, ...fields }));

  const handleFinalSubmit = async () => {
    const { data: user } = await supabase.auth.getUser();
    const userId = user?.user?.id;

    if (!userId) return alert("User not authenticated");

    const { error } = await supabase
      .from("profiles")
      .update(formData)
      .eq("id", userId);

    if (error) {
      console.error(error);
      return alert("Failed to save onboarding info.");
    }

    router.push("/dashboard");
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="min-h-screen bg-black p-2 overflow-hidden">
      <div className="min-h-[calc(100vh-1rem)] flex flex-row">
        <OnboardingLeft
          isSignUp={isSignUp}
          onIntroComplete={() => setShowOnboardingForm(true)}
        />
        <AnimatePresence>
          {showOnboardingForm && (
            <Onboarding onStepChange={handleStepChange}>
              <Step1_AboutYou
                data={formData}
                update={updateForm}
              />
              <Step2_Training
                data={formData}
                update={updateForm}
              />
              <Step3_Goals
                data={formData}
                update={updateForm}
              />
              <Step4_Experience
                data={formData}
                update={updateForm}
                onSubmit={handleFinalSubmit}
              />
            </Onboarding>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
