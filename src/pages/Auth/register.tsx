import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"

// Component Imports from your project
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { ThemeProvider } from "@/components/theme-provider"
import AnimatedBackground from "@/components/util/Animated-Background"
import ModeToggle from "@/components/theme-toggle"
import { Eye, EyeOff, Calendar, AlertCircle, Loader2, Phone } from "lucide-react" // Added Phone icon

// --- Firebase Imports ---
import { createUserWithEmailAndPassword } from "firebase/auth"
import { ref, set, runTransaction } from "firebase/database"
import { auth, db } from "../../firebase.ts" // Path to your Firebase config

export default function RegisterPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("") // New state for phone number
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [date, setDate] = useState<Date>()
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [step, setStep] = useState(1)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null);

    if (step === 1) {
      // Added phoneNumber to the check
      if (!fullName.trim() || !email.trim() || !date || !phoneNumber.trim()) {
        setError("Please fill out all fields in this step, including phone number.")
        return
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }
      // Optional: Basic phone number validation (e.g., only digits, specific length)
      if (!/^\d{10,15}$/.test(phoneNumber.replace(/\s+/g, ''))) { // Example: 10-15 digits
          setError("Please enter a valid phone number (10-15 digits).");
          return;
      }
      setStep(2)
    } else {
      if (password !== confirmPassword) {
        setError("Passwords do not match.")
        return
      }
      if (password.length < 8) {
        setError("Password must be at least 8 characters long.")
        return
      }
      if (!agreeTerms) {
        setError("You must agree to the terms and privacy policy.")
        return
      }

      setIsLoading(true)

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        console.log("Firebase Auth user created successfully:", user.uid);

        const userCounterRef = ref(db, 'counters/userCount');
        let newSequentialId: number | null = null;

        await runTransaction(userCounterRef, (currentCount) => {
          if (currentCount === null) {
            return 1;
          }
          return currentCount + 1;
        }).then(transactionResult => {
          if (transactionResult.committed) {
            newSequentialId = transactionResult.snapshot.val();
            console.log("New sequential User ID:", newSequentialId);
          } else {
            console.error("User ID counter transaction aborted.");
            throw new Error("Could not assign a user ID. Please try again.");
          }
        });

        if (newSequentialId === null) {
            throw new Error("Failed to retrieve sequential User ID.");
        }

        const userProfileRef = ref(db, 'Regist/' + user.uid);
        await set(userProfileRef, {
          UserID: "ACC" + newSequentialId,
          fullName: fullName,
          email: user.email,
          phoneNumber: phoneNumber, 
          dateOfBirth: date ? format(date, "dd-MM-yyyy") : null,
        })
        
        console.log("User data saved to Realtime Database with sequential ID.", { uid: user.uid, sequentialId: newSequentialId });
        setSuccessMessage(`Account created successfully! You can now log in.`);
        // Reset form
        setFullName("");
        setEmail("");
        setPhoneNumber("");
        setPassword("");
        setConfirmPassword("");
        setDate(undefined);
        setAgreeTerms(false);
        setStep(1);


      } catch (err: any) {
        let friendlyMessage = "Failed to create account. Please try again.";
        if (err.code === 'auth/email-already-in-use') {
          friendlyMessage = "This email address is already in use."
        } else if (err.code === 'auth/invalid-email') {
          friendlyMessage = "The email address is not valid."
        } else if (err.code === 'auth/weak-password') {
            friendlyMessage = "Password is too weak. Please choose a stronger one."
        } else if (err.code === 'auth/operation-not-allowed') {
            friendlyMessage = "Email/password accounts are not enabled. Check Firebase console."
        } else if (err.code === 'auth/configuration-not-found') {
            friendlyMessage = "Firebase configuration error. Check your firebase.ts file and project setup."
        }
        else {
            friendlyMessage = err.message || friendlyMessage;
        }
        setError(friendlyMessage);
        console.error("Registration process error:", err, err.code);
      } finally {
        setIsLoading(false)
      }
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
                <h1 className="text-3xl font-bold">Create Your Account</h1>
                <p className="text-muted-foreground mt-2">
                 {step === 1 ? "Join JRoll and start streaming anime" : "Join JRoll and start streaming anime"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-destructive/10 text-destructive border border-destructive/20 rounded-md p-3 flex items-center space-x-2"
                  >
                    <AlertCircle size={18} />
                    <p className="text-sm font-medium">{error}</p>
                  </motion.div>
                )}
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500/10 text-green-600 border border-green-500/20 rounded-md p-3 flex items-center space-x-2"
                  >
                    <AlertCircle size={18} className="text-green-600"/> {/* Consider a CheckCircle icon here */}
                    <p className="text-sm font-medium">{successMessage}</p>
                  </motion.div>
                )}

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
                    
                    {/* Phone Number Input Field */}
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="phoneNumber"
                          type="tel" // Use type="tel" for phone numbers
                          placeholder="e.g., 081234567890"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          required
                          className="h-12 pl-10" // Add padding for the icon
                        />
                      </div>
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
                            disabled={(d) => d > new Date() || d < new Date("1900-01-01")}
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
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center"
                  disabled={isLoading || (step === 1 && (!fullName.trim() || !email.trim() || !phoneNumber.trim() || !date)) || (step === 2 && (!password || password.length < 8 || password !== confirmPassword || !agreeTerms))}
                >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {isLoading ? "Processing..." : (step === 1 ? "Continue" : "Create Account")}
                </Button>

                {step === 2 && (
                  <Button type="button" variant="outline" className="w-full h-12 mt-2" onClick={() => { setError(null); setStep(1);}} disabled={isLoading}>
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

        <footer className="w-full p-4 text-center text-sm text-muted-foreground z-10">
          <p>© {new Date().getFullYear()} JRoll. All rights reserved.</p>
        </footer>
      </div>
    </ThemeProvider>
  )
}
