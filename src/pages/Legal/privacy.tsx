import { Button } from "@/components/ui/button"
import { ArrowLeft, Printer, Download } from "lucide-react"

export default function PrivacyPolicyPage() {
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
              <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
              <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
            </div>

            <div className="prose prose-blue dark:prose-invert max-w-none">
              <p className="lead">
                At JRoll, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
                and safeguard your information when you visit our website and use our streaming services.
              </p>

              <h2>1. Information We Collect</h2>
              <p>
                We collect information that you provide directly to us when you register for an account, create or
                modify your profile, set preferences, or make purchases through our services:
              </p>
              <ul>
                <li>
                  <strong>Personal Information:</strong> Name, email address, password, billing information, and profile
                  picture.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you use our service, including viewing history,
                  search queries, ratings, and interactions with content.
                </li>
                <li>
                  <strong>Device Information:</strong> Information about the devices you use to access our service,
                  including device type, operating system, browser type, IP address, and device identifiers.
                </li>
                <li>
                  <strong>Location Information:</strong> General location information based on your IP address.
                </li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect for various purposes, including to:</p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Create and update your account</li>
                <li>Provide customer support</li>
                <li>Personalize your experience and deliver content relevant to your interests</li>
                <li>Send administrative messages, updates, and promotional content</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>3. Sharing Your Information</h2>
              <p>We may share your information in the following situations:</p>
              <ul>
                <li>
                  <strong>With Service Providers:</strong> We may share your information with third-party vendors who
                  perform services on our behalf.
                </li>
                <li>
                  <strong>For Legal Reasons:</strong> We may disclose your information if required to do so by law or in
                  response to valid requests by public authorities.
                </li>
                <li>
                  <strong>Business Transfers:</strong> We may share or transfer your information in connection with a
                  merger, acquisition, or sale of all or a portion of our assets.
                </li>
                <li>
                  <strong>With Your Consent:</strong> We may share your information with third parties when you have
                  given us your consent to do so.
                </li>
              </ul>

              <h2>4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect the security of your personal
                information. However, please be aware that no security measures are perfect or impenetrable, and we
                cannot guarantee the security of your data transmitted to our services.
              </p>

              <h2>5. Your Rights</h2>
              <p>Depending on your location, you may have certain rights regarding your personal information:</p>
              <ul>
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate or incomplete information</li>
                <li>The right to delete your personal information</li>
                <li>The right to restrict or object to processing</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the contact information provided at the end of this
                Privacy Policy.
              </p>

              <h2>6. Children's Privacy</h2>
              <p>
                Our services are not intended for individuals under the age of 13. We do not knowingly collect personal
                information from children under 13. If we learn we have collected or received personal information from
                a child under 13 without verification of parental consent, we will delete that information.
              </p>

              <h2>7. International Data Transfers</h2>
              <p>
                Your information may be transferred to, and maintained on, computers located outside of your state,
                province, country, or other governmental jurisdiction where the data protection laws may differ from
                those in your jurisdiction.
              </p>

              <h2>8. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy
                Policy are effective when they are posted on this page.
              </p>

              <h2>9. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:privacy@jroll.com">privacy@jroll.com</a> or by mail at:
              </p>
              <address className="not-italic">
                JRoll Inc.
                <br />
                123 Anime Street
                <br />
                Tokyo, Japan 100-0001
              </address>
            </div>
          </div>
        </div>
      </main>

    </div>

  )
  
}
