"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, FileText, Mail, Calendar, TrendingUp, Star, Clock, CheckCircle, Upload } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  if (!user) return null

  const stats = [
    {
      title: "Total Resumes",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Shortlisted Candidates",
      value: "89",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Weekly Uploads",
      value: "156",
      change: "+23%",
      trend: "up",
      icon: Upload,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Average Rating",
      value: "4.2",
      change: "+0.3",
      trend: "up",
      icon: Star,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const recentActivity = [
    {
      action: "New resume uploaded",
      candidate: "Sarah Johnson",
      time: "2 minutes ago",
      type: "upload",
    },
    {
      action: "Interview scheduled",
      candidate: "Michael Chen",
      time: "15 minutes ago",
      type: "interview",
    },
    {
      action: "Email sent",
      candidate: "Emily Davis",
      time: "1 hour ago",
      type: "email",
    },
    {
      action: "Candidate shortlisted",
      candidate: "David Wilson",
      time: "2 hours ago",
      type: "shortlist",
    },
  ]

  const quickActions = [
    {
      title: "Upload Resumes",
      description: "Add new candidate resumes",
      href: "/resumes/upload",
      icon: Upload,
      color: "bg-blue-500",
    },
    {
      title: "Browse Candidates",
      description: "View and filter candidates",
      href: "/candidates",
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "Schedule Interview",
      description: "Set up candidate interviews",
      href: "/interviews/schedule",
      icon: Calendar,
      color: "bg-purple-500",
    },
    {
      title: "Send Emails",
      description: "Communicate with candidates",
      href: "/emails",
      icon: Mail,
      color: "bg-orange-500",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}. Here's your recruitment overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">{stat.change}</span>
                      <span className="text-sm text-gray-500 ml-1">from last week</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks to manage your recruitment process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Link key={index} href={action.href}>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-lg ${action.color}`}>
                              <action.icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{action.title}</h3>
                              <p className="text-sm text-gray-600">{action.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pipeline Overview */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recruitment Pipeline</CardTitle>
                <CardDescription>Current status of your recruitment process</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>New Applications</span>
                    <span>234 candidates</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Phone Screening</span>
                    <span>89 candidates</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Technical Interview</span>
                    <span>45 candidates</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Final Round</span>
                    <span>12 candidates</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates in your recruitment process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {activity.type === "upload" && (
                          <div className="p-1 bg-blue-100 rounded-full">
                            <Upload className="h-3 w-3 text-blue-600" />
                          </div>
                        )}
                        {activity.type === "interview" && (
                          <div className="p-1 bg-purple-100 rounded-full">
                            <Calendar className="h-3 w-3 text-purple-600" />
                          </div>
                        )}
                        {activity.type === "email" && (
                          <div className="p-1 bg-orange-100 rounded-full">
                            <Mail className="h-3 w-3 text-orange-600" />
                          </div>
                        )}
                        {activity.type === "shortlist" && (
                          <div className="p-1 bg-green-100 rounded-full">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.candidate}</p>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Interviews */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Upcoming Interviews</CardTitle>
                <CardDescription>Scheduled for this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Alex Thompson</p>
                      <p className="text-xs text-gray-600">Technical Interview</p>
                    </div>
                    <Badge variant="outline">Today 2:00 PM</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Maria Garcia</p>
                      <p className="text-xs text-gray-600">Final Round</p>
                    </div>
                    <Badge variant="outline">Tomorrow 10:00 AM</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">James Wilson</p>
                      <p className="text-xs text-gray-600">Phone Screen</p>
                    </div>
                    <Badge variant="outline">Wed 3:30 PM</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="/interviews">View All Interviews</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
