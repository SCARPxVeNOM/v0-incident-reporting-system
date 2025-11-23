"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import IncidentForm from "@/components/incident-form"
import IncidentList from "@/components/incident-list"
import AnalyticsOverview from "@/components/analytics-overview"
import { LayoutDashboard, FileText, PlusCircle, Activity, LogOut, Bell, Settings, Wrench, ChevronDown, User } from "lucide-react"
import NotificationsDropdown from "@/components/notifications-dropdown"
import Image from "next/image"

export default function DashboardPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState("overview")
  const [successMessage, setSuccessMessage] = useState("")
  const [userId, setUserId] = useState<string | null>(null)
  const [userName, setUserName] = useState<string>("User")
  const [userEmail, setUserEmail] = useState<string>("")
  const [userAvatar, setUserAvatar] = useState<string | null>(null)

  useEffect(() => {
    // Check for NextAuth session first (Google OAuth users)
    if (session?.user?.id) {
      setUserId(session.user.id)
      setUserName(session.user.name || "User")
      setUserEmail(session.user.email || "")
      setUserAvatar(session.user.avatar || session.user.image || null)
      // Fetch full user profile including avatar
      fetchUserProfile(session.user.id)
      // Store in localStorage for consistency
      localStorage.setItem("user", JSON.stringify({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        avatar: session.user.avatar || session.user.image,
        role: session.user.role,
      }))
    } else if (typeof window !== "undefined") {
      // Fallback to localStorage (email/password users)
      const userData = JSON.parse(localStorage.getItem("user") || "{}")
      if (userData.id) {
        setUserId(userData.id)
        // Fetch user profile including avatar
        fetchUserProfile(userData.id)
      }
      if (userData.name) {
        setUserName(userData.name)
      }
      if (userData.email) {
        setUserEmail(userData.email)
      }
      if (userData.avatar) {
        setUserAvatar(userData.avatar)
      }
    }
  }, [session])

  const fetchUserProfile = async (id: string) => {
    try {
      const response = await fetch(`/api/users/profile?userId=${id}`)
      if (response.ok) {
        const userProfile = await response.json()
        setUserName(userProfile.name || "User")
        setUserEmail(userProfile.email || "")
        setUserAvatar(userProfile.avatar || null)
        // Update localStorage with avatar
        const userData = JSON.parse(localStorage.getItem("user") || "{}")
        localStorage.setItem("user", JSON.stringify({
          ...userData,
          avatar: userProfile.avatar,
          name: userProfile.name,
          email: userProfile.email,
        }))
      }
    } catch (error) {
      console.error("Error fetching user profile:", error)
    }
  }

  const handleIncidentSuccess = () => {
    setSuccessMessage("Incident reported successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)
    setActiveTab("incidents")
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Settings className="h-5 w-5 text-blue-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                  <Wrench className="h-2.5 w-2.5 text-white" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-blue-700">SMART</h1>
                  <p className="text-sm text-blue-500 font-medium">MAINTAIN</p>
                </div>
                <Activity className="h-5 w-5 text-blue-500 ml-1" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {userId ? (
              <NotificationsDropdown userId={userId} />
            ) : (
              <Button variant="ghost" size="icon" className="text-slate-600 hover:bg-slate-100 rounded-full">
                <Bell className="h-5 w-5" />
              </Button>
            )}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer group">
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-8 h-8 rounded-full object-cover border-2 border-slate-200"
                  onError={(e) => {
                    // Fallback to generated avatar if image fails to load
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const fallback = target.nextElementSibling as HTMLElement
                    if (fallback) fallback.style.display = 'flex'
                  }}
                />
              ) : null}
              <div 
                className={`w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-semibold ${userAvatar ? 'hidden' : ''}`}
              >
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900">{userName}</span>
                {userEmail && (
                  <span className="text-xs text-slate-500">{userEmail}</span>
                )}
              </div>
              <ChevronDown className="h-4 w-4 text-slate-500 group-hover:text-slate-700" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* Navigation Tabs */}
        <div className="mb-6 p-2 bg-white rounded-lg border border-slate-200 shadow-sm sticky top-[73px] z-40">
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {[
                { id: "overview", label: "Overview", icon: LayoutDashboard },
                { id: "incidents", label: "My Incidents", icon: FileText },
                { id: "report", label: "Report Issue", icon: PlusCircle },
                { id: "tracking", label: "Issue Tracking", icon: Activity },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-teal-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:text-white"
              onClick={() => {
                localStorage.clear()
                router.push("/")
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Success Message Toast */}
        {successMessage && (
          <div className="mb-6 p-4 bg-secondary/10 border border-secondary/20 text-secondary-foreground rounded-xl flex items-center gap-3 shadow-sm animate-in fade-in slide-in-from-top-4">
            <div className="h-2 w-2 rounded-full bg-secondary animate-pulse"></div>
            {successMessage}
          </div>
        )}

        {/* Tab Content with Animation */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Analytics Overview</h2>
                <AnalyticsOverview />
              </div>
              <Card className="p-6 border border-slate-200 bg-white shadow-sm">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Recent Activity</h2>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">My Reported Issues</h3>
                      <p className="text-sm text-slate-500">Track and manage your complaints</p>
                    </div>
                  </div>
                </div>
                <IncidentList userOnly={true} hideTitle={true} />
              </Card>
            </div>
          )}

          {activeTab === "incidents" && <IncidentList userOnly={true} />}

          {activeTab === "report" && (
            <div className="flex justify-center">
              <IncidentForm onSuccess={handleIncidentSuccess} />
            </div>
          )}

          {activeTab === "tracking" && (
            <Card className="p-8 shadow-lg border-none">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Issue Tracking</h2>
                <span className="text-sm text-muted-foreground">Real-time updates</span>
              </div>
              <IncidentList userOnly={true} showUpdates={true} />
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
