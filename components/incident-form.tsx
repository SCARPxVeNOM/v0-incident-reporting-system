"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface IncidentFormProps {
  onSubmit?: (data: any) => void
  onSuccess?: () => void
}

export default function IncidentForm({ onSubmit, onSuccess }: IncidentFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "water",
    description: "",
    location: "",
    latitude: "",
    longitude: "",
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          }))
        },
        (error) => {
          setError("Unable to get current location: " + error.message)
        },
      )
    } else {
      setError("Geolocation is not supported by your browser")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!formData.title || !formData.description || !formData.location) {
      setError("Please fill in all required fields")
      setLoading(false)
      return
    }

    // Check for duplicate incidents
    const existingIncidents = JSON.parse(localStorage.getItem("incidents") || "[]")
    const isDuplicate = existingIncidents.some(
      (inc: any) =>
        inc.category === formData.category &&
        inc.location === formData.location &&
        new Date(inc.created_at).toDateString() === new Date().toDateString(),
    )

    if (isDuplicate) {
      setError("An incident for this category and location already exists today")
      setLoading(false)
      return
    }

    try {
      const incident = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        image_url: imageFile ? URL.createObjectURL(imageFile) : null,
        status: "new",
        priority: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      existingIncidents.push(incident)
      localStorage.setItem("incidents", JSON.stringify(existingIncidents))

      if (onSubmit) {
        onSubmit(incident)
      }

      // Reset form
      setFormData({
        title: "",
        category: "water",
        description: "",
        location: "",
        latitude: "",
        longitude: "",
      })
      setImageFile(null)

      if (onSuccess) {
        onSuccess()
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6 max-w-2xl">
      <h2 className="text-lg font-semibold text-foreground mb-6">Report New Issue</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive text-destructive text-sm rounded-md">
            {error}
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-foreground">Issue Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            placeholder="Brief description of the issue"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              required
            >
              <option value="water">Water</option>
              <option value="electricity">Electricity</option>
              <option value="garbage">Garbage</option>
              <option value="it">IT</option>
              <option value="hostel">Hostel</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              placeholder="Building/Room location"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            rows={4}
            placeholder="Detailed description of the issue"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground">Latitude</label>
            <input
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-sm"
              placeholder="Auto-filled if available"
              readOnly
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Longitude</label>
            <input
              type="text"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-sm"
              placeholder="Auto-filled if available"
              readOnly
            />
          </div>
        </div>

        <Button type="button" onClick={getCurrentLocation} variant="outline" className="w-full bg-transparent">
          📍 Get Current Location
        </Button>

        <div>
          <label className="text-sm font-medium text-foreground">Image (Optional)</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full mt-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          />
          {imageFile && <p className="text-xs text-muted-foreground mt-1">Selected: {imageFile.name}</p>}
        </div>

        <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90">
          {loading ? "Submitting..." : "Submit Report"}
        </Button>
      </form>
    </Card>
  )
}
