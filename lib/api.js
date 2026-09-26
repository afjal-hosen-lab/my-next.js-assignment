const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const data = await response.json();

  return data;
}