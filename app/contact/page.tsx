"use client";

import React, { useState } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs items={[{ label: "Contact Stylist" }]} />

        {/* Header */}
        <div className="py-8 border-b border-stone-200 mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
            Customer Concierge
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-stone-900 mt-1">
            Connect With Our Stylists
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-light max-w-xl mt-2">
            Whether you are preparing for a wedding muhurtham, seeking silk care advice, or exploring custom blouse embroidery, our curators are delighted to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20">
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8 text-xs">
            <div className="bg-stone-50 border border-stone-200 p-6 space-y-6">
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 border-b border-stone-200 pb-3">
                Flagship Studio & Atelier
              </h3>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#927238] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-stone-900">Pudavai Kadai Heritage Flagship</p>
                  <p className="text-stone-600 leading-relaxed">
                    Plot no 6, 4th street, Kuberan nagar ext , Madipakkam

                    <br />
                    Chennai, Tamil Nadu - 600091
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#927238] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-semibold text-stone-900">Voice Assistance & Video Calls</p>
                  <p className="text-stone-600">+91 98402 48980</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-[#927238] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-semibold text-stone-900">WhatsApp Bridal Concierge</p>
                  <p className="text-stone-600">+91 98402 48980(Live Saree Video Drapes)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#927238] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-semibold text-stone-900">Email Enquiries</p>
                  <p className="text-stone-600">concierge@pudavaikadai.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-stone-200 p-8 space-y-6">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-900">
                Send a Message
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Leave a note below and our handloom specialist will respond within 4 hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-stone-50 border border-stone-200 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h3 className="text-sm font-semibold text-stone-900">Message Received</h3>
                <p className="text-xs text-stone-600 leading-relaxed max-w-md mx-auto">
                  Thank you, <span className="font-semibold">{name}</span>. Your enquiry has been routed to our senior bridal stylist. We will get in touch shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setEmail("");
                    setPhone("");
                    setMessage("");
                  }}
                  className="mt-2 text-xs font-semibold text-[#927238] hover:underline uppercase tracking-wider"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-stone-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Deepika Ramanathan"
                      className="w-full h-11 px-3.5 bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-stone-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email Address"
                      className="w-full h-11 px-3.5 bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-stone-700 mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your Phone Number"
                    className="w-full h-11 px-3.5 bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-stone-700 mb-1">
                    How May We Assist You? *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about the occasion, color preferences, or specific weave you are searching for..."
                    className="w-full p-3.5 bg-white border border-stone-300 focus:outline-none focus:border-stone-900 leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
