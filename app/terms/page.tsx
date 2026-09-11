import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service | Pudavai Kadai",
  description: "Terms and conditions of purchasing handloom sarees from Pudavai Kadai.",
};

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs items={[{ label: "Terms of Service" }]} />

        <div className="py-8 border-b border-stone-200 mb-10">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
            Legal Agreements
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-stone-900 mt-1">
            Terms of Service
          </h1>
          <p className="text-xs text-stone-500 mt-1">Last revised: September 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed pb-20">
          <section className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
              1. Overview & Acceptance
            </h2>
            <p>
              By accessing, browsing, or placing an order on Pudavai Kadai, you agree to be bound by these
              Terms of Service and our associated store policies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
              2. Authentic Handloom Authenticity
            </h2>
            <p>
              Each item sold on this platform is handcrafted by Indian master weavers. Variations in dye
              shades and organic weave structure are intrinsic characteristics of natural fibers and
              pit-loom traditions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
              3. Pricing & Taxes
            </h2>
            <p>
              All prices displayed in Indian Rupees (₹) are inclusive of applicable goods and services tax
              (GST). We reserve the right to revise catalog pricing without prior notice.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
              4. Intellectual Property
            </h2>
            <p>
              All visual assets, editorial photography, typography, logos, and weaving documentation
              presented on this site are the exclusive intellectual property of Pudavai Kadai.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
