"use client"
import React, { useState, useCallback, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/shared/icons"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogFooter, DialogClose, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDropzone } from 'react-dropzone'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { X } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useParams } from 'next/navigation'

interface EnhancedStudentProfileProps {
    id: string
  }

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
    transactions: [
      { id: 1, date: "2023-09-01", description: "Tuition Payment", amount: -5000 },
      { id: 2, date: "2023-09-15", description: "Book Fee", amount: -200 },
      { id: 3, date: "2023-10-01", description: "Merit Scholarship Credit", amount: 1000 },
      { id: 4, date: "2023-10-15", description: "Lab Fee", amount: -150 },
      { id: 5, date: "2023-11-01", description: "Sports Scholarship Credit", amount: 500 },
    ],
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

export default function EnhancedStudentProfile({ id }: EnhancedStudentProfileProps) {
  
  const [student, setStudent] = useState(initialStudent)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [isEditingProfilePicture, setIsEditingProfilePicture] = useState(false)
  const [isEditingDocument, setIsEditingDocument] = useState(false)
  const [editingDocument, setEditingDocument] = useState<{ id: number, name: string, status: string } | null>(null)
  const [isEditingParent, setIsEditingParent] = useState(false)
  const [editingParent, setEditingParent] = useState<{ id: number, name: string, relation: string, phone: string, email: string } | null>(null)
  const [isEditingProfile, setIsEditingProfile] = useState(false)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  
  useEffect(() => {
    // Fetch student data based on the id
    // This is where you'd typically make an API call
    // For now, we'll just use the initialStudent data
    console.log(`Fetching data for student with id: ${id}`)
    // setStudent(fetchedStudentData)
  }, [id])

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

  const getBadgeFinanceVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
      case 'verified':
        return 'success'
      case 'pending':
        return 'warning'
      case 'overdue':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const profileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
  })

  type ProfileFormValues = z.infer<typeof profileSchema>

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: student.name,
      email: student.email,
      phone: student.phone,
      address: student.address,
    },
  })

  const onSubmit = (data: ProfileFormValues) => {
    // Handle form submission
    console.log(data)
    setIsEditingProfile(false)
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
      <div className="container mx-auto p-4 sm:p-6"> {/* Adjusted padding for smaller screens */}
        <Card className="mb-6">
          <CardHeader className="flex flex-col items-center gap-4 sm:flex-row"> {/* Made header stack on small screens */}
            <div className="relative">
              <Avatar className="size-20">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <Dialog open={isEditingProfilePicture} onOpenChange={setIsEditingProfilePicture}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full">
                    <Icons.camera className="size-4" />
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
            <div className="grow text-center sm:text-left"> {/* Centered text on small screens */}
              <CardTitle className="text-xl sm:text-2xl">{student.name}</CardTitle>
              <CardDescription>ID : {student.id} | Niveau : {student.grade}</CardDescription>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <Badge variant="outline">
                  <Icons.dollarSign className="mr-1 size-4" />
                  {student.financialInfo.tuitionStatus}
                </Badge>
                <Badge variant="outline">
                  <Icons.users2 className="mr-1 size-4" />
                  {student.parents[0].name} ({student.parents[0].relation})
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-2">
                    <Icons.mail className="size-4 opacity-70" /> <span>{student.email}</span>
                  </TooltipTrigger>
                  <TooltipContent>E-mail</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-2">
                    <Icons.phone className="size-4 opacity-70" /> <span>{student.phone}</span>
                  </TooltipTrigger>
                  <TooltipContent>Téléphone</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-2">
                    <Icons.map className="size-4 opacity-70" /> <span>{student.address}</span>
                  </TooltipTrigger>
                  <TooltipContent>Adresse</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-2">
                    <Icons.cake className="size-4 opacity-70" /> <span>{student.dateOfBirth} (Âge : {student.age})</span>
                  </TooltipTrigger>
                  <TooltipContent>Date de naissance</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"> {/* Adjusted grid for better responsiveness */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Moyenne générale</CardTitle>
              <Icons.graduationCap className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{student.gpa.toFixed(2)}</div>
              <Progress value={(student.gpa / 4) * 100} className="mt-2" />
              <p className="mt-1 text-xs text-muted-foreground">Sur 4.0</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assiduité</CardTitle>
              <Icons.calendarDays className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{student.attendance}%</div>
              <Progress value={student.attendance} className="mt-2" />
              <p className="mt-1 text-xs text-muted-foreground">Année en cours</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activités extrascolaires</CardTitle>
              <Icons.users className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{student.activities.length}</div>
              <p className="text-xs text-muted-foreground">Activités</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="academics" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"> {/* Adjusted grid for better responsiveness */}
            <TabsTrigger value="academics">Académique</TabsTrigger>
            <TabsTrigger value="activities">Activités</TabsTrigger>
            <TabsTrigger value="achievements">Réalisations</TabsTrigger>
            <TabsTrigger value="financial">Finances</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="parents">Parents</TabsTrigger>
          </TabsList>
          <TabsContent value="academics" className="space-y-4">
            <h3 className="text-lg font-semibold">Matières actuelles</h3>
            {student.subjects.map((subject, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between py-2">
                  <CardTitle className="text-base font-medium">{subject.name}</CardTitle>
                  <Badge>{subject.grade}</Badge>
                </CardHeader>
                <CardContent>
                  <Progress value={subject.progress} className="mt-2" />
                  <p className="mt-1 text-sm text-muted-foreground">Progression : {subject.progress}%</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle>Activités extrascolaires</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-6">
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
                <CardTitle>Réalisations récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-6">
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
                <CardTitle>Informations financières</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <h4 className="font-semibold">Statut des frais de scolarité</h4>
                      <p>{student.financialInfo.tuitionStatus}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Bourses</h4>
                      <ul className="list-disc pl-6">
                        {student.financialInfo.scholarships.map((scholarship, index) => (
                          <li key={index}>{scholarship}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold">Frais impayés</h4>
                      <p>${student.financialInfo.outstandingFees.toFixed(2)}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold">Transactions récentes</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Montant</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {student.financialInfo.transactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell className={`text-right ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                              ${Math.abs(transaction.amount).toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="documents">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Documents personnels</CardTitle>
                <Dialog open={isEditingDocument} onOpenChange={setIsEditingDocument}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Icons.plus className="mr-2 size-4" /> Ajouter un document
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingDocument ? 'Modifier le document' : 'Ajouter un nouveau document'}</DialogTitle>
                    </DialogHeader>
                    <div {...getRootProps()} className="cursor-pointer rounded-md border-2 border-dashed p-6 text-center">
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p>Déposez les fichiers ici ...</p>
                      ) : (
                        <div>
                          <Icons.upload className="mx-auto size-12 text-gray-400" />
                          <p>Glissez et déposez des fichiers ici, ou cliquez pour sélectionner des fichiers</p>
                        </div>
                      )}
                    </div>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Nom
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
                          Statut
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
                      Enregistrer le document
                    </Button>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {student.documents.map((doc) => (
                    <li key={doc.id} className="flex items-center justify-between">
                      <span>{doc.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant={doc.status === "Verified" ? "default" : "destructive"}>
                          {doc.status === "Verified" ? <Icons.check className="size-4" /> : <Icons.warning className="size-4" />}
                          {doc.status === "Verified" ? "Vérifié" : "En attente"}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => handleDocumentEdit(doc)}>
                          <Icons.edit className="size-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDocumentDelete(doc.id)}>
                          <Icons.trash className="size-4" />
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
                  <Icons.plus className="mr-2 size-4" /> Ajouter un parent
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {student.parents.map((parent) => (
                    <div key={parent.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{parent.name} ({parent.relation})</h4>
                        <Button variant="ghost" size="sm" onClick={() => handleParentEdit(parent)}>
                          <Icons.edit className="size-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icons.phone className="size-4 opacity-70" />
                        <span>{parent.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icons.mail className="size-4 opacity-70" />
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
              <DialogTitle>{editingParent?.id ? 'Modifier le parent' : 'Ajouter un nouveau parent'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="parentName" className="text-right">
                  Nom
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
                  Téléphone
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
                  E-mail
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
              Enregistrer le parent
            </Button>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Modifier le profil</DialogTitle>
              <DialogDescription>Mettez à jour les informations du compte.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom complet</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditingProfile(false)}>Annuler</Button>
                  <Button type="submit">Enregistrer les modifications</Button>
                </DialogFooter>
              </form>
            </Form>
            <DialogClose className="absolute right-4 top-4">
              <X className="size-4" />
              <span className="sr-only">Fermer</span>
            </DialogClose>
          </DialogContent>
        </Dialog>

        <div className="mt-6 flex flex-col justify-end space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0"> {/* Stack buttons on small screens */}
          <Button variant="outline" onClick={() => setIsEditingProfile(true)}>Modifier le profil</Button>
          <Button>
            <Icons.bookOpen className="mr-2 size-4" />
            Voir le dossier académique complet
          </Button>
        </div>
      </div>
    </ScrollArea>
  )
}