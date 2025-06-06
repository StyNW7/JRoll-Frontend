import HeroBanner from "@/components/Landing/hero-banner"
import AnimeRow from "@/components/Landing/anime-row"
import FeaturesGrid from "@/components/Landing/features-grid"
import SubscriptionCard from "@/components/Landing/subscription-card"
import GenreCard from "@/components/Landing/genre-card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { getCollaborativeRecommendations } from "@/utility/api"
import type { AnimeRecommendation } from "@/utility/api"

export default function Home() {
  // Sample data for trending anime
  const [trendingAnime, setTrendingAnime] = useState<AnimeRecommendation[]>([])

  useEffect(() => {
    const fetchTrending = async () => {

      const recommendations = await getCollaborativeRecommendations(
        ["Demon Slayer: Kimetsu no Yaiba", "Attack on Titan", "Bleach"],
        7
      )

      // const recommendations = await getCollaborativeRecommendations(
      //   ["One Piece", "Naruto: Shippuuden", "Dragon Ball Z"],
        
      //   7
      // )

      // const recommendations = await getCollaborativeRecommendations(
      //   ["One Piece"],
        
      //   7
      // )

      console.log("🎯 API result:", recommendations)
      setTrendingAnime(recommendations)
    }

    fetchTrending()
  }, [])

  // Sample data for new releases
  const newReleases = [
    {
      title: "Bleach: Thousand-Year Blood War",
      image: "/Images/Card/japan.png",
      rating: "9.5",
      year: "2023",
      episodes: 13,
      isNew: true,
    },
    {
      title: "Solo Leveling",
      image: "/Images/Card/japan.png",
      rating: "9.4",
      year: "2023",
      episodes: 12,
      isNew: true,
    },
    {
      title: "Oshi no Ko",
      image: "/Images/Card/japan.png",
      rating: "9.3",
      year: "2023",
      episodes: 11,
      isNew: true,
    },
    {
      title: "Frieren: Beyond Journey's End",
      image: "/Images/Card/japan.png",
      rating: "9.2",
      year: "2023",
      episodes: 28,
      isNew: true,
    },
    {
      title: "Mushoku Tensei: Jobless Reincarnation",
      image: "/Images/Card/japan.png",
      rating: "9.1",
      year: "2023",
      episodes: 12,
      isNew: true,
    },
    {
      title: "Blue Lock",
      image: "/Images/Card/japan.png",
      rating: "9.0",
      year: "2023",
      episodes: 24,
      isNew: true,
    },
    {
      title: "Vinland Saga Season 2",
      image: "/Images/Card/japan.png",
      rating: "8.9",
      year: "2023",
      episodes: 24,
      isNew: true,
    },
  ]

  // Sample data for popular movies
  const popularMovies = [
    {
      title: "Demon Slayer: Mugen Train",
      image: "/Images/Card/japan.png",
      rating: "9.7",
      year: "2021",
    },
    {
      title: "Your Name",
      image: "/Images/Card/japan.png",
      rating: "9.6",
      year: "2016",
    },
    {
      title: "Spirited Away",
      image: "/Images/Card/japan.png",
      rating: "9.5",
      year: "2001",
    },
    {
      title: "A Silent Voice",
      image: "/Images/Card/japan.png",
      rating: "9.4",
      year: "2016",
    },
    {
      title: "Jujutsu Kaisen 0",
      image: "/Images/Card/japan.png",
      rating: "9.3",
      year: "2021",
    },
    {
      title: "Weathering With You",
      image: "/Images/Card/japan.png",
      rating: "9.2",
      year: "2019",
    },
    {
      title: "Princess Mononoke",
      image: "/Images/Card/japan.png",
      rating: "9.1",
      year: "1997",
    },
  ]

  // Sample data for genres
  const genres = [
    {
      title: "Action",
      image: "/Images/Box/genre.png",
      animeCount: 1240,
      href: "/search",
    },
    {
      title: "Romance",
      image: "/Images/Box/genre.png",
      animeCount: 856,
      href: "/search",
    },
    {
      title: "Fantasy",
      image: "/Images/Box/genre.png",
      animeCount: 1120,
      href: "/search",
    },
    {
      title: "Sci-Fi",
      image: "/Images/Box/genre.png",
      animeCount: 645,
      href: "/search",
    },
    {
      title: "Horror",
      image: "/Images/Box/genre.png",
      animeCount: 320,
      href: "/search",
    },
    {
      title: "Comedy",
      image: "/Images/Box/genre.png",
      animeCount: 980,
      href: "/search",
    },
  ]

  const specialGenre = [
    {
      title: "Subscribe Now!",
      image: "/Images/Box/genre.png",
      animeCount: 7777,
      href: "/register",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">

      {/* Hero Banner */}
      <HeroBanner />

      {/* Trending Anime */}
      <section id="anime">
        <AnimeRow title="Trending Now" animeList={trendingAnime} />
      </section>

      {/* New Releases */}
      <section id="new-releases">
        <AnimeRow title="New Releases" animeList={newReleases} />
      </section>

      {/* Popular Movies */}
      <section id="movies">
        <AnimeRow title="Popular Movies" animeList={popularMovies} />
      </section>

      {/* Features Grid */}
      <FeaturesGrid />

      {/* Genres Section */}
      <section id="genres" className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Browse by Genre</h2>
            <a href="/search">
              <Button variant="ghost" className="text-sm" size="sm">
                View All Genres
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {genres.map((genre, index) => (
              <GenreCard key={index} {...genre} />
            ))}
          </div>

        </div>
      </section>

      {/* Subscription Plans */}
      <section id="pricing" className="py-20 bg-muted/30 dark:bg-muted/10">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Choose Your Plan</h2>
            <p className="mt-4 text-muted-foreground md:text-xl max-w-3xl mx-auto">
              Flexible plans to fit your anime watching habits. Cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SubscriptionCard
              title="Basic"
              price="$4.99"
              description="Perfect for casual anime fans"
              features={[
                "HD streaming",
                "Watch on one device at a time",
                "Access to most anime content",
                "Ad-supported experience",
              ]}
              notIncluded={["Offline downloads", "Exclusive anime", "Simultaneous streams"]}
              buttonVariant="outline"
            />

            <SubscriptionCard
              title="Premium"
              price="$9.99"
              description="Our most popular plan"
              features={[
                "Full HD streaming",
                "Watch on two devices at a time",
                "Ad-free experience",
                "Offline downloads",
                "Access to all anime content",
                "New releases as they air",
              ]}
              notIncluded={["4K Ultra HD", "Simultaneous streams on 4 devices"]}
              isPopular={true}
            />

            <SubscriptionCard
              title="Ultimate"
              price="$14.99"
              description="The complete anime experience"
              features={[
                "4K Ultra HD streaming",
                "Watch on four devices at a time",
                "Ad-free experience",
                "Unlimited offline downloads",
                "Access to all anime content",
                "New releases as they air",
                "Exclusive merchandise discounts",
                "Early access to events",
              ]}
              buttonVariant="secondary"
            />
          </div>
        </div>
      </section>

      {/* Sign Up Section */}
      <section id="signup" className="py-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Start Streaming Today</h2>
              <p className="text-muted-foreground md:text-xl">
                Join thousands of anime fans and start your streaming journey with JRoll. Your first 14 days are on us.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>14-day free trial</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>No credit card required to start</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Cancel anytime</span>
                </li>
              </ul>
              <div className="pt-4">
                <a href="/register">
                  <Button className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white glow-button">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
            <div>
              <GenreCard {...specialGenre[0]} />
              {/* <SignupForm /> */}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
