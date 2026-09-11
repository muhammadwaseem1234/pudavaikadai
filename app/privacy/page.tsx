import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy | Pudavai Kadai",
  description: "Privacy policy, data collection, and customer information protection.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

        <div className="py-8 border-b border-stone-200 mb-10">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
            Customer Security
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-stone-900 mt-1">
            Privacy Policy
          </h1>
          <p className="text-xs text-stone-500 mt-1">Last revised: September 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed pb-20">
          <section className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
              1. Information We Collect
            </h2>
            <p>
              We collect information you provide directly during purchases, account registration, or
              customer concierge communications—including your name, email address, phone number,
              shipping address, and billing address.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
              2. How We Utilize Your Data
            </h2>
            <p>
              Your information is exclusively utilized to fulfill your handloom orders, coordinate
              courier dispatch, send shipment tracking updates, provide bridal concierge assistance,
              and communicate our private salon newsletter (if opted in).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
              3. Payment Security & Encryption
            </h2>
            <p>
              Pudavai Kadai does not store payment card credentials or netbanking passwords on our servers.
              All payment transactions are encrypted and processed through RBI-authorized payment gateways
              compliant with PCI-DSS Level 1 standards.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
              4. Contact Privacy Officer
            </h2>
            <p>
              For any questions regarding your personal data or to request account deletion, please write
              to <span className="font-semibold text-stone-900">privacy@pudavaikadai.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
