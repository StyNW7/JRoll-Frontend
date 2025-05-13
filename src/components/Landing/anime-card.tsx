import { Play, Plus, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AnimeCardProps {
  title: string
  image: string
  rating?: string
  year?: string
  episodes?: number
  isNew?: boolean
}

export default function AnimeCard({ title, image, rating, year, episodes, isNew = false }: AnimeCardProps) {
  return (
    <div className="group relative anime-card rounded-lg overflow-hidden">
      {/* Image */}
      <div className="aspect-[2/3] bg-muted overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* New badge */}
      {isNew && (
        <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded z-10">NEW</div>
      )}

      {/* Rating */}
      {rating && (
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 z-10">
          <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400" />
          {rating}
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-white font-bold line-clamp-2 mb-1">{title}</h3>

        <div className="flex items-center text-xs text-gray-300 mb-3 gap-2">
          {year && <span>{year}</span>}
          {episodes && <span>{episodes} Episodes</span>}
        </div>

        <div className="flex gap-2">
          <Button size="sm" className="rounded-full w-9 h-9 p-0 bg-primary hover:bg-primary/90">
            <Play className="h-4 w-4" fill="white" />
            <span className="sr-only">Play {title}</span>
          </Button>
          <Button size="sm" variant="outline" className="rounded-full w-9 h-9 p-0 border-white/30 hover:bg-white/20">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add {title} to my list</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
