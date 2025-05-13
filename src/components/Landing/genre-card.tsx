import { motion } from "framer-motion"

interface GenreCardProps {
  title: string
  image: string
  animeCount: number
  href: string
}

export default function GenreCard({ title, image, animeCount, href }: GenreCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} className="relative overflow-hidden rounded-lg group">
      <a href={href} className="block">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-4">
            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
            <p className="text-sm text-gray-300">{animeCount} anime</p>
          </div>
        </div>
      </a>
    </motion.div>
  )
}
