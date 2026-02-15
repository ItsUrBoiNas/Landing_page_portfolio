"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Copy, Check } from "lucide-react";
import { InlineWidget } from "react-calendly";

export default function BookingSection() {
  const [emailCopied, setEmailCopied] = useState(false);
  const email = "";
  const phone = "";
  const location = "United States";
  const calendlyUrl = "https://calendly.com/nas/30min";

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Ready to Scale?
            </h2>
            <p className="text-xl text-slate-400 mb-12">
              Stop guessing. Let&apos;s build a path to profit.
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center gap-4">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 p-4 rounded-lg bg-slate-900/40 backdrop-blur-md border border-slate-800/50 hover:border-blue-500/50 transition-all duration-200 hover:scale-105 flex-1"
                >
                  <div className="p-3 rounded-lg bg-blue-500/20">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-400">Email</p>
                    <p className="text-lg font-semibold text-white">{email}</p>
                  </div>
                </a>
                <button
                  onClick={copyEmailToClipboard}
                  className="p-4 rounded-lg bg-slate-900/40 backdrop-blur-md border border-slate-800/50 hover:border-blue-500/50 transition-all duration-200 hover:scale-105"
                  aria-label="Copy email to clipboard"
                >
                  {emailCopied ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-slate-400 hover:text-blue-400" />
                  )}
                </button>
              </div>

              {/* Phone */}
              <a
                href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                className="flex items-center gap-4 p-4 rounded-lg bg-slate-900/40 backdrop-blur-md border border-slate-800/50 hover:border-blue-500/50 transition-all duration-200 hover:scale-105"
              >
                <div className="p-3 rounded-lg bg-blue-500/20">
                  <Phone className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Phone</p>
                  <p className="text-lg font-semibold text-white">{phone}</p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-900/40 backdrop-blur-md border border-slate-800/50">
                <div className="p-3 rounded-lg bg-blue-500/20">
                  <MapPin className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Location</p>
                  <p className="text-lg font-semibold text-white">{location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Calendly Widget */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="rounded-lg bg-slate-900/40 backdrop-blur-md border border-slate-800/50 p-4 overflow-hidden">
              <div className="min-h-[600px]">
                <InlineWidget
                  url={calendlyUrl}
                  styles={{
                    height: "600px",
                  }}
                  pageSettings={{
                    backgroundColor: "000000",
                    textColor: "ffffff",
                    primaryColor: "3b82f6",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
