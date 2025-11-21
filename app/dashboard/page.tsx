"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import IncidentForm from "@/components/incident-form"
import IncidentList from "@/components/incident-list"
import AnalyticsOverview from "@/components/analytics-overview"

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [successMessage, setSuccessMessage] = useState("")

  const handleIncidentSuccess = () => {
    setSuccessMessage("Incident reported successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)
    setActiveTab("incidents")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Campus Complaint System</h1>
            <p className="text-sm text-muted-foreground">User Dashboard</p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              localStorage.clear()
              router.push("/")
            }}
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 flex gap-8">
          {[
            { id: "overview", label: "Overview" },
            { id: "incidents", label: "My Incidents" },
            { id: "report", label: "Report Issue" },
            { id: "tracking", label: "Issue Tracking" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {successMessage && (
          <div className="mb-4 p-3 bg-chart-3/10 border border-chart-3 text-chart-3 text-sm rounded-md">
            {successMessage}
          </div>
        )}

        {activeTab === "overview" && <AnalyticsOverview />}

        {activeTab === "incidents" && <IncidentList userOnly={true} />}

        {activeTab === "report" && <IncidentForm onSuccess={handleIncidentSuccess} />}

        {activeTab === "tracking" && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Issue Tracking</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-border rounded-md">
                <div>
                  <p className="font-medium text-foreground">Water Leakage - Room 201</p>
                  <p className="text-sm text-muted-foreground">Status: In Progress</p>
                </div>
                <span className="px-3 py-1 bg-secondary/20 text-secondary text-sm rounded-md font-medium">
                  In Progress
                </span>
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  )
}
