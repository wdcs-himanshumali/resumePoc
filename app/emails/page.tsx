"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Send, Eye, Clock, CheckCircle, AlertCircle, Plus, Search, Filter } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function EmailsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [recipient, setRecipient] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [showPreview, setShowPreview] = useState(false)

  const emailTemplates = [
    {
      id: "acknowledgment",
      name: "Application Acknowledgment",
      subject: "Thank you for your application - {{position}}",
      content: `Dear {{candidateName}},

Thank you for your interest in the {{position}} position at {{companyName}}. We have received your application and our team is currently reviewing it.

We will be in touch within the next few days to update you on the next steps in our hiring process.

Best regards,
{{recruiterName}}
{{companyName}} Recruitment Team`,
    },
    {
      id: "interview",
      name: "Interview Invitation",
      subject: "Interview Invitation - {{position}} at {{companyName}}",
      content: `Dear {{candidateName}},

We are pleased to invite you for an interview for the {{position}} position at {{companyName}}.

Interview Details:
- Date: {{interviewDate}}
- Time: {{interviewTime}}
- Format: {{interviewFormat}}
- Duration: Approximately 1 hour

Please confirm your availability by replying to this email.

Best regards,
{{recruiterName}}
{{companyName}} Recruitment Team`,
    },
    {
      id: "rejection",
      name: "Application Update/Rejection",
      subject: "Update on your application - {{position}}",
      content: `Dear {{candidateName}},

Thank you for your interest in the {{position}} position at {{companyName}} and for taking the time to interview with our team.

After careful consideration, we have decided to move forward with other candidates whose experience more closely matches our current needs.

We appreciate your interest in {{companyName}} and encourage you to apply for future opportunities that match your skills and experience.

Best regards,
{{recruiterName}}
{{companyName}} Recruitment Team`,
    },
    {
      id: "offer",
      name: "Job Offer",
      subject: "Job Offer - {{position}} at {{companyName}}",
      content: `Dear {{candidateName}},

We are delighted to offer you the position of {{position}} at {{companyName}}.

We were impressed by your skills and experience, and we believe you will be a valuable addition to our team.

Please review the attached offer letter and let us know if you have any questions. We look forward to your response.

Best regards,
{{recruiterName}}
{{companyName}} Recruitment Team`,
    },
  ]

  const emailHistory = [
    {
      id: "1",
      recipient: "sarah.johnson@email.com",
      subject: "Interview Invitation - Senior Frontend Developer",
      template: "Interview Invitation",
      status: "Delivered",
      sentDate: "2024-01-15 10:30 AM",
      openedDate: "2024-01-15 11:45 AM",
    },
    {
      id: "2",
      recipient: "michael.chen@email.com",
      subject: "Thank you for your application - Full Stack Developer",
      template: "Application Acknowledgment",
      status: "Opened",
      sentDate: "2024-01-14 2:15 PM",
      openedDate: "2024-01-14 3:22 PM",
    },
    {
      id: "3",
      recipient: "emily.davis@email.com",
      subject: "Interview Invitation - UI/UX Designer",
      template: "Interview Invitation",
      status: "Sent",
      sentDate: "2024-01-13 9:00 AM",
      openedDate: null,
    },
    {
      id: "4",
      recipient: "david.wilson@email.com",
      subject: "Job Offer - DevOps Engineer",
      template: "Job Offer",
      status: "Opened",
      sentDate: "2024-01-12 4:30 PM",
      openedDate: "2024-01-12 5:15 PM",
    },
  ]

  const handleTemplateSelect = (templateId: string) => {
    const template = emailTemplates.find((t) => t.id === templateId)
    if (template) {
      setSelectedTemplate(templateId)
      setSubject(template.subject)
      setMessage(template.content)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Sent":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "Delivered":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      case "Opened":
        return <Eye className="h-4 w-4 text-green-500" />
      case "Failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Sent":
        return "bg-yellow-100 text-yellow-800"
      case "Delivered":
        return "bg-blue-100 text-blue-800"
      case "Opened":
        return "bg-green-100 text-green-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const stats = [
    {
      title: "Total Emails Sent",
      value: "1,247",
      change: "+12%",
      icon: Mail,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Emails This Week",
      value: "89",
      change: "+23%",
      icon: Send,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Open Rate",
      value: "68%",
      change: "+5%",
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Templates Available",
      value: "12",
      change: "+2",
      icon: Plus,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Email Center</h1>
          <p className="text-gray-600">Manage candidate communications and email templates</p>
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

        <Tabs defaultValue="compose" className="space-y-6">
          <TabsList>
            <TabsTrigger value="compose">Compose Email</TabsTrigger>
            <TabsTrigger value="history">Email History</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="compose" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Email Composer */}
              <Card>
                <CardHeader>
                  <CardTitle>Compose Email</CardTitle>
                  <CardDescription>Send professional emails to candidates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="template">Email Template</Label>
                    <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template or create custom email" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="custom">Custom Email</SelectItem>
                        {emailTemplates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipient">Recipient</Label>
                    <Input
                      id="recipient"
                      type="email"
                      placeholder="candidate@email.com"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Email subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Type your message here..."
                      rows={10}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Send className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                    <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Email Preview */}
              {showPreview && (
                <Card>
                  <CardHeader>
                    <CardTitle>Email Preview</CardTitle>
                    <CardDescription>How your email will appear to the recipient</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="space-y-2 mb-4 pb-4 border-b">
                        <div className="text-sm">
                          <span className="font-medium">To:</span> {recipient || "candidate@email.com"}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Subject:</span> {subject || "Email subject"}
                        </div>
                      </div>
                      <div className="whitespace-pre-wrap text-sm">
                        {message || "Your email message will appear here..."}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Template Variables Help */}
            <Card>
              <CardHeader>
                <CardTitle>Template Variables</CardTitle>
                <CardDescription>Use these variables in your email templates for personalization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">{"{{candidateName}}"}</code>
                    <p className="text-xs text-gray-600">Candidate's full name</p>
                  </div>
                  <div className="space-y-1">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">{"{{position}}"}</code>
                    <p className="text-xs text-gray-600">Job position title</p>
                  </div>
                  <div className="space-y-1">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">{"{{companyName}}"}</code>
                    <p className="text-xs text-gray-600">Your company name</p>
                  </div>
                  <div className="space-y-1">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">{"{{recruiterName}}"}</code>
                    <p className="text-xs text-gray-600">Recruiter's name</p>
                  </div>
                  <div className="space-y-1">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">{"{{interviewDate}}"}</code>
                    <p className="text-xs text-gray-600">Interview date</p>
                  </div>
                  <div className="space-y-1">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">{"{{interviewTime}}"}</code>
                    <p className="text-xs text-gray-600">Interview time</p>
                  </div>
                  <div className="space-y-1">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">{"{{interviewFormat}}"}</code>
                    <p className="text-xs text-gray-600">Interview format</p>
                  </div>
                  <div className="space-y-1">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">{"{{candidateEmail}}"}</code>
                    <p className="text-xs text-gray-600">Candidate's email</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Email History</CardTitle>
                    <CardDescription>Track all sent emails and their status</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input placeholder="Search emails..." className="pl-10 w-64" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emailHistory.map((email) => (
                    <div
                      key={email.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        {getStatusIcon(email.status)}
                        <div>
                          <h4 className="font-medium text-gray-900">{email.subject}</h4>
                          <p className="text-sm text-gray-600">To: {email.recipient}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-gray-500">Sent: {email.sentDate}</span>
                            {email.openedDate && (
                              <span className="text-xs text-gray-500">Opened: {email.openedDate}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(email.status)}>{email.status}</Badge>
                        <Badge variant="outline" className="text-xs">
                          {email.template}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Email Templates</CardTitle>
                    <CardDescription>Manage your email templates for different scenarios</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Template
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {emailTemplates.map((template) => (
                    <Card key={template.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <h3 className="font-semibold text-gray-900">{template.name}</h3>
                            <p className="text-sm text-gray-600">Subject: {template.subject}</p>
                            <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded max-w-2xl">
                              {template.content.substring(0, 150)}...
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleTemplateSelect(template.id)}>
                              Use Template
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
