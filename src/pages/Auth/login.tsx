import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react" // Added AlertCircle, Loader2
import AnimatedBackground from "@/components/util/Animated-Background"
import ModeToggle from "@/components/theme-toggle"
import { ThemeProvider } from "@/components/theme-provider"

// --- Firebase Imports ---
import { 
  signInWithEmailAndPassword, 
  setPersistence, 
  browserLocalPersistence, // For "Remember Me"
  browserSessionPersistence // For session-only
} from "firebase/auth"
import { auth } from "../../firebase.ts" // Adjust path to your Firebase config

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  // --- New state for loading and errors ---
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)
    setIsLoading(true)

    try {
      // Set session persistence based on "Remember Me"
      // browserLocalPersistence keeps the user signed in even after the browser is closed.
      // browserSessionPersistence signs the user out when the browser tab/window is closed.
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence)
      
      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      
      console.log("User logged in successfully:", user.uid, user.email)
      setSuccessMessage(`Welcome back, ${user.email}! You are now logged in.`);
      
      // Optionally, redirect the user after successful login
      // For example: window.location.href = '/dashboard'; 
      // Or use a router if you have one set up in your project.

    } catch (err: any) {
      let friendlyMessage = "Failed to log in. Please check your credentials."
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        friendlyMessage = "Invalid email or password. Please try again."
      } else if (err.code === 'auth/invalid-email') {
        friendlyMessage = "The email address format is not valid."
      } else if (err.code === 'auth/too-many-requests') {
        friendlyMessage = "Access to this account has been temporarily disabled due to many failed login attempts. You can try again later or reset your password."
      }
      setError(friendlyMessage)
      console.error("Firebase login error:", err, err.code)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative min-h-screen flex flex-col">
        <AnimatedBackground />
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

              {/* --- Error Message Display --- */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-destructive/10 text-destructive border border-destructive/20 rounded-md p-3 flex items-center space-x-2 mb-6"
                >
                  <AlertCircle size={18} />
                  <p className="text-sm font-medium">{error}</p>
                </motion.div>
              )}
              {/* --- Success Message Display --- */}
              {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500/10 text-green-600 border border-green-500/20 rounded-md p-3 flex items-center space-x-2 mb-6"
                  >
                    <AlertCircle size={18} className="text-green-600"/> {/* Consider a CheckCircle icon */}
                    <p className="text-sm font-medium">{successMessage}</p>
                  </motion.div>
                )}


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

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center" // Ensure text is visible
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {isLoading ? "Logging In..." : "Log In"}
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

        <footer className="w-full p-4 text-center text-sm text-muted-foreground z-10">
          <p>© {new Date().getFullYear()} JRoll. All rights reserved.</p>
        </footer>
      </div>
    </ThemeProvider>
  )
}
