"use client";

import { useEffect, useState } from "react";
import SectionHeader from "@/app/components/shared/SectionHeader";
import ProgressBar from "@/app/components/shared/ProgressBar";
import ChipSelector from "@/app/components/shared/ChipSelector";
import TagInput from "@/app/components/shared/TagInput";

import { OnboardingFormData } from "../types/onboarding";

type Step3Props = {
  data: OnboardingFormData;
  update: (fields: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

// TDEE Estimate using Mifflin-St Jeor
const calculateTDEE = (
  weight: number,
  height: number,
  age: number,
  gender: string,
  activityLevel: string
): number => {
  const s = gender === "Male" ? 5 : gender === "Female" ? -161 : -78;
  const bmr = 10 * weight + 6.25 * height - 5 * age + s;
  const multiplier: Record<string, number> = {
    "Sedentary: Desk job": 1.2,
    "Lightly active: Light walking": 1.375,
    "Moderately active: Regular exercise": 1.55,
    "Very active: Intense daily activity": 1.725,
  };
  return Math.round(bmr * (multiplier[activityLevel] || 1.2));
};

export default function Step3_Goals({ data, update, onNext, onBack }: Step3Props) {
  const [error, setError] = useState("");
  const [tdee, setTDEE] = useState<number | null>(null);

  useEffect(() => {
    if (data.height && data.weight && data.age && data.gender && data.activityLevel) {
      const tdeeEstimate = calculateTDEE(
        data.weight,
        data.height,
        data.age,
        data.gender,
        data.activityLevel
      );
      setTDEE(tdeeEstimate);
    }
  }, [data.height, data.weight, data.age, data.gender, data.activityLevel]);

  const validate = () => {
    if (!data.weightGoal || !data.calorieIntake || data.dietaryPreferences.length === 0) {
      setError("Please complete all required fields.");
      return false;
    }

    if (tdee && (data.calorieIntake < tdee * 0.7 || data.calorieIntake > tdee * 1.5)) {
      setError("Calorie intake seems unrealistic based on your profile.");
      return false;
    }

    setError("");
    return true;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div className="space-y-8">
      <ProgressBar current={3} total={4} />
      <SectionHeader
        title="Your Goals & Nutrition"
        subtitle="This helps us determine your energy needs and tailor suggestions."
      />

      {/* Weight Goal */}
      <div>
        <label className="block text-sm font-medium mb-2">What’s your goal?</label>
        <div className="flex flex-wrap gap-4">
          {["lose", "maintain", "gain"].map((goal) => (
            <label key={goal} className="flex items-center gap-2">
              <input
                type="radio"
                name="goal"
                value={goal}
                checked={data.weightGoal === goal}
                onChange={() => update({ weightGoal: goal as OnboardingFormData["weightGoal"] })}
              />
              <span className="capitalize">{goal}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Calorie Intake */}
      <div>
        <label className="block text-sm font-medium mb-1">
          What’s your daily calorie intake? (kcal)
        </label>
        {tdee && (
          <p className="text-xs text-gray-500 mb-1">
            Based on your stats, your estimated maintenance is <strong>{tdee} kcal</strong>
          </p>
        )}
        <input
          type="number"
          value={data.calorieIntake ?? ""}
          onChange={(e) => update({ calorieIntake: parseInt(e.target.value) })}
          placeholder="e.g., 2200"
          min={1000}
          max={4000}
          required
          className="w-full p-3 border rounded-md"
        />
      </div>

      {/* Dietary Preferences */}
      <div>
        <label className="block text-sm font-medium mb-1">Do you follow any dietary styles?</label>
        <ChipSelector
          options={["Vegetarian", "Vegan", "Keto", "None"]}
          selected={data.dietaryPreferences}
          onChange={(values) => update({ dietaryPreferences: values })}
        />
      </div>

      {/* Favorite Foods */}
      <div>
        <label className="block text-sm font-medium mb-1">Foods you eat often (optional)</label>
        <TagInput
          value={data.favoriteFoods}
          onChange={(tags) => update({ favoriteFoods: tags })}
          placeholder="e.g., chicken, rice, broccoli"
          maxTags={5}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Controls */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-2 bg-black text-white rounded-md text-sm hover:bg-black/80"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
