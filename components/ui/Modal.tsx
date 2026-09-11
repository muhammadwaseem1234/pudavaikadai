"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
  maxWidth = "md",
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-2xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={cn(
          "relative w-full bg-white border border-stone-200 shadow-2xl z-10 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200",
          maxWidthClasses[maxWidth],
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-stone-900">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="p-1 text-stone-500 hover:text-stone-900 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {!title && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 z-20 text-stone-500 hover:text-stone-900 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
