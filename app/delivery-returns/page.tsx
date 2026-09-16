import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Truck, RotateCcw, Globe, ShieldCheck, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Delivery and Returns | Pudavai Kadai - Heritage Handlooms",
  description:
    "Official delivery timelines, domestic & international shipping policies, and 14-day returns and refund policy for Pudavai Kadai.",
};

export default function DeliveryReturnsPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Delivery and Returns" }]} />

        {/* Header */}
        <div className="py-8 border-b border-stone-200 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f3ebe0] border border-[#dccfb8] rounded-full text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8a6829] mb-3">
            <Truck className="w-3.5 h-3.5 text-[#927238]" />
            <span>Legal & Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-stone-900">
            Delivery and Returns
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-light mt-2">
            Transparent logistics, prompt domestic & worldwide dispatch, and our 14-day return and exchange commitment.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-xs sm:text-sm text-stone-700 leading-relaxed pb-24">
          {/* GENERAL DELIVERY INFO */}
          <section className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-stone-900 font-semibold text-sm sm:text-base border-b border-stone-100 pb-2">
              <Truck className="w-4 h-4 text-[#927238]" />
              <h2 className="uppercase tracking-wider">General Delivery Info</h2>
            </div>
            <p>
              Orders placed before 2:30 PM (IST) are usually processed and shipped the same day from Chennai, India.
            </p>
            <div className="p-4 bg-[#FAF8F5] border border-[#e8dfcf] rounded-xs">
              <p className="font-semibold text-stone-900">
                We are pleased to offer Free Standard Shipping on all domestic orders.
              </p>
            </div>
            <p>
              Delivery timelines are estimates and commence from the date of dispatch. Depending on your location, courier service, and local logistics, your order will typically arrive within:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-800 font-medium">
              <li>3–7 business days across India</li>
              <li>7–15 business days for international deliveries</li>
            </ul>
            <p className="text-stone-600">
              Please note that delivery times may vary due to local conditions, festive seasons, or adverse weather.
            </p>
            <p>
              We strive to dispatch every order promptly; however, during sales, holiday periods, or promotional events, processing may take slightly longer than usual.
            </p>
            <p>
              Customers are generally required to sign upon delivery, though contactless delivery options are available with most courier partners. This is not a named delivery service, so any authorized recipient at your address may sign for the parcel. Pudavai Kadai will not be liable for parcels signed for by third parties (such as apartment receptions or office staff).
            </p>
            <p>
              If no one is available to receive the parcel, the courier will make three delivery attempts on consecutive business days. If undelivered after five days without response, the package will be returned to our Chennai warehouse.
            </p>
            <p>
              As part of our commitment to sustainability, your order will be shipped in eco-friendly, recyclable packaging. Each saree is carefully wrapped in tissue paper and delivered in a discreet, recyclable box, without external branding or gift wrapping.
            </p>
            <p className="text-stone-600">
              During peak seasons or promotional periods, kindly allow up to 7 working days for your order to arrive. We appreciate your patience and continued support.
            </p>
          </section>

          {/* INTERNATIONAL ORDERS (DELIVERY) */}
          <section className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-stone-900 font-semibold text-sm sm:text-base border-b border-stone-100 pb-2">
              <Globe className="w-4 h-4 text-[#927238]" />
              <h2 className="uppercase tracking-wider">International Orders</h2>
            </div>
            <p>
              Outside India, all shipments are sent on a DDU (Delivery Duties Unpaid) basis. This means your order may be subject to import duties, customs taxes, and local handling fees, which are applied once the shipment reaches your country.
            </p>
            <p>
              Customers are solely responsible for all customs clearance charges, import duties, taxes, and any additional fees that may be levied by local authorities. As customs policies vary widely from country to country, we strongly recommend checking with your local customs office for detailed information before placing your order.
            </p>
            <p>
              In the event that a package is undeliverable due to unpaid customs duties or incorrect address information and is returned to us, the customer will be responsible for all return shipping costs and any related charges.
            </p>
            <p className="text-stone-600">
              Please note that cross-border shipments may be opened and inspected by customs authorities as part of the clearance process. Such inspections are beyond our control and may cause slight delays in delivery times.
            </p>
            <p>
              We take great care in ensuring all international shipments are packaged securely and dispatched promptly.
            </p>
          </section>

          {/* REFUND POLICY */}
          <section className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-stone-900 font-semibold text-sm sm:text-base border-b border-stone-100 pb-2">
              <RotateCcw className="w-4 h-4 text-[#927238]" />
              <h2 className="uppercase tracking-wider">Refund Policy</h2>
            </div>
            <p>
              At Pudavai Kadai, we take pride in the quality and craftsmanship of every saree. However, if you are not completely satisfied with your purchase, we offer returns and exchanges on eligible items.
            </p>
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xs space-y-2">
              <p className="font-semibold text-stone-900">
                Returns & Exchanges are accepted on unused, unwashed, and unworn sarees within 14 days of order receipt and require a Return Authorization (RA) Number.
              </p>
              <p className="text-stone-600 text-xs">
                Once an RA number is issued, items must be returned within 10 days.
              </p>
            </div>
            <p className="text-stone-600 italic">
              Please note that items purchased during sale periods or with discounts of 50% or more are Final Sale and cannot be returned or exchanged.
            </p>

            <div className="pt-2">
              <h3 className="font-semibold text-stone-900 uppercase tracking-wider text-xs mb-2">
                Requesting a Return Authorization (RA)
              </h3>
              <p className="mb-2">You can request an RA Number through:</p>
              <div className="space-y-1.5 pl-2">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#927238]" />
                  <span>Email: <a href="mailto:support@pudavaikadai.com" className="text-[#927238] underline font-medium">support@pudavaikadai.com</a></span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#927238]" />
                  <span>Phone: <a href="tel:+919884011223" className="text-stone-900 font-medium">+91 98840 11223</a></span>
                </p>
              </div>
              <p className="text-stone-600 mt-2">
                During regular business hours, email requests are processed promptly. If you do not receive a response within 24 hours, please reach out to us by phone for assistance.
              </p>
            </div>
          </section>

          {/* RETURN TERMS AND CONDITIONS */}
          <section className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-stone-900 font-semibold text-sm sm:text-base border-b border-stone-100 pb-2">
              <ShieldCheck className="w-4 h-4 text-[#927238]" />
              <h2 className="uppercase tracking-wider">Return Terms and Conditions</h2>
            </div>
            <p>
              Orders may be returned within 14 days of receipt if you are unsatisfied with your purchase. All returned items must be in the same condition in which they were received — unused, unwashed, unaltered, and with all original tags and packaging intact.
            </p>
            <p>
              Customers will receive a full refund minus the original shipping cost. Merchandise returned without original packaging or with visible wear will not be eligible for a refund.
            </p>
            <div className="p-4 bg-[#fbf8f2] border border-[#e8dfcf] rounded-xs space-y-1.5">
              <p className="font-semibold text-stone-900">
                In the event of damaged, defective, or incorrectly shipped merchandise, replacements will be sent promptly at no additional cost.
              </p>
              <p className="text-stone-600 text-xs">
                Free return shipping is provided only for items that are damaged, defective, or incorrectly shipped. In all other cases, customers are responsible for return shipping charges. Items sent Cash on Delivery (COD) for return will not be accepted.
              </p>
            </div>
            <p>
              Once a return has been received and inspected, a refund or credit will be processed within 2–3 business days. You will be notified by email once your return is complete. Please note that your banking institution may require additional days to process and post the refund to your account.
            </p>
          </section>

          {/* INTERNATIONAL ORDERS (RETURNS) */}
          <section className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-stone-900 font-semibold text-sm sm:text-base border-b border-stone-100 pb-2">
              <Globe className="w-4 h-4 text-[#927238]" />
              <h2 className="uppercase tracking-wider">International Orders (Returns & Liability)</h2>
            </div>
            <p>
              All international shipments from Pudavai Kadai are sent on a DDU (Delivered Duty Unpaid) basis. This means that risk of loss and title for merchandise passes to the customer once the order is handed over to the carrier in Chennai, India.
            </p>
            <p>
              Orders may be subject to import customs duties, taxes, and fees, which are levied once a shipment reaches the destination country. Customers are responsible for all customs clearance charges, import duties, local taxes, and handling fees, if applicable.
            </p>
            <p>
              Since customs policies vary widely from country to country, we recommend verifying all import regulations and potential charges with your local customs office before placing your order.
            </p>
            <p>
              In the event that a package is undeliverable or returned due to unpaid customs duties, refusal, or incorrect address information, the customer will be responsible for all return shipping costs and any related charges.
            </p>
            <p className="text-stone-600">
              Please note that cross-border shipments may be opened and inspected by customs authorities during the clearance process. Such inspections are outside our control and may cause minor delivery delays.
            </p>
            <p>
              We take utmost care to ensure all international shipments are securely packaged and dispatched promptly, so your Pudavai Kadai creation reaches you in perfect condition.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
