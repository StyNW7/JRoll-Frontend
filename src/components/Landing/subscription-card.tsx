import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface SubscriptionCardProps {
  title: string
  price: string
  description: string
  features: string[]
  notIncluded?: string[]
  isPopular?: boolean
  buttonText?: string
  buttonVariant?: "default" | "outline" | "secondary"
}

export default function SubscriptionCard({
  title,
  price,
  description,
  features,
  notIncluded = [],
  isPopular = false,
  buttonText = "Subscribe Now",
  buttonVariant = "default",
}: SubscriptionCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card
        className={`h-full flex flex-col relative overflow-hidden ${
          isPopular ? "border-primary shadow-lg shadow-primary/20" : ""
        }`}
      >
        {isPopular && (
          <div className="absolute top-0 right-0">
            <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 transform rotate-0 translate-x-2 translate-y-4">
              MOST POPULAR
            </div>
          </div>
        )}

        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
          <div className="mt-2">
            <span className="text-3xl font-bold">{price}</span>
            <span className="text-muted-foreground ml-1">/month</span>
          </div>
          <CardDescription className="mt-2">{description}</CardDescription>
        </CardHeader>

        <CardContent className="flex-grow">
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                <span>{feature}</span>
              </li>
            ))}

            {notIncluded.map((feature, index) => (
              <li key={index} className="flex items-start text-muted-foreground">
                <X className="h-5 w-5 text-muted-foreground shrink-0 mr-2" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter>
          <Button
            variant={buttonVariant}
            className={`w-full ${
              isPopular
                ? "bg-primary hover:bg-primary/90 text-white"
                : buttonVariant === "default"
                  ? "bg-primary/80 hover:bg-primary text-white"
                  : ""
            }`}
          >
            {buttonText}
          </Button>
        </CardFooter>

        {isPopular && isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at center, rgba(36, 101, 237, 0.1) 0%, transparent 70%)",
            }}
          />
        )}
      </Card>
    </motion.div>
  )
}
