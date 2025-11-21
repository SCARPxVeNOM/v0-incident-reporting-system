"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

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

    // Simulate admin authentication
    if (formData.email === "admin@campus.com" && formData.password === "admin123") {
      localStorage.setItem("adminToken", "true")
      router.push("/admin/dashboard")
    } else {
      setError("Invalid admin credentials")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sidebar to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-lg border border-sidebar-border">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold text-sidebar-primary">Admin Access</h1>
            <p className="text-sm text-muted-foreground">Manage incidents and technicians</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive text-destructive text-sm rounded-md">
                {error}
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1"
                placeholder="admin@campus.com"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Password</label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1"
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground"
            >
              {loading ? "Signing in..." : "Admin Sign In"}
            </Button>
          </form>

          <div className="text-center">
            <Button variant="ghost" onClick={() => router.push("/")} className="text-sm">
              Back to Home
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
