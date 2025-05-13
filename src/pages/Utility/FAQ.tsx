import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, ChevronRight, ArrowRight, FileQuestion } from "lucide-react"

// FAQ data organized by categories
const faqData = {
  account: [
    {
      question: "How do I create an account?",
      answer:
        "To create an account, click on the 'Sign Up' button on the top right corner of the homepage. Fill in your details, choose a subscription plan, and follow the instructions to complete the registration process.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "You can reset your password by clicking on the 'Forgot Password' link on the login page. We'll send you an email with instructions to reset your password. Make sure to check your spam folder if you don't see the email in your inbox.",
    },
    {
      question: "How do I update my profile information?",
      answer:
        "To update your profile information, go to your Account Settings by clicking on your profile icon in the top right corner. From there, you can edit your name, email, profile picture, and other personal details.",
    },
    {
      question: "Can I have multiple profiles under one account?",
      answer:
        "Yes, you can create up to 5 profiles under a single account. This allows different people in your household to have their own personalized experience, including separate watchlists and recommendations.",
    },
    {
      question: "How do I delete my account?",
      answer:
        "To delete your account, go to Account Settings > Privacy > Delete Account. Please note that this action is permanent and will delete all your data, including your watch history and saved lists.",
    },
  ],
  billing: [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. In select regions, we also support local payment methods and mobile carrier billing.",
    },
    {
      question: "How do I update my payment method?",
      answer:
        "To update your payment method, go to Account Settings > Billing > Payment Methods. From there, you can add a new payment method or edit existing ones.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "You can cancel your subscription by going to Account Settings > Billing > Cancel Subscription. Your subscription will remain active until the end of your current billing period.",
    },
    {
      question: "Will I get a refund if I cancel my subscription?",
      answer:
        "We don't provide refunds for partial subscription periods. When you cancel, you'll continue to have access to JRoll until the end of your current billing cycle.",
    },
    {
      question: "What happens after my free trial ends?",
      answer:
        "After your free trial ends, you'll be automatically charged for the subscription plan you selected during sign-up. If you don't want to continue, make sure to cancel before the trial period ends.",
    },
  ],
  content: [
    {
      question: "How often do you add new anime?",
      answer:
        "We add new anime weekly, including the latest seasonal shows and classic titles. For simulcast shows, we typically add new episodes within 24 hours of their Japanese broadcast.",
    },
    {
      question: "Do you offer dubbed anime?",
      answer:
        "Yes, we offer dubbed versions for many popular anime in multiple languages. You can switch between subbed and dubbed versions from the player settings when available.",
    },
    {
      question: "How do I request an anime to be added to JRoll?",
      answer:
        "You can submit content requests through our Support page. While we can't guarantee that all requested titles will be added, we do consider user requests when acquiring new content.",
    },
    {
      question: "Why are some anime not available in my region?",
      answer:
        "Licensing restrictions may prevent certain anime from being available in all regions. We're constantly working to expand our library and secure global rights for more titles.",
    },
    {
      question: "How do I find anime by genre?",
      answer:
        "You can browse anime by genre using our Categories section. We offer filters for action, romance, fantasy, sci-fi, and many other genres to help you find exactly what you're looking for.",
    },
  ],
  playback: [
    {
      question: "Why is my video buffering?",
      answer:
        "Buffering can occur due to slow internet connection, network congestion, or device limitations. Try lowering the video quality, checking your internet connection, or restarting your device.",
    },
    {
      question: "How do I change video quality?",
      answer:
        "You can change the video quality by clicking on the settings icon in the video player and selecting your preferred resolution. You can also set it to 'Auto' to let our system adjust based on your connection speed.",
    },
    {
      question: "Can I download anime for offline viewing?",
      answer:
        "Yes, Premium and Ultimate subscribers can download anime for offline viewing on mobile devices. Look for the download icon next to episodes to save them for offline watching.",
    },
    {
      question: "How do I enable/disable subtitles?",
      answer:
        "You can toggle subtitles by clicking on the subtitles (CC) button in the video player. From there, you can also select different languages if available.",
    },
    {
      question: "Why does the video player keep crashing?",
      answer:
        "If the video player keeps crashing, try clearing your browser cache, updating your browser or app to the latest version, or restarting your device. If the issue persists, please contact our support team.",
    },
  ],
  devices: [
    {
      question: "Which devices can I use to watch JRoll?",
      answer:
        "JRoll is available on web browsers, iOS and Android mobile devices, smart TVs (Samsung, LG, Sony), streaming devices (Roku, Apple TV, Fire TV, Chromecast), and gaming consoles (PlayStation, Xbox).",
    },
    {
      question: "How many devices can I use simultaneously?",
      answer:
        "The number of simultaneous streams depends on your subscription plan: Basic (1 device), Premium (2 devices), and Ultimate (4 devices).",
    },
    {
      question: "How do I sign out from all devices?",
      answer:
        "To sign out from all devices, go to Account Settings > Security > Sign Out All Devices. This will log you out from all devices except the one you're currently using.",
    },
    {
      question: "Why can't I cast to my TV?",
      answer:
        "If you're having trouble casting to your TV, make sure both your casting device and TV are on the same Wi-Fi network. Also, ensure you have the latest version of our app and that your casting device (Chromecast, etc.) is properly set up.",
    },
    {
      question: "Is JRoll available on gaming consoles?",
      answer:
        "Yes, JRoll is available on PlayStation 4/5 and Xbox One/Series X|S. Download the JRoll app from your console's app store to start watching.",
    },
  ],
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("account")
  const [searchResults, setSearchResults] = useState<{ category: string; items: typeof faqData.account }[]>([])

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const results: { category: string; items: typeof faqData.account }[] = []

    Object.entries(faqData).forEach(([category, items]) => {
      const matchedItems = items.filter(
        (item) => item.question.toLowerCase().includes(query) || item.answer.toLowerCase().includes(query),
      )

      if (matchedItems.length > 0) {
        results.push({
          category,
          items: matchedItems,
        })
      }
    })

    setSearchResults(results)
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
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block rounded-full bg-primary/20 p-4 text-primary"
              >
                <FileQuestion className="h-8 w-8" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
              >
                Frequently Asked Questions
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted-foreground text-lg max-w-2xl"
              >
                Find answers to the most common questions about JRoll and our services.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="search"
                  placeholder="Search for answers..."
                  className="pl-10 py-6 text-base rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Button
                  type="submit"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-lg"
                  size="sm"
                >
                  Search
                </Button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Popular Questions */}
        <section className="py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8">
              <Badge className="mb-2">Quick Answers</Badge>
              <h2 className="text-2xl font-bold">Popular Questions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  question: "How do I reset my password?",
                  answer:
                    "Click on 'Forgot Password' on the login page and follow the instructions sent to your email.",
                  link: "#account",
                },
                {
                  question: "How do I cancel my subscription?",
                  answer: "Go to Account Settings > Billing > Cancel Subscription to cancel your plan.",
                  link: "#billing",
                },
                {
                  question: "Why is my video buffering?",
                  answer: "Try lowering video quality, checking your internet connection, or restarting your device.",
                  link: "#playback",
                },
                {
                  question: "How many devices can I use?",
                  answer: "Basic (1 device), Premium (2 devices), and Ultimate (4 devices) simultaneously.",
                  link: "#devices",
                },
                {
                  question: "Do you offer dubbed anime?",
                  answer: "Yes, we offer dubbed versions for many popular anime in multiple languages.",
                  link: "#content",
                },
                {
                  question: "Can I download anime for offline viewing?",
                  answer: "Yes, Premium and Ultimate subscribers can download anime for offline viewing.",
                  link: "#playback",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-lg mb-2">{item.question}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{item.answer}</p>
                  <Button variant="link" className="p-0 h-auto text-primary" asChild>
                    <a href={item.link}>
                      Learn More <ChevronRight className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            {/* Search Results */}
            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-12"
                >
                  <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold">Search Results</h2>
                      <Button variant="outline" size="sm" onClick={() => setSearchResults([])}>
                        Clear Results
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {searchResults.map((result, index) => (
                        <div key={index}>
                          <h3 className="text-lg font-semibold capitalize mb-3">{result.category}</h3>
                          <Accordion type="single" collapsible className="w-full">
                            {result.items.map((item, itemIndex) => (
                              <AccordionItem key={itemIndex} value={`search-${index}-${itemIndex}`}>
                                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                                <AccordionContent>{item.answer}</AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="max-w-5xl mx-auto">
              <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory}>
                <div className="mb-8">
                  <TabsList className="w-full justify-start overflow-x-auto">
                    <TabsTrigger value="account" id="account">
                      Account
                    </TabsTrigger>
                    <TabsTrigger value="billing" id="billing">
                      Billing
                    </TabsTrigger>
                    <TabsTrigger value="content" id="content">
                      Content
                    </TabsTrigger>
                    <TabsTrigger value="playback" id="playback">
                      Playback
                    </TabsTrigger>
                    <TabsTrigger value="devices" id="devices">
                      Devices
                    </TabsTrigger>
                  </TabsList>
                </div>

                {Object.entries(faqData).map(([category, items]) => (
                  <TabsContent key={category} value={category}>
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                      <Accordion type="single" collapsible className="w-full">
                        {items.map((item, index) => (
                          <motion.div key={index} variants={itemVariants}>
                            <AccordionItem value={`${category}-${index}`}>
                              <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                              <AccordionContent>{item.answer}</AccordionContent>
                            </AccordionItem>
                          </motion.div>
                        ))}
                      </Accordion>
                    </motion.div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </section>

        {/* Still Need Help */}
        <section className="py-16 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
              <p className="text-muted-foreground mb-8">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <Button asChild size="lg">
                <a href="/support/contact">
                  Contact Support <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

    </div>

  )

}
