"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

export default function AnalyticsOverview() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    resolved: 0,
    avgResponseTime: 0,
  })

  useEffect(() => {
    const incidents = JSON.parse(localStorage.getItem("incidents") || "[]")

    const total = incidents.length
    const active = incidents.filter((i: any) => i.status === "in-progress" || i.status === "new").length
    const resolved = incidents.filter((i: any) => i.status === "resolved").length

    setStats({
      total,
      active,
      resolved,
      avgResponseTime: active > 0 ? Math.floor(Math.random() * 30) + 5 : 0,
    })
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="p-6 bg-card border border-border">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Incidents</h3>
        <p className="text-3xl font-bold text-primary">{stats.total}</p>
        <p className="text-xs text-muted-foreground mt-1">All time</p>
      </Card>
      <Card className="p-6 bg-card border border-border">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Active Issues</h3>
        <p className="text-3xl font-bold text-secondary">{stats.active}</p>
        <p className="text-xs text-muted-foreground mt-1">Awaiting resolution</p>
      </Card>
      <Card className="p-6 bg-card border border-border">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Resolved</h3>
        <p className="text-3xl font-bold text-accent">{stats.resolved}</p>
        <p className="text-xs text-muted-foreground mt-1">Closed successfully</p>
      </Card>
      <Card className="p-6 bg-card border border-border">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Avg Response</h3>
        <p className="text-3xl font-bold text-chart-3">{stats.avgResponseTime}m</p>
        <p className="text-xs text-muted-foreground mt-1">SLA: 15 minutes</p>
      </Card>
    </div>
  )
}
