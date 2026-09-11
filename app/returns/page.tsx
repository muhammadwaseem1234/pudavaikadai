import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RotateCcw, ShieldCheck, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Returns & Exchanges Policy | Pudavai Kadai",
  description: "Learn about our 7-day hassle-free exchange policy for handloom sarees.",
};

export default function ReturnsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs items={[{ label: "Returns & Exchanges" }]} />

        <div className="py-8 border-b border-stone-200 mb-10">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
            Patron Assurance
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-stone-900 mt-1">
            7-Day Handloom Exchange Policy
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-light mt-2">
            We want you to love your heirloom saree unconditionally. Learn about our simple exchange process.
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-stone-700 leading-relaxed pb-20">
          <div className="p-6 bg-stone-50 border border-stone-200 space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
              Exchange Eligibility Criteria
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-stone-600">
              <li>Request initiated within 7 calendar days from the date of confirmed delivery.</li>
              <li>The original Silk Mark certification tag and brand labels must remain attached.</li>
              <li>The saree must be in unwashed, unworn, original fold condition with intact blouse fabric.</li>
              <li>Custom stitched blouses or customized fall/pico orders cannot be exchanged.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-semibold text-stone-900 uppercase tracking-wider">
              How to Initiate an Exchange
            </h2>
            <p>
              Initiating an exchange is effortless. Simply contact our customer concierge via WhatsApp at{" "}
              <span className="font-semibold text-stone-900">+91 98401 23456</span> or email{" "}
              <span className="font-semibold text-stone-900">concierge@pudavaikadai.com</span> with your
              Order Number. Our team will arrange a reverse courier pickup from your doorstep across all
              serviceable PIN codes.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-semibold text-stone-900 uppercase tracking-wider">
              Natural Handloom Characteristics
            </h2>
            <p>
              Please note that slight irregularities in weave, slubs, or minor color nuance are natural hallmarks of authentic handloom weaving and pit-loom craftsmanship—not manufacturing defects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
