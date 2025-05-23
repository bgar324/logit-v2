"use client";

import { useState } from "react";
import SectionHeader from "@/app/components/shared/SectionHeader";
import ProgressBar from "@/app/components/shared/ProgressBar";
import SkipButton from "@/app/components/shared/SkipButton";
import Dropdown from "@/app/components/shared/Dropdown";

import { OnboardingFormData } from "../types/onboarding";

type Step1Props = {
  data: OnboardingFormData;
  update: (fields: Partial<OnboardingFormData>) => void;
  onNext: () => void;
};

export default function Step1_AboutYou({ data, update, onNext }: Step1Props) {
  const [skippedBodyFat, setSkippedBodyFat] = useState(false);

  return (
    <div className="space-y-8">
      <ProgressBar current={1} total={4} />
      <SectionHeader
        title="About You"
        subtitle="We’ll use this info to personalize your AI feedback and baseline stats."
      />

      {/* Height */}
      <div>
        <label className="block text-sm font-medium mb-1">What’s your height? (cm)</label>
        <input
          type="number"
          value={data.height ?? ""}
          onChange={(e) => update({ height: Number(e.target.value) })}
          placeholder="e.g., 175"
          min={100}
          max={250}
          required
          className="w-full p-3 rounded-md border border-gray-300"
        />
      </div>

      {/* Weight */}
      <div>
        <label className="block text-sm font-medium mb-1">What’s your weight? (kg)</label>
        <input
          type="number"
          value={data.weight ?? ""}
          onChange={(e) => update({ weight: Number(e.target.value) })}
          placeholder="e.g., 70"
          min={30}
          max={200}
          required
          className="w-full p-3 rounded-md border border-gray-300"
        />
      </div>

      {/* Body Fat Percentage (Optional) */}
      {!skippedBodyFat ? (
        <div>
          <label className="block text-sm font-medium mb-1">
            What’s your body fat percentage? (optional)
          </label>
          <input
            type="number"
            value={data.bodyFatPercentage ?? ""}
            onChange={(e) => update({ bodyFatPercentage: Number(e.target.value) })}
            placeholder="e.g., 15"
            min={5}
            max={50}
            className="w-full p-3 rounded-md border border-gray-300"
          />
          <SkipButton onClick={() => {
            setSkippedBodyFat(true);
            update({ bodyFatPercentage: null });
          }} />
        </div>
      ) : null}

      {/* Gender */}
      <Dropdown<'male' | 'female' | 'other'>
        label="What's your gender?"
        value={data.gender as 'male' | 'female' | 'other' | null}
        onChange={(val) => update({ gender: val })}
        options={["male", "female", "other"] as const}
        required
      />

      {/* Age */}
      <div>
        <label className="block text-sm font-medium mb-1">What’s your age?</label>
        <input
          type="number"
          value={data.age ?? ""}
          onChange={(e) => update({ age: Number(e.target.value) })}
          placeholder="e.g., 25"
          min={13}
          max={100}
          required
          className="w-full p-3 rounded-md border border-gray-300"
        />
      </div>

      {/* Activity Level */}
      <Dropdown<'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'>
        label="What's your activity level?"
        value={data.activityLevel as 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active' | null}
        onChange={(val) => update({ activityLevel: val })}
        options={[
          "sedentary",
          "light",
          "moderate",
          "active",
          "very_active"
        ] as const}
        required
      />

      {/* Next Button */}
      <div className="pt-4">
        <button
          type="button"
          onClick={onNext}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-black/80 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
