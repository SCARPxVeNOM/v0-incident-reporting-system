"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Wrench } from "lucide-react"

export default function TechnicianLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/technician/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Login failed")
      }

      const userData = await response.json()
      localStorage.setItem("technicianToken", "true")
      localStorage.setItem("technicianUser", JSON.stringify(userData))
      router.push("/technician/dashboard")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Content */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-lg">
          <div className="bg-white p-8">
            <div className="space-y-6">
          <div className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-cyan-100 flex items-center justify-center">
                <Wrench className="h-8 w-8 text-black" />
              </div>
            </div>
            <h1 className="text-3xl font-black text-black uppercase tracking-tight">
              Technician Login
            </h1>
            <p className="text-base font-bold text-black">Access your technician dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-4 bg-red-100 text-black text-sm font-bold">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-black text-black uppercase">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 border-2 border-gray-300 bg-white text-black font-bold focus:outline-none focus:border-cyan-400 focus:bg-cyan-50 transition-colors rounded"
                placeholder="technician@campus.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-black uppercase">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 border-2 border-gray-300 bg-white text-black font-bold focus:outline-none focus:border-cyan-400 focus:bg-cyan-50 transition-colors rounded"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-400 text-white h-14 text-base font-black uppercase tracking-wide hover:bg-cyan-500 transition-all duration-150 rounded"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-gray-200 pt-4">
            <button
              onClick={() => router.push("/")}
              className="text-sm text-black font-black uppercase hover:underline"
            >
              ← Return to Main Portal
            </button>
          </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 bg-white">
        <div className="relative w-full h-full max-w-2xl max-h-[90vh] overflow-hidden">
          <Image
            src="/funding.webp"
            alt="Hawkeye Technician"
            fill
            className="object-cover wave-animation"
            priority
            quality={90}
          />
        </div>
      </div>

      {/* Mobile Image - Show below content on small screens */}
      <div className="lg:hidden w-full p-8 pt-0">
        <div className="relative w-full h-64 overflow-hidden">
          <Image
            src="/funding.webp"
            alt="Hawkeye Technician"
            fill
            className="object-cover wave-animation"
            priority
            quality={90}
          />
        </div>
      </div>
    </div>
  )
}

