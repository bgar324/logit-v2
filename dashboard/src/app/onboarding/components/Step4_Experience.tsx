"use client";

import { useState } from "react";
import SectionHeader from "@/app/components/shared/SectionHeader";
import ProgressBar from "@/app/components/shared/ProgressBar";
import Dropdown from "@/app/components/shared/Dropdown";

import { OnboardingFormData } from "../types/onboarding";

type Step4Props = {
  data: OnboardingFormData;
  update: (fields: Partial<OnboardingFormData>) => void;
  onSubmit: () => void;
};

const feedbackOptions = [
  { value: "detailed" as const, label: "Detailed – In-depth suggestions" },
  { value: "concise" as const, label: "Concise – Short summaries" },
  { value: "balanced" as const, label: "Balanced – Mix of both" },
];

const trackingOptions = [
  "daily",
  "weekly",
  "monthly",
] as const;

export default function Step4_Experience({ data, update, onSubmit }: Step4Props) {
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError(""); // No required fields here
    onSubmit();
  };

  return (
    <div className="space-y-8">
      <ProgressBar current={4} total={4} />
      <SectionHeader
        title="Personalizing Your Experience"
        subtitle="Tell us how you’d like your AI feedback delivered."
      />

      {/* Feedback Style */}
      <div>
        <label className="block text-sm font-medium mb-2">
          How detailed should your feedback be? (optional)
        </label>
        <div className="flex flex-col sm:flex-row gap-4">
          {feedbackOptions.map((option) => (
            <label key={option.value} className="flex items-center gap-2">
              <input
                type="radio"
                name="feedback"
                value={option.value}
                checked={data.feedbackStyle === option.value}
                onChange={() => update({ feedbackStyle: option.value as OnboardingFormData["feedbackStyle"] })}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/* Calorie Tracking Frequency */}
      <Dropdown<'daily' | 'weekly' | 'monthly'>
        label="How often do you track calories? (optional)"
        value={data.calorieTrackingFrequency as "daily" | "weekly" | "monthly" | null}
        onChange={(val) => update({ calorieTrackingFrequency: val })}
        options={trackingOptions}
        placeholder="Select a frequency"
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
          onClick={handleSubmit}
          className="px-6 py-2 bg-black text-white rounded-md text-sm hover:bg-black/80"
        >
          Finish
        </button>
      </div>
    </div>
  );
}
