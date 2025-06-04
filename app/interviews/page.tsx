"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  Plus,
  Edit,
  Trash2,
  Download,
  Mail,
  CheckCircle,
  AlertCircle,
  Users,
} from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function InterviewsPage() {
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
  const [interviewDate, setInterviewDate] = useState("")
  const [interviewTime, setInterviewTime] = useState("")
  const [interviewType, setInterviewType] = useState("")
  const [duration, setDuration] = useState("")
  const [location, setLocation] = useState("")
  const [notes, setNotes] = useState("")

  const candidates = [
    { id: "1", name: "Sarah Johnson", email: "sarah.johnson@email.com", position: "Senior Frontend Developer" },
    { id: "2", name: "Michael Chen", email: "michael.chen@email.com", position: "Full Stack Developer" },
    { id: "3", name: "Emily Davis", email: "emily.davis@email.com", position: "UI/UX Designer" },
  ]

  const scheduledInterviews = [
    {
      id: "1",
      candidate: "Alex Thompson",
      email: "alex.thompson@email.com",
      position: "Senior React Developer",
      date: "2024-01-16",
      time: "14:00",
      duration: "1 hour",
      type: "Technical Interview",
      format: "Video Call",
      location: "https://meet.google.com/abc-defg-hij",
      status: "Confirmed",
      interviewer: "John Smith",
      notes: "Focus on React hooks and state management",
    },
    {
      id: "2",
      candidate: "Maria Garcia",
      email: "maria.garcia@email.com",
      position: "Product Manager",
      date: "2024-01-17",
      time: "10:00",
      duration: "45 minutes",
      type: "Final Round",
      format: "In-Person",
      location: "Conference Room A, 5th Floor",
      status: "Scheduled",
      interviewer: "Jane Doe",
      notes: "Product strategy discussion",
    },
    {
      id: "3",
      candidate: "James Wilson",
      email: "james.wilson@email.com",
      position: "DevOps Engineer",
      date: "2024-01-18",
      time: "15:30",
      duration: "30 minutes",
      type: "Phone Screen",
      format: "Phone Call",
      location: "+1 (555) 123-4567",
      status: "Pending",
      interviewer: "Bob Johnson",
      notes: "Initial screening call",
    },
  ]

  const stats = [
    {
      title: "Total Interviews",
      value: "156",
      change: "+12%",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "This Week",
      value: "23",
      change: "+8%",
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Confirmed",
      value: "18",
      change: "+15%",
      icon: CheckCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Pending",
      value: "5",
      change: "-2",
      icon: AlertCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-gray-100 text-gray-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "Video Call":
        return <Video className="h-4 w-4" />
      case "Phone Call":
        return <Phone className="h-4 w-4" />
      case "In-Person":
        return <MapPin className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const handleScheduleInterview = () => {
    // Handle interview scheduling logic
    console.log("Scheduling interview for:", selectedCandidates)
  }

  const generateCalendarFile = (interview: any) => {
    const startDate = new Date(`${interview.date}T${interview.time}:00`)
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // 1 hour later

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Resume Portal//Interview Scheduler//EN
BEGIN:VEVENT
UID:${interview.id}@resumeportal.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART:${startDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTEND:${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
SUMMARY:${interview.type} - ${interview.candidate}
DESCRIPTION:Interview with ${interview.candidate} for ${interview.position}\\nType: ${interview.type}\\nDuration: ${interview.duration}\\nNotes: ${interview.notes}
LOCATION:${interview.location}
ATTENDEE:MAILTO:${interview.email}
END:VEVENT
END:VCALENDAR`

    const blob = new Blob([icsContent], { type: "text/calendar" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `interview-${interview.candidate.replace(" ", "-")}.ics`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Interview Center</h1>
            <p className="text-gray-600">Schedule and manage candidate interviews</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Schedule Interview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Schedule New Interview</DialogTitle>
                <DialogDescription>Set up an interview with selected candidates</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                {/* Candidate Selection */}
                <div className="space-y-2">
                  <Label>Select Candidates</Label>
                  <div className="border rounded-lg p-4 max-h-40 overflow-y-auto">
                    {candidates.map((candidate) => (
                      <div key={candidate.id} className="flex items-center space-x-2 py-2">
                        <input
                          type="checkbox"
                          id={candidate.id}
                          checked={selectedCandidates.includes(candidate.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCandidates([...selectedCandidates, candidate.id])
                            } else {
                              setSelectedCandidates(selectedCandidates.filter((id) => id !== candidate.id))
                            }
                          }}
                        />
                        <label htmlFor={candidate.id} className="flex-1 cursor-pointer">
                          <div className="font-medium">{candidate.name}</div>
                          <div className="text-sm text-gray-600">{candidate.position}</div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={interviewDate}
                      onChange={(e) => setInterviewDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={interviewTime}
                      onChange={(e) => setInterviewTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Interview Type</Label>
                    <Select value={interviewType} onValueChange={setInterviewType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select interview type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phone-screen">Phone Screen</SelectItem>
                        <SelectItem value="technical">Technical Interview</SelectItem>
                        <SelectItem value="behavioral">Behavioral Interview</SelectItem>
                        <SelectItem value="final-round">Final Round</SelectItem>
                        <SelectItem value="panel">Panel Interview</SelectItem>
                        <SelectItem value="cultural-fit">Cultural Fit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30min">30 minutes</SelectItem>
                        <SelectItem value="45min">45 minutes</SelectItem>
                        <SelectItem value="1hour">1 hour</SelectItem>
                        <SelectItem value="1.5hour">1.5 hours</SelectItem>
                        <SelectItem value="2hour">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location/Meeting Link</Label>
                  <Input
                    id="location"
                    placeholder="Conference room or video call link"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes/Agenda</Label>
                  <Textarea
                    id="notes"
                    placeholder="Interview agenda, topics to cover, or special instructions..."
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleScheduleInterview} className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Interview
                  </Button>
                  <Button variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Schedule & Send Email
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} from last week</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="scheduled" className="space-y-6">
          <TabsList>
            <TabsTrigger value="scheduled">Scheduled Interviews</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="scheduled" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Interviews</CardTitle>
                <CardDescription>Manage your scheduled interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheduledInterviews.map((interview) => (
                    <div key={interview.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src="/placeholder.svg" alt={interview.candidate} />
                            <AvatarFallback>
                              {interview.candidate
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="space-y-2">
                            <div>
                              <h3 className="font-semibold text-lg">{interview.candidate}</h3>
                              <p className="text-gray-600">{interview.position}</p>
                              <p className="text-sm text-gray-500">{interview.email}</p>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(interview.date).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {interview.time}
                              </div>
                              <div className="flex items-center gap-1">
                                {getFormatIcon(interview.format)}
                                {interview.format}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {interview.interviewer}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(interview.status)}>{interview.status}</Badge>
                              <Badge variant="outline">{interview.type}</Badge>
                              <Badge variant="outline">{interview.duration}</Badge>
                            </div>

                            {interview.notes && (
                              <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                <strong>Notes:</strong> {interview.notes}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => generateCalendarFile(interview)}>
                            <Download className="h-4 w-4 mr-2" />
                            .ics
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendar View</CardTitle>
                <CardDescription>View interviews in calendar format</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Calendar integration coming soon</p>
                  <p className="text-sm">View and manage interviews in a calendar layout</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Completed Interviews</CardTitle>
                <CardDescription>Review past interviews and feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No completed interviews yet</p>
                  <p className="text-sm">Completed interviews will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
