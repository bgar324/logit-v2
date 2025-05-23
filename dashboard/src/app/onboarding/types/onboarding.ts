// types/onboarding.ts

export type OnboardingFormData = {
    // Step 1
    height: number | null;
    weight: number | null;
    bodyFatPercentage: number | null;
    gender: string | null;
    age: number | null;
    activityLevel: string | null;
  
    // Step 2
    gymExperience: string | null;
    gymFrequency: number | null;
    healthConditions: string[];
    workoutEnvironment: string | null;
    preferredWorkoutTime: string | null;
  
    // Step 3
    weightGoal: string | null;
    calorieIntake: number | null;
    dietaryPreferences: string[];
    favoriteFoods: string[];
  
    // Step 4
    feedbackStyle: string | null;
    calorieTrackingFrequency: string | null;
  };
  