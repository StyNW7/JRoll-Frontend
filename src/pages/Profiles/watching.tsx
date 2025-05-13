import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Plus, Pencil } from "lucide-react"
import AnimatedBackground from "@/components/util/Animated-Background"
import ModeToggle from "@/components/theme-toggle"
import { ThemeProvider } from "@/components/theme-provider"

interface Profile {
  id: string
  name: string
  avatar: string
  isKids?: boolean
}

export default function ProfilesPage() {

  const [profiles, ] = useState<Profile[]>([
    {
      id: "1",
      name: "Alex",
      avatar: "/Images/Avatar/boy-2.png",
    },
    {
      id: "2",
      name: "Taylor",
      avatar: "/Images/Avatar/girl-1.png",
    },
    {
      id: "3",
      name: "Kids",
      avatar: "/Images/Avatar/boy-1.png",
      isKids: true,
    },
  ])

  const [isManaging, setIsManaging] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null)

  const handleProfileClick = (profileId: string) => {
    if (isManaging) {
      setSelectedProfile(profileId)
    } else {
      // Navigate to home page with selected profile
      console.log(`Selected profile: ${profileId}`)
      // In a real app, you would use router.push('/') or similar
    }
  }

  return (

    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

        <div className="relative min-h-screen flex flex-col">
        {/* Animated Background */}
        <AnimatedBackground />

        {/* Header with logo and theme toggle */}
        <header className="w-full p-4 z-10">
            <div className="container flex justify-between items-center">
            <a href="/" className="flex items-center space-x-2" aria-label="JRoll Homepage">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                JRoll
                </span>
            </a>
            <ModeToggle />
            </div>
        </header>

        {/* Main content */}
        <main className="flex-grow flex items-center justify-center p-4 z-10">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl"
            >
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold">{isManaging ? "Manage Profiles" : "Who's Watching?"}</h1>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                <AnimatePresence>
                {profiles.map((profile, index) => (
                    <motion.div
                    key={profile.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={isManaging ? {} : { scale: 1.05 }}
                    className="flex flex-col items-center"
                    >
                    <button onClick={() => handleProfileClick(profile.id)} className="relative group focus:outline-none">
                        <div
                        className={`
                        relative overflow-hidden rounded-lg
                        ${isManaging ? "opacity-50 ring-4 ring-primary/50" : ""}
                        ${selectedProfile === profile.id ? "ring-4 ring-primary opacity-100" : ""}
                        `}
                        >
                        <img
                            src={profile.avatar || "/placeholder.svg"}
                            alt={profile.name}
                            className="w-full aspect-square object-cover"
                        />

                        {/* Edit overlay */}
                        {isManaging && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <Pencil className="w-8 h-8 text-white" />
                            </div>
                        )}

                        {/* Kids badge */}
                        {profile.isKids && (
                            <div className="absolute bottom-0 left-0 right-0 bg-primary/90 text-white text-xs font-bold py-1 text-center">
                            KIDS
                            </div>
                        )}
                        </div>
                    </button>
                    <p className="mt-2 font-medium text-center">{profile.name}</p>
                    </motion.div>
                ))}

                {/* Add profile button */}
                {profiles.length < 5 && (
                    <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: profiles.length * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center"
                    >
                    <button
                        className="w-full aspect-square rounded-lg border-2 border-dashed border-muted-foreground/50 flex items-center justify-center hover:border-primary/70 transition-colors"
                        aria-label="Add profile"
                    >
                        <Plus className="w-10 h-10 text-muted-foreground/70" />
                    </button>
                    <p className="mt-2 font-medium text-center text-muted-foreground">Add Profile</p>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>

            <div className="mt-12 flex justify-center">
                <Button
                variant={isManaging ? "default" : "outline"}
                className={`px-8 ${isManaging ? "bg-primary hover:bg-primary/90" : ""}`}
                onClick={() => {
                    setIsManaging(!isManaging)
                    setSelectedProfile(null)
                }}
                >
                {isManaging ? "Done" : "Manage Profiles"}
                </Button>
            </div>
            </motion.div>
        </main>

        {/* Footer */}
        <footer className="w-full p-4 text-center text-sm text-muted-foreground z-10">
            <p>© {new Date().getFullYear()} JRoll. All rights reserved.</p>
        </footer>
        </div>
    </ThemeProvider>
  )
}
