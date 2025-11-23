"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Image from "next/image"

export default function LoginPage() {
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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Login failed")
      }

      const userData = await response.json()
      // Store user data for incident reporting
      localStorage.setItem("user", JSON.stringify(userData))

      router.push("/dashboard")
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
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-black text-black uppercase tracking-tight">HAWKEYE</h1>
            <p className="text-lg font-bold text-black">Sign In</p>
          </div>

          <button
            type="button"
            onClick={() => {
              signIn("google", { callbackUrl: "/dashboard" }).catch((error) => {
                console.error("Google sign in error:", error)
                setError("Google sign in failed. Please check if Google OAuth is configured in .env.local or use email/password login.")
              })
            }}
            className="w-full bg-white text-black h-14 text-base font-black uppercase tracking-wide border-4 border-black hover:border-transparent hover:bg-yellow-300 transition-all duration-150 active:translate-x-1 active:translate-y-1 active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-3"
            style={{
              boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)',
            }}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t-2 border-black" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-3 text-black font-bold uppercase">or sign in with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <label className="text-sm font-black text-black uppercase">Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 border-4 border-black bg-white text-black font-bold focus:outline-none focus:bg-yellow-100 transition-colors"
                placeholder="name@company.com"
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
                className="w-full h-12 px-4 border-4 border-black bg-white text-black font-bold focus:outline-none focus:bg-yellow-100 transition-colors"
                placeholder="••••••••"
                style={{
                  boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
                }}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-black text-white h-14 text-base font-black uppercase tracking-wide border-4 border-black hover:border-transparent hover:bg-white hover:text-black transition-all duration-150 active:translate-x-1 active:translate-y-1 active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              style={{
                boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)',
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="space-y-3 text-center border-t-4 border-black pt-4">
            <p className="text-sm text-black font-bold">
              <button
                onClick={() => router.push("/auth/register")}
                className="hover:underline uppercase"
              >
                Create account
              </button>
            </p>
            <p className="text-sm text-black font-bold">
              <button
                onClick={() => router.push("/admin/login")}
                className="hover:underline uppercase"
              >
                Admin Access
              </button>
            </p>
            <p className="text-sm text-black font-bold">
              <button
                onClick={() => router.push("/")}
                className="hover:underline uppercase"
              >
                ← Back to Home
              </button>
            </p>
          </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 bg-white">
        <div className="relative w-full h-full max-w-2xl max-h-[90vh] overflow-hidden">
          <Image
            src="/123.png"
            alt="Hawkeye Login"
            fill
            className="object-cover animate-spin-slow"
            priority
            quality={90}
            style={{
              animation: 'spin 20s linear infinite',
            }}
          />
        </div>
      </div>

      {/* Mobile Image - Show below content on small screens */}
      <div className="lg:hidden w-full p-8 pt-0">
        <div className="relative w-full h-64 overflow-hidden">
          <Image
            src="/123.png"
            alt="Hawkeye Login"
            fill
            className="object-cover"
            priority
            quality={90}
            style={{
              animation: 'spin 20s linear infinite',
            }}
          />
        </div>
      </div>
    </div>
  )
}
