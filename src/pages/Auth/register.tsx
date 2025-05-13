import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Calendar } from "lucide-react"
import AnimatedBackground from "@/components/util/Animated-Background"
import ModeToggle from "@/components/theme-toggle"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { ThemeProvider } from "@/components/theme-provider"

export default function RegisterPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [date, setDate] = useState<Date>()
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [step, setStep] = useState(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else {
      // Handle registration logic here
      console.log({ fullName, email, date, password, confirmPassword, agreeTerms })
    }
  }

  return (

    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

        <div className="relative min-h-screen flex flex-col">
        {/* Animated Background */}
        <AnimatedBackground />

        {/* Header with logo and theme toggle */}
        <header className="w-full p-4 z-10">
            <div className="container flex justify-between items-center">
            <a href="/" className="flex items-center space-x-2" aria-label="JRoll Homepage">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                JRoll
                </span>
            </a>
            <ModeToggle />
            </div>
        </header>

        {/* Main content */}
        <main className="flex-grow flex items-center justify-center p-4 z-10">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
            >
            <div className="bg-background/80 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-primary/10">
                <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">Create Your Account</h1>
                <p className="text-muted-foreground mt-2">Join JRoll and start streaming anime</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 ? (
                    <>
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                        id="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="h-12"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full h-12 justify-start text-left font-normal">
                            {date ? format(date, "PPP") : <span className="text-muted-foreground">Pick a date</span>}
                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
                            />
                        </PopoverContent>
                        </Popover>
                    </div>
                    </>
                ) : (
                    <>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="h-12 pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Password must be at least 8 characters long</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="h-12 pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        </div>
                    </div>

                    <div className="flex items-start space-x-2">
                        <Checkbox
                        id="terms"
                        checked={agreeTerms}
                        onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                        className="mt-1"
                        />
                        <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                        I agree to the{" "}
                        <a href="/terms" className="text-primary hover:underline">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                        </a>
                        </label>
                    </div>
                    </>
                )}

                <Button
                    type="submit"
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white"
                    disabled={step === 2 && (!password || !confirmPassword || !agreeTerms || password !== confirmPassword)}
                >
                    {step === 1 ? "Continue" : "Create Account"}
                </Button>

                {step === 2 && (
                    <Button type="button" variant="outline" className="w-full h-12 mt-2" onClick={() => setStep(1)}>
                    Back
                    </Button>
                )}
                </form>

                <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <a href="/login" className="text-primary hover:underline font-medium">
                    Log in
                    </a>
                </p>
                </div>
            </div>
            </motion.div>
        </main>

        {/* Footer */}
        <footer className="w-full p-4 text-center text-sm text-muted-foreground z-10">
            <p>© {new Date().getFullYear()} JRoll. All rights reserved.</p>
        </footer>
        </div>
    </ThemeProvider>
  )
}
