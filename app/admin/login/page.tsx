"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Shield } from "lucide-react"

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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border bg-card shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-secondary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-primary">Admin Access</CardTitle>
          <CardDescription>Enter your credentials to access the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-md text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-background border-input focus:border-secondary focus:ring-secondary"
                placeholder="admin@campus.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-background border-input focus:border-secondary focus:ring-secondary"
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/20"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button
              variant="link"
              onClick={() => router.push("/")}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Return to Campus Portal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
