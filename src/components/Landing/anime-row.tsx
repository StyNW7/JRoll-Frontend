import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimeCard from "@/components/Landing/anime-card"
import { motion } from "framer-motion"

interface AnimeRowProps {
  title: string
  animeList: {
    title: string
    image: string
    rating?: string
    year?: string
    episodes?: number
    isNew?: boolean
  }[]
}

export default function AnimeRow({ title, animeList }: AnimeRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth

      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      })
    }
  }

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current

      // Show/hide scroll buttons based on scroll position
      setShowLeftButton(scrollLeft > 0)
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10) // 10px buffer
    }
  }

  return (
    <div className="py-8">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <Button variant="ghost" className="text-sm" size="sm">
            View All
          </Button>
        </div>

        <div className="relative group">
          {/* Left scroll button */}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm rounded-full h-10 w-10 shadow-lg transition-opacity duration-300 ${
              showLeftButton ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          {/* Anime cards row */}
          <div
            ref={rowRef}
            className="flex space-x-4 overflow-x-auto pb-4 anime-scroll hide-scrollbar"
            onScroll={handleScroll}
          >
            {animeList.map((anime, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="min-w-[180px] md:min-w-[200px]"
              >
                <AnimeCard {...anime} />
              </motion.div>
            ))}
          </div>

          {/* Right scroll button */}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm rounded-full h-10 w-10 shadow-lg transition-opacity duration-300 ${
              showRightButton ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
