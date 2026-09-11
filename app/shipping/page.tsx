import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Truck, ShieldCheck, Clock, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy | Pudavai Kadai",
  description: "Learn about complimentary insured shipping across India and worldwide DHL Express delivery.",
};

export default function ShippingPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs items={[{ label: "Shipping Policy" }]} />

        <div className="py-8 border-b border-stone-200 mb-10">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
            Logistics & Assurance
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-stone-900 mt-1">
            Shipping & Delivery Timelines
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-light mt-2">
            Every handloom saree is packed in archival gift boxes and transit-insured against loss or damage.
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-stone-700 leading-relaxed pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-stone-50 border border-stone-200 space-y-2">
              <Truck className="w-6 h-6 text-[#927238]" />
              <h3 className="font-semibold text-stone-900 uppercase tracking-wider text-xs">
                Domestic Shipping (India)
              </h3>
              <p className="text-xs text-stone-600">
                Complimentary delivery on all orders above ₹ 5,000. Flat ₹ 250 for orders below ₹ 5,000. Delivered within 2-5 business days.
              </p>
            </div>

            <div className="p-5 bg-stone-50 border border-stone-200 space-y-2">
              <Globe className="w-6 h-6 text-[#927238]" />
              <h3 className="font-semibold text-stone-900 uppercase tracking-wider text-xs">
                Worldwide Express (60+ Countries)
              </h3>
              <p className="text-xs text-stone-600">
                Dispatched via DHL Express Air. Delivered in 6-10 business days. Customs duties calculated based on destination regulations.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-semibold text-stone-900 uppercase tracking-wider">
              Transit Insurance & Royal Packaging
            </h2>
            <p>
              Your handwoven silk saree is treated like sacred jewelry. It is enclosed in acid-free tissue wrapping, placed within a gold-embossed hardbound gift box, and enclosed inside a tamper-proof outer shell. In the rare event of transit damage or loss, our full transit insurance guarantees an immediate replacement or full refund.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-semibold text-stone-900 uppercase tracking-wider">
              Tracking Your Consignment
            </h2>
            <p>
              Once your saree passes final quality inspection and is tagged with its Silk Mark hologram, you will receive an SMS and email notification containing your courier tracking number (Bluedart, Delhivery, or DHL). You can track live updates directly inside your Customer Account portal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
