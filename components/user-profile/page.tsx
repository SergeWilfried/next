"use client"

import React, { useState, useCallback } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarDays, BookOpen, GraduationCap, Users, Mail, Phone, MapPin, Cake, DollarSign, FileText, Users2, AlertTriangle, Check, ChevronUp, ChevronDown, Camera, Trash2, Plus, Edit, Upload } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

// Enhanced mock student data
const initialStudent = {
  id: "ST12345",
  name: "Jane Smith",
  grade: "10th",
  age: 16,
  email: "jane.smith@school.edu",
  phone: "+1 (555) 123-4567",
  address: "123 School St, Cityville, State 12345",
  dateOfBirth: "2007-05-15",
  avatar: "/placeholder.svg?height=100&width=100",
  gpa: 3.8,
  attendance: 95,
  subjects: [
    { name: "Mathematics", grade: "A", progress: 92 },
    { name: "Science", grade: "A-", progress: 88 },
    { name: "English", grade: "B+", progress: 85 },
    { name: "History", grade: "A", progress: 90 },
  ],
  activities: ["Debate Club", "Basketball Team", "Student Council"],
  recentAchievements: [
    "1st Place in Regional Science Fair",
    "Student of the Month - April",
    "Perfect Attendance Award"
  ],
  financialInfo: {
    tuitionStatus: "Paid",
    scholarships: ["Merit Scholarship", "Sports Scholarship"],
    outstandingFees: 0,
  },
  documents: [
    { id: 1, name: "Birth Certificate", status: "Verified" },
    { id: 2, name: "Immunization Record", status: "Verified" },
    { id: 3, name: "Previous School Transcripts", status: "Pending" },
  ],
  parents: [
    {
      id: 1,
      name: "John Smith",
      relation: "Father",
      phone: "+1 (555) 987-6543",
      email: "john.smith@example.com",
    },
    {
      id: 2,
      name: "Mary Smith",
      relation: "Mother",
      phone: "+1 (555) 876-5432",
      email: "mary.smith@example.com",
    },
  ],
}

