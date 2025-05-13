import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Play, Star, Clock, Calendar, MessageSquare, ThumbsUp, Share2, Plus, ChevronRight, Info } from "lucide-react"

import { useParams, useNavigate } from 'react-router-dom';

// Sample anime data
const animeData = [
  {
    id: "1",
    title: "Demon Slayer: Mugen Train",
    image: "/Images/Card/japan.png",
    bannerImage: "/Images/Wallpaper/demon-slayer.png",
    rating: "9.7",
    year: "2021",
    duration: "117 min",
    genres: ["Action", "Fantasy", "Adventure"],
    description:
      "After his family was brutally murdered and his sister turned into a demon, Tanjiro Kamado's journey as a demon slayer began. Tanjiro and his comrades embark on a new mission aboard the Mugen Train, on track to despair.",
    director: "Haruo Sotozaki",
    studio: "ufotable",
    isNew: false,
    seasons: [
      {
        name: "Season 1",
        episodes: [
          { number: 1, title: "Cruelty", duration: "23 min" },
          { number: 2, title: "Trainer Sakonji Urokodaki", duration: "23 min" },
          { number: 3, title: "Sabito and Makomo", duration: "23 min" },
          { number: 4, title: "Final Selection", duration: "23 min" },
          { number: 5, title: "My Own Steel", duration: "23 min" },
        ],
      },
      {
        name: "Mugen Train Arc",
        episodes: [
          { number: 1, title: "Flame Hashira Kyojuro Rengoku", duration: "23 min" },
          { number: 2, title: "Deep Sleep", duration: "23 min" },
          { number: 3, title: "Should Have Been", duration: "23 min" },
          { number: 4, title: "Insult", duration: "23 min" },
          { number: 5, title: "Move Forward!", duration: "23 min" },
          { number: 6, title: "Akaza", duration: "23 min" },
          { number: 7, title: "Set Your Heart Ablaze", duration: "23 min" },
        ],
      },
    ],
    comments: [
      {
        id: "c1",
        user: {
          name: "AnimeExpert",
          avatar: "/Images/Avatar/girl-1.png",
        },
        text: "This movie is absolutely stunning! The animation quality is top-notch, and the fight scenes are breathtaking. The emotional moments hit hard, especially towards the end. Definitely one of the best anime movies I've seen in recent years.",
        likes: 245,
        date: "2 months ago",
      },
      {
        id: "c2",
        user: {
          name: "OtakuFan",
          avatar: "/Images/Avatar/girl-1.png",
        },
        text: "I was blown away by the animation and music. The story continues perfectly from the series and sets up the next arc beautifully.",
        likes: 128,
        date: "3 months ago",
      },
      {
        id: "c3",
        user: {
          name: "AnimeLover22",
          avatar: "/Images/Avatar/girl-1.png",
        },
        text: "Rengoku quickly became one of my favorite characters. His dedication and strength are inspiring!",
        likes: 97,
        date: "4 months ago",
      },
    ],
    relatedAnime: [
      {
        id: "5",
        title: "Jujutsu Kaisen 0",
        image: "/Images/Card/japan.png",
        rating: "9.3",
        year: "2021",
        episodes: 1,
        isNew: true,
      },
      {
        id: "11",
        title: "One Piece Film: Red",
        image: "/Images/Card/japan.png",
        rating: "8.8",
        year: "2022",
        episodes: 1,
        isNew: true,
      },
      {
        id: "8",
        title: "My Hero Academia: Heroes Rising",
        image: "/Images/Card/japan.png",
        rating: "8.9",
        year: "2019",
        episodes: 1,
        isNew: false,
      },
      {
        id: "16",
        title: "Dragon Ball Super: Broly",
        image: "/Images/Card/japan.png",
        rating: "8.7",
        year: "2018",
        episodes: 1,
        isNew: false,
      },
    ],
  },
  // More anime data would be here in a real application
]

