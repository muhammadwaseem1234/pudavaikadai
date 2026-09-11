import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-white">
      <div className="max-w-md text-center space-y-5">
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-500">
          <Compass className="w-8 h-8 text-[#927238]" />
        </div>

        <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238] block">
          404 Error — Archive Notice
        </span>

        <h1 className="text-3xl sm:text-4xl font-serif text-stone-900">
          The Weave You Seek Cannot Be Found
        </h1>

        <p className="text-xs text-stone-500 leading-relaxed">
          The page or saree collection you are searching for may have been moved, renamed, or retired from our active catalog.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-7 py-3 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-[0.18em] font-semibold transition-colors"
          >
            Return to Homepage
          </Link>

          <Link
            href="/products"
            className="w-full sm:w-auto px-7 py-3 border border-stone-300 hover:border-stone-900 text-stone-900 text-xs uppercase tracking-[0.18em] font-semibold transition-colors"
          >
            Browse All Sarees
          </Link>
        </div>
      </div>
    </div>
  );
}
