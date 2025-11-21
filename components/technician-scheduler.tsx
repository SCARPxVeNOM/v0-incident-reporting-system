"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

interface Assignment {
  id: string
  incident_id: string
  technician_id: string
  technician_name: string
  incident_title: string
  location: string
  scheduled_time: string
  duration_minutes: number
  status: "scheduled" | "in-progress" | "completed"
}

interface Technician {
  id: string
  name: string
  specialization: string
  active: boolean
  available: boolean
  current_assignments: number
  max_concurrent: number
}

export default function TechnicianScheduler() {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [technicians, setTechnicians] = useState<Technician[]>([
    {
      id: "1",
      name: "John Smith",
      specialization: "Electrical",
      active: true,
      available: true,
      current_assignments: 0,
      max_concurrent: 2,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      specialization: "Plumbing",
      active: true,
      available: true,
      current_assignments: 1,
      max_concurrent: 2,
    },
    {
      id: "3",
      name: "Mike Davis",
      specialization: "HVAC",
      active: true,
      available: false,
      current_assignments: 2,
      max_concurrent: 2,
    },
  ])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("technician_assignments") || "[]")
    setAssignments(stored)
  }, [])

  const assignTechnician = (incidentId: string, incidentTitle: string, location: string, technicianId: string) => {
    const technician = technicians.find((t) => t.id === technicianId)
    if (!technician) return

    if (technician.current_assignments >= technician.max_concurrent) {
      alert("Technician has reached max concurrent assignments")
      return
    }

    const newAssignment: Assignment = {
      id: Math.random().toString(36).substr(2, 9),
      incident_id: incidentId,
      technician_id: technicianId,
      technician_name: technician.name,
      incident_title: incidentTitle,
      location,
      scheduled_time: new Date(Date.now() + 15 * 60000).toISOString(), // 15 mins from now (SLA)
      duration_minutes: 30,
      status: "scheduled",
    }

    const updated = [...assignments, newAssignment]
    setAssignments(updated)
    localStorage.setItem("technician_assignments", JSON.stringify(updated))

    // Update technician assignments count
    setTechnicians(
      technicians.map((t) => (t.id === technicianId ? { ...t, current_assignments: t.current_assignments + 1 } : t)),
    )
  }

  const updateAssignmentStatus = (assignmentId: string, newStatus: "scheduled" | "in-progress" | "completed") => {
    const updated = assignments.map((a) => (a.id === assignmentId ? { ...a, status: newStatus } : a))
    setAssignments(updated)
    localStorage.setItem("technician_assignments", JSON.stringify(updated))
  }

  const reassignTechnician = (assignmentId: string, newTechId: string) => {
    const assignment = assignments.find((a) => a.id === assignmentId)
    if (!assignment) return

    const updated = assignments.map((a) =>
      a.id === assignmentId
        ? {
            ...a,
            technician_id: newTechId,
            technician_name: technicians.find((t) => t.id === newTechId)?.name || a.technician_name,
          }
        : a,
    )
    setAssignments(updated)
    localStorage.setItem("technician_assignments", JSON.stringify(updated))
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Technician Scheduling</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Technician Availability */}
        <div className="lg:col-span-1">
          <h3 className="font-medium text-foreground mb-3">Available Technicians</h3>
          <div className="space-y-2">
            {technicians.map((tech) => (
              <div key={tech.id} className="p-3 border border-border rounded-md">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm text-foreground">{tech.name}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      tech.available && tech.current_assignments < tech.max_concurrent
                        ? "bg-chart-3/20 text-chart-3"
                        : "bg-destructive/20 text-destructive"
                    }`}
                  >
                    {tech.current_assignments}/{tech.max_concurrent}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{tech.specialization}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Active Assignments */}
        <div className="lg:col-span-2">
          <h3 className="font-medium text-foreground mb-3">Active Assignments</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {assignments.filter((a) => a.status !== "completed").length === 0 ? (
              <p className="text-sm text-muted-foreground">No active assignments</p>
            ) : (
              assignments
                .filter((a) => a.status !== "completed")
                .map((assignment) => (
                  <div key={assignment.id} className="p-3 border border-border rounded-md bg-muted/50">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-foreground">{assignment.incident_title}</p>
                        <p className="text-xs text-muted-foreground">{assignment.location}</p>
                        <p className="text-xs text-muted-foreground mt-1">Assigned to: {assignment.technician_name}</p>
                      </div>
                      <select
                        value={assignment.status}
                        onChange={(e) => updateAssignmentStatus(assignment.id, e.target.value as any)}
                        className="text-xs px-2 py-1 border border-border rounded bg-background"
                      >
                        <option value="scheduled">Scheduled</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Scheduled: {new Date(assignment.scheduled_time).toLocaleTimeString()}
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>

      {/* Scheduling Interface */}
      <div className="border-t border-border pt-6">
        <h3 className="font-medium text-foreground mb-4">Assign Incidents</h3>
        <div className="space-y-3">
          <div className="p-3 border border-border rounded-md">
            <p className="text-sm font-medium text-foreground mb-2">Water Leakage - Hostel A Room 201</p>
            <p className="text-sm text-muted-foreground mb-3">Priority: High | Category: Water</p>
            <select
              onChange={(e) =>
                e.target.value && assignTechnician("inc-1", "Water Leakage - Hostel A", "Room 201", e.target.value)
              }
              defaultValue=""
              className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background"
            >
              <option value="">Select technician...</option>
              {technicians
                .filter((t) => t.current_assignments < t.max_concurrent)
                .map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.specialization})
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
    </Card>
  )
}
