import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Lock,
  CreditCard,
  Bell,
  Smartphone,
  LogOut,
  Check,
  Upload,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Info,
  AlertTriangle,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample user data
const userData = {
  id: "u1",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "/placeholder.svg?height=150&width=150",
  plan: "Premium",
  planRenews: "October 15, 2023",
  emailNotifications: {
    newReleases: true,
    recommendations: true,
    accountUpdates: true,
    marketing: false,
  },
  devices: [
    {
      id: "d1",
      name: "iPhone 13",
      type: "Mobile",
      lastActive: "Today at 10:23 AM",
      location: "New York, USA",
      isCurrent: true,
    },
    {
      id: "d2",
      name: "MacBook Pro",
      type: "Desktop",
      lastActive: "Yesterday at 8:45 PM",
      location: "New York, USA",
      isCurrent: false,
    },
    {
      id: "d3",
      name: "Samsung TV",
      type: "TV",
      lastActive: "August 12, 2023",
      location: "New York, USA",
      isCurrent: false,
    },
    {
      id: "d4",
      name: "iPad Air",
      type: "Tablet",
      lastActive: "July 29, 2023",
      location: "Boston, USA",
      isCurrent: false,
    },
  ],
  paymentMethods: [
    {
      id: "pm1",
      type: "Visa",
      last4: "4242",
      expiry: "09/25",
      isDefault: true,
    },
    {
      id: "pm2",
      type: "Mastercard",
      last4: "5555",
      expiry: "12/24",
      isDefault: false,
    },
  ],
}

