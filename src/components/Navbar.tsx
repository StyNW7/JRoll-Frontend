import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User } from "lucide-react"
import ModeToggle from "@/components/theme-toggle"
import { useAuth } from "@/hooks/useAuth"
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase'; 

export default function Navbar() {

  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  // const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Anime", href: "/search" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Watch Now", href: "/watch/1" },
    { label: "Settings", href: "/settings" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center space-x-2" aria-label="JRoll Homepage">
            <span className="text-2xl font-bold">
              JRoll
            </span>
          </a>

          <nav className="hidden md:flex gap-6" aria-label="Main Navigation">
            {navItems.map((item, index) => (
              <a key={index} href={item.href} className="text-sm font-medium transition-colors hover:text-primary">
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* {isSearchOpen ? (
            <div className="relative hidden md:block">
              <Input
                type="search"
                placeholder="Search anime..."
                className="w-[200px] lg:w-[300px] h-9 rounded-full bg-muted/50 border-primary/20 focus-visible:border-primary"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex h-9 w-9 rounded-full"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex h-9 w-9 rounded-full"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
          </Button> */}

          <ModeToggle />

          <Button
            asChild
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-full border-0 h-9"
          >
            {user ? (

              <a href="/settings">
                <User className="h-4 w-4 text-white" />
                <span className="text-sm font-medium">Account</span>
              </a>

            )

            : 

            (

              <a href="/login">
                <User className="h-4 w-4 text-white" />
                <span className="text-sm font-medium">Account</span>
              </a>

            )

            }
            
          </Button>

          {user && (
            <Button
              onClick={async () => {
                try {
                  await signOut(auth);
                  window.location.href = '/login'; // redirect to login
                } catch (error) {
                  console.error('Logout failed:', error);
                }
              }}
              className="hidden md:flex items-center gap-2 text-white border-0 h-9"
            >
              <span className="text-sm font-medium">Logout</span>
            </Button>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" aria-label="Open Menu">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex items-center mt-4 mb-8">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  JRoll
                </span>
              </div>

              {/* <div className="relative mb-6">
                <Input
                  type="search"
                  placeholder="Search anime..."
                  className="w-full rounded-full bg-muted/50 border-primary/20"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div> */}

              <nav className="flex flex-col gap-4" aria-label="Mobile Navigation">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="text-lg font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex items-center gap-4 mt-4">
                  <ModeToggle />
                  <Button
                    asChild
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-full border-0"
                  >
                    <a href="/login" onClick={() => setIsOpen(false)}>
                      <User className="h-4 w-4 text-white" />
                      <span className="text-sm font-medium">Account</span>
                    </a>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
