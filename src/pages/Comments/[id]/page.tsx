import type React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Loader2, // Added for loading state
} from "lucide-react";
import { StarRating } from "@/components/util/star-rating";

import { useParams, useNavigate } from "react-router-dom";

// Toxic Classification Function
import { classifyCommentText } from "../../../utility/api";

// Import Firebase functions you use
import {
  ref,
  onValue,
  push,
  set,
  update,
  serverTimestamp,
  get, // For one-time data read
} from "firebase/database";
import {
  onAuthStateChanged,
  type User as FirebaseUser, // CORRECTED: type-only import
} from "firebase/auth";

// Import your initialized database and auth instances
import { db, auth } from "../../../firebase.ts"; // Make sure 'auth' is exported from this file

// Sample anime data (remains the same for this example)
const animeData = {
  id: "1",
  title: "Demon Slayer: Mugen Train",
  // ... other animeData fields
};

// Interface for the user object within a comment
interface CommentUserInfo {
  id: string;
  name: string;
  avatar: string;
}

interface Comment {
  id: string;
  user: CommentUserInfo;
  title: string;
  text: string;
  rating: number;
  upvotes: number;
  downvotes: number;
  date: number | string;
  isSpoiler: boolean;
  isToxic: boolean;
  replies: number;
  originalId?: string;
}

// Interface for the user profile data stored in /Regist/{authUid}
interface UserProfile {
  UserID: string;
  fullName: string;
  email?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  avatarUrl?: string; // Added for potential use
}

