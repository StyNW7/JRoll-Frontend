import { Button } from "@/components/ui/button"
import { ArrowLeft, Printer, Download } from "lucide-react"

export default function TermsOfServicePage() {

  const lastUpdated = "October 15, 2023"

  return (

    <div className="flex min-h-screen flex-col">

      <main className="flex-grow">
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <a href="/">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </a>
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Printer className="h-4 w-4" />
                <span className="hidden sm:inline">Print</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Download PDF</span>
              </Button>
            </div>
          </div>

          <div className="bg-card rounded-xl p-8 shadow-sm">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
              <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
            </div>

            <div className="prose prose-blue dark:prose-invert max-w-none">
              <p className="lead">
                Welcome to JRoll. These Terms of Service ("Terms") govern your use of the JRoll website, mobile
                application, and streaming services (collectively, the "Service"). Please read these Terms carefully
                before using our Service.
              </p>

              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part
                of the Terms, you may not access the Service.
              </p>

              <h2>2. Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
                provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material
                change will be determined at our sole discretion.
              </p>

              <h2>3. Account Registration</h2>
              <p>
                To access certain features of the Service, you may be required to register for an account. You must
                provide accurate, current, and complete information during the registration process and keep your
                account information up-to-date.
              </p>
              <p>
                You are responsible for safeguarding the password that you use to access the Service and for any
                activities or actions under your password. You agree not to disclose your password to any third party.
                You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your
                account.
              </p>

              <h2>4. Subscription and Billing</h2>
              <p>
                Some aspects of the Service may be provided for a fee. You will be required to select a payment plan and
                provide accurate payment information. You agree to pay all fees at the prices then in effect for your
                subscription.
              </p>
              <p>
                Subscription fees are billed at the beginning of your subscription and on each renewal date. Unless you
                cancel your subscription before the renewal date, you authorize us to charge your payment method for the
                renewal term.
              </p>
              <p>
                We may change the fees for the Service at any time. If we increase the fees for your subscription, we
                will provide notice of the change before your next renewal date.
              </p>

              <h2>5. Free Trials</h2>
              <p>
                We may offer free trials to new users. The duration of the free trial period and other details will be
                specified during sign-up. Free trials may not be combined with any other offers.
              </p>
              <p>
                You will be required to provide your payment information to start a free trial. At the end of the free
                trial period, we will automatically begin charging your payment method for your subscription unless you
                cancel before the end of the free trial.
              </p>

              <h2>6. Content and Licenses</h2>
              <p>
                Our Service allows you to stream anime content, including videos, graphics, photos, text, and other
                materials (collectively, "Content"). The Content is owned by JRoll or its licensors and is protected by
                copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                We grant you a limited, non-exclusive, non-transferable, non-sublicensable license to access and view
                the Content solely for your personal, non-commercial use in connection with the Service.
              </p>
              <p>You agree not to:</p>
              <ul>
                <li>Use the Service or Content for any commercial purpose</li>
                <li>Copy, reproduce, distribute, or publicly display any Content</li>
                <li>Modify, create derivative works, or reverse engineer any aspect of the Service</li>
                <li>Access the Service by any means other than through the interface provided by JRoll</li>
                <li>Circumvent any technological measures employed to restrict access to the Service or Content</li>
                <li>Use the Service to violate any law or infringe any rights of any third party</li>
              </ul>

              <h2>7. User Content</h2>
              <p>
                Our Service may allow you to post, a, store, share, and otherwise make available certain information,
                text, graphics, videos, or other material ("User Content"). You are responsible for the User Content
                that you post on or through the Service, including its legality, reliability, and appropriateness.
              </p>
              <p>
                By posting User Content on or through the Service, you grant us the right to use, modify, publicly
                perform, publicly display, reproduce, and distribute such User Content on and through the Service. You
                retain any and all of your rights to any User Content you submit, post, or display on or through the
                Service and you are responsible for protecting those rights.
              </p>

              <h2>8. Prohibited Uses</h2>
              <p>You agree not to use the Service:</p>
              <ul>
                <li>In any way that violates any applicable law or regulation</li>
                <li>To harass, abuse, or harm another person</li>
                <li>To impersonate any person or entity</li>
                <li>To infringe upon the rights of others</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or malicious code</li>
                <li>To collect or track the personal information of others</li>
                <li>To spam, phish, or engage in any other unauthorized activities</li>
                <li>To interfere with or circumvent the security features of the Service</li>
              </ul>

              <h2>9. Termination</h2>
              <p>
                We may terminate or suspend your account and access to the Service immediately, without prior notice or
                liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              <p>
                Upon termination, your right to use the Service will immediately cease. If you wish to terminate your
                account, you may simply discontinue using the Service or contact us to request account deletion.
              </p>

              <h2>10. Limitation of Liability</h2>
              <p>
                In no event shall JRoll, its directors, employees, partners, agents, suppliers, or affiliates be liable
                for any indirect, incidental, special, consequential, or punitive damages, including without limitation,
                loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use
                of or inability to access or use the Service.
              </p>

              <h2>11. Disclaimer</h2>
              <p>
                Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE"
                basis. The Service is provided without warranties of any kind, whether express or implied, including,
                but not limited to, implied warranties of merchantability, fitness for a particular purpose,
                non-infringement, or course of performance.
              </p>

              <h2>12. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of Japan, without regard to its
                conflict of law provisions.
              </p>

              <h2>13. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at{" "}
                <a href="mailto:terms@jroll.com">terms@jroll.com</a>.
              </p>
            </div>
          </div>
        </div>
      </main>

    </div>

  )

}
