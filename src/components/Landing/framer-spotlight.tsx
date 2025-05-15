import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, animate } from "framer-motion"
import { useTheme } from "../theme-provider"

export default function FramerSpotlight() {
    
  const [isMounted, setIsMounted] = useState(false)
  const [isMouseInHero, setIsMouseInHero] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement | null>(null)
  const defaultPositionRef = useRef({ x: 0, y: 0 })
  const { theme } = useTheme();
  const isDark = theme === "dark"

  // Motion values for the spotlight position with spring physics
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Add spring physics for smoother movement
  const springX = useSpring(mouseX, { damping: 20, stiffness: 300 })
  const springY = useSpring(mouseY, { damping: 20, stiffness: 300 })

  // Update default position without causing re-renders
  const updateDefaultPosition = () => {
    if (heroRef.current) {
      const heroRect = heroRef.current.getBoundingClientRect()
      const centerX = heroRect.left + heroRect.width / 2
      const centerY = heroRect.top + heroRect.height / 3

      defaultPositionRef.current = { x: centerX, y: centerY }

      // Set initial position
      mouseX.set(centerX)
      mouseY.set(centerY)
    }
  }

  // Handle mouse enter/leave for hero section
  const handleMouseEnter = () => {
    setIsMouseInHero(true)
  }

  const handleMouseLeave = () => {
    setIsMouseInHero(false)

    // Animate back to default position
    animate(mouseX, defaultPositionRef.current.x, {
      duration: 1.2,
      ease: "easeInOut",
    })

    animate(mouseY, defaultPositionRef.current.y, {
      duration: 1.2,
      ease: "easeInOut",
    })
  }

  // Handle mouse movement only when inside hero
  const handleMouseMove = (e: MouseEvent) => {
    if (isMouseInHero) {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
  }

  // Setup effect - runs once on mount and cleans up on unmount
  useEffect(() => {
    setIsMounted(true)

    // Find the hero section element
    heroRef.current = document.getElementById("hero")

    // Initial setup
    updateDefaultPosition()

    // Event listeners
    window.addEventListener("resize", updateDefaultPosition)
    window.addEventListener("mousemove", handleMouseMove)

    if (heroRef.current) {
      heroRef.current.addEventListener("mouseenter", handleMouseEnter)
      heroRef.current.addEventListener("mouseleave", handleMouseLeave)
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateDefaultPosition)
      window.removeEventListener("mousemove", handleMouseMove)

      if (heroRef.current) {
        heroRef.current.removeEventListener("mouseenter", handleMouseEnter)
        heroRef.current.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [isMouseInHero]) // Only depend on isMouseInHero

  if (!isMounted) {
    return null
  }

  // Adjust spotlight color based on theme
  const spotlightColor = isDark ? "rgba(36, 101, 237, 0.2)" : "rgba(36, 101, 237, 0.15)"
  const secondarySpotlightColor = isDark ? "rgba(36, 101, 237, 0.15)" : "rgba(36, 101, 237, 0.1)"

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary spotlight that follows mouse/animation */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 70%)`,
          width: "1000px",
          height: "1000px",
          borderRadius: "50%",
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Secondary spotlights with independent animations */}
      <motion.div
        className="absolute pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          x: ["0%", "10%", "5%", "0%"],
          y: ["0%", "5%", "10%", "0%"],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{
          background: `radial-gradient(circle, ${secondarySpotlightColor} 0%, transparent 70%)`,
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          left: "20%",
          top: "30%",
        }}
      />

      <motion.div
        className="absolute pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          x: ["0%", "-10%", "-5%", "0%"],
          y: ["0%", "-5%", "-10%", "0%"],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{
          background: `radial-gradient(circle, ${secondarySpotlightColor} 0%, transparent 70%)`,
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          right: "20%",
          bottom: "30%",
        }}
      />
    </div>
  )
}
