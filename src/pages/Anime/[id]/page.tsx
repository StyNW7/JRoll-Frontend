import { useState, useEffect } from "react";
// REMOVED: 'type React' is not needed
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Play, Star, Clock, Calendar, MessageSquare, ThumbsUp, Share2, Plus, ChevronRight, Info, Loader2 } from "lucide-react";

import { useParams, useNavigate } from 'react-router-dom';

// Import Firebase functions and your database instance
import { ref, get, query, orderByChild, limitToLast } from "firebase/database";
import { db } from "../../../firebase.ts"; // Adjust path to your firebase config file

// --- Interfaces for your data structure (remain the same) ---
interface Episode { number: number; title: string; duration: string; }
interface Season { name: string; episodes: Episode[]; }
interface Comment { id: string; user: { name: string; avatar: string; }; text: string; likes: number; date: number; title: string; upvotes: number; }
interface RelatedAnime { id: string; title: string; image: string; rating: string; year: string; episodes?: number; isNew?: boolean; }
interface Anime {
  id: string; title: string; image: string; bannerImage: string; rating: string; year: string; duration: string;
  genres: string[]; description: string; director: string; studio: string; isNew: boolean; seasons: Season[];
  relatedAnime: RelatedAnime[];
}


export default function AnimeDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  const [anime, setAnime] = useState<Anime | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [latestComment, setLatestComment] = useState<Comment | null>(null);

  // REMOVED: The activeSeason state is not needed by the Tabs component
  // const [, setActiveSeason] = useState(0); 

  // useEffect to fetch anime data
  useEffect(() => {
    if (!id) {
      setError("No anime ID provided.");
      setIsLoading(false);
      return;
    }
    const fetchAnimeData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const animeRef = ref(db, `anime/${id}`);
        const snapshot = await get(animeRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const formattedData = {
            ...data,
            genres: data.genres ? Object.values(data.genres) : [],
            seasons: data.seasons ? Object.values(data.seasons).map((s: any) => ({
              ...s,
              episodes: s.episodes ? Object.values(s.episodes) : []
            })) : [],
            relatedAnime: data.relatedAnime ? Object.values(data.relatedAnime) : [],
          };
          setAnime(formattedData as Anime);
        } else {
          setError("Anime not found.");
        }
      } catch (err) {
        console.error("Firebase fetch error:", err);
        setError("Failed to fetch anime data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnimeData();
  }, [id]);

  // useEffect to fetch latest comment
  useEffect(() => {
    if (!id) return;
    const fetchLatestComment = async () => {
        try {
            const commentsRef = ref(db, `animeComments/${id}`);
            const latestCommentQuery = query(commentsRef, orderByChild('date'), limitToLast(1));
            const snapshot = await get(latestCommentQuery);
            if (snapshot.exists()) {
                const commentsData = snapshot.val();
                const commentKey = Object.keys(commentsData)[0];
                const commentData = commentsData[commentKey];
                setLatestComment({ id: commentKey, ...commentData } as Comment);
            } else {
                setLatestComment(null);
            }
        } catch(err) {
            console.error("Failed to fetch latest comment:", err);
            setLatestComment(null);
        }
    };
    fetchLatestComment();
  }, [id]);

  // Helper function to format timestamp
const formatDate = (timestamp: number | string) => {
  // Coerce the input into a number.
  // This handles cases where the timestamp might be a string like "1749148704167".
  const numericTimestamp = typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp;

  // If after conversion it's not a valid number, return a fallback.
  if (isNaN(numericTimestamp)) {
    return "Invalid date";
  }

  const date = new Date(numericTimestamp);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 1) return "today";
  if (diffDays === 2) return "yesterday";
  if (diffDays <= 30) return `${diffDays} days ago`;
  
  return date.toLocaleDateString(); // Fallback to a simple date format like "6/5/2025"
};

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-lg">Loading Anime Details...</p>
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{error || "Anime Not Found"}</h1>
            <p className="text-muted-foreground mb-6">
              The anime you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/search")}>Back to Search</Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${anime.bannerImage})` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
          <div className="container relative h-full flex flex-col justify-end pb-8 pt-20 z-10">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-32 md:w-48 shrink-0 rounded-lg overflow-hidden shadow-lg">
                <img src={anime.image || "/placeholder.svg"} alt={anime.title} className="w-full h-auto" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex-grow">
                <h1 className="text-2xl md:text-4xl font-bold mb-2">{anime.title}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="flex items-center gap-1"><Calendar className="h-3 w-3" />{anime.year}</Badge>
                  <Badge variant="outline" className="flex items-center gap-1"><Clock className="h-3 w-3" />{anime.duration}</Badge>
                  <Badge variant="outline" className="flex items-center gap-1"><Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400" />{anime.rating}</Badge>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {anime.genres.map((genre) => (<Badge key={genre} className="bg-primary/20 hover:bg-primary/30 text-foreground">{genre}</Badge>))}
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
                  <Button className="rounded-full px-6 py-6 h-12 bg-primary hover:bg-primary/90 text-white" 
                    onClick={() => navigate("/watch/1")}>
                    <Play className="h-5 w-5 mr-2" fill="white" />
                    Watch Now
                  </Button>
                  <Button variant="outline" className="rounded-full px-6 py-6 h-12 border-2">
                    <Plus className="h-5 w-5 mr-2" />
                    Add to My List
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full h-12 w-12">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-8">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Synopsis */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                  <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
                  <p className="text-muted-foreground leading-relaxed">{anime.description}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                    <div><h3 className="text-sm font-semibold text-muted-foreground">Director</h3><p>{anime.director}</p></div>
                    <div><h3 className="text-sm font-semibold text-muted-foreground">Studio</h3><p>{anime.studio}</p></div>
                    <div><h3 className="text-sm font-semibold text-muted-foreground">Release Date</h3><p>{anime.year}</p></div>
                  </div>
                </motion.div>

                {/* Episodes */}
                {anime.seasons && anime.seasons.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                    <h2 className="text-2xl font-bold mb-4">Episodes</h2>
                    <Tabs defaultValue={anime.seasons[0].name} className="w-full">
                      <TabsList className="mb-4 w-full justify-start overflow-x-auto">
                        {/* REMOVED: onClick handler from TabsTrigger */}
                        {anime.seasons.map((season) => (<TabsTrigger key={season.name} value={season.name}>{season.name}</TabsTrigger>))}
                      </TabsList>
                      {anime.seasons.map((season) => (
                        <TabsContent key={season.name} value={season.name} className="space-y-4">
                          {season.episodes.map((episode) => (
                            <div key={`${season.name}-${episode.number}`} className="flex items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mr-4"><span className="font-semibold">{episode.number}</span></div>
                              <div className="flex-grow">
                                <h3 className="font-medium">{episode.title}</h3>
                                <p className="text-sm text-muted-foreground">{episode.duration}</p>
                              </div>
                              <Button variant="ghost" size="icon" className="rounded-full"><Play className="h-5 w-5" /></Button>
                            </div>
                          ))}
                        </TabsContent>
                      ))}
                    </Tabs>
                  </motion.div>
                )}
                
                {/* Comments */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Comments</h2>
                    <Button variant="ghost" className="text-sm" size="sm" onClick={() => navigate(`/comments/${anime.id}`)}>
                        View All <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                  {latestComment ? (
                    <div className="bg-muted/30 dark:bg-muted/10 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={latestComment.user.avatar || "/placeholder.svg"} alt={latestComment.user.name}/>
                          <AvatarFallback>{latestComment.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold">{latestComment.user.name}</h3>
                            <span className="text-xs text-muted-foreground">{formatDate(latestComment.date)}</span>
                          </div>
                          <p className="text-sm font-medium mb-1">{latestComment.title}</p>
                          <p className="text-sm text-muted-foreground mb-3">{latestComment.text}</p>
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ThumbsUp className="h-3 w-3" />{latestComment.upvotes}</button>
                            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><MessageSquare className="h-3 w-3" />Reply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-muted/30 dark:bg-muted/10 rounded-lg p-4 mb-4 text-center">
                        <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
                    </div>
                  )}
                  <Button variant="outline" className="w-full" onClick={() => navigate(`/comments/${anime.id}`)}>
                    Add or View All Comments
                  </Button>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {anime.relatedAnime && anime.relatedAnime.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
                    <h2 className="text-xl font-bold mb-4">You May Also Like</h2>
                    <div className="space-y-4">
                      {anime.relatedAnime.map((related) => (
                        <a key={related.id} href={`/anime/${related.id}`}>
                          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <img src={related.image || "/placeholder.svg"} alt={related.title} className="w-16 h-24 object-cover rounded-md"/>
                            <div>
                              <h3 className="font-medium line-clamp-2">{related.title}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs flex items-center gap-1"><Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400" />{related.rating}</Badge>
                                <span className="text-xs text-muted-foreground">{related.year}</span>
                              </div>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
                {/* Information Box */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }} className="bg-muted/30 dark:bg-muted/10 rounded-lg p-4">
                   <div className="flex items-center gap-2 mb-3">
                     <Info className="h-4 w-4 text-primary" />
                     <h2 className="text-lg font-semibold">Information</h2>
                   </div>
                   {/* Here we use Separator, so we need its import */}
                   <Separator className="mb-3" /> 
                   <dl className="space-y-2 text-sm">
                      <div className="flex justify-between"><dt className="text-muted-foreground">Type</dt><dd>Movie</dd></div>
                      <div className="flex justify-between"><dt className="text-muted-foreground">Release Date</dt><dd>{anime.year}</dd></div>
                      <div className="flex justify-between"><dt className="text-muted-foreground">Duration</dt><dd>{anime.duration}</dd></div>
                      <div className="flex justify-between"><dt className="text-muted-foreground">Status</dt><dd>Completed</dd></div>
                      <div className="flex justify-between"><dt className="text-muted-foreground">Studio</dt><dd>{anime.studio}</dd></div>
                      <div className="flex justify-between"><dt className="text-muted-foreground">Rating</dt><dd className="flex items-center"><Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400 mr-1" />{anime.rating}</dd></div>
                   </dl>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}