export default function AnimeDetailPage() {

  const params = useParams()
  const navigate = useNavigate();
  const { id } = params

  // Find the anime by ID
  const anime = animeData.find((a) => a.id === id)

  // State for active season
  const [, setActiveSeason] = useState(0)

  // If anime not found
  if (!anime) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Anime Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The anime you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/search")}>Back to Search</Button>
          </div>
        </main>
      </div>
    )
  }

  return (

    <div className="flex min-h-screen flex-col">

      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          {/* Banner Image */}
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${anime.bannerImage})` }}>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>

          <div className="container relative h-full flex flex-col justify-end pb-8 pt-20 z-10">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              {/* Anime Poster */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-32 md:w-48 shrink-0 rounded-lg overflow-hidden shadow-lg"
              >
                <img src={anime.image || "/placeholder.svg"} alt={anime.title} className="w-full h-auto" />
              </motion.div>

              {/* Anime Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex-grow"
              >
                {/* Title and Year */}
                <h1 className="text-2xl md:text-4xl font-bold mb-2">{anime.title}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {anime.year}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {anime.duration}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400" />
                    {anime.rating}
                  </Badge>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {anime.genres.map((genre) => (
                    <Badge key={genre} className="bg-primary/20 hover:bg-primary/30 text-foreground">
                      {genre}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-4">
                  <Button className="rounded-full px-6 py-6 h-12 bg-primary hover:bg-primary/90 text-white">
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
              {/* Main Content - Left 2/3 */}
              <div className="lg:col-span-2 space-y-8">
                {/* Synopsis */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
                  <p className="text-muted-foreground leading-relaxed">{anime.description}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground">Director</h3>
                      <p>{anime.director}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground">Studio</h3>
                      <p>{anime.studio}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground">Release Date</h3>
                      <p>{anime.year}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Episodes */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Episodes</h2>

                  <Tabs defaultValue={anime.seasons[0].name} className="w-full">
                    <TabsList className="mb-4 w-full justify-start overflow-x-auto">
                      {anime.seasons.map((season, index) => (
                        <TabsTrigger key={season.name} value={season.name} onClick={() => setActiveSeason(index)}>
                          {season.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {anime.seasons.map((season, ) => (
                      <TabsContent key={season.name} value={season.name} className="space-y-4">
                        {season.episodes.map((episode) => (
                          <div
                            key={`${season.name}-${episode.number}`}
                            className="flex items-center p-3 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mr-4">
                              <span className="font-semibold">{episode.number}</span>
                            </div>
                            <div className="flex-grow">
                              <h3 className="font-medium">{episode.title}</h3>
                              <p className="text-sm text-muted-foreground">{episode.duration}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="rounded-full">
                              <Play className="h-5 w-5" />
                            </Button>
                          </div>
                        ))}
                      </TabsContent>
                    ))}
                  </Tabs>
                </motion.div>

                {/* Comments */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Comments</h2>
                    <Button variant="ghost" className="text-sm" size="sm">
                      View All <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>

                  {/* Top Comment */}
                  <div className="bg-muted/30 dark:bg-muted/10 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage
                          src={anime.comments[0].user.avatar || "/placeholder.svg"}
                          alt={anime.comments[0].user.name}
                        />
                        <AvatarFallback>{anime.comments[0].user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold">{anime.comments[0].user.name}</h3>
                          <span className="text-xs text-muted-foreground">{anime.comments[0].date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{anime.comments[0].text}</p>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                            <ThumbsUp className="h-3 w-3" />
                            {anime.comments[0].likes}
                          </button>
                          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                            <MessageSquare className="h-3 w-3" />
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Add a Comment
                  </Button>
                </motion.div>
              </div>

              {/* Sidebar - Right 1/3 */}
              <div className="space-y-8">
                {/* Related Anime */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <h2 className="text-xl font-bold mb-4">You May Also Like</h2>
                  <div className="space-y-4">
                    {anime.relatedAnime.map((related) => (
                      <a key={related.id} href={`/anime/${related.id}`}>
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                          <img
                            src={related.image || "/placeholder.svg"}
                            alt={related.title}
                            className="w-16 h-24 object-cover rounded-md"
                          />
                          <div>
                            <h3 className="font-medium line-clamp-2">{related.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400" />
                                {related.rating}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{related.year}</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>

                {/* Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="bg-muted/30 dark:bg-muted/10 rounded-lg p-4"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="h-4 w-4 text-primary" />
                    <h2 className="text-lg font-semibold">Information</h2>
                  </div>
                  <Separator className="mb-3" />
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Type</dt>
                      <dd>Movie</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Release Date</dt>
                      <dd>{anime.year}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Duration</dt>
                      <dd>{anime.duration}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Status</dt>
                      <dd>Completed</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Studio</dt>
                      <dd>{anime.studio}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Rating</dt>
                      <dd className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400 mr-1" />
                        {anime.rating}
                      </dd>
                    </div>
                  </dl>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}
