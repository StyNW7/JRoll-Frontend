export interface AnimeRecommendation {
  title: string;
  image: string;
  rating: string;
  year: string;
  episodes: number;
}

export async function getCollaborativeRecommendations(
  watched_anime: string[],
  top_n: number = 7
): Promise<AnimeRecommendation[]> {
  const response = await fetch("http://127.0.0.1:5000/recommend_collaborative", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ watched_anime, top_n }),
  });

  const result = await response.json();
  return result.recommendations;
}
