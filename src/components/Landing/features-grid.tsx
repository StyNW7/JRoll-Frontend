import { motion } from "framer-motion"
import { Tv, Download, TabletsIcon as Devices, Sparkles, Clock, Subtitles } from "lucide-react"

export default function FeaturesGrid() {
  const features = [
    {
      icon: <Tv className="h-10 w-10" />,
      title: "HD Streaming",
      description: "Watch all your favorite anime in stunning high definition quality.",
    },
    {
      icon: <Download className="h-10 w-10" />,
      title: "Offline Viewing",
      description: "Download episodes to watch offline when you're on the go.",
    },
    {
      icon: <Devices className="h-10 w-10" />,
      title: "Multiple Devices",
      description: "Stream on your TV, laptop, tablet, or smartphone seamlessly.",
    },
    {
      icon: <Sparkles className="h-10 w-10" />,
      title: "Exclusive Content",
      description: "Access JRoll originals and exclusive anime you won't find anywhere else.",
    },
    {
      icon: <Clock className="h-10 w-10" />,
      title: "Simulcast",
      description: "Watch new episodes as they air in Japan with same-day streaming.",
    },
    {
      icon: <Subtitles className="h-10 w-10" />,
      title: "Multilingual",
      description: "Choose between subtitled or dubbed versions in multiple languages.",
    },
  ]

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
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="py-20 bg-muted/30 dark:bg-muted/10">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Everything You Need for the Ultimate Anime Experience
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl max-w-3xl mx-auto">
            JRoll brings you the best features to enhance your anime streaming journey.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className="relative">
              <div className="bg-background rounded-xl p-6 h-full border shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