export default function EnhancedStudentProfile() {
  const [student, setStudent] = useState(initialStudent)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [isEditingProfilePicture, setIsEditingProfilePicture] = useState(false)
  const [isEditingDocument, setIsEditingDocument] = useState(false)
  const [editingDocument, setEditingDocument] = useState<{ id: number, name: string, status: string } | null>(null)
  const [isEditingParent, setIsEditingParent] = useState(false)
  const [editingParent, setEditingParent] = useState<{ id: number, name: string, relation: string, phone: string, email: string } | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const handleProfilePictureEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setStudent(prev => ({ ...prev, avatar: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
    setIsEditingProfilePicture(false)
  }

  const handleDocumentEdit = (document: { id: number, name: string, status: string }) => {
    setEditingDocument(document)
    setIsEditingDocument(true)
  }

  const handleDocumentSave = (updatedDocument: { id: number, name: string, status: string }) => {
    setStudent(prev => ({
      ...prev,
      documents: prev.documents.map(doc =>
        doc.id === updatedDocument.id ? updatedDocument : doc
      )
    }))
    setIsEditingDocument(false)
    setEditingDocument(null)
  }

  const handleDocumentDelete = (id: number) => {
    setStudent(prev => ({
      ...prev,
      documents: prev.documents.filter(doc => doc.id !== id)
    }))
  }

  const handleParentEdit = (parent: { id: number, name: string, relation: string, phone: string, email: string }) => {
    setEditingParent(parent)
    setIsEditingParent(true)
  }

  const handleParentSave = (updatedParent: { id: number, name: string, relation: string, phone: string, email: string }) => {
    setStudent(prev => ({
      ...prev,
      parents: prev.parents.map(p =>
        p.id === updatedParent.id ? updatedParent : p
      )
    }))
    setIsEditingParent(false)
    setEditingParent(null)
  }

  const handleParentAdd = () => {
    const newParent = {
      id: Date.now(),
      name: "",
      relation: "",
      phone: "",
      email: "",
    }
    setEditingParent(newParent)
    setIsEditingParent(true)
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle file upload here
    console.log(acceptedFiles)
    // You would typically upload the file to your server here
    // For now, we'll just add it to the documents list
    const newDocument = {
      id: Date.now(),
      name: acceptedFiles[0].name,
      status: "Pending"
    }
    setStudent(prev => ({
      ...prev,
      documents: [...prev.documents, newDocument]
    }))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <ScrollArea className="h-screen">
      <div className="container mx-auto p-6">
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <Dialog open={isEditingProfilePicture} onOpenChange={setIsEditingProfilePicture}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full">
                    <Camera className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Profile Picture</DialogTitle>
                    <DialogDescription>Upload a new profile picture for the student.</DialogDescription>
                  </DialogHeader>
                  <Input type="file" accept="image/*" onChange={handleProfilePictureEdit} />
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex-grow">
              <CardTitle className="text-2xl">{student.name}</CardTitle>
              <CardDescription>Student ID: {student.id} | Grade: {student.grade}</CardDescription>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="outline">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {student.financialInfo.tuitionStatus}
                </Badge>
                <Badge variant="outline">
                  <Users2 className="h-4 w-4 mr-1" />
                  {student.parents[0].name} ({student.parents[0].relation})
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-2">
                    <Mail className="h-4 w-4 opacity-70" /> <span>{student.email}</span>
                  </TooltipTrigger>
                  <TooltipContent>Student's Email</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-2">
                    <Phone className="h-4 w-4 opacity-70" /> <span>{student.phone}</span>
                  </TooltipTrigger>
                  <TooltipContent>Student's Phone</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 opacity-70" /> <span>{student.address}</span>
                  </TooltipTrigger>
                  <TooltipContent>Student's Address</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-2">
                    <Cake className="h-4 w-4 opacity-70" /> <span>{student.dateOfBirth} (Age: {student.age})</span>
                  </TooltipTrigger>
                  <TooltipContent>Student's Date of Birth</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">GPA</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{student.gpa.toFixed(2)}</div>
              <Progress value={(student.gpa / 4) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">Out of 4.0</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{student.attendance}%</div>
              <Progress value={student.attendance} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">Year to date</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Extracurricular</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{student.activities.length}</div>
              <p className="text-xs text-muted-foreground">Activities</p>
              <ul className="mt-2 text-sm">
                {student.activities.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="academics" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="academics">Academics</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="parents">Parents</TabsTrigger>
          </TabsList>
          <TabsContent value="academics" className="space-y-4">
            <h3 className="text-lg font-semibold">Current Subjects</h3>
            {student.subjects.map((subject, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between py-2">
                  <CardTitle className="text-base font-medium">{subject.name}</CardTitle>
                  <Badge>{subject.grade}</Badge>
                </CardHeader>
                <CardContent>
                  <Progress value={subject.progress} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">Progress: {subject.progress}%</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle>Extracurricular Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  {student.activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  {student.recentAchievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="financial">
            <Card>
              <CardHeader>
                <CardTitle>Financial Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Tuition Status</h4>
                    <p>{student.financialInfo.tuitionStatus}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Scholarships</h4>
                    <ul className="list-disc pl-6">
                      {student.financialInfo.scholarships.map((scholarship, index) => (
                        <li key={index}>{scholarship}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold">Outstanding Fees</h4>
                    <p>${student.financialInfo.outstandingFees.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="documents">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Student Documents</CardTitle>
                <Dialog open={isEditingDocument} onOpenChange={setIsEditingDocument}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" /> Add Document
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingDocument ? 'Edit Document' : 'Add New Document'}</DialogTitle>
                    </DialogHeader>
                    <div {...getRootProps()} className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer">
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p>Drop the files here ...</p>
                      ) : (
                        <div>
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                      )}
                    </div>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={editingDocument?.name || ''}
                          onChange={(e) => setEditingDocument(prev => prev ? { ...prev, name: e.target.value } : null)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">
                          Status
                        </Label>
                        <Input
                          id="status"
                          value={editingDocument?.status || ''}
                          onChange={(e) => setEditingDocument(prev => prev ? { ...prev, status: e.target.value } : null)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <Button onClick={() => editingDocument && handleDocumentSave(editingDocument)}>
                      Save Document
                    </Button>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {student.documents.map((doc) => (
                    <li key={doc.id} className="flex justify-between items-center">
                      <span>{doc.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant={doc.status === "Verified" ? "success" : "warning"}>
                          {doc.status === "Verified" ? <Check className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                          {doc.status}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => handleDocumentEdit(doc)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDocumentDelete(doc.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="parents">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Parents</CardTitle>
                <Button variant="outline" size="sm" onClick={handleParentAdd}>
                  <Plus className="h-4 w-4 mr-2" /> Add Parent
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {student.parents.map((parent) => (
                    <div key={parent.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">{parent.name} ({parent.relation})</h4>
                        <Button variant="ghost" size="sm" onClick={() => handleParentEdit(parent)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 opacity-70" />
                        <span>{parent.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 opacity-70" />
                        <span>{parent.email}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={isEditingParent} onOpenChange={setIsEditingParent}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingParent?.id ? 'Edit Parent' : 'Add New Parent'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="parentName" className="text-right">
                  Name
                </Label>
                <Input
                  id="parentName"
                  value={editingParent?.name || ''}
                  onChange={(e) => setEditingParent(prev => prev ? { ...prev, name: e.target.value } : null)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="parentRelation" className="text-right">
                  Relation
                </Label>
                <Input
                  id="parentRelation"
                  value={editingParent?.relation || ''}
                  onChange={(e) => setEditingParent(prev => prev ? { ...prev, relation: e.target.value } : null)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="parentPhone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="parentPhone"
                  value={editingParent?.phone || ''}
                  onChange={(e) => setEditingParent(prev => prev ? { ...prev, phone: e.target.value } : null)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="parentEmail" className="text-right">
                  Email
                </Label>
                <Input
                  id="parentEmail"
                  value={editingParent?.email || ''}
                  onChange={(e) => setEditingParent(prev => prev ? { ...prev, email: e.target.value } : null)}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={() => editingParent && handleParentSave(editingParent)}>
              Save Parent
            </Button>
          </DialogContent>
        </Dialog>

        <div className="mt-6 flex justify-end space-x-4">
          <Button variant="outline">Edit Profile</Button>
          <Button>
            <BookOpen className="mr-2 h-4 w-4" />
            View Full Academic Record
          </Button>
        </div>
      </div>
    </ScrollArea>
  )
}