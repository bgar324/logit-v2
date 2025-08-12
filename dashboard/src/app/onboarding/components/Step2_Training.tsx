"use client";

import { useState } from "react";
import SectionHeader from "@/app/components/shared/SectionHeader";
import ProgressBar from "@/app/components/shared/ProgressBar";
import Dropdown from "@/app/components/shared/Dropdown";
import ChipSelector from "@/app/components/shared/ChipSelector";

import { OnboardingFormData } from "../types/onboarding";

type Step2Props = {
  data: OnboardingFormData;
  update: (fields: Partial<OnboardingFormData>) => void;
};

const gymOptions = [
  "Novice: <3 months",
  "Beginner: 3–12 months",
  "Intermediate: 1–2 years",
  "Advanced: 2+ years",
];

const healthOptions = [
  "None",
  "Lower back issues",
  "Knee pain",
  "Shoulder pain",
  "Asthma",
];

const workoutLocations = ["Gym", "Home", "Both", "Skip"];
const workoutTimes = ["Morning", "Afternoon", "Evening", "Any time", "Skip"];

export default function Step2_Training({ data, update }: Step2Props) {
  const [error, setError] = useState("");

  const validate = () => {
    if (!data.gymExperience || data.gymFrequency === null || data.healthConditions.length === 0) {
      setError("Please complete all required fields.");
      return false;
    }
    if (data.gymFrequency < 0 || data.gymFrequency > 7) {
      setError("Training days must be between 0 and 7.");
      return false;
    }
    setError("");
    return true;
  };


  return (
    <div className="space-y-8">
      <ProgressBar current={2} total={4} />
      <SectionHeader
        title="Your Training Background"
        subtitle="Help us understand your experience so we can scale your workouts correctly."
      />

      {/* Gym Experience */}
      <Dropdown<'beginner' | 'intermediate' | 'advanced'>
        label="What's your gym experience?"
        value={data.gymExperience as "beginner" | "intermediate" | "advanced" | null}
        onChange={(val) => update({ gymExperience: val })}
        options={["beginner", "intermediate", "advanced"] as const}
        required
      />

      {/* Gym Frequency */}
      <div>
        <label className="block text-sm font-medium mb-1">How many days per week do you train?</label>
        <input
          type="range"
          min={0}
          max={7}
          value={data.gymFrequency ?? 0}
          onChange={(e) => update({ gymFrequency: parseInt(e.target.value) })}
          className="w-full"
        />
        <p className="text-sm text-gray-600 mt-1">
          You selected: <strong>{data.gymFrequency ?? 0} day(s)</strong>
        </p>
      </div>

      {/* Health Conditions */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Do you have any health conditions or injuries?
        </label>
        <ChipSelector
          options={healthOptions}
          selected={data.healthConditions}
          onChange={(val) => update({ healthConditions: val })}
        />
      </div>

      {/* Workout Environment (optional) */}
      <Dropdown<'home' | 'gym' | 'both'>
        label="Where do you work out? (optional)"
        value={data.workoutEnvironment as 'home' | 'gym' | 'both'| null}
        onChange={(val) => update({ workoutEnvironment: val })}
        options={["home", "gym", "both"] as const}
        placeholder="Select or skip"
      />

      {/* Preferred Workout Time (optional) */}
      <Dropdown<'morning' | 'afternoon' | 'evening' | 'night'>
        label="When do you prefer to work out? (optional)"
        value={data.preferredWorkoutTime as "morning" | "afternoon" | "evening" | "night" | null}
        onChange={(val) => update({ preferredWorkoutTime: val })}
        options={["morning", "afternoon", "evening", "night"] as const}
        placeholder="Select or skip"
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Controls */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={() => {}}
          className="px-6 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => {}}
          className="px-6 py-2 bg-black text-white rounded-md text-sm hover:bg-black/80"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