export default function CommentsPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { id: animeId } = params;

  const [currentAuthUser, setCurrentAuthUser] = useState<FirebaseUser | null>(
    null
  );
  const [currentUserProfile, setCurrentUserProfile] =
    useState<UserProfile | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const [comments, setComments] = useState<Comment[]>([]);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [userVotes, setUserVotes] = useState<
    Record<string, "up" | "down" | null>
  >({});

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [hideSpoilers, setHideSpoilers] = useState(true);
  const [hideToxic, setHideToxic] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 6; // This should be used

  // Checking Toxic Comment when Submit
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error" | "moderation";
    text: string;
  } | null>(null);

  const [newComment, setNewComment] = useState({
    title: "",
    text: "",
    rating: 5,
    isSpoiler: false,
  });

  useEffect(() => {
    setIsLoadingAuth(true);
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentAuthUser(user);
        if (db) {
          const userProfileRef = ref(db, `Regist/${user.uid}`);
          try {
            const snapshot = await get(userProfileRef);
            if (snapshot.exists()) {
              setCurrentUserProfile(snapshot.val() as UserProfile);
            } else {
              console.warn(
                `User profile not found in RTDB for UID: ${user.uid} at path /Regist/${user.uid}`
              );
              setCurrentUserProfile(null);
            }
          } catch (error) {
            console.error("Error fetching user profile from RTDB:", error);
            setCurrentUserProfile(null);
          }
        } else {
          console.error(
            "Database instance (db) is not available for fetching user profile."
          );
          setCurrentUserProfile(null);
        }
      } else {
        setCurrentAuthUser(null);
        setCurrentUserProfile(null);
      }
      setIsLoadingAuth(false);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!animeId || !db) {
      console.warn(
        "Fetch Comments: Anime ID or Firebase database instance (db) is not available."
      );
      setComments([]);
      return;
    }
    const commentsRef = ref(db, `animeComments/${animeId}`);
    const unsubscribe = onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const commentsArray: Comment[] = Object.keys(data).map((key) => {
          const fbComment = data[key];
          return {
            id: key,
            user: fbComment.user || {
              id: "unknown",
              name: "Unknown User",
              avatar: "/placeholder.svg",
            },
            title: fbComment.title,
            text: fbComment.text,
            rating: fbComment.rating,
            upvotes: fbComment.upvotes,
            downvotes: fbComment.downvotes,
            date: fbComment.date,
            isSpoiler: fbComment.isSpoiler,
            isToxic: fbComment.isToxic,
            replies: fbComment.replies,
            originalId: fbComment.id,
          };
        });
        setComments(commentsArray);
      } else {
        setComments([]);
      }
    });
    return () => unsubscribe();
  }, [animeId]);

  useEffect(() => {
    let result = [...comments];
    if (searchQuery) {
      result = result.filter(
        (comment) =>
          comment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          comment.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          comment.user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (ratingFilter !== "all") {
      const minRating = Number.parseInt(ratingFilter);
      result = result.filter((comment) => comment.rating >= minRating);
    }
    if (hideSpoilers) {
      result = result.filter((comment) => !comment.isSpoiler);
    }
    if (hideToxic) {
      result = result.filter((comment) => !comment.isToxic);
    }
    result.sort((a, b) => {
      const dateA =
        typeof a.date === "string" ? Date.parse(a.date) : (a.date as number);
      const dateB =
        typeof b.date === "string" ? Date.parse(b.date) : (b.date as number);
      switch (sortBy) {
        case "newest":
          return (dateB || 0) - (dateA || 0);
        case "oldest":
          return (dateA || 0) - (dateB || 0);
        case "highest_rating":
          return b.rating - a.rating;
        case "lowest_rating":
          return a.rating - b.rating;
        case "most_upvoted":
          return b.upvotes - a.upvotes;
        case "most_controversial":
          return b.downvotes - a.downvotes;
        default:
          return 0;
      }
    });
    setFilteredComments(result);
    setCurrentPage(1);
  }, [comments, searchQuery, sortBy, ratingFilter, hideSpoilers, hideToxic]);

  const handleVote = async (commentId: string, voteType: "up" | "down") => {
    if (!animeId || !db) {
      console.error("Vote: Anime ID or database (db) not available.");
      return;
    }
    const currentVote = userVotes[commentId];
    const newUserVotes = { ...userVotes };
    if (currentVote === voteType) {
      newUserVotes[commentId] = null;
    } else {
      newUserVotes[commentId] = voteType;
    }
    setUserVotes(newUserVotes);
    const commentToUpdate = comments.find((c) => c.id === commentId);
    if (!commentToUpdate) {
      console.error("Vote: Comment to update not found locally.");
      return;
    }
    let { upvotes, downvotes } = commentToUpdate;
    if (currentVote === "up") upvotes--;
    if (currentVote === "down") downvotes--;
    if (newUserVotes[commentId] === "up") upvotes++;
    if (newUserVotes[commentId] === "down") downvotes++;
    upvotes = Math.max(0, upvotes);
    downvotes = Math.max(0, downvotes);
    const commentRef = ref(db, `animeComments/${animeId}/${commentId}`);
    try {
      await update(commentRef, { upvotes, downvotes });
    } catch (error) {
      console.error("Error updating votes in Firebase: ", error);
      setUserVotes((prevUserVotes) => ({
        ...prevUserVotes,
        [commentId]: currentVote,
      }));
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null); // Reset submit message
    console.log("handleAddComment called");

    if (!currentAuthUser || !currentUserProfile) {
      setSubmitMessage({
        type: "error",
        text: "Please log in to post a comment.",
      });
      console.error(
        "Add Comment: User not logged in or profile data not available."
      );
      return;
    }
    console.log("animeId:", animeId, "db:", db ? "available" : "unavailable");
    console.log("currentAuthUser UID:", currentAuthUser.uid);
    console.log("currentUserProfile:", currentUserProfile);

    if (!animeId || !db) {
      setSubmitMessage({
        type: "error",
        text: "Add Comment: Anime ID or Database (db) not available. Comment not sent.",
      });
      alert(
        "Error: Could not post comment. Please try again later. (Reason: Config error)"
      );
      return;
    }

    const title = newComment.title.trim();
    const text = newComment.text.trim();

    if (!title || !text) {
      setSubmitMessage({
        type: "error",
        text: "Title and review text cannot be empty.",
      });
      return;
    }

    setIsSubmitting(true); // AI Reading

    try {
      // Call API for Classification
      const commentFullText = `${title}. ${text}`;
      const classificationResult = await classifyCommentText(commentFullText);

      // 3. Siapkan Data Komentar dengan Hasil dari AI
      const userForComment: CommentUserInfo = {
        id: currentUserProfile.UserID,
        name: currentUserProfile.fullName,
        avatar:
          currentUserProfile.avatarUrl || "/Images/Avatar/default-user.png",
      };

      const commentDataToSave = {
        user: userForComment,
        title: title,
        text: text,
        rating: newComment.rating,
        upvotes: 0,
        downvotes: 0,
        date: serverTimestamp(), // Gunakan timestamp server Firebase
        isSpoiler: newComment.isSpoiler,
        isToxic: classificationResult.isToxic, // Classfication Result
        replies: 0,
      };

      // Alert for user after classification
      if (classificationResult.isToxic) {
        setSubmitMessage({
          type: "moderation",
          text: `Your comment detected as "${classificationResult.label}". This comment will be hide when "Hide Toxic" toggle active.`,
        });
      } else {
        setSubmitMessage({
          type: "success",
          text: "Your review post successfully",
        });
      }

      // Save to Firebase
      const commentsPathRef = ref(db, `animeComments/${animeId}`);
      const newCommentRef = push(commentsPathRef);
      await set(newCommentRef, commentDataToSave);

      console.log("Comment successfully classified and added to Firebase!");

      // Reset Form
      setNewComment({
        title: "",
        text: "",
        rating: 5,
        isSpoiler: false,
      });
    } catch (error) {
      console.error("Error processing comment: ", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      setSubmitMessage({ type: "error", text: `Error: ${errorMessage}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate pagination
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  // CORRECTED: Ensure currentComments is defined here
  const currentComments = filteredComments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );
  const totalPages = Math.ceil(filteredComments.length / commentsPerPage); // <--- DEFINITION OF totalPages

  // Animation variants - DEFINED
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const formatDateForDisplay = (date: number | string): string => {
    if (typeof date === "number") {
      return new Date(date).toLocaleDateString();
    }
    if (typeof date === "string") {
      const d = new Date(date);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString();
      }
      return date;
    }
    return "Invalid date";
  };

  if (isLoadingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow">
        {/* Header Section */}
        <section className="bg-muted/30 dark:bg-muted/10 py-8">
          {/* ... (Your Header JSX, ensure animeData.title and filteredComments.length are valid) ... */}
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() =>
                      navigate(animeId ? `/anime/${animeId}` : "/")
                    }
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
                  <Label
                    htmlFor="hide-spoilers"
                    className="text-sm whitespace-nowrap"
                  >
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
                  <Label
                    htmlFor="hide-toxic"
                    className="text-sm whitespace-nowrap"
                  >
                    Hide Toxic
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Comments Section */}
        <section className="py-8">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-1 space-y-6">
                {currentAuthUser && currentUserProfile ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Add Your Review</CardTitle>
                      <CardDescription>
                        Share your thoughts about Demon Slayer: Mugen Train
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form
                        onSubmit={handleAddComment}
                        className="space-y-4"
                        id="add-comment-form"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="comment-title">Title</Label>
                          <Input
                            id="comment-title"
                            placeholder="Brief summary of your thoughts"
                            value={newComment.title}
                            onChange={(e) =>
                              setNewComment({
                                ...newComment,
                                title: e.target.value,
                              })
                            }
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
                            onChange={(e) =>
                              setNewComment({
                                ...newComment,
                                text: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="comment-rating">Your Rating</Label>
                          <div className="flex items-center gap-2">
                            <StarRating
                              rating={newComment.rating}
                              onRatingChange={(rating) =>
                                setNewComment({ ...newComment, rating })
                              }
                              editable
                            />
                            <span className="text-sm text-muted-foreground ml-2">
                              {newComment.rating} / 5
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="comment-spoiler"
                            checked={newComment.isSpoiler}
                            onCheckedChange={(checked) =>
                              setNewComment({
                                ...newComment,
                                isSpoiler: checked,
                              })
                            }
                          />
                          <Label htmlFor="comment-spoiler">
                            Contains spoilers
                          </Label>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex flex-col items-stretch gap-2">
                      {/* Show error/success message */}
                      {submitMessage && (
                        <div
                          className={`p-3 rounded-md text-sm w-full ${
                            submitMessage.type === "error"
                              ? "bg-red-100 text-red-700 border border-red-300"
                              : submitMessage.type === "success"
                              ? "bg-green-100 text-green-700 border border-green-300"
                              : "bg-yellow-100 text-yellow-800 border border-yellow-300" // Untuk moderation
                          }`}
                        >
                          {submitMessage.text}
                        </div>
                      )}
                      <Button
                        type="submit"
                        form="add-comment-form"
                        className="w-full"
                        disabled={
                          isSubmitting ||
                          !newComment.title.trim() ||
                          !newComment.text.trim()
                        }
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Post Review"
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Join the Conversation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Please log in to post a review.
                      </p>
                      <Button
                        onClick={() => navigate("/login")}
                        className="w-full"
                      >
                        Go to Login Page
                      </Button>
                    </CardContent>
                  </Card>
                )}
                {/* Filters Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="search-comments">Search</Label>
                      <div className="relative">
                        <Input
                          id="search-comments"
                          placeholder="Search comments..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pr-10"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sort-by">Sort By</Label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger id="sort-by">
                          <SelectValue placeholder="Sort comments" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
                          <SelectItem value="highest_rating">
                            Highest Rating
                          </SelectItem>
                          <SelectItem value="lowest_rating">
                            Lowest Rating
                          </SelectItem>
                          <SelectItem value="most_upvoted">
                            Most Upvoted
                          </SelectItem>
                          <SelectItem value="most_controversial">
                            Most Controversial
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rating-filter">Rating</Label>
                      <Select
                        value={ratingFilter}
                        onValueChange={setRatingFilter}
                      >
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
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSearchQuery("");
                        setSortBy("newest");
                        setRatingFilter("all");
                      }}
                    >
                      Reset Filters
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Comments Display */}
              <div className="lg:col-span-2">
                {filteredComments.length === 0 ? (
                  <div className="text-center py-12 bg-muted/30 dark:bg-muted/10 rounded-lg">
                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      No comments found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {searchQuery ||
                      ratingFilter !== "all" ||
                      hideSpoilers ||
                      hideToxic
                        ? "Try adjusting your filters."
                        : "Be the first to share your thoughts!"}
                    </p>
                    {(hideSpoilers ||
                      hideToxic ||
                      searchQuery ||
                      ratingFilter !== "all") && (
                      <div className="flex flex-wrap justify-center gap-3">
                        {hideSpoilers && (
                          <Button
                            variant="outline"
                            onClick={() => setHideSpoilers(false)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Show Spoilers
                          </Button>
                        )}
                        {hideToxic && (
                          <Button
                            variant="outline"
                            onClick={() => setHideToxic(false)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Show Toxic Comments
                          </Button>
                        )}
                        {(searchQuery || ratingFilter !== "all") && (
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSearchQuery("");
                              setSortBy("newest");
                              setRatingFilter("all");
                            }}
                          >
                            Clear Search/Rating Filters
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <motion.div
                    className="space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* CORRECTED: Ensure currentComments is used here for mapping */}
                    {currentComments.map((comment) => (
                      <motion.div key={comment.id} variants={itemVariants}>
                        <Card className="overflow-hidden">
                          {comment.isSpoiler && (
                            <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-4 py-1 flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm font-medium text-yellow-500">
                                This review contains spoilers
                              </span>
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
                                    src={
                                      comment.user.avatar || "/placeholder.svg"
                                    }
                                    alt={comment.user.name}
                                  />
                                  <AvatarFallback>
                                    {comment.user.name
                                      ?.charAt(0)
                                      ?.toUpperCase() || "U"}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-lg">
                                    {comment.title}
                                  </CardTitle>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm font-medium">
                                      {comment.user.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      • {formatDateForDisplay(comment.date)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <StarRating rating={comment.rating} />
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-muted-foreground">
                              {comment.text}
                            </p>
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
                                  className={`h-4 w-4 ${
                                    userVotes[comment.id] === "up"
                                      ? "fill-primary"
                                      : ""
                                  }`}
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
                                  className={`h-4 w-4 ${
                                    userVotes[comment.id] === "down"
                                      ? "fill-red-500"
                                      : ""
                                  }`}
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
                              {comment.replies}{" "}
                              {comment.replies === 1 ? "reply" : "replies"}
                            </Badge>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                    {totalPages > 1 && (
                      <div className="flex justify-center mt-8">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={currentPage === 1}
                            aria-label="Previous page"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                          ).map((page) => {
                            if (
                              page === 1 ||
                              page === totalPages ||
                              (page >= currentPage - 1 &&
                                page <= currentPage + 1)
                            ) {
                              return (
                                <Button
                                  key={page}
                                  variant={
                                    currentPage === page ? "default" : "outline"
                                  }
                                  size="icon"
                                  onClick={() => setCurrentPage(page)}
                                  aria-label={`Page ${page}`}
                                  aria-current={
                                    currentPage === page ? "page" : undefined
                                  }
                                  className="w-9 h-9"
                                >
                                  {page}
                                </Button>
                              );
                            }
                            if (
                              (page === 2 && currentPage > 3) ||
                              (page === totalPages - 1 &&
                                currentPage < totalPages - 2)
                            ) {
                              return (
                                <span key={page} className="px-2">
                                  ...
                                </span>
                              );
                            }
                            return null;
                          })}
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                              )
                            }
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
  );
}
