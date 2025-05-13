import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Eye,
  MessageSquare,
  Filter,
  Search,
} from "lucide-react"
import { StarRating } from "@/components/util/star-rating"

import { useParams, useNavigate } from "react-router-dom"

// Sample anime data
const animeData = {
  id: "1",
  title: "Demon Slayer: Mugen Train",
  image: "/Images/Card/japan.png",
  bannerImage: "/Images/Wallpaper/demon-slayer.png",
  rating: "9.7",
  year: "2021",
  duration: "117 min",
  genres: ["Action", "Fantasy", "Adventure"],
}

// Sample comments data
const commentsData = [
  {
    id: "c1",
    user: {
      id: "u1",
      name: "AnimeExpert",
      avatar: "/Images/Avatar/girl-1.png",
    },
    title: "Absolutely Stunning Animation",
    text: "This movie is absolutely stunning! The animation quality is top-notch, and the fight scenes are breathtaking. The emotional moments hit hard, especially towards the end. Definitely one of the best anime movies I've seen in recent years.",
    rating: 5,
    upvotes: 245,
    downvotes: 12,
    date: "2 months ago",
    isSpoiler: false,
    isToxic: false,
    replies: 18,
  },
  {
    id: "c2",
    user: {
      id: "u2",
      name: "OtakuFan",
      avatar: "/Images/Avatar/girl-1.png",
    },
    title: "Great Continuation of the Series",
    text: "I was blown away by the animation and music. The story continues perfectly from the series and sets up the next arc beautifully.",
    rating: 4.5,
    upvotes: 128,
    downvotes: 5,
    date: "3 months ago",
    isSpoiler: false,
    isToxic: false,
    replies: 7,
  },
  {
    id: "c3",
    user: {
      id: "u3",
      name: "AnimeLover22",
      avatar: "/Images/Avatar/girl-1.png",
    },
    title: "Rengoku is Amazing",
    text: "Rengoku quickly became one of my favorite characters. His dedication and strength are inspiring!",
    rating: 5,
    upvotes: 97,
    downvotes: 3,
    date: "4 months ago",
    isSpoiler: false,
    isToxic: false,
    replies: 5,
  },
  {
    id: "c4",
    user: {
      id: "u4",
      name: "CriticAnime",
      avatar: "/Images/Avatar/girl-1.png",
    },
    title: "Good but Overrated",
    text: "While the animation is undeniably beautiful, I found the story to be somewhat predictable. It's good, but I think it's a bit overrated by the community.",
    rating: 3.5,
    upvotes: 45,
    downvotes: 32,
    date: "1 month ago",
    isSpoiler: false,
    isToxic: false,
    replies: 24,
  },
  {
    id: "c5",
    user: {
      id: "u5",
      name: "MangaReader",
      avatar: "/Images/Avatar/girl-1.png",
    },
    title: "SPOILER: About the Ending",
    text: "I can't believe they killed off Rengoku! The fight with Akaza was amazing, but I was devastated when Rengoku died. I really thought he would survive somehow.",
    rating: 4,
    upvotes: 67,
    downvotes: 8,
    date: "2 months ago",
    isSpoiler: true,
    isToxic: false,
    replies: 12,
  },
  {
    id: "c6",
    user: {
      id: "u6",
      name: "AnimeHater",
      avatar: "/Images/Avatar/girl-1.png",
    },
    title: "Waste of Time",
    text: "This movie is garbage. The characters are annoying, especially that yellow-haired crybaby. I don't understand why people like this trash. Anyone who enjoys this has terrible taste.",
    rating: 1,
    upvotes: 5,
    downvotes: 178,
    date: "1 month ago",
    isSpoiler: false,
    isToxic: true,
    replies: 32,
  },
  {
    id: "c7",
    user: {
      id: "u7",
      name: "CasualViewer",
      avatar: "/Images/Avatar/girl-1.png",
    },
    title: "Great Introduction to Anime",
    text: "I'm not a huge anime fan, but this movie was recommended by a friend. I was pleasantly surprised by how engaging it was. The action scenes were incredible, and the story was easy to follow even without having seen the series.",
    rating: 4,
    upvotes: 56,
    downvotes: 3,
    date: "3 weeks ago",
    isSpoiler: false,
    isToxic: false,
    replies: 4,
  },
  {
    id: "c8",
    user: {
      id: "u8",
      name: "AnimeFanatic",
      avatar: "/Images/Avatar/girl-1.png",
    },
    title: "SPOILER: Akaza vs Rengoku",
    text: "The fight between Akaza and Rengoku is one of the best animated fights I've ever seen. The way Rengoku held his ground despite being outmatched was incredible. His final stand and the sunrise scene brought tears to my eyes.",
    rating: 5,
    upvotes: 112,
    downvotes: 4,
    date: "1 month ago",
    isSpoiler: true,
    isToxic: false,
    replies: 15,
  },
  {
    id: "c9",
    user: {
      id: "u9",
      name: "FirstTimeWatcher",
      avatar: "/Images/Avatar/girl-1.png",
    },
    title: "Confused but Entertained",
    text: "I watched this without seeing the series first, which was probably a mistake. I was confused about some of the characters and their relationships, but the action and animation were so good that I still enjoyed it.",
    rating: 3.5,
    upvotes: 23,
    downvotes: 5,
    date: "2 weeks ago",
    isSpoiler: false,
    isToxic: false,
    replies: 8,
  },
  {
    id: "c10",
    user: {
      id: "u10",
      name: "AnimeCritic",
      avatar: "/Images/Avatar/girl-1.png",
    },
    title: "Solid Movie with Minor Flaws",
    text: "The animation and fight scenes are spectacular, but I felt the pacing was a bit off in the middle section. The dream sequences, while important for character development, dragged on a bit too long. Still, a very good movie overall.",
    rating: 4,
    upvotes: 78,
    downvotes: 12,
    date: "1 month ago",
    isSpoiler: false,
    isToxic: false,
    replies: 6,
  },
  {
    id: "c11",
    user: {
      id: "u11",
      name: "ToxicTroll",
      avatar: "/Images/Avatar/girl-1.png",
    },
    title: "Fans Are Stupid",
    text: "Only idiots would enjoy this garbage. The animation is overrated, the story is for children, and anyone who thinks this deserves more than 1 star is clearly brain-damaged. Don't waste your time on this trash.",
    rating: 1,
    upvotes: 3,
    downvotes: 156,
    date: "2 weeks ago",
    isSpoiler: false,
    isToxic: true,
    replies: 27,
  },
  {
    id: "c12",
    user: {
      id: "u12",
      name: "SoundtrackLover",
      avatar: "/Images/Avatar/girl-1.png",
    },
    title: "Amazing Music",
    text: "The soundtrack of this movie is absolutely phenomenal. It perfectly complements the action and emotional scenes. I've been listening to it on repeat since watching the movie.",
    rating: 5,
    upvotes: 89,
    downvotes: 2,
    date: "3 weeks ago",
    isSpoiler: false,
    isToxic: false,
    replies: 9,
  },
]

