import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  onRatingChange?: (rating: number) => void
  editable?: boolean
  size?: "sm" | "md" | "lg"
}

export function StarRating({ rating, onRatingChange, editable = false, size = "md" }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const getStarSize = () => {
    switch (size) {
      case "sm":
        return "h-3 w-3"
      case "lg":
        return "h-6 w-6"
      case "md":
      default:
        return "h-4 w-4"
    }
  }

  const starSize = getStarSize()

  const handleStarClick = (index: number) => {
    if (editable && onRatingChange) {
      onRatingChange(index)
    }
  }

  const handleStarHover = (index: number) => {
    if (editable) {
      setHoverRating(index)
    }
  }

  const handleMouseLeave = () => {
    if (editable) {
      setHoverRating(0)
    }
  }

  return (
    <div className="flex items-center" onMouseLeave={handleMouseLeave}>
      {[1, 2, 3, 4, 5].map((index) => {
        const isActive = hoverRating ? index <= hoverRating : index <= rating
        const isFilled = isActive ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
        const isHoverable = editable ? "cursor-pointer" : ""

        return (
          <Star
            key={index}
            className={`${starSize} ${isFilled} ${isHoverable} transition-colors`}
            onClick={() => handleStarClick(index)}
            onMouseEnter={() => handleStarHover(index)}
          />
        )
      })}
    </div>
  )
}