export default function ProfileSettingsPage() {
  // State for profile form
  const [profile, setProfile] = useState({
    name: userData.name,
    email: userData.email,
    avatar: userData.avatar,
  })

  // State for password form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // State for notifications
  const [notifications, setNotifications] = useState(userData.emailNotifications)

  // State for loading states
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
  const [isUpdatingNotifications, setIsUpdatingNotifications] = useState(false)
  const [isRemovingDevice, setIsRemovingDevice] = useState<string | null>(null)
  const [isRemovingPayment, setIsRemovingPayment] = useState<string | null>(null)

  // Handle profile update
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdatingProfile(true)

    // Simulate API call
    setTimeout(() => {
      setIsUpdatingProfile(false)
      // Show success message or update UI
    }, 1000)
  }

  // Handle password update
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdatingPassword(true)

    // Simulate API call
    setTimeout(() => {
      setIsUpdatingPassword(false)
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      // Show success message or update UI
    }, 1000)
  }

  // Handle notifications update
  const handleNotificationsUpdate = () => {
    setIsUpdatingNotifications(true)

    // Simulate API call
    setTimeout(() => {
      setIsUpdatingNotifications(false)
      // Show success message or update UI
    }, 1000)
  }

  // Handle device removal
  const handleRemoveDevice = (deviceId: string) => {
    setIsRemovingDevice(deviceId)

    // Simulate API call
    setTimeout(() => {
      setIsRemovingDevice(null)
      // Update UI to remove device
    }, 1000)
  }

  // Handle payment method removal
  const handleRemovePayment = (paymentId: string) => {
    setIsRemovingPayment(paymentId)

    // Simulate API call
    setTimeout(() => {
      setIsRemovingPayment(null)
      // Update UI to remove payment method
    }, 1000)
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
      transition: { duration: 0.3 },
    },
  }

  return (

    <div className="flex min-h-screen flex-col">

      <main className="flex-grow">
        {/* Header */}
        <section className="bg-muted/30 dark:bg-muted/10 py-8">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
                <p className="text-muted-foreground">Manage your profile, security, and preferences</p>
              </div>
            </div>
          </div>
        </section>

        {/* Settings Content */}
        <section className="py-8">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="profile" className="w-full">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <div className="md:w-64 shrink-0">
                  <div className="sticky top-20">
                    <div className="flex items-center gap-4 mb-6">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                        <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="font-semibold">{userData.name}</h2>
                        <p className="text-sm text-muted-foreground">{userData.email}</p>
                        <Badge className="mt-1">{userData.plan}</Badge>
                      </div>
                    </div>

                    <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-1">
                      <TabsTrigger
                        value="profile"
                        className="justify-start px-3 py-2 h-auto data-[state=active]:bg-muted"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </TabsTrigger>
                      <TabsTrigger
                        value="security"
                        className="justify-start px-3 py-2 h-auto data-[state=active]:bg-muted"
                      >
                        <Lock className="h-4 w-4 mr-2" />
                        Security
                      </TabsTrigger>
                      <TabsTrigger
                        value="billing"
                        className="justify-start px-3 py-2 h-auto data-[state=active]:bg-muted"
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Billing
                      </TabsTrigger>
                      <TabsTrigger
                        value="notifications"
                        className="justify-start px-3 py-2 h-auto data-[state=active]:bg-muted"
                      >
                        <Bell className="h-4 w-4 mr-2" />
                        Notifications
                      </TabsTrigger>
                      <TabsTrigger
                        value="devices"
                        className="justify-start px-3 py-2 h-auto data-[state=active]:bg-muted"
                      >
                        <Smartphone className="h-4 w-4 mr-2" />
                        Devices
                      </TabsTrigger>
                    </TabsList>

                    <Separator className="my-4" />

                    <Button variant="destructive" className="w-full justify-start" size="sm">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-grow">
                  <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
                    {/* Profile Tab */}
                    <TabsContent value="profile" className="space-y-6 mt-0">
                      <motion.div variants={itemVariants}>
                        <Card>
                          <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your personal information</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <form onSubmit={handleProfileUpdate} className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="avatar">Profile Picture</Label>
                                <div className="flex items-center gap-4">
                                  <Avatar className="h-20 w-20">
                                    <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                                    <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex flex-col sm:flex-row gap-2">
                                    <Button type="button" variant="outline" size="sm">
                                      <Upload className="h-4 w-4 mr-2" />
                                      Upload
                                    </Button>
                                    <Button type="button" variant="outline" size="sm">
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Remove
                                    </Button>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                  id="name"
                                  value={profile.name}
                                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                  required
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                  id="email"
                                  type="email"
                                  value={profile.email}
                                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                  required
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="language">Language</Label>
                                <Select defaultValue="en">
                                  <SelectTrigger id="language">
                                    <SelectValue placeholder="Select language" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="es">Spanish</SelectItem>
                                    <SelectItem value="fr">French</SelectItem>
                                    <SelectItem value="de">German</SelectItem>
                                    <SelectItem value="ja">Japanese</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </form>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button variant="outline">Cancel</Button>
                            <Button onClick={handleProfileUpdate} disabled={isUpdatingProfile}>
                              {isUpdatingProfile ? "Saving..." : "Save Changes"}
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <Card>
                          <CardHeader>
                            <CardTitle>Account Preferences</CardTitle>
                            <CardDescription>Manage your account settings</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-base">Content Maturity</Label>
                                <p className="text-sm text-muted-foreground">Show content for mature audiences</p>
                              </div>
                              <Switch defaultChecked />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-base">Autoplay Trailers</Label>
                                <p className="text-sm text-muted-foreground">
                                  Automatically play trailers when browsing
                                </p>
                              </div>
                              <Switch defaultChecked />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-base">Subtitle Language</Label>
                                <p className="text-sm text-muted-foreground">Default language for subtitles</p>
                              </div>
                              <Select defaultValue="en">
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="en">English</SelectItem>
                                  <SelectItem value="es">Spanish</SelectItem>
                                  <SelectItem value="fr">French</SelectItem>
                                  <SelectItem value="de">German</SelectItem>
                                  <SelectItem value="ja">Japanese</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </TabsContent>

                    {/* Security Tab */}
                    <TabsContent value="security" className="space-y-6 mt-0">
                      <motion.div variants={itemVariants}>
                        <Card>
                          <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>Update your password to keep your account secure</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <form onSubmit={handlePasswordUpdate} className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <div className="relative">
                                  <Input
                                    id="current-password"
                                    type={showCurrentPassword ? "text" : "password"}
                                    value={passwordForm.currentPassword}
                                    onChange={(e) =>
                                      setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                                    }
                                    required
                                    className="pr-10"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                                  >
                                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                  </button>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <div className="relative">
                                  <Input
                                    id="new-password"
                                    type={showNewPassword ? "text" : "password"}
                                    value={passwordForm.newPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                    required
                                    className="pr-10"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                                  >
                                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                  </button>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm New Password</Label>
                                <div className="relative">
                                  <Input
                                    id="confirm-password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={passwordForm.confirmPassword}
                                    onChange={(e) =>
                                      setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                                    }
                                    required
                                    className="pr-10"
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

                              <div className="text-sm space-y-1 mt-2">
                                <p className="font-medium">Password requirements:</p>
                                <ul className="space-y-1 text-muted-foreground">
                                  <li className="flex items-center gap-1">
                                    <Check className="h-3 w-3 text-green-500" />
                                    At least 8 characters
                                  </li>
                                  <li className="flex items-center gap-1">
                                    <Check className="h-3 w-3 text-green-500" />
                                    At least one uppercase letter
                                  </li>
                                  <li className="flex items-center gap-1">
                                    <Check className="h-3 w-3 text-green-500" />
                                    At least one number
                                  </li>
                                  <li className="flex items-center gap-1">
                                    <Check className="h-3 w-3 text-green-500" />
                                    At least one special character
                                  </li>
                                </ul>
                              </div>
                            </form>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button variant="outline">Cancel</Button>
                            <Button
                              onClick={handlePasswordUpdate}
                              disabled={
                                isUpdatingPassword ||
                                !passwordForm.currentPassword ||
                                !passwordForm.newPassword ||
                                !passwordForm.confirmPassword ||
                                passwordForm.newPassword !== passwordForm.confirmPassword
                              }
                            >
                              {isUpdatingPassword ? "Updating..." : "Update Password"}
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <Card>
                          <CardHeader>
                            <CardTitle>Two-Factor Authentication</CardTitle>
                            <CardDescription>Add an extra layer of security to your account</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-base">Enable 2FA</Label>
                                <p className="text-sm text-muted-foreground">
                                  Secure your account with two-factor authentication
                                </p>
                              </div>
                              <Switch defaultChecked={false} />
                            </div>

                            <div className="bg-muted/50 p-4 rounded-lg">
                              <div className="flex items-start gap-3">
                                <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                                <p className="text-sm text-muted-foreground">
                                  Two-factor authentication adds an additional layer of security to your account by
                                  requiring more than just a password to sign in.
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <Card>
                          <CardHeader>
                            <CardTitle>Account Activity</CardTitle>
                            <CardDescription>Monitor recent account activity</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">Password Changed</p>
                                  <p className="text-sm text-muted-foreground">August 12, 2023 at 10:30 AM</p>
                                </div>
                                <Badge variant="outline">New York, USA</Badge>
                              </div>

                              <Separator />

                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">Login</p>
                                  <p className="text-sm text-muted-foreground">August 10, 2023 at 8:45 PM</p>
                                </div>
                                <Badge variant="outline">New York, USA</Badge>
                              </div>

                              <Separator />

                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">Login</p>
                                  <p className="text-sm text-muted-foreground">August 5, 2023 at 3:20 PM</p>
                                </div>
                                <Badge variant="outline">Boston, USA</Badge>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full">
                              View Full Activity Log
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    </TabsContent>

                    {/* Billing Tab */}
                    <TabsContent value="billing" className="space-y-6 mt-0">
                      <motion.div variants={itemVariants}>
                        <Card>
                          <CardHeader>
                            <CardTitle>Subscription Plan</CardTitle>
                            <CardDescription>Manage your subscription and billing</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold text-lg">{userData.plan} Plan</h3>
                                  <p className="text-sm text-muted-foreground">
                                    Your plan renews on {userData.planRenews}
                                  </p>
                                </div>
                                <Badge>Active</Badge>
                              </div>

                              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="flex items-center gap-2">
                                  <Check className="h-4 w-4 text-primary" />
                                  <span className="text-sm">HD & 4K Streaming</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Check className="h-4 w-4 text-primary" />
                                  <span className="text-sm">Ad-free experience</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Check className="h-4 w-4 text-primary" />
                                  <span className="text-sm">Watch on 4 devices</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Check className="h-4 w-4 text-primary" />
                                  <span className="text-sm">Offline downloads</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                              <Button className="sm:flex-1">Upgrade Plan</Button>
                              <Button variant="outline" className="sm:flex-1">
                                Cancel Subscription
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <Card>
                          <CardHeader>
                            <CardTitle>Payment Methods</CardTitle>
                            <CardDescription>Manage your payment methods</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {userData.paymentMethods.map((payment) => (
                              <div key={payment.id} className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                  {payment.type === "Visa" ? (
                                    <div className="h-8 w-12 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">
                                      VISA
                                    </div>
                                  ) : (
                                    <div className="h-8 w-12 bg-red-500 rounded flex items-center justify-center text-white font-bold text-xs">
                                      MC
                                    </div>
                                  )}
                                  <div>
                                    <p className="font-medium">
                                      {payment.type} ending in {payment.last4}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Expires {payment.expiry}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {payment.isDefault && <Badge variant="outline">Default</Badge>}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemovePayment(payment.id)}
                                    disabled={isRemovingPayment === payment.id}
                                  >
                                    {isRemovingPayment === payment.id ? (
                                      "Removing..."
                                    ) : (
                                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                                    )}
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4 text-muted-foreground" />
                                  </Button>
                                </div>
                              </div>
                            ))}

                            <Button variant="outline" className="w-full">
                              Add Payment Method
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <Card>
                          <CardHeader>
                            <CardTitle>Billing History</CardTitle>
                            <CardDescription>View your past invoices and payments</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">Premium Plan - Monthly</p>
                                  <p className="text-sm text-muted-foreground">September 15, 2023</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">$14.99</p>
                                  <Badge
                                    variant="outline"
                                    className="bg-green-500/10 text-green-600 hover:bg-green-500/20"
                                  >
                                    Paid
                                  </Badge>
                                </div>
                              </div>

                              <Separator />

                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">Premium Plan - Monthly</p>
                                  <p className="text-sm text-muted-foreground">August 15, 2023</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">$14.99</p>
                                  <Badge
                                    variant="outline"
                                    className="bg-green-500/10 text-green-600 hover:bg-green-500/20"
                                  >
                                    Paid
                                  </Badge>
                                </div>
                              </div>

                              <Separator />

                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">Premium Plan - Monthly</p>
                                  <p className="text-sm text-muted-foreground">July 15, 2023</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">$14.99</p>
                                  <Badge
                                    variant="outline"
                                    className="bg-green-500/10 text-green-600 hover:bg-green-500/20"
                                  >
                                    Paid
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full">
                              View All Invoices
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    </TabsContent>

                    {/* Notifications Tab */}
                    <TabsContent value="notifications" className="space-y-6 mt-0">
                      <motion.div variants={itemVariants}>
                        <Card>
                          <CardHeader>
                            <CardTitle>Email Notifications</CardTitle>
                            <CardDescription>Manage your email notification preferences</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-base">New Releases</Label>
                                <p className="text-sm text-muted-foreground">Get notified when new anime is released</p>
                              </div>
                              <Switch
                                checked={notifications.newReleases}
                                onCheckedChange={(checked) =>
                                  setNotifications({ ...notifications, newReleases: checked })
                                }
                              />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-base">Recommendations</Label>
                                <p className="text-sm text-muted-foreground">
                                  Receive personalized anime recommendations
                                </p>
                              </div>
                              <Switch
                                checked={notifications.recommendations}
                                onCheckedChange={(checked) =>
                                  setNotifications({ ...notifications, recommendations: checked })
                                }
                              />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-base">Account Updates</Label>
                                <p className="text-sm text-muted-foreground">
                                  Get notified about important account changes
                                </p>
                              </div>
                              <Switch
                                checked={notifications.accountUpdates}
                                onCheckedChange={(checked) =>
                                  setNotifications({ ...notifications, accountUpdates: checked })
                                }
                              />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-base">Marketing</Label>
                                <p className="text-sm text-muted-foreground">
                                  Receive offers, promotions, and marketing emails
                                </p>
                              </div>
                              <Switch
                                checked={notifications.marketing}
                                onCheckedChange={(checked) =>
                                  setNotifications({ ...notifications, marketing: checked })
                                }
                              />
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button
                              onClick={handleNotificationsUpdate}
                              disabled={isUpdatingNotifications}
                              className="ml-auto"
                            >
                              {isUpdatingNotifications ? "Saving..." : "Save Preferences"}
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <Card>
                          <CardHeader>
                            <CardTitle>Push Notifications</CardTitle>
                            <CardDescription>Manage your mobile app notification preferences</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-base">New Episodes</Label>
                                <p className="text-sm text-muted-foreground">
                                  Get notified when new episodes of shows you follow are available
                                </p>
                              </div>
                              <Switch defaultChecked />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-base">Continue Watching</Label>
                                <p className="text-sm text-muted-foreground">
                                  Reminders to continue watching shows you've started
                                </p>
                              </div>
                              <Switch defaultChecked />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-base">App Updates</Label>
                                <p className="text-sm text-muted-foreground">
                                  Get notified about app updates and new features
                                </p>
                              </div>
                              <Switch defaultChecked={false} />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </TabsContent>

                    {/* Devices Tab */}
                    <TabsContent value="devices" className="space-y-6 mt-0">
                      <motion.div variants={itemVariants}>
                        <Card>
                          <CardHeader>
                            <CardTitle>Connected Devices</CardTitle>
                            <CardDescription>Manage devices connected to your account</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            {userData.devices.map((device) => (
                              <div key={device.id} className="flex justify-between items-start">
                                <div className="flex items-start gap-3">
                                  {device.type === "Mobile" && <Smartphone className="h-8 w-8 text-muted-foreground" />}
                                  {device.type === "Desktop" && (
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
                                      className="h-8 w-8 text-muted-foreground"
                                    >
                                      <rect width="20" height="14" x="2" y="3" rx="2" />
                                      <line x1="8" x2="16" y1="21" y2="21" />
                                      <line x1="12" x2="12" y1="17" y2="21" />
                                    </svg>
                                  )}
                                  {device.type === "TV" && (
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
                                      className="h-8 w-8 text-muted-foreground"
                                    >
                                      <rect width="20" height="15" x="2" y="3" rx="2" />
                                      <polyline points="8 21 12 17 16 21" />
                                    </svg>
                                  )}
                                  {device.type === "Tablet" && (
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
                                      className="h-8 w-8 text-muted-foreground"
                                    >
                                      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                                      <line x1="12" x2="12.01" y1="18" y2="18" />
                                    </svg>
                                  )}
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <p className="font-medium">{device.name}</p>
                                      {device.isCurrent && (
                                        <Badge variant="outline" className="bg-green-500/10 text-green-600">
                                          Current
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">Last active: {device.lastActive}</p>
                                    <p className="text-sm text-muted-foreground">Location: {device.location}</p>
                                  </div>
                                </div>
                                {!device.isCurrent && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemoveDevice(device.id)}
                                    disabled={isRemovingDevice === device.id}
                                  >
                                    {isRemovingDevice === device.id ? (
                                      "Removing..."
                                    ) : (
                                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                                    )}
                                  </Button>
                                )}
                              </div>
                            ))}
                          </CardContent>
                          <CardFooter>
                            <Button variant="destructive" className="w-full">
                              Sign Out of All Devices
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <Card>
                          <CardHeader>
                            <CardTitle>Device Security</CardTitle>
                            <CardDescription>Manage device security settings</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-base">Require Authentication</Label>
                                <p className="text-sm text-muted-foreground">
                                  Require authentication when signing in on a new device
                                </p>
                              </div>
                              <Switch defaultChecked />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-base">Device Limit</Label>
                                <p className="text-sm text-muted-foreground">
                                  Maximum number of devices that can be signed in simultaneously
                                </p>
                              </div>
                              <Select defaultValue="4">
                                <SelectTrigger className="w-[80px]">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="4">4</SelectItem>
                                  <SelectItem value="6">6</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-4">
                              <div className="flex items-start gap-3">
                                <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                                <p className="text-sm">
                                  <span className="font-medium text-yellow-500">Security Notice:</span> We detected a
                                  login from a new location on August 15, 2023. If this wasn't you, please change your
                                  password immediately and contact support.
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </TabsContent>
                  </motion.div>
                </div>
              </div>
            </Tabs>
          </div>
        </section>
      </main>

    </div>

  )
  
}
