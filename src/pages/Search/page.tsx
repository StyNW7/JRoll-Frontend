import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SearchIcon, Filter, Star, X, ChevronLeft, ChevronRight } from "lucide-react"
import AnimeCard from "@/components/Landing/anime-card"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { searchAnime } from "@/utility/api";
import type { AnimeSearchResult } from "@/utility/api"

import { useNavigate, useSearchParams  } from 'react-router-dom';

// Sample anime data
const animeData = [{
    id: "1",
    title: "Demon Slayer: Mugen Train",
    image: "/Images/Card/japan.png",
    rating: "9.7",
    year: "2021",
    episodes: 1,
    genres: ["Action", "Fantasy", "Adventure"],
    isNew: false,
  }]



// // Get all unique genres from anime data
const allGenres = Array.from(new Set(animeData.flatMap((anime) => anime.genres))).sort()

export default function SearchPage() {

  const navigate = useNavigate();
  const [searchParams, ] = useSearchParams();

  const [animeData, setAnimeData] = useState<AnimeSearchResult[]>([])
  const [loading, setLoading] = useState(false)

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [yearRange, setYearRange] = useState([1980, new Date().getFullYear()])
  const [minRating, setMinRating] = useState(0)
  const [showNewOnly, setShowNewOnly] = useState(false)
  const [sortBy, setSortBy] = useState("latest")

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Initialize search from URL params
  useEffect(() => {
    const query = searchParams.get("q")
    if (query) {
      setSearchQuery(query)
    }
  }, [searchParams])

  // Filter and sort anime
  const filteredAnime = animeData
    .filter((anime) => {
      // Search query filter
      if (searchQuery && !anime.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Genre filter
      if (selectedGenres.length > 0 && !selectedGenres.some((genre) => anime.genres.includes(genre))) {
        return false
      }

      // Year range filter
      const animeYear = Number.parseInt(anime.year)
      if (animeYear < yearRange[0] || animeYear > yearRange[1]) {
        return false
      }

      // Rating filter
      if (Number.parseFloat(anime.rating) < minRating) {
        return false
      }

      // New only filter
      if (showNewOnly && !anime.isNew) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return Number.parseInt(b.year) - Number.parseInt(a.year)
        case "oldest":
          return Number.parseInt(a.year) - Number.parseInt(b.year)
        case "rating":
          return Number.parseFloat(b.rating) - Number.parseFloat(a.rating)
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  // Calculate pagination
  const totalPages = Math.ceil(filteredAnime.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedAnime = filteredAnime.slice(startIndex, startIndex + itemsPerPage)

  // Handle search submit
  const handleSearch = async (e: React.FormEvent) => {
  e.preventDefault();
  setCurrentPage(1);

  const params = new URLSearchParams(searchParams.toString());
  if (searchQuery) {
    params.set("q", searchQuery);
  } else {
    params.delete("q");
  }
  navigate(`/search?${params.toString()}`);

  setLoading(true);
  try {
    const results = await searchAnime(searchQuery);
    setAnimeData(results);
  } catch (error) {
    console.error("Search error:", error);
  } finally {
    setLoading(false);
  }
};

  // Handle genre toggle
  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]))
    setCurrentPage(1)
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setSelectedGenres([])
    setYearRange([1980, new Date().getFullYear()])
    setMinRating(0)
    setShowNewOnly(false)
    setSortBy("latest")
    setCurrentPage(1)
    navigate("/search")
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
        {/* Search Header */}
        <section className="bg-muted/30 dark:bg-muted/10 py-8">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Anime Movies</h1>
                <p className="text-muted-foreground">Discover and stream your favorite anime movies</p>
              </div>

              <form onSubmit={handleSearch} className="flex w-full md:w-auto">
                <div className="relative flex-grow">
                  <Input
                    type="search"
                    placeholder="Search anime..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 h-10 w-full md:w-[300px] rounded-l-md rounded-r-none border-r-0"
                  />
                  <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                <Button type="submit" className="rounded-l-none">
                  Search
                </Button>
              </form>
            </div>

            {/* Active filters */}
            {(selectedGenres.length > 0 ||
              showNewOnly ||
              minRating > 0 ||
              yearRange[0] > 1980 ||
              yearRange[1] < new Date().getFullYear()) && (
              <div className="mt-4 flex flex-wrap gap-2 items-center">
                <span className="text-sm text-muted-foreground">Active filters:</span>

                {selectedGenres.map((genre) => (
                  <Badge key={genre} variant="secondary" className="flex items-center gap-1">
                    {genre}
                    <button onClick={() => toggleGenre(genre)} aria-label={`Remove ${genre} filter`}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}

                {showNewOnly && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    New Releases
                    <button onClick={() => setShowNewOnly(false)} aria-label="Remove new releases filter">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}

                {minRating > 0 && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {minRating}+ Rating
                    <button onClick={() => setMinRating(0)} aria-label="Remove rating filter">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}

                {(yearRange[0] > 1980 || yearRange[1] < new Date().getFullYear()) && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {yearRange[0]}-{yearRange[1]}
                    <button
                      onClick={() => setYearRange([1980, new Date().getFullYear()])}
                      aria-label="Remove year range filter"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Main content */}
        <section className="py-8">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters - Desktop */}
              <div className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-20">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Reset
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {/* Genres */}
                    <div>
                      <h3 className="text-sm font-medium mb-3">Genres</h3>
                      <div className="space-y-2 max-h-[240px] overflow-y-auto pr-2">
                        {allGenres.map((genre) => (
                          <div key={genre} className="flex items-center space-x-2">
                            <Checkbox
                              id={`genre-${genre}`}
                              checked={selectedGenres.includes(genre)}
                              onCheckedChange={() => toggleGenre(genre)}
                            />
                            <label
                              htmlFor={`genre-${genre}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {genre}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Year Range */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium">Year</h3>
                        <span className="text-xs text-muted-foreground">
                          {yearRange[0]} - {yearRange[1]}
                        </span>
                      </div>
                      <Slider
                        defaultValue={yearRange}
                        min={1980}
                        max={new Date().getFullYear()}
                        step={1}
                        value={yearRange}
                        onValueChange={setYearRange}
                        className="mb-6"
                      />
                    </div>

                    <Separator />

                    {/* Minimum Rating */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium">Minimum Rating</h3>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400 mr-1" />
                          {minRating.toFixed(1)}+
                        </span>
                      </div>
                      <Slider
                        defaultValue={[minRating]}
                        min={0}
                        max={10}
                        step={0.1}
                        value={[minRating]}
                        onValueChange={([value]) => setMinRating(value)}
                      />
                    </div>

                    <Separator />

                    {/* New Releases */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="new-releases"
                        checked={showNewOnly}
                        onCheckedChange={(checked) => setShowNewOnly(!!checked)}
                      />
                      <label
                        htmlFor="new-releases"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        New Releases Only
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Filters */}
              <div className="lg:hidden mb-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                      {(selectedGenres.length > 0 ||
                        showNewOnly ||
                        minRating > 0 ||
                        yearRange[0] > 1980 ||
                        yearRange[1] < new Date().getFullYear()) && (
                        <Badge className="ml-2 bg-primary text-white">
                          {selectedGenres.length +
                            (showNewOnly ? 1 : 0) +
                            (minRating > 0 ? 1 : 0) +
                            (yearRange[0] > 1980 || yearRange[1] < new Date().getFullYear() ? 1 : 0)}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="py-4 space-y-6">
                      {/* Genres */}
                      <div>
                        <h3 className="text-sm font-medium mb-3">Genres</h3>
                        <div className="space-y-2 max-h-[240px] overflow-y-auto pr-2">
                          {allGenres.map((genre) => (
                            <div key={genre} className="flex items-center space-x-2">
                              <Checkbox
                                id={`mobile-genre-${genre}`}
                                checked={selectedGenres.includes(genre)}
                                onCheckedChange={() => toggleGenre(genre)}
                              />
                              <label
                                htmlFor={`mobile-genre-${genre}`}
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {genre}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Year Range */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-medium">Year</h3>
                          <span className="text-xs text-muted-foreground">
                            {yearRange[0]} - {yearRange[1]}
                          </span>
                        </div>
                        <Slider
                          defaultValue={yearRange}
                          min={1980}
                          max={new Date().getFullYear()}
                          step={1}
                          value={yearRange}
                          onValueChange={setYearRange}
                          className="mb-6"
                        />
                      </div>

                      <Separator />

                      {/* Minimum Rating */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-medium">Minimum Rating</h3>
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400 mr-1" />
                            {minRating.toFixed(1)}+
                          </span>
                        </div>
                        <Slider
                          defaultValue={[minRating]}
                          min={0}
                          max={10}
                          step={0.1}
                          value={[minRating]}
                          onValueChange={([value]) => setMinRating(value)}
                        />
                      </div>

                      <Separator />

                      {/* New Releases */}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="mobile-new-releases"
                          checked={showNewOnly}
                          onCheckedChange={(checked) => setShowNewOnly(!!checked)}
                        />
                        <label
                          htmlFor="mobile-new-releases"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          New Releases Only
                        </label>
                      </div>
                    </div>
                    <SheetFooter className="flex-row justify-between">
                      <Button variant="outline" onClick={clearFilters}>
                        Reset All
                      </Button>
                      <SheetClose asChild>
                        <Button>Apply Filters</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Results */}
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-sm text-muted-foreground">
                    {filteredAnime.length} {filteredAnime.length === 1 ? "result" : "results"}
                  </p>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="sort-by" className="text-sm whitespace-nowrap">
                      Sort by:
                    </Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger id="sort-by" className="w-[140px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="latest">Latest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="title">Title (A-Z)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {filteredAnime.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">No results found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your search or filters to find what you're looking for.
                    </p>
                    <Button onClick={clearFilters}>Clear Filters</Button>
                  </div>
                ) : (
                  <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {paginatedAnime.map((anime) => (
                      <motion.div key={anime.id} variants={itemVariants}>
                        <a href={`/anime/${anime.id}`}>
                          <AnimeCard
                            title={anime.title}
                            image={anime.image}
                            rating={anime.rating}
                            year={anime.year}
                            episodes={anime.episodes}
                            isNew={anime.isNew}
                          />
                        </a>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

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
                        if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
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
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>

  )

}
