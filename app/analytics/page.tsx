"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Users, FileText, Mail, Calendar, Clock, Star } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function AnalyticsPage() {
  const overallStats = [
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
      title: "Active Candidates",
      value: "892",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Emails Sent",
      value: "2,156",
      change: "+23%",
      trend: "up",
      icon: Mail,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Interviews Scheduled",
      value: "156",
      change: "+15%",
      trend: "up",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const pipelineData = [
    { stage: "New Applications", count: 234, percentage: 100, color: "bg-blue-500" },
    { stage: "Resume Reviewed", count: 189, percentage: 81, color: "bg-indigo-500" },
    { stage: "Phone Screening", count: 89, percentage: 38, color: "bg-purple-500" },
    { stage: "Technical Interview", count: 45, percentage: 19, color: "bg-pink-500" },
    { stage: "Final Round", count: 12, percentage: 5, color: "bg-red-500" },
    { stage: "Hired", count: 8, percentage: 3, color: "bg-green-500" },
  ]

  const emailStats = [
    { metric: "Total Sent", value: "2,156", change: "+12%" },
    { metric: "Delivery Rate", value: "98.5%", change: "+0.2%" },
    { metric: "Open Rate", value: "68.3%", change: "+5.1%" },
    { metric: "Response Rate", value: "24.7%", change: "+3.2%" },
  ]

  const interviewStats = [
    { metric: "Total Scheduled", value: "156", change: "+15%" },
    { metric: "Completed", value: "134", change: "+18%" },
    { metric: "No-shows", value: "8", change: "-2%" },
    { metric: "Avg Duration", value: "52 min", change: "+3 min" },
  ]

  const topSkills = [
    { skill: "JavaScript", count: 456, percentage: 85 },
    { skill: "React", count: 389, percentage: 72 },
    { skill: "Python", count: 312, percentage: 58 },
    { skill: "Node.js", count: 298, percentage: 55 },
    { skill: "TypeScript", count: 267, percentage: 49 },
    { skill: "AWS", count: 234, percentage: 43 },
    { skill: "Docker", count: 198, percentage: 37 },
    { skill: "PostgreSQL", count: 176, percentage: 33 },
  ]

  const recentActivity = [
    { action: "Resume uploaded", count: 23, timeframe: "Last 24 hours" },
    { action: "Interviews scheduled", count: 8, timeframe: "Last 24 hours" },
    { action: "Emails sent", count: 45, timeframe: "Last 24 hours" },
    { action: "Candidates shortlisted", count: 12, timeframe: "Last 24 hours" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive insights into your recruitment process</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overallStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">{stat.change}</span>
                      <span className="text-sm text-gray-500 ml-1">from last month</span>
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
          {/* Recruitment Pipeline */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recruitment Pipeline</CardTitle>
                <CardDescription>Candidate flow through your hiring process</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pipelineData.map((stage, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{stage.stage}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{stage.count} candidates</span>
                        <Badge variant="outline" className="text-xs">
                          {stage.percentage}%
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${stage.color}`} style={{ width: `${stage.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Skills */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Most In-Demand Skills</CardTitle>
                <CardDescription>Skills appearing most frequently in resumes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {topSkills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{skill.skill}</span>
                        <span className="text-sm text-gray-600">{skill.count}</span>
                      </div>
                      <Progress value={skill.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Email Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Analytics
                </CardTitle>
                <CardDescription>Email campaign performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {emailStats.map((stat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{stat.metric}</span>
                    <div className="text-right">
                      <div className="font-semibold">{stat.value}</div>
                      <div className="text-xs text-green-600">{stat.change}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Interview Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Interview Analytics
                </CardTitle>
                <CardDescription>Interview scheduling metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {interviewStats.map((stat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{stat.metric}</span>
                    <div className="text-right">
                      <div className="font-semibold">{stat.value}</div>
                      <div className="text-xs text-green-600">{stat.change}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest recruitment activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.timeframe}</p>
                    </div>
                    <Badge variant="outline">{activity.count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Performance Indicators */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Key Metrics
                </CardTitle>
                <CardDescription>Performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Time to Hire</span>
                    <span className="font-medium">18 days</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-gray-500">3 days faster than average</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Candidate Satisfaction</span>
                    <span className="font-medium flex items-center gap-1">
                      4.2 <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    </span>
                  </div>
                  <Progress value={84} className="h-2" />
                  <p className="text-xs text-gray-500">Based on 156 reviews</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Offer Acceptance Rate</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                  <p className="text-xs text-gray-500">Above industry average</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
