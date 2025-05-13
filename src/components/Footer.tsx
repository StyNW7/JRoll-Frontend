export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-12 md:py-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <a href="/" className="flex items-center space-x-2" aria-label="JRoll Homepage">
              <span className="text-2xl font-bold">
                JRoll
              </span>
            </a>
            <p className="text-sm text-muted-foreground">
              The ultimate anime streaming platform with thousands of series and movies in HD quality.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold">Browse</h3>
            <nav aria-label="Footer Browse Navigation">
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#anime" className="text-muted-foreground hover:text-foreground">
                    Anime Series
                  </a>
                </li>
                <li>
                  <a href="#movies" className="text-muted-foreground hover:text-foreground">
                    Movies
                  </a>
                </li>
                <li>
                  <a href="#genres" className="text-muted-foreground hover:text-foreground">
                    Genres
                  </a>
                </li>
                <li>
                  <a href="#new-releases" className="text-muted-foreground hover:text-foreground">
                    New Releases
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold">Help</h3>
            <nav aria-label="Footer Help Navigation">
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/account" className="text-muted-foreground hover:text-foreground">
                    Account
                  </a>
                </li>
                <li>
                  <a href="/faq" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/support" className="text-muted-foreground hover:text-foreground">
                    Support
                  </a>
                </li>
                <li>
                  <a href="/devices" className="text-muted-foreground hover:text-foreground">
                    Supported Devices
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold">Legal</h3>
            <nav aria-label="Footer Legal Navigation">
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/terms" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/cookies" className="text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="/licensing" className="text-muted-foreground hover:text-foreground">
                    Licensing
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© {currentYear} JRoll. All rights reserved.</p>
          <div className="flex gap-4">
            <a
              href="https://twitter.com"
              className="text-muted-foreground hover:text-foreground"
              aria-label="Twitter"
            >
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
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a
              href="https://instagram.com"
              className="text-muted-foreground hover:text-foreground"
              aria-label="Instagram"
            >
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
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </a>
            <a
              href="https://discord.com"
              className="text-muted-foreground hover:text-foreground"
              aria-label="Discord"
            >
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
                className="h-5 w-5"
              >
                <circle cx="9" cy="12" r="1"></circle>
                <circle cx="15" cy="12" r="1"></circle>
                <path d="M7.5 7.2c3.5-1 5.5-1 9 0"></path>
                <path d="M7 16.2c3.5 1 6.5 1 10 0"></path>
                <path d="M15.5 17c0 1 1.5 3 2 3 1.5 0 2.833-1.667 3.5-3 .667-1.667.5-5.833-1.5-11.5-1.457-1.015-3-1.34-4.5-1.5l-1 2.5"></path>
                <path d="M8.5 17c0 1-1.356 3-1.832 3-1.429 0-2.698-1.667-3.333-3-.635-1.667-.48-5.833 1.428-11.5C6.151 4.485 7.545 4.16 9 4l1 2.5"></path>
              </svg>
            </a>
            <a
              href="https://youtube.com"
              className="text-muted-foreground hover:text-foreground"
              aria-label="YouTube"
            >
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
                className="h-5 w-5"
              >
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                <path d="m10 15 5-3-5-3z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
