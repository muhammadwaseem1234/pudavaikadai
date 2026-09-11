"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  max?: number;
  onChange: (quantity: number) => void;
  className?: string;
}

export function QuantitySelector({
  quantity,
  max = 10,
  onChange,
  className = "",
}: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className={`flex items-center border border-stone-300 bg-white ${className}`}>
      <button
        type="button"
        onClick={handleDecrease}
        disabled={quantity <= 1}
        className="w-10 h-11 flex items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <span className="w-12 text-center text-xs font-semibold text-stone-900 select-none">
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrease}
        disabled={quantity >= max}
        className="w-10 h-11 flex items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
