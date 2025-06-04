"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, Star, MoreVertical, Mail, Calendar, Eye, Download, MessageSquare, X } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function CandidatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState("all")
  const [experienceFilter, setExperienceFilter] = useState("all")
  const [skillsFilter, setSkillsFilter] = useState<string[]>([])

  const candidates = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      designation: "Senior Frontend Developer",
      experience: "5-7 years",
      rating: 4.5,
      status: "Shortlisted",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      uploadDate: "2024-01-15",
      lastViewed: "2 hours ago",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+1 (555) 234-5678",
      designation: "Full Stack Developer",
      experience: "3-5 years",
      rating: 4.2,
      status: "Interview Scheduled",
      skills: ["Node.js", "Python", "PostgreSQL", "Docker"],
      uploadDate: "2024-01-14",
      lastViewed: "1 day ago",
    },
    {
      id: "3",
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+1 (555) 345-6789",
      designation: "UI/UX Designer",
      experience: "2-3 years",
      rating: 4.8,
      status: "New",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      uploadDate: "2024-01-13",
      lastViewed: "Never",
    },
    {
      id: "4",
      name: "David Wilson",
      email: "david.wilson@email.com",
      phone: "+1 (555) 456-7890",
      designation: "DevOps Engineer",
      experience: "7+ years",
      rating: 4.0,
      status: "Hired",
      skills: ["AWS", "Kubernetes", "Terraform", "Jenkins"],
      uploadDate: "2024-01-12",
      lastViewed: "3 days ago",
    },
    {
      id: "5",
      name: "Lisa Anderson",
      email: "lisa.anderson@email.com",
      phone: "+1 (555) 567-8901",
      designation: "Data Scientist",
      experience: "3-5 years",
      rating: 4.3,
      status: "Rejected",
      skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
      uploadDate: "2024-01-11",
      lastViewed: "1 week ago",
    },
  ]

  const allSkills = Array.from(new Set(candidates.flatMap((c) => c.skills)))

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || candidate.status === statusFilter
    const matchesExperience = experienceFilter === "all" || candidate.experience === experienceFilter
    const matchesSkills = skillsFilter.length === 0 || skillsFilter.some((skill) => candidate.skills.includes(skill))

    return matchesSearch && matchesStatus && matchesExperience && matchesSkills
  })

  const handleSelectCandidate = (candidateId: string) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidateId) ? prev.filter((id) => id !== candidateId) : [...prev, candidateId],
    )
  }

  const handleSelectAll = () => {
    if (selectedCandidates.length === filteredCandidates.length) {
      setSelectedCandidates([])
    } else {
      setSelectedCandidates(filteredCandidates.map((c) => c.id))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800"
      case "Shortlisted":
        return "bg-green-100 text-green-800"
      case "Interview Scheduled":
        return "bg-purple-100 text-purple-800"
      case "Hired":
        return "bg-emerald-100 text-emerald-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : i < rating
              ? "text-yellow-400 fill-current opacity-50"
              : "text-gray-300"
        }`}
      />
    ))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
            <p className="text-gray-600">Manage and review candidate applications</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search candidates by name, email, skills, or designation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
                    <SelectItem value="Hired">Hired</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Experience</SelectItem>
                    <SelectItem value="0-2 years">0-2 years</SelectItem>
                    <SelectItem value="2-3 years">2-3 years</SelectItem>
                    <SelectItem value="3-5 years">3-5 years</SelectItem>
                    <SelectItem value="5-7 years">5-7 years</SelectItem>
                    <SelectItem value="7+ years">7+ years</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>

            {/* Skills Filter */}
            {skillsFilter.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {skillsFilter.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setSkillsFilter((prev) => prev.filter((s) => s !== skill))}
                    />
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" onClick={() => setSkillsFilter([])} className="h-6 px-2 text-xs">
                  Clear all
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {selectedCandidates.length > 0 && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{selectedCandidates.length} candidate(s) selected</span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Interview
                  </Button>
                  <Button size="sm" variant="outline">
                    Update Status
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setSelectedCandidates([])}>
                    Clear
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Candidates List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Candidates ({filteredCandidates.length})</CardTitle>
                <CardDescription>Review and manage candidate applications</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedCandidates.length === filteredCandidates.length && filteredCandidates.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-gray-600">Select All</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredCandidates.map((candidate) => (
                <div key={candidate.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={selectedCandidates.includes(candidate.id)}
                      onCheckedChange={() => handleSelectCandidate(candidate.id)}
                    />

                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg" alt={candidate.name} />
                      <AvatarFallback>
                        {candidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-lg text-gray-900">{candidate.name}</h3>
                          <p className="text-gray-600">{candidate.designation}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{candidate.email}</span>
                            <span>{candidate.phone}</span>
                            <span>{candidate.experience}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(candidate.status)}>{candidate.status}</Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Resume
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Calendar className="mr-2 h-4 w-4" />
                                Schedule Interview
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Add Notes
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download Resume
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {renderStars(candidate.rating)}
                          <span className="text-sm text-gray-600 ml-1">({candidate.rating})</span>
                        </div>
                        <span className="text-sm text-gray-500">Last viewed: {candidate.lastViewed}</span>
                        <span className="text-sm text-gray-500">
                          Uploaded: {new Date(candidate.uploadDate).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {candidate.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="text-xs cursor-pointer hover:bg-blue-50"
                            onClick={() => {
                              if (!skillsFilter.includes(skill)) {
                                setSkillsFilter((prev) => [...prev, skill])
                              }
                            }}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
