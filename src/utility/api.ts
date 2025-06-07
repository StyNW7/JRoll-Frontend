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

export interface AnimeSearchResult {
  id: number
  title: string
  image: string
  rating: string
  year: string
  episodes: number
  genres: string[]
  isNew: boolean
  similarity_score: number
}
export async function searchAnime(title: string): Promise<AnimeSearchResult[]> {
  const response = await fetch("http://127.0.0.1:5000/recommend_anime", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  })

  if (!response.ok) throw new Error("Failed to fetch anime recommendations")
  const result = await response.json()
  return result.recommendations
}

export interface CommentClassificationResult {
  isToxic: boolean;
  label: 'toxic' | 'non-toxic';
  confidence: number;
}

// Interface internal untuk mencocokkan respons dari backend
interface BackendClassificationItem {
  text: string;
  predicted_class: 0 | 1;
  label: 'toxic' | 'non-toxic';
  confidence: number;
}

export async function classifyCommentText(
  commentText: string
): Promise<CommentClassificationResult> {
    const response = await fetch("http://127.0.0.1:5000/toxic_classification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: commentText }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status: ${response.status}`);
    }

    const resultsArray: BackendClassificationItem[] = await response.json();

    if (!resultsArray || resultsArray.length === 0) {
      throw new Error("API did not return any classification results.");
    }
    const firstResult = resultsArray[0];

    return {
      isToxic: firstResult.label === 'toxic', 
      label: firstResult.label,
      confidence: firstResult.confidence,
    };
}