export default function CommentsPage() {

  const params = useParams()
  const navigate = useNavigate()
  const { id } = params

  // State for comments
  const [comments, setComments] = useState(commentsData)
  const [filteredComments, setFilteredComments] = useState(commentsData)
  const [userVotes, setUserVotes] = useState<Record<string, "up" | "down" | null>>({})

  // State for filters
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [hideSpoilers, setHideSpoilers] = useState(true)
  const [hideToxic, setHideToxic] = useState(true)

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const commentsPerPage = 6

  // State for new comment
  const [newComment, setNewComment] = useState({
    title: "",
    text: "",
    rating: 5,
    isSpoiler: false,
  })

  // Apply filters and sorting
  useEffect(() => {
    let result = [...comments]

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (comment) =>
          comment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          comment.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          comment.user.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by rating
    if (ratingFilter !== "all") {
      const minRating = Number.parseInt(ratingFilter)
      result = result.filter((comment) => comment.rating >= minRating)
    }

    // Hide spoilers if enabled
    if (hideSpoilers) {
      result = result.filter((comment) => !comment.isSpoiler)
    }

    // Hide toxic comments if enabled
    if (hideToxic) {
      result = result.filter((comment) => !comment.isToxic)
    }

    // Sort comments
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "highest_rating":
          return b.rating - a.rating
        case "lowest_rating":
          return a.rating - b.rating
        case "most_upvoted":
          return b.upvotes - a.upvotes
        case "most_controversial":
          return b.downvotes - a.downvotes
        default:
          return 0
      }
    })

    setFilteredComments(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [comments, searchQuery, sortBy, ratingFilter, hideSpoilers, hideToxic])

  // Handle voting
  const handleVote = (commentId: string, voteType: "up" | "down") => {
    const currentVote = userVotes[commentId]

    // Update user votes state
    const newUserVotes = { ...userVotes }

    if (currentVote === voteType) {
      // User is clicking the same vote button again, so remove their vote
      newUserVotes[commentId] = null
    } else {
      // User is voting for the first time or changing their vote
      newUserVotes[commentId] = voteType
    }

    setUserVotes(newUserVotes)

    // Update comment votes
    setComments(
      comments.map((comment) => {
        if (comment.id !== commentId) return comment

        let upvotes = comment.upvotes
        let downvotes = comment.downvotes

        // Remove previous vote if any
        if (currentVote === "up") upvotes--
        if (currentVote === "down") downvotes--

        // Add new vote if not removing
        if (currentVote !== voteType) {
          if (voteType === "up") upvotes++
          if (voteType === "down") downvotes++
        }

        return {
          ...comment,
          upvotes,
          downvotes,
        }
      }),
    )
  }

  // Handle adding a new comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newComment.title.trim() || !newComment.text.trim()) {
      return // Don't submit empty comments
    }

    const newCommentObj = {
      id: `c${comments.length + 1}`,
      user: {
        id: "current-user",
        name: "You",
        avatar: "/Images/Avatar/girl-1.png",
      },
      title: newComment.title,
      text: newComment.text,
      rating: newComment.rating,
      upvotes: 0,
      downvotes: 0,
      date: "Just now",
      isSpoiler: newComment.isSpoiler,
      isToxic: false,
      replies: 0,
    }

    setComments([newCommentObj, ...comments])
    setNewComment({
      title: "",
      text: "",
      rating: 5,
      isSpoiler: false,
    })
  }

  // Calculate pagination
  const indexOfLastComment = currentPage * commentsPerPage
  const indexOfFirstComment = indexOfLastComment - commentsPerPage
  const currentComments = filteredComments.slice(indexOfFirstComment, indexOfLastComment)
  const totalPages = Math.ceil(filteredComments.length / commentsPerPage)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (

    <div className="flex min-h-screen flex-col">

      <main className="flex-grow">
        {/* Header */}
        <section className="bg-muted/30 dark:bg-muted/10 py-8">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => navigate(`/anime/${id}`)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back to Anime
                  </Button>
                </div>
                <h1 className="text-3xl font-bold mb-2">Comments & Reviews</h1>
                <p className="text-muted-foreground">
                  {animeData.title} • {filteredComments.length} comments
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Switch
                    id="hide-spoilers"
                    checked={hideSpoilers}
                    onCheckedChange={setHideSpoilers}
                    aria-label="Hide spoilers"
                  />
                  <Label htmlFor="hide-spoilers" className="text-sm whitespace-nowrap">
                    Hide Spoilers
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="hide-toxic"
                    checked={hideToxic}
                    onCheckedChange={setHideToxic}
                    aria-label="Hide toxic comments"
                  />
                  <Label htmlFor="hide-toxic" className="text-sm whitespace-nowrap">
                    Hide Toxic
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Comments */}
        <section className="py-8">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Add Comment & Filters */}
              <div className="lg:col-span-1 space-y-6">
                {/* Add Comment */}
                <Card>
                  <CardHeader>
                    <CardTitle>Add Your Review</CardTitle>
                    <CardDescription>Share your thoughts about {animeData.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddComment} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="comment-title">Title</Label>
                        <Input
                          id="comment-title"
                          placeholder="Brief summary of your thoughts"
                          value={newComment.title}
                          onChange={(e) => setNewComment({ ...newComment, title: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="comment-text">Your Review</Label>
                        <Textarea
                          id="comment-text"
                          placeholder="Share your detailed thoughts about the anime..."
                          rows={5}
                          value={newComment.text}
                          onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="comment-rating">Your Rating</Label>
                        <div className="flex items-center gap-2">
                          <StarRating
                            rating={newComment.rating}
                            onRatingChange={(rating) => setNewComment({ ...newComment, rating })}
                            editable
                          />
                          <span className="text-sm text-muted-foreground ml-2">{newComment.rating} / 5</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="comment-spoiler"
                          checked={newComment.isSpoiler}
                          onCheckedChange={(checked) => setNewComment({ ...newComment, isSpoiler: checked })}
                        />
                        <Label htmlFor="comment-spoiler">Contains spoilers</Label>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full"
                      onClick={handleAddComment}
                      disabled={!newComment.title.trim() || !newComment.text.trim()}
                    >
                      Post Review
                    </Button>
                  </CardFooter>
                </Card>

                {/* Filters */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Search */}
                    <div className="space-y-2">
                      <Label htmlFor="search-comments">Search</Label>
                      <div className="relative">
                        <Input
                          id="search-comments"
                          placeholder="Search in comments..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pr-10"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>

                    {/* Sort By */}
                    <div className="space-y-2">
                      <Label htmlFor="sort-by">Sort By</Label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger id="sort-by">
                          <SelectValue placeholder="Sort comments" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
                          <SelectItem value="highest_rating">Highest Rating</SelectItem>
                          <SelectItem value="lowest_rating">Lowest Rating</SelectItem>
                          <SelectItem value="most_upvoted">Most Upvoted</SelectItem>
                          <SelectItem value="most_controversial">Most Controversial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Rating Filter */}
                    <div className="space-y-2">
                      <Label htmlFor="rating-filter">Rating</Label>
                      <Select value={ratingFilter} onValueChange={setRatingFilter}>
                        <SelectTrigger id="rating-filter">
                          <SelectValue placeholder="Filter by rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Ratings</SelectItem>
                          <SelectItem value="5">5 Stars Only</SelectItem>
                          <SelectItem value="4">4+ Stars</SelectItem>
                          <SelectItem value="3">3+ Stars</SelectItem>
                          <SelectItem value="2">2+ Stars</SelectItem>
                          <SelectItem value="1">1+ Stars</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Reset Filters */}
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSearchQuery("")
                        setSortBy("newest")
                        setRatingFilter("all")
                      }}
                    >
                      Reset Filters
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Comments */}
              <div className="lg:col-span-2">
                {filteredComments.length === 0 ? (
                  <div className="text-center py-12 bg-muted/30 dark:bg-muted/10 rounded-lg">
                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No comments found</h3>
                    <p className="text-muted-foreground mb-6">
                      {hideSpoilers || hideToxic
                        ? "Try adjusting your filters or showing hidden comments."
                        : "Be the first to share your thoughts!"}
                    </p>
                    {(hideSpoilers || hideToxic) && (
                      <div className="flex flex-wrap justify-center gap-3">
                        {hideSpoilers && (
                          <Button variant="outline" onClick={() => setHideSpoilers(false)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Show Spoilers
                          </Button>
                        )}
                        {hideToxic && (
                          <Button variant="outline" onClick={() => setHideToxic(false)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Show Toxic Comments
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
                    {currentComments.map((comment) => (
                      <motion.div key={comment.id} variants={itemVariants}>
                        <Card className="overflow-hidden">
                          {comment.isSpoiler && (
                            <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-4 py-1 flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm font-medium text-yellow-500">This review contains spoilers</span>
                            </div>
                          )}
                          {comment.isToxic && (
                            <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-1 flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                              <span className="text-sm font-medium text-red-500">
                                This review may contain offensive content
                              </span>
                            </div>
                          )}
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage
                                    src={comment.user.avatar || "/placeholder.svg"}
                                    alt={comment.user.name}
                                  />
                                  <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-lg">{comment.title}</CardTitle>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm font-medium">{comment.user.name}</span>
                                    <span className="text-xs text-muted-foreground">• {comment.date}</span>
                                  </div>
                                </div>
                              </div>
                              <StarRating rating={comment.rating} />
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-muted-foreground">{comment.text}</p>
                          </CardContent>
                          <CardFooter className="flex justify-between pt-2">
                            <div className="flex items-center gap-4">
                              <button
                                className={`flex items-center gap-1 text-sm ${
                                  userVotes[comment.id] === "up"
                                    ? "text-primary font-medium"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                                onClick={() => handleVote(comment.id, "up")}
                                aria-label="Upvote"
                              >
                                <ThumbsUp
                                  className={`h-4 w-4 ${userVotes[comment.id] === "up" ? "fill-primary" : ""}`}
                                />
                                {comment.upvotes}
                              </button>
                              <button
                                className={`flex items-center gap-1 text-sm ${
                                  userVotes[comment.id] === "down"
                                    ? "text-red-500 font-medium"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                                onClick={() => handleVote(comment.id, "down")}
                                aria-label="Downvote"
                              >
                                <ThumbsDown
                                  className={`h-4 w-4 ${userVotes[comment.id] === "down" ? "fill-red-500" : ""}`}
                                />
                                {comment.downvotes}
                              </button>
                              <button
                                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                                aria-label="Reply"
                              >
                                <MessageSquare className="h-4 w-4" />
                                Reply
                              </button>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {comment.replies} {comment.replies === 1 ? "reply" : "replies"}
                            </Badge>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center mt-8">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            aria-label="Previous page"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>

                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                            // Show first page, last page, current page, and pages around current
                            if (
                              page === 1 ||
                              page === totalPages ||
                              (page >= currentPage - 1 && page <= currentPage + 1)
                            ) {
                              return (
                                <Button
                                  key={page}
                                  variant={currentPage === page ? "default" : "outline"}
                                  size="icon"
                                  onClick={() => setCurrentPage(page)}
                                  aria-label={`Page ${page}`}
                                  aria-current={currentPage === page ? "page" : undefined}
                                  className="w-9 h-9"
                                >
                                  {page}
                                </Button>
                              )
                            }

                            // Show ellipsis for skipped pages
                            if (
                              (page === 2 && currentPage > 3) ||
                              (page === totalPages - 1 && currentPage < totalPages - 2)
                            ) {
                              return (
                                <span key={page} className="px-2">
                                  ...
                                </span>
                              )
                            }

                            return null
                          })}

                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            aria-label="Next page"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>

  )
}
