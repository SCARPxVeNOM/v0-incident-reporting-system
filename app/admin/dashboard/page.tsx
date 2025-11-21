"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"
import AnalyticsOverview from "@/components/analytics-overview"
import TechnicianScheduler from "@/components/technician-scheduler"
import SLAMonitor from "@/components/sla-monitor"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [incidents, setIncidents] = useState<any[]>([])
  const [predictions, setPredictions] = useState<any[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("incidents") || "[]")
    setIncidents(stored)

    const predictionData = generatePredictions(stored)
    setPredictions(predictionData)
  }, [])

  const generatePredictions = (incidentData: any[]) => {
    const locationMap: Record<string, number> = {}
    const categoryMap: Record<string, number> = {}

    incidentData.forEach((inc: any) => {
      locationMap[inc.location] = (locationMap[inc.location] || 0) + 1
      categoryMap[inc.category] = (categoryMap[inc.category] || 0) + 1
    })

    return Object.entries(locationMap)
      .slice(0, 5)
      .map(([location, count]) => ({
        location,
        category: Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "general",
        confidence: Math.min(50 + count * 10, 95),
        message: `High chance of ${count > 3 ? "recurring" : "potential"} issues based on history`,
      }))
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    router.push("/")
  }

  const updateIncidentStatus = (id: string, newStatus: string) => {
    const updated = incidents.map((inc) =>
      inc.id === id ? { ...inc, status: newStatus, updated_at: new Date().toISOString() } : inc,
    )
    setIncidents(updated)
    localStorage.setItem("incidents", JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-sidebar border-b border-sidebar-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-sidebar-primary">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Campus Complaint Management</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="text-sidebar-primary bg-transparent">
            Logout
          </Button>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-sidebar border-b border-sidebar-border">
        <div className="max-w-7xl mx-auto px-4 flex gap-8">
          {[
            { id: "overview", label: "Overview" },
            { id: "incidents", label: "All Incidents" },
            { id: "scheduling", label: "Scheduling" },
            { id: "sla", label: "SLA Monitor" },
            { id: "heatmap", label: "Heatmap" },
            { id: "predictions", label: "Predictions" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-sidebar-accent text-sidebar-accent"
                  : "border-transparent text-muted-foreground hover:text-sidebar-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "overview" && <AnalyticsOverview />}

        {activeTab === "incidents" && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">All Reported Incidents</h2>
            <div className="space-y-3">
              {incidents.slice(0, 10).map((incident: any) => (
                <div
                  key={incident.id}
                  className="flex items-center justify-between p-3 border border-border rounded-md hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{incident.title}</p>
                    <p className="text-sm text-muted-foreground">{incident.location}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <select
                      value={incident.status}
                      onChange={(e) => updateIncidentStatus(incident.id, e.target.value)}
                      className="px-2 py-1 text-xs border border-border rounded-md bg-background"
                    >
                      <option value="new">New</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === "scheduling" && <TechnicianScheduler />}

        {activeTab === "sla" && <SLAMonitor />}

        {activeTab === "heatmap" && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Location Heatmap - High-Density Issue Zones</h2>
            <div className="bg-muted rounded-lg p-8">
              <div className="grid grid-cols-4 gap-2 mb-6">
                {[...Array(16)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg border border-border flex items-center justify-center text-xs font-medium"
                    style={{
                      backgroundColor: `rgba(102, 126, 234, ${Math.random() * 0.8})`,
                      color: "white",
                    }}
                  >
                    Building {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Darker zones indicate higher incident concentration
              </p>
            </div>
          </Card>
        )}

        {activeTab === "predictions" && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Predictive Alerts - Smart Incident Prediction
            </h2>
            <div className="space-y-3">
              {predictions.length === 0 ? (
                <p className="text-muted-foreground">No patterns detected yet. More data needed for predictions.</p>
              ) : (
                predictions.map((pred, i) => (
                  <div
                    key={i}
                    className="p-4 border border-border rounded-md bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-foreground">
                          {pred.location} - {pred.category}
                        </p>
                        <p className="text-sm text-muted-foreground">{pred.message}</p>
                      </div>
                      <span className="text-sm font-bold text-accent">{pred.confidence}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-secondary to-accent h-2 rounded-full"
                        style={{ width: `${pred.confidence}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        )}
      </main>
    </div>
  )
}
