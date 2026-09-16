import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ShieldCheck, Mail, Cookie, Lock, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Pudavai Kadai - Heritage Handlooms",
  description:
    "Learn how Pudavai Kadai collects, protects, and handles your personal information when you use our website.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

        {/* Header */}
        <div className="py-8 border-b border-stone-200 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f3ebe0] border border-[#dccfb8] rounded-full text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8a6829] mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#927238]" />
            <span>Legal & Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-stone-900">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-light mt-2">
            Pudavai Kadai is dedicated to safeguarding your personal data and honoring your privacy.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-xs sm:text-sm text-stone-700 leading-relaxed pb-24">
          {/* Section 1 */}
          <section className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-stone-900 font-semibold text-sm sm:text-base">
              <FileText className="w-4 h-4 text-[#927238]" />
              <h2 className="uppercase tracking-wider">What information do we collect?</h2>
            </div>
            <p>
              When you interact with us — whether by browsing our website, making a purchase, signing up for updates, or contacting our customer support — we may collect the following details:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
              <li>Your name</li>
              <li>Billing and shipping address</li>
              <li>Email address</li>
              <li>Telephone number</li>
              <li>Payment and transaction details (securely processed through third-party gateways)</li>
              <li>Date of birth (where applicable)</li>
            </ul>
            <p className="text-stone-600 pt-2 border-t border-stone-100">
              We may also collect information automatically through cookies and analytics tools to help us improve your shopping experience.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-stone-900 font-semibold text-sm sm:text-base">
              <ShieldCheck className="w-4 h-4 text-[#927238]" />
              <h2 className="uppercase tracking-wider">How do we collect information?</h2>
            </div>
            <p>We collect personal data when you:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
              <li>Place an order through our website</li>
              <li>Subscribe to our newsletter or promotional updates</li>
              <li>Contact us via email, phone, or social media</li>
              <li>Participate in offers, surveys, or contests</li>
              <li>Create an account or save preferences on our site</li>
            </ul>
            <p className="text-stone-600 pt-2 border-t border-stone-100">
              We may also receive information about you from third-party partners (such as payment gateways or courier services) — but only if you have permitted them to share it with us.
            </p>
          </section>

          {/* Section 3 */}
          <section className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-stone-900 font-semibold text-sm sm:text-base">
              <Lock className="w-4 h-4 text-[#927238]" />
              <h2 className="uppercase tracking-wider">Confidentiality</h2>
            </div>
            <p>
              We take your privacy seriously. While we maintain strong data protection practices, please note that Pudavai Kadai is not responsible for the privacy policies or data practices of external websites not owned or managed by us, including any links or third-party integrations on our website.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-stone-900 font-semibold text-sm sm:text-base">
              <Cookie className="w-4 h-4 text-[#927238]" />
              <h2 className="uppercase tracking-wider">Cookies</h2>
            </div>
            <p>
              Our website uses cookies to enhance user experience, analyze traffic, and store preferences. You can disable cookies through your browser settings, but this may affect certain site functionalities.
            </p>
          </section>

          {/* Section 5 */}
          <section className="bg-white p-6 sm:p-8 rounded-sm border border-[#e5decb] shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-stone-900 font-semibold text-sm sm:text-base">
              <Mail className="w-4 h-4 text-[#927238]" />
              <h2 className="uppercase tracking-wider">Making a complaint</h2>
            </div>
            <p>
              If you have any concerns or complaints about how your personal data is handled, please contact us at{" "}
              <a
                href="mailto:support@pudavaikadai.com"
                className="font-medium text-[#927238] underline hover:text-[#725725] transition-colors"
              >
                support@pudavaikadai.com
              </a>{" "}
              with full details.
            </p>
            <p className="text-stone-600">
              We will review your complaint, ensure the proper procedures have been followed, and respond within 15 working days. If the issue requires additional investigation, we will inform you and keep you updated throughout the process.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
