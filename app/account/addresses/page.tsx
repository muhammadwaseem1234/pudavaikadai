"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { Address } from "@/lib/types";
import { AccountNav } from "@/components/account/AccountNav";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Modal } from "@/components/ui/Modal";
import { MapPin, Plus, Trash2, Edit3, CheckCircle2 } from "lucide-react";

export default function AccountAddressesPage() {
  const { customer, addAddress, updateAddress, deleteAddress } = useAuthStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  // Form fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const openAddModal = () => {
    setEditingAddressId(null);
    setFullName(customer?.name || "");
    setPhone(customer?.phone || "");
    setStreetAddress("");
    setApartment("");
    setCity("Chennai");
    setState("Tamil Nadu");
    setPostalCode("");
    setIsDefault(false);
    setModalOpen(true);
  };

  const openEditModal = (addr: Address) => {
    setEditingAddressId(addr.id);
    setFullName(addr.fullName);
    setPhone(addr.phone);
    setStreetAddress(addr.streetAddress);
    setApartment(addr.apartment || "");
    setCity(addr.city);
    setState(addr.state);
    setPostalCode(addr.postalCode);
    setIsDefault(Boolean(addr.isDefault));
    setModalOpen(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingAddressId) {
      updateAddress(editingAddressId, {
        fullName,
        phone,
        streetAddress,
        apartment,
        city,
        state,
        postalCode,
        isDefault,
      });
    } else {
      addAddress({
        fullName,
        phone,
        streetAddress,
        apartment,
        city,
        state,
        postalCode,
        country: "India",
        isDefault,
        type: "both",
      });
    }

    setModalOpen(false);
  };

  const addresses = customer?.addresses || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-screen">
      <Breadcrumbs
        items={[{ label: "My Account", href: "/account" }, { label: "Addresses" }]}
      />

      <div className="py-6 border-b border-stone-200 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
            Delivery Destinations
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif text-stone-900 mt-1">
            Saved Addresses ({addresses.length})
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Manage your residential and ceremonial delivery destinations.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-[0.18em] font-semibold transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Address</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4">
          <AccountNav />
        </div>

        <div className="lg:col-span-8">
          {addresses.length === 0 ? (
            <div className="bg-stone-50 border border-stone-200 p-12 text-center space-y-3">
              <MapPin className="w-8 h-8 mx-auto text-stone-400" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
                No Addresses Saved
              </h3>
              <p className="text-xs text-stone-500">
                Add an address to speed up your future handloom checkouts.
              </p>
              <button
                type="button"
                onClick={openAddModal}
                className="mt-2 px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-stone-800"
              >
                Add First Address
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`p-5 bg-white border flex flex-col justify-between text-xs space-y-4 ${
                    addr.isDefault
                      ? "border-stone-900 ring-1 ring-stone-900 shadow-xs"
                      : "border-stone-200"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-stone-900">
                        {addr.fullName}
                      </span>
                      {addr.isDefault && (
                        <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold bg-stone-900 text-white">
                          Default
                        </span>
                      )}
                    </div>

                    <p className="text-stone-600 leading-relaxed">
                      {addr.streetAddress}
                      {addr.apartment ? `, ${addr.apartment}` : ""}
                      <br />
                      {addr.city}, {addr.state} - {addr.postalCode}
                      <br />
                      {addr.country}
                    </p>

                    <p className="text-stone-500 pt-1">Phone: {addr.phone}</p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => openEditModal(addr)}
                        className="inline-flex items-center gap-1 text-stone-700 hover:text-stone-950 font-medium"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteAddress(addr.id)}
                        className="inline-flex items-center gap-1 text-stone-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>

                    {!addr.isDefault && (
                      <button
                        type="button"
                        onClick={() => updateAddress(addr.id, { isDefault: true })}
                        className="text-[11px] text-[#927238] hover:underline font-medium"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Address Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingAddressId ? "Edit Delivery Address" : "Add New Delivery Address"}
        maxWidth="lg"
      >
        <form onSubmit={handleSaveAddress} className="space-y-4 text-xs">
          <div>
            <label className="block uppercase tracking-wider text-stone-700 mb-1">
              Recipient Name *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider text-stone-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider text-stone-700 mb-1">
              Street Address *
            </label>
            <input
              type="text"
              required
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider text-stone-700 mb-1">
              Apartment / Suite (Optional)
            </label>
            <input
              type="text"
              value={apartment}
              onChange={(e) => setApartment(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block uppercase tracking-wider text-stone-700 mb-1">
                City *
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full h-11 px-3 bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-stone-700 mb-1">
                State *
              </label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full h-11 px-3 bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-stone-700 mb-1">
                PIN Code *
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full h-11 px-3 bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isDefaultAddr"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="w-4 h-4 text-stone-900 border-stone-300 focus:ring-stone-900"
            />
            <label htmlFor="isDefaultAddr" className="text-stone-700 cursor-pointer">
              Set as primary default delivery address
            </label>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-stone-200">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-5 py-2.5 border border-stone-300 text-stone-700 uppercase tracking-wider hover:bg-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-stone-900 hover:bg-black text-white uppercase tracking-wider font-semibold"
            >
              Save Address
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
