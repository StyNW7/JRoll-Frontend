import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

export default function SignupForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[300px] text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
          </motion.div>
          <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
          <p className="text-muted-foreground mb-6">
            We've sent a confirmation email to <strong>{email}</strong>. Please check your inbox to complete your
            signup.
          </p>
          <Button onClick={() => setIsSubmitted(false)}>Return to Form</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Start Your Free Trial</CardTitle>
        <CardDescription>Sign up now and get 14 days of unlimited access to all anime content.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" required />
          </div>
          <div className="text-sm text-muted-foreground">
            By signing up, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            "Processing..."
          ) : (
            <>
              Start Watching Now <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
