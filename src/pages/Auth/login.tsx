import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"
import AnimatedBackground from "@/components/util/Animated-Background"
import ModeToggle from "@/components/theme-toggle"
import { ThemeProvider } from "@/components/theme-provider"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log({ email, password, rememberMe })
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
                <span className="text-2xl font-bold">
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
                <h1 className="text-3xl font-bold">Welcome Back</h1>
                <p className="text-muted-foreground mt-2">Log in to continue your anime journey</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                    <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <a href="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                    </a>
                    </div>
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
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                    Remember me
                    </label>
                </div>

                <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white">
                    Log In
                </Button>
                </form>

                <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <a href="/register" className="text-primary hover:underline font-medium">
                    Sign up
                    </a>
                </p>
                </div>

                <div className="relative flex items-center justify-center mt-8">
                <div className="absolute border-t border-gray-300 dark:border-gray-700 w-full"></div>
                <div className="relative bg-background/80 px-4 text-sm text-muted-foreground">Or continue with</div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-12">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                    />
                    <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                    />
                    <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                    />
                    <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                    />
                    </svg>
                    Google
                </Button>
                <Button variant="outline" className="h-12">
                    <svg className="w-5 h-5 mr-2 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                    </svg>
                    Facebook
                </Button>
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
