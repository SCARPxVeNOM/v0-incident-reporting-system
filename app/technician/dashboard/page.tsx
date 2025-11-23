"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useState, useEffect } from "react"
import {
  LayoutDashboard,
  Calendar,
  LogOut,
  CheckCircle2,
  Clock,
  AlertCircle,
  User,
  Settings,
  Bell,
} from "lucide-react"
import NotificationsDropdown from "@/components/notifications-dropdown"
import TechnicianCompletionDialog from "@/components/technician-completion-dialog"

interface Assignment {
  id: string
  incident_id: string
  incident_title: string
  description?: string
  category?: string
  location: string
  priority?: number
  priority_label?: string
  created_at?: string
  scheduled_time: string
  status: string
}

export default function TechnicianDashboardPage() {
  const router = useRouter()
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [completionDialog, setCompletionDialog] = useState<{
    isOpen: boolean
    assignmentId: string
    incidentId: string
    incidentTitle: string
  } | null>(null)

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("technicianUser") || "{}")
    if (!userData.id) {
      router.push("/technician/login")
      return
    }
    setUser(userData)
    fetchAssignments(userData.id)
    
    // Auto-refresh assignments every 10 seconds
    const interval = setInterval(() => {
      fetchAssignments(userData.id)
    }, 10000)
    
    return () => clearInterval(interval)
  }, [])

  const fetchAssignments = async (technicianId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/technicians/${technicianId}/assignments`)
      if (response.ok) {
        const data = await response.json()
        console.log("Fetched assignments:", data)
        setAssignments(data || [])
      } else {
        const errorData = await response.json().catch(() => ({}))
        console.error("Error fetching assignments:", response.status, errorData)
      }
    } catch (error) {
      console.error("Error fetching assignments:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateAssignmentStatus = async (assignmentId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/technicians/assignments/${assignmentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        fetchAssignments(user.id)
      }
    } catch (error) {
      console.error("Error updating assignment:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("technicianToken")
    localStorage.removeItem("technicianUser")
    router.push("/")
  }

  const activeAssignments = assignments.filter((a) => a.status !== "completed")
  const completedAssignments = assignments.filter((a) => a.status === "completed")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Technician Portal</h1>
                <p className="text-sm text-blue-100">
                  Welcome, {user?.name || 'User'} | Technician ID: {user?.id?.slice(0, 6).toUpperCase() || 'N/A'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {user?.id && (
                <div className="relative">
                  <NotificationsDropdown userId={user.id} />
                </div>
              )}
              <Button variant="ghost" onClick={handleLogout} className="text-white hover:bg-white/10">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Active Assignments</p>
                  <p className="text-4xl font-bold text-slate-900">{activeAssignments.length}</p>
                  <p className="text-xs text-slate-500 mt-2 bg-blue-50 text-blue-700 px-2 py-1 rounded-full inline-block">
                    Updated 5 mins ago
                  </p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Completed</p>
                  <p className="text-4xl font-bold text-green-600">{completedAssignments.length}</p>
                  <p className="text-xs text-slate-500 mt-2 bg-green-50 text-green-700 px-2 py-1 rounded-full inline-block">
                    This month
                  </p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total Assignments</p>
                  <p className="text-4xl font-bold text-slate-700">{assignments.length}</p>
                  <p className="text-xs text-slate-500 mt-2 bg-slate-50 text-slate-700 px-2 py-1 rounded-full inline-block">
                    Year to date
                  </p>
                </div>
                <LayoutDashboard className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Assignments */}
        <Card className="mb-8 border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">Active Assignments</CardTitle>
            <CardDescription className="text-slate-600">Your current and scheduled tasks</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : activeAssignments.length === 0 ? (
              <div className="text-center py-8 text-slate-500">No active assignments</div>
            ) : (
              <div className="space-y-4">
                {activeAssignments.map((assignment) => {
                  const priorityColor = 
                    assignment.priority === 5 || assignment.priority === 4 ? "bg-blue-600" :
                    assignment.priority === 3 ? "bg-yellow-500" :
                    "bg-green-500"
                  
                  const priorityBadgeColor =
                    assignment.priority === 5 || assignment.priority === 4 ? "bg-red-100 text-red-700" :
                    assignment.priority === 3 ? "bg-yellow-100 text-yellow-700" :
                    "bg-green-100 text-green-700"

                  return (
                    <div
                      key={assignment.id}
                      className="flex items-start gap-0 border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-all bg-white"
                    >
                      <div className={`w-1 ${priorityColor}`}></div>
                      <div className="flex-1 p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-3">
                            <h3 className="font-bold text-slate-900 text-lg">{assignment.incident_title}</h3>
                            {assignment.description && (
                              <p className="text-sm text-slate-600">{assignment.description}</p>
                            )}
                            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                              <div>
                                <span className="font-medium">Location:</span> {assignment.location}
                              </div>
                              {assignment.category && (
                                <div>
                                  <span className="font-medium">Category:</span> {assignment.category}
                                </div>
                              )}
                              {assignment.priority_label && (
                                <div>
                                  <span className="font-medium">Priority:</span>{" "}
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${priorityBadgeColor}`}>
                                    {assignment.priority_label}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-slate-500 pt-2 border-t border-slate-200">
                              {assignment.created_at && (
                                <div>
                                  <span className="font-medium">Assigned:</span> {new Date(assignment.created_at).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </div>
                              )}
                              <div>
                                <span className="font-medium">Due:</span> {new Date(assignment.scheduled_time).toLocaleString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-slate-900 text-slate-900 hover:bg-slate-50"
                            >
                              View Details
                            </Button>
                            {assignment.status === "scheduled" && (
                              <Button
                                size="sm"
                                onClick={() => updateAssignmentStatus(assignment.id, "in-progress")}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                              >
                                Start Task
                              </Button>
                            )}
                            {assignment.status === "in-progress" && (
                              <Button
                                size="sm"
                                variant="default"
                                onClick={() => {
                                  setCompletionDialog({
                                    isOpen: true,
                                    assignmentId: assignment.id,
                                    incidentId: assignment.incident_id,
                                    incidentTitle: assignment.incident_title,
                                  })
                                }}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Complete
                              </Button>
                            )}
                            {assignment.status === "acknowledged" && (
                              <Button
                                size="sm"
                                onClick={() => updateAssignmentStatus(assignment.id, "in-progress")}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                              >
                                Acknowledge
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Completed Assignments */}
        {completedAssignments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Completed Assignments</CardTitle>
              <CardDescription>Recently completed tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedAssignments.slice(0, 5).map((assignment) => (
                  <div
                    key={assignment.id}
                    className="p-4 border border-border rounded-lg bg-muted/30"
                  >
                    <h3 className="font-semibold text-foreground mb-1">{assignment.incident_title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-2">
                      <span>{assignment.location}</span>
                      {assignment.category && (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">{assignment.category}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Completion Dialog */}
      {completionDialog && (
        <TechnicianCompletionDialog
          isOpen={completionDialog.isOpen}
          onClose={() => setCompletionDialog(null)}
          assignmentId={completionDialog.assignmentId}
          incidentId={completionDialog.incidentId}
          incidentTitle={completionDialog.incidentTitle}
          onComplete={() => {
            fetchAssignments(user.id)
            setCompletionDialog(null)
          }}
        />
      )}
    </div>
  )
}

