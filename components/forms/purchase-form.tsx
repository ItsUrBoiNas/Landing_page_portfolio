"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Upload, Loader2 } from "lucide-react"

interface PurchaseFormData {
  name: string
  email: string
  phone: string
  company: string
  website: string
  location: string
  needs: string
  references: File[]
}

export default function PurchaseForm({ onSuccess, onClose }: { onSuccess?: () => void; onClose: () => void }) {
  const [formData, setFormData] = useState<PurchaseFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    location: "",
    needs: "",
    references: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paypalOrderId, setPaypalOrderId] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        references: Array.from(e.target.files || []),
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // First, upload files if any
      const uploadedFiles: string[] = []
      if (formData.references.length > 0) {
        const formDataToSend = new FormData()
        formData.references.forEach((file) => {
          formDataToSend.append("files", file)
        })

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formDataToSend,
        })

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload files")
        }

        const uploadData = await uploadResponse.json()
        uploadedFiles.push(...uploadData.ids)
      }

      // Create PayPal order
      const orderResponse = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 199,
          formData: {
            ...formData,
            references: uploadedFiles,
          },
        }),
      })

      if (!orderResponse.ok) {
        throw new Error("Failed to create PayPal order")
      }

      const { orderId, approvalUrl } = await orderResponse.json()
      setPaypalOrderId(orderId)

      // Redirect to PayPal
      window.location.href = approvalUrl
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-slate-300 font-medium mb-2">
            Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-slate-300 font-medium mb-2">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-slate-300 font-medium mb-2">
            Phone <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="(555) 123-4567"
          />
        </div>
        <div>
          <label className="block text-slate-300 font-medium mb-2">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Company Name"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-slate-300 font-medium mb-2">Website</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com"
          />
        </div>
        <div>
          <label className="block text-slate-300 font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="City, State"
          />
        </div>
      </div>

      <div>
        <label className="block text-slate-300 font-medium mb-2">
          Describe Your Needs <span className="text-red-400">*</span>
        </label>
        <textarea
          name="needs"
          value={formData.needs}
          onChange={handleInputChange}
          required
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Tell us about your landing page requirements..."
        />
      </div>

      <div>
        <label className="block text-slate-300 font-medium mb-2">Upload References/Designs</label>
        <div className="relative">
          <input
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="flex items-center gap-2 px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white cursor-pointer hover:bg-slate-700 transition-colors"
          >
            <Upload className="w-5 h-5" />
            <span>{formData.references.length > 0 ? `${formData.references.length} file(s) selected` : "Choose files"}</span>
          </label>
        </div>
        {formData.references.length > 0 && (
          <ul className="mt-2 space-y-1">
            {formData.references.map((file, index) => (
              <li key={index} className="text-sm text-slate-400">
                {file.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-semibold">Single Page Landing Page</p>
            <p className="text-slate-400 text-sm">No payment processing • 2 day turn-around</p>
          </div>
          <p className="text-2xl font-bold text-white">$199</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Purchase Now - $199"
          )}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}












