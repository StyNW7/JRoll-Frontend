import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  MessageSquare,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  FileQuestion,
  CreditCard,
  User,
  PlayCircle,
  Smartphone,
} from "lucide-react"

export default function ContactSupportPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

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
      transition: { duration: 0.5 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 30px rgba(36, 101, 237, 0.1)",
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
                <MessageSquare className="h-8 w-8" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
              >
                How Can We Help You?
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted-foreground text-lg max-w-2xl"
              >
                Our support team is here to assist you with any questions or issues you may have with JRoll.
              </motion.p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-card rounded-xl p-6 shadow-sm border border-border/50"
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="rounded-full bg-primary/20 p-3 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg">Email Support</h3>
                  <p className="text-muted-foreground text-sm">Get a response within 24 hours</p>
                  <a href="mailto:support@jroll.com" className="text-primary hover:underline">
                    support@jroll.com
                  </a>
                </div>
              </motion.div>

              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-card rounded-xl p-6 shadow-sm border border-border/50"
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="rounded-full bg-primary/20 p-3 text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg">Phone Support</h3>
                  <p className="text-muted-foreground text-sm">Available Mon-Fri, 9am-5pm</p>
                  <a href="tel:+18001234567" className="text-primary hover:underline">
                    +1 (800) 123-4567
                  </a>
                </div>
              </motion.div>

              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-card rounded-xl p-6 shadow-sm border border-border/50"
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="rounded-full bg-primary/20 p-3 text-primary">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg">Live Chat</h3>
                  <p className="text-muted-foreground text-sm">Chat with us in real-time</p>
                  <Button variant="link" className="text-primary p-0 h-auto">
                    Start Chat
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>Send Us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                          <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
                        </motion.div>
                        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                        <p className="text-muted-foreground mb-6">
                          Thank you for contacting us. We'll respond to your inquiry as soon as possible.
                        </p>
                        <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="John Doe"
                              value={formState.name}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="john.doe@example.com"
                              value={formState.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input
                            id="subject"
                            name="subject"
                            placeholder="Brief description of your issue"
                            value={formState.subject}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={formState.category}
                            onValueChange={(value) => handleSelectChange("category", value)}
                          >
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="account">Account Issues</SelectItem>
                              <SelectItem value="billing">Billing & Subscription</SelectItem>
                              <SelectItem value="playback">Playback Issues</SelectItem>
                              <SelectItem value="content">Content Request</SelectItem>
                              <SelectItem value="technical">Technical Support</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Please describe your issue in detail..."
                            rows={5}
                            value={formState.message}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Support Categories */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-4">Common Support Categories</h2>
                  <p className="text-muted-foreground mb-6">
                    Browse through our most common support categories to find quick solutions to your issues.
                  </p>

                  <Tabs defaultValue="account" className="w-full">
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="account">Account</TabsTrigger>
                      <TabsTrigger value="billing">Billing</TabsTrigger>
                      <TabsTrigger value="playback">Playback</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="space-y-4">
                      <div className="bg-muted/50 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <User className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-medium">Account Issues</h3>
                            <p className="text-sm text-muted-foreground">
                              Get help with login problems, profile settings, and account management.
                            </p>
                            <Button variant="link" className="p-0 h-auto mt-2 text-primary">
                              View Account FAQ <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start text-left h-auto py-2">
                          <HelpCircle className="h-4 w-4 mr-2 text-muted-foreground" />I can't log in to my account
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-left h-auto py-2">
                          <HelpCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                          How do I reset my password?
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-left h-auto py-2">
                          <HelpCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                          How do I update my profile information?
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="billing" className="space-y-4">
                      <div className="bg-muted/50 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <CreditCard className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-medium">Billing & Subscription</h3>
                            <p className="text-sm text-muted-foreground">
                              Get help with payment issues, subscription plans, and billing inquiries.
                            </p>
                            <Button variant="link" className="p-0 h-auto mt-2 text-primary">
                              View Billing FAQ <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start text-left h-auto py-2">
                          <HelpCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                          How do I update my payment method?
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-left h-auto py-2">
                          <HelpCircle className="h-4 w-4 mr-2 text-muted-foreground" />I was charged incorrectly
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-left h-auto py-2">
                          <HelpCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                          How do I cancel my subscription?
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="playback" className="space-y-4">
                      <div className="bg-muted/50 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <PlayCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-medium">Playback Issues</h3>
                            <p className="text-sm text-muted-foreground">
                              Get help with video streaming, quality settings, and playback errors.
                            </p>
                            <Button variant="link" className="p-0 h-auto mt-2 text-primary">
                              View Playback FAQ <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start text-left h-auto py-2">
                          <HelpCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                          Videos won't play or keep buffering
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-left h-auto py-2">
                          <HelpCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                          How do I change video quality?
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-left h-auto py-2">
                          <HelpCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                          Subtitles are not working correctly
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-bold mb-4">Device Support</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <Smartphone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Mobile App Support</h4>
                        <p className="text-sm text-muted-foreground">Get help with our iOS and Android apps</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                      <div className="bg-primary/10 p-2 rounded-md">
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
                          <rect width="20" height="14" x="2" y="3" rx="2" />
                          <line x1="8" x2="16" y1="21" y2="21" />
                          <line x1="12" x2="12" y1="17" y2="21" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Desktop Support</h4>
                        <p className="text-sm text-muted-foreground">Get help with our web and desktop apps</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                      <div className="bg-primary/10 p-2 rounded-md">
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
                          <rect width="20" height="15" x="2" y="3" rx="2" />
                          <polyline points="8 21 12 17 16 21" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Smart TV Support</h4>
                        <p className="text-sm text-muted-foreground">Get help with our TV apps</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Teaser */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <Badge className="mb-2">Frequently Asked Questions</Badge>
              <h2 className="text-3xl font-bold mb-4">Find Quick Answers</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Browse our comprehensive FAQ section to find answers to the most common questions.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                {[
                  {
                    question: "How do I reset my password?",
                    answer:
                      "You can reset your password by clicking on the 'Forgot Password' link on the login page. We'll send you an email with instructions to reset your password.",
                  },
                  {
                    question: "How do I cancel my subscription?",
                    answer:
                      "You can cancel your subscription by going to your Account Settings > Billing > Cancel Subscription. Your subscription will remain active until the end of your current billing period.",
                  },
                  {
                    question: "Why is my video buffering?",
                    answer:
                      "Buffering can occur due to slow internet connection, network congestion, or device limitations. Try lowering the video quality, checking your internet connection, or restarting your device.",
                  },
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-card rounded-lg p-4 border border-border/50"
                  >
                    <div className="flex items-start gap-3">
                      <FileQuestion className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium">{faq.question}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{faq.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="text-center mt-8">
                <Button asChild>
                  <a href="/support/faq">
                    View All FAQs <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>

  )

}
