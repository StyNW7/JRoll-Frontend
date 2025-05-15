import { useState } from "react"
import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { useTheme } from "../theme-provider"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  accentColor?: string
}

export default function FeatureCard({
  icon,
  title,
  description,
  accentColor = "rgba(120, 120, 255, 0.5)",
}: FeatureCardProps) {
    
  const [isHovered, setIsHovered] = useState(false)
  const { theme  } = useTheme();
  const isDark = theme === "dark"

  // Adjust accent color opacity for dark mode
  const adjustedAccentColor = isDark
    ? accentColor.replace(/rgba$$(\d+),\s*(\d+),\s*(\d+),\s*[\d.]+$$/, "rgba($1, $2, $3, 0.3)")
    : accentColor

  return (
    <motion.div
      className="relative group h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="h-full overflow-hidden bg-background/60 backdrop-blur-sm border transition-all duration-300 hover:shadow-lg dark:bg-background/80">
        <div className="p-6 h-full flex flex-col relative z-10">
          <div
            className="text-primary mb-4 p-3 rounded-xl inline-flex items-center justify-center self-start"
            style={{
              background: `linear-gradient(135deg, ${adjustedAccentColor}20 0%, transparent 100%)`,
              border: `1px solid ${adjustedAccentColor}30`,
            }}
          >
            {icon}
          </div>

          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground flex-grow">{description}</p>
        </div>

        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          initial={false}
          animate={
            isHovered
              ? {
                  background: [
                    `radial-gradient(circle at 0% 0%, ${adjustedAccentColor}10 0%, transparent 50%)`,
                    `radial-gradient(circle at 100% 100%, ${adjustedAccentColor}10 0%, transparent 50%)`,
                  ],
                }
              : {}
          }
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
      </Card>
    </motion.div>
  )
}
