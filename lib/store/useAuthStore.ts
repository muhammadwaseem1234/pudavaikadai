"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Customer, Address } from "@/lib/types";

interface AuthStore {
  customer: Customer | null;
  isAuthenticated: boolean;
  token: string | null;

  // Actions
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, pass: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<Pick<Customer, "name" | "email" | "phone">>) => Promise<void>;
  addAddress: (address: Omit<Address, "id">) => Promise<void>;
  updateAddress: (id: string, updatedFields: Partial<Address>) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      customer: null,
      isAuthenticated: false,
      token: null,

      login: async (email: string, pass: string) => {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: pass }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Authentication failed.");
        }

        set({
          customer: data.customer,
          isAuthenticated: true,
          token: data.token || null,
        });

        return true;
      },

      register: async (name: string, email: string, phone: string, pass: string) => {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone, password: pass }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to create account.");
        }

        set({
          customer: data.customer,
          isAuthenticated: true,
          token: data.token || null,
        });

        return true;
      },

      logout: () => {
        set({
          customer: null,
          isAuthenticated: false,
          token: null,
        });
      },

      updateProfile: async (data) => {
        const current = get().customer;
        if (!current) return;

        const updatedCustomer = {
          ...current,
          ...data,
        };

        set({ customer: updatedCustomer });

        // Sync with WooCommerce backend
        try {
          await fetch("/api/auth/customer", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customerId: current.id,
              name: data.name,
              phone: data.phone,
            }),
          });
        } catch (err) {
          console.error("Failed to sync profile update to WooCommerce:", err);
        }
      },

      addAddress: async (newAddr) => {
        const current = get().customer;
        if (!current) return;

        const addr: Address = {
          ...newAddr,
          id: `addr-${Date.now()}`,
        };

        const updatedAddresses: Address[] = newAddr.isDefault
          ? [...current.addresses.map((a): Address => ({ ...a, isDefault: false })), addr]
          : [...current.addresses, addr];

        set({
          customer: {
            ...current,
            addresses: updatedAddresses,
          },
        });

        // Sync with WooCommerce
        try {
          const nameParts = (newAddr.fullName || "").trim().split(/\s+/);
          await fetch("/api/auth/customer", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customerId: current.id,
              billing: {
                first_name: nameParts[0] || "",
                last_name: nameParts.slice(1).join(" ") || "",
                address_1: newAddr.streetAddress,
                address_2: newAddr.apartment || "",
                city: newAddr.city,
                state: newAddr.state,
                postcode: newAddr.postalCode,
                country: newAddr.country === "India" ? "IN" : newAddr.country,
                phone: newAddr.phone,
              },
            }),
          });
        } catch (err) {
          console.error("Failed to sync address to WooCommerce:", err);
        }
      },

      updateAddress: async (id, fields) => {
        const current = get().customer;
        if (!current) return;

        const updated: Address[] = current.addresses.map((a): Address => {
          if (a.id === id) {
            return { ...a, ...fields };
          }
          if (fields.isDefault) {
            return { ...a, isDefault: false };
          }
          return a;
        });

        set({
          customer: {
            ...current,
            addresses: updated,
          },
        });
      },

      deleteAddress: async (id) => {
        const current = get().customer;
        if (!current) return;

        set({
          customer: {
            ...current,
            addresses: current.addresses.filter((a) => a.id !== id),
          },
        });
      },
    }),
    {
      name: "pk-auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
