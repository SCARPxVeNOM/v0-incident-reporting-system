"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

interface SLAStatus {
  incident_id: string
  title: string
  time_since_creation: number // in minutes
  sla_minutes: number
  status: "ok" | "warning" | "critical"
  percentage_used: number
}

export default function SLAMonitor() {
  const [slaStatuses, setSLAStatuses] = useState<SLAStatus[]>([])

  useEffect(() => {
    const incidents = JSON.parse(localStorage.getItem("incidents") || "[]")
    const slaMinutes = 15

    const statuses = incidents
      .filter((inc: any) => inc.status === "new" || inc.status === "in-progress")
      .map((inc: any) => {
        const createdTime = new Date(inc.created_at)
        const now = new Date()
        const timeSinceCreation = Math.floor((now.getTime() - createdTime.getTime()) / 60000)
        const percentage = (timeSinceCreation / slaMinutes) * 100

        let status: "ok" | "warning" | "critical" = "ok"
        if (percentage >= 100) status = "critical"
        else if (percentage >= 80) status = "warning"

        return {
          incident_id: inc.id,
          title: inc.title,
          time_since_creation: timeSinceCreation,
          sla_minutes: slaMinutes,
          status,
          percentage_used: Math.min(percentage, 100),
        }
      })

    setSLAStatuses(statuses)
  }, [])

  const getStatusColor = (status: "ok" | "warning" | "critical") => {
    switch (status) {
      case "ok":
        return "bg-chart-3/20 text-chart-3"
      case "warning":
        return "bg-accent/20 text-accent"
      case "critical":
        return "bg-destructive/20 text-destructive"
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">SLA Monitoring (15 min target)</h2>
      <div className="space-y-3">
        {slaStatuses.length === 0 ? (
          <p className="text-muted-foreground text-sm">All incidents within SLA</p>
        ) : (
          slaStatuses.map((sla) => (
            <div key={sla.incident_id} className="p-3 border border-border rounded-md">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-foreground text-sm">{sla.title}</p>
                <span className={`text-xs px-2 py-1 rounded font-medium ${getStatusColor(sla.status)}`}>
                  {sla.status.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {sla.time_since_creation} / {sla.sla_minutes} minutes
              </p>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-colors ${
                    sla.status === "critical" ? "bg-destructive" : sla.status === "warning" ? "bg-accent" : "bg-chart-3"
                  }`}
                  style={{ width: `${sla.percentage_used}%` }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
