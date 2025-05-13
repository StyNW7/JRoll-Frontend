import { useEffect, useRef } from "react"
import { useTheme } from "@/components/theme-provider";

export default function AnimatedBackground() {

  const { theme,  } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particles
    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      color: string
    }[] = []

    // Create particles
    const createParticles = () => {
      const particleCount = Math.min(window.innerWidth / 15, 100) // Responsive particle count

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.5 + 0.1,
          color: theme === "dark"
            ? `rgba(36, 101, 247, ${Math.random() * 0.5 + 0.1})`
            : `rgba(13, 4, 142, ${Math.random() * 0.3 + 0.05})`,
        })
      }
    }

    createParticles()

    // Animation loop
    const animate = () => {
      // Create a gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)

      if (theme === "dark") {
        gradient.addColorStop(0, "rgba(10, 10, 40, 1)")
        gradient.addColorStop(1, "rgba(20, 20, 50, 1)")
      } else {
        gradient.addColorStop(0, "rgba(240, 245, 255, 1)")
        gradient.addColorStop(1, "rgba(230, 240, 255, 1)")
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      // Draw connecting lines between nearby particles
      particles.forEach((particle, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x
          const dy = particle.y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = theme === "dark"
              ? `rgba(36, 101, 255, ${0.1 * (1 - distance / 100)})`
              : `rgba(13, 4, 142, ${0.05 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" aria-hidden="true" />
}
