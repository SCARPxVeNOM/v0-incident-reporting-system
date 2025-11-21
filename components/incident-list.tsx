"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

interface Incident {
  id: string
  title: string
  category: string
  location: string
  status: string
  priority: number
  created_at: string
  image_url?: string
}

interface IncidentListProps {
  userOnly?: boolean
}

export default function IncidentList({ userOnly = false }: IncidentListProps) {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("incidents") || "[]")
    setIncidents(stored)
  }, [])

  const filteredIncidents = incidents.filter((incident) => {
    if (filter === "all") return true
    return incident.status === filter
  })

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      water: "bg-blue-100 text-blue-800",
      electricity: "bg-yellow-100 text-yellow-800",
      garbage: "bg-green-100 text-green-800",
      it: "bg-purple-100 text-purple-800",
      hostel: "bg-pink-100 text-pink-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: "bg-blue-100 text-blue-800",
      "in-progress": "bg-secondary/20 text-secondary",
      resolved: "bg-chart-3/20 text-chart-3",
      closed: "bg-muted text-muted-foreground",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        {userOnly ? "My Reported Issues" : "All Incidents"}
      </h2>

      <div className="flex gap-2 mb-4 flex-wrap">
        {["all", "new", "in-progress", "resolved", "closed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              filter === status
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredIncidents.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No incidents found</p>
        ) : (
          filteredIncidents.map((incident) => (
            <div
              key={incident.id}
              className="flex items-start gap-4 p-4 border border-border rounded-md hover:bg-muted/50 transition-colors"
            >
              {incident.image_url && (
                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                  <img
                    src={incident.image_url || "/placeholder.svg"}
                    alt={incident.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{incident.title}</p>
                    <p className="text-sm text-muted-foreground">{incident.location}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <span className={`px-2 py-1 text-xs rounded-md font-medium ${getCategoryColor(incident.category)}`}>
                      {incident.category}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-md font-medium ${getStatusColor(incident.status)}`}>
                      {incident.status}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(incident.created_at).toLocaleDateString()} at{" "}
                  {new Date(incident.created_at).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
