"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-white">
      <div className="max-w-md text-center space-y-4">
        <div className="w-16 h-16 bg-red-50 text-red-700 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-red-700 block">
          Temporary Display Interruption
        </span>

        <h1 className="text-2xl sm:text-3xl font-serif text-stone-900">
          Something Went Unexpectedly Wrong
        </h1>

        <p className="text-xs text-stone-500 leading-relaxed">
          We apologize for the inconvenience. Please attempt refreshing the display or return to our homepage.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto px-7 py-3 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-7 py-3 border border-stone-300 hover:border-stone-900 text-stone-900 text-xs uppercase tracking-[0.18em] font-semibold transition-colors text-center"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
