import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  ChevronLeft,
  MessageSquare,
  ThumbsUp,
  Share2,
  Plus,
  Info,
  Subtitles,
  Check,
} from "lucide-react"
import { StarRating } from "@/components/util/star-rating"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useNavigate, useParams } from "react-router"

// Sample anime data
const animeData = {
  id: "1",
  title: "Demon Slayer: Mugen Train",
  image: "/Images/Wallpaper/demon-slayer.png",
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
        id: "u1",
        name: "AnimeExpert",
        avatar: "/Images/Avatar/girl-1.png",
      },
      text: "This movie is absolutely stunning! The animation quality is top-notch, and the fight scenes are breathtaking.",
      rating: 5,
      upvotes: 245,
      date: "2 months ago",
    },
    {
      id: "c2",
      user: {
        id: "u2",
        name: "OtakuFan",
        avatar: "/Images/Avatar/girl-1.png",
      },
      text: "I was blown away by the animation and music. The story continues perfectly from the series.",
      rating: 4.5,
      upvotes: 128,
      date: "3 months ago",
    },
    {
      id: "c3",
      user: {
        id: "u3",
        name: "AnimeLover22",
        avatar: "/Images/Avatar/girl-1.png",
      },
      text: "Rengoku quickly became one of my favorite characters. His dedication and strength are inspiring!",
      rating: 5,
      upvotes: 97,
      date: "4 months ago",
    },
  ],
  relatedAnime: [
    {
      id: "5",
      title: "Jujutsu Kaisen 0",
      image: "/Images/Wallpaper/demon-slayer.png",
      rating: "9.3",
      year: "2021",
    },
    {
      id: "11",
      title: "One Piece Film: Red",
      image: "/Images/Wallpaper/demon-slayer.png",
      rating: "8.8",
      year: "2022",
    },
    {
      id: "8",
      title: "My Hero Academia: Heroes Rising",
      image: "/Images/Wallpaper/demon-slayer.png",
      rating: "8.9",
      year: "2019",
    },
  ],
}

