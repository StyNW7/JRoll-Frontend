import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, Plus, Info } from "lucide-react"
import FramerSpotlight from "@/components/Landing/framer-spotlight"

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const featuredAnime = [
    {
      title: "Demon Slayer: Kimetsu no Yaiba",
      description: "Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.",
      image: "/Images/Wallpaper/demon-slayer.png",
      genre: ["Action", "Fantasy", "Adventure"],
      rating: "9.8",
    },
    {
      title: "Attack on Titan: Final Season",
      description: "The epic conclusion to the battle between Eren, the Scouts, and Marley.",
      image: "/Images/Wallpaper/ghibli.png",
      genre: ["Action", "Drama", "Fantasy"],
      rating: "9.7",
    },
    {
      title: "Jujutsu Kaisen",
      description: "Yuji Itadori joins a secret organization of Jujutsu Sorcerers to eliminate a powerful Curse.",
      image: "/Images/Wallpaper/love.png",
      genre: ["Action", "Supernatural", "Horror"],
      rating: "9.6",
    },
  ]

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredAnime.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [featuredAnime.length])

  const anime = featuredAnime[currentSlide]

  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: `url(${anime.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <FramerSpotlight />

      <div className="container relative h-full flex flex-col justify-end pb-20 pt-32">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          {/* Genres */}
          <div className="flex gap-2 mb-4">
            {anime.genre.map((genre, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/20 backdrop-blur-sm text-xs font-medium rounded-full text-primary-foreground"
              >
                {genre}
              </span>
            ))}
            <span className="px-3 py-1 bg-primary/80 backdrop-blur-sm text-xs font-medium rounded-full text-primary-foreground flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {anime.rating}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 anime-title">{anime.title}</h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">{anime.description}</p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4">
            <Button className="rounded-full px-6 py-6 h-12 bg-primary hover:bg-primary/90 text-white glow-button">
              <Play className="h-5 w-5 mr-2" fill="white" />
              Play Now
            </Button>
            <Button variant="outline" className="rounded-full px-6 py-6 h-12 border-2 hover:bg-background/50">
              <Plus className="h-5 w-5 mr-2" />
              Add to My List
            </Button>
            <Button variant="ghost" className="rounded-full px-6 py-6 h-12 hover:bg-background/50">
              <Info className="h-5 w-5 mr-2" />
              More Info
            </Button>
          </div>
        </motion.div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {featuredAnime.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? "bg-primary w-8" : "bg-muted"
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
