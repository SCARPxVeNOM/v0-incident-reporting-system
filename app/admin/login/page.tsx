"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function AdminLoginPage() {
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
      const response = await fetch("/api/auth/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Login failed")
      }

      const userData = await response.json()
      localStorage.setItem("adminToken", "true")
      localStorage.setItem("adminUser", JSON.stringify(userData))
      router.push("/admin/dashboard")
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
          <div className="bg-white border-4 border-black p-8"
            style={{
              boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)',
            }}
          >
            <div className="space-y-6">
          <div className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative h-16 w-16 border-4 border-black"
                style={{
                  boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
                }}
              >
                <svg className="h-16 w-16" viewBox="0 0 64 64" fill="none">
                  <path d="M32 4L8 16v16c0 13.255 10.745 24 24 24s24-10.745 24-24V16L32 4z" fill="#2C3E50"/>
                  <path d="M32 4L56 16v16c0 13.255-10.745 24-24 24S8 45.255 8 32V16L32 4z" fill="#2ECC71"/>
                  <path d="M32 20c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" fill="white"/>
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-black text-black uppercase tracking-tight">Admin Access</h1>
            <p className="text-base font-bold text-black">Enter your credentials to access the dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-4 bg-red-100 border-4 border-black text-black text-sm font-bold"
                style={{
                  boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
                }}
              >
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-black text-black uppercase">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 border-4 border-black bg-white text-black font-bold focus:outline-none focus:bg-purple-100 transition-colors"
                placeholder="admin@example.com"
                style={{
                  boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
                }}
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
                className="w-full h-12 px-4 border-4 border-black bg-white text-black font-bold focus:outline-none focus:bg-purple-100 transition-colors"
                placeholder="••••••••"
                style={{
                  boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-400 text-white h-14 text-base font-black uppercase tracking-wide border-4 border-black hover:border-transparent hover:bg-purple-500 transition-all duration-150 active:translate-x-1 active:translate-y-1 active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              style={{
                boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)',
              }}
            >
              {loading ? "Authenticating..." : "Log In"}
            </button>
          </form>

          <div className="mt-6 text-center border-t-4 border-black pt-4">
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
        <div className="relative w-full h-full max-w-4xl aspect-square flex items-center justify-center">
          <Image
            src="/airship - Copy.webp"
            alt="Hawkeye Admin"
            width={800}
            height={800}
            className="w-full h-full object-contain wave-animation"
            priority
            quality={90}
            style={{
              maxWidth: '100%',
              maxHeight: '90vh',
            }}
          />
        </div>
      </div>

      {/* Mobile Image - Show below content on small screens */}
      <div className="lg:hidden w-full p-8 pt-0">
        <div className="relative w-full h-96 flex items-center justify-center">
          <Image
            src="/airship - Copy.webp"
            alt="Hawkeye Admin"
            width={600}
            height={600}
            className="w-full h-full object-contain wave-animation"
            priority
            quality={90}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
            }}
          />
        </div>
      </div>
    </div>
  )
}