export default function WatchPage() {

  const params = useParams()
  const navigate = useNavigate()
  const { id } = params

  // Video player refs and state
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showInfoDialog, setShowInfoDialog] = useState(false)

  // Video settings
  const [quality, setQuality] = useState("1080p")
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [subtitles, setSubtitles] = useState("English")

  // Handle video play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Handle video time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  // Handle video duration loaded
  const handleDurationChange = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  // Handle seeking
  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      const newVolume = value[0]
      videoRef.current.volume = newVolume
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
      if (isMuted) {
        // If unmuting, restore previous volume
        videoRef.current.volume = volume === 0 ? 1 : volume
        setVolume(volume === 0 ? 1 : volume)
      } else {
        // If muting, keep track of volume but set to 0
        videoRef.current.volume = 0
      }
    }
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (videoContainerRef.current) {
      if (!document.fullscreenElement) {
        videoContainerRef.current.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`)
        })
      } else {
        document.exitFullscreen()
      }
    }
  }

  // Format time (seconds to MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Handle mouse movement to show/hide controls
  const handleMouseMove = () => {
    setShowControls(true)

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout to hide controls after 3 seconds
    timeoutRef.current = setTimeout(() => {
      if (isPlaying && !isSettingsOpen) {
        setShowControls(false)
      }
    }, 3000)
  }

  // Handle fullscreen change event
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Simulate video loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case " ":
          e.preventDefault()
          togglePlay()
          break
        case "ArrowRight":
          e.preventDefault()
          if (videoRef.current) {
            videoRef.current.currentTime += 10
          }
          break
        case "ArrowLeft":
          e.preventDefault()
          if (videoRef.current) {
            videoRef.current.currentTime -= 10
          }
          break
        case "f":
          e.preventDefault()
          toggleFullscreen()
          break
        case "m":
          e.preventDefault()
          toggleMute()
          break
        default:
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isPlaying, isMuted])

  return (

    <div className="flex flex-col min-h-screen bg-black">

      {/* Video Player */}

      <div
        ref={videoContainerRef}
        className="relative w-full bg-black"
        style={{ height: isFullscreen ? "100vh" : "calc(100vh - 80px)" }}
        onMouseMove={handleMouseMove}
        onClick={togglePlay}
      >

        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          poster={animeData.bannerImage}
          onTimeUpdate={handleTimeUpdate}
          onDurationChange={handleDurationChange}
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          {/* In a real app, you would have actual video sources */}
          <source src="/Videos/Movie/JJK.mp4" type="video/mp4" />

          Your browser does not support the video tag.
          
        </video>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-white">Loading {animeData.title}...</p>
            </div>
          </div>
        )}

        {/* Video Controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/80 via-black/40 to-black/80 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Controls */}
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-black/20"
                  onClick={() => navigate("/")}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-white text-lg font-bold hidden md:block">{animeData.title}</h1>
                <div className="flex items-center gap-2">
                  <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-black/20">
                        <Info className="h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>{animeData.title}</DialogTitle>
                        <DialogDescription>
                          {animeData.year} • {animeData.duration} • {animeData.rating}★
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p>{animeData.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {animeData.genres.map((genre) => (
                            <Badge key={genre} variant="secondary">
                              {genre}
                            </Badge>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Director:</span> {animeData.director}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Studio:</span> {animeData.studio}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Center Play/Pause Button */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <AnimatePresence>
                  {!isPlaying && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-20 w-20 rounded-full bg-black/30 text-white hover:bg-black/50"
                        onClick={togglePlay}
                      >
                        <Play className="h-10 w-10" fill="white" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Controls */}
              <div className="space-y-2">
                {/* Progress Bar */}
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm">{formatTime(currentTime)}</span>
                  <div className="flex-grow">
                    <Slider
                      value={[currentTime]}
                      min={0}
                      max={duration || 100}
                      step={0.1}
                      onValueChange={handleSeek}
                      className="cursor-pointer"
                    />
                  </div>
                  <span className="text-white text-sm">{formatTime(duration)}</span>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-white hover:bg-black/20" onClick={togglePlay}>
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-black/20"
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.currentTime -= 10
                        }
                      }}
                    >
                      <SkipBack className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-black/20"
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.currentTime += 10
                        }
                      }}
                    >
                      <SkipForward className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-2 relative group">
                      <Button variant="ghost" size="icon" className="text-white hover:bg-black/20" onClick={toggleMute}>
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      </Button>
                      <div className="w-0 overflow-hidden transition-all duration-300 group-hover:w-24">
                        <Slider
                          value={[isMuted ? 0 : volume]}
                          min={0}
                          max={1}
                          step={0.01}
                          onValueChange={handleVolumeChange}
                          className="w-24"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <DropdownMenu open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-black/20">
                          <Settings className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Settings</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuLabel className="text-xs text-muted-foreground">Quality</DropdownMenuLabel>
                        {["Auto", "1080p", "720p", "480p", "360p"].map((q) => (
                          <DropdownMenuItem key={q} onClick={() => setQuality(q)}>
                            <span>{q}</span>
                            {quality === q && <Check className="h-4 w-4 ml-auto" />}
                          </DropdownMenuItem>
                        ))}

                        <DropdownMenuSeparator />

                        <DropdownMenuLabel className="text-xs text-muted-foreground">Playback Speed</DropdownMenuLabel>
                        {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                          <DropdownMenuItem
                            key={speed}
                            onClick={() => {
                              setPlaybackSpeed(speed)
                              if (videoRef.current) {
                                videoRef.current.playbackRate = speed
                              }
                            }}
                          >
                            <span>{speed === 1 ? "Normal" : `${speed}x`}</span>
                            {playbackSpeed === speed && <Check className="h-4 w-4 ml-auto" />}
                          </DropdownMenuItem>
                        ))}

                        <DropdownMenuSeparator />

                        <DropdownMenuLabel className="text-xs text-muted-foreground">Subtitles</DropdownMenuLabel>
                        {["Off", "English", "Japanese", "Spanish", "French"].map((sub) => (
                          <DropdownMenuItem key={sub} onClick={() => setSubtitles(sub)}>
                            <span>{sub}</span>
                            {subtitles === sub && <Check className="h-4 w-4 ml-auto" />}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Button variant="ghost" size="icon" className="text-white hover:bg-black/20">
                      <Subtitles className="h-5 w-5" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-black/20"
                      onClick={toggleFullscreen}
                    >
                      {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content below video (visible when not in fullscreen) */}
      {!isFullscreen && (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details and Episodes */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title and Actions */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{animeData.title}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{animeData.year}</Badge>
                    <Badge variant="outline">{animeData.duration}</Badge>
                    <div className="flex items-center">
                      <StarRating rating={Number(animeData.rating) / 2} size="sm" />
                      <span className="ml-1 text-sm">{animeData.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">My List</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="hidden sm:inline">Rate</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Share2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Share</span>
                  </Button>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-muted-foreground">{animeData.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Director:</span> {animeData.director}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Studio:</span> {animeData.studio}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Genres:</span> {animeData.genres.join(", ")}
                  </div>
                </div>
              </div>

              {/* Episodes */}
              <div>
                <h2 className="text-xl font-bold mb-4">Episodes</h2>
                <Tabs defaultValue={animeData.seasons[0].name}>
                  <TabsList className="mb-4">
                    {animeData.seasons.map((season) => (
                      <TabsTrigger key={season.name} value={season.name}>
                        {season.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {animeData.seasons.map((season) => (
                    <TabsContent key={season.name} value={season.name} className="space-y-4">
                      {season.episodes.map((episode) => (
                        <div
                          key={`${season.name}-${episode.number}`}
                          className="flex items-center p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => {
                            // In a real app, this would navigate to the specific episode
                            if (videoRef.current) {
                              videoRef.current.currentTime = 0
                              videoRef.current.play()
                              setIsPlaying(true)
                            }
                          }}
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
              </div>

              {/* Comments */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Comments</h2>
                  <a href={`/comments/${id}`}>
                    <Button variant="link" className="p-0 h-auto">
                      View All
                    </Button>
                  </a>
                </div>

                <div className="space-y-4">
                  {animeData.comments.map((comment) => (
                    <div key={comment.id} className="p-4 rounded-lg bg-muted/30">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                          <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold">{comment.user.name}</h3>
                            <StarRating rating={comment.rating} size="sm" />
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{comment.text}</p>
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                              <ThumbsUp className="h-3 w-3" />
                              {comment.upvotes}
                            </button>
                            <span className="text-xs text-muted-foreground">{comment.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Add Comment
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Related Anime */}
            <div>
              <h2 className="text-xl font-bold mb-4">More Like This</h2>
              <div className="space-y-4">
                {animeData.relatedAnime.map((anime) => (
                  <a key={anime.id} href={`/anime/${anime.id}`}>
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <img
                        src={anime.image || "/placeholder.svg"}
                        alt={anime.title}
                        className="w-16 h-24 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-medium line-clamp-2">{anime.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {anime.year}
                          </Badge>
                          <div className="flex items-center">
                            <StarRating rating={Number(anime.rating) / 2} size="sm" />
                            <span className="ml-1 text-xs">{anime.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
