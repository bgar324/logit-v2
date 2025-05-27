"use client";

import { useState } from "react";
import SectionHeader from "@/app/components/shared/SectionHeader";
import ProgressBar from "@/app/components/shared/ProgressBar";
import SkipButton from "@/app/components/shared/SkipButton";
import Dropdown from "@/app/components/shared/Dropdown";
import ClusterHeader from "@/app/components/shared/ClusterHeader";
import { TooltipIcon } from "@/app/components/shared/TooltipIcon";

import { OnboardingFormData } from "../types/onboarding";

type Step1Props = {
  data: OnboardingFormData;
  update: (fields: Partial<OnboardingFormData>) => void;
  onNext: () => void;
};

export default function Step1_AboutYou({ data, update, onNext }: Step1Props) {
  const [skippedBodyFat, setSkippedBodyFat] = useState(false);

  return (
    <>
      <ProgressBar current={1} total={4} />
      <div className="space-y-4 max-w-3xl items-center mx-auto justify-center text-center">
        <SectionHeader
          title="About You"
          subtitle="We’ll use this info to personalize your AI feedback and baseline stats."
        />

        {/* Divider */}
        <div className="border-t border-white/10 my-4 mx-48"></div>

        <ClusterHeader
          title="Physical Statistics"
          subtitle="Core metrics for body composition"
        />

        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-row space-x-4">
            <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 transition focus-within:ring-2 ring-white/20">
              <label className="block text-sm font-medium mb-1">
                What’s your height? (cm)
              </label>
              <input
                type="number"
                value={data.height ?? ""}
                onChange={(e) => update({ height: Number(e.target.value) })}
                placeholder="e.g., 175"
                min={100}
                max={250}
                required
                className="w-full p-3 rounded-md border border-gray-300 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            {/* Weight */}
            <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 transition focus-within:ring-2 ring-white/20">
              <label className="block text-sm font-medium mb-1">
                What’s your weight? (kg)
              </label>
              <input
                type="number"
                value={data.weight ?? ""}
                onChange={(e) => update({ weight: Number(e.target.value) })}
                placeholder="e.g., 70"
                min={30}
                max={200}
                required
                className="w-full p-3 rounded-md border border-gray-300 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          {/* Body Fat Percentage (Optional) */}
          {!skippedBodyFat ? (
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 transition focus-within:ring-2 ring-white/20">
              <label className="block text-sm font-medium mb-1 text-center items-center">
                What’s your body fat percentage? (optional)
                <TooltipIcon message = "If you don't have your body fat percentage on hand with you right now. That's okay, we can tackle that later." />
              </label>
              <input
                type="number"
                value={data.bodyFatPercentage ?? ""}
                onChange={(e) =>
                  update({ bodyFatPercentage: Number(e.target.value) })
                }
                placeholder="e.g., 15"
                min={5}
                max={50}
                className="w-full p-3 rounded-md border border-gray-300 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <SkipButton
                onClick={() => {
                  setSkippedBodyFat(true);
                  update({ bodyFatPercentage: null });
                }}
              />
            </div>
          ) : null}
        </div>

        <div className="border-t border-white/10 my-4 mx-64"></div>

        <ClusterHeader
          title="Personal Context"
          subtitle="Lifestyle factors for metabolic and demographic tailoring"
        />

        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-row space-x-4">
            <div className="flex-1 h-full">
              <Dropdown<"Male" | "Female" | "Other / Prefer not to say">
                label="What's your gender?"
                value={
                  data.gender as
                    | "Male"
                    | "Female"
                    | "Other / Prefer not to say"
                    | null
                }
                onChange={(val) => update({ gender: val })}
                options={
                  ["Male", "Female", "Other / Prefer not to say"] as const
                }
                required
              />
            </div>

            {/* Age */}
            <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 transition focus-within:ring-2 ring-white/20">
              <label className="block text-sm font-medium mb-1">
                What’s your age?
              </label>
              <input
                type="number"
                value={data.age ?? ""}
                onChange={(e) => update({ age: Number(e.target.value) })}
                placeholder="e.g., 25"
                min={13}
                max={100}
                required
                className="w-full p-3 rounded-md border border-gray-300 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          {/* Gender */}

          {/* Activity Level */}
          <Dropdown<
            "sedentary" | "light" | "moderate" | "active" | "very_active"
          >
            label="What's your activity level?"
            value={
              data.activityLevel as
                | "sedentary"
                | "light"
                | "moderate"
                | "active"
                | "very_active"
                | null
            }
            onChange={(val) => update({ activityLevel: val })}
            options={
              [
                "sedentary",
                "light",
                "moderate",
                "active",
                "very_active",
              ] as const
            }
            required
          />
        </div>

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
    </>
  );
}
