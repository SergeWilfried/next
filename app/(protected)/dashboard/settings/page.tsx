import { redirect } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { getCurrentUser } from "@/lib/session"
import { constructMetadata } from "@/lib/utils"
import { DeleteAccountSection } from "@/components/dashboard/delete-account"
import { DashboardHeader } from "@/components/dashboard/header"
import { UserNameForm } from "@/components/forms/user-name-form"
import { UserRoleForm } from "@/components/forms/user-role-form"
import { PhoneInput } from "@/components/input/phone-input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DialogHeader, DialogFooter, DialogTitle, DialogTrigger, Dialog, DialogContent, DialogDescription } from "@/components/ui/dialog"

export const metadata = constructMetadata({
  title: "Paramètres – Gesco",
  description: "Configurez les paramètres de votre compte et de votre site web.",
})


export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user?.id) redirect("/login")


  // Local variables to manage state
  let twoFactorEnabled = false
  let isInviteDialogOpen = false

// Event handlers to manage state
const handleTwoFactorChange = (event) => {
  twoFactorEnabled = event.target.checked
  // Force re-render if necessary
}

  const handleInviteDialogOpenChange = (isOpen) => {
    isInviteDialogOpen = isOpen
    // Force re-render if necessary
  }


  return (
    <>
      <DashboardHeader
        heading="Paramètres"
        text="Gérez les paramètres du compte et du site web."
      />
      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Compte</TabsTrigger>
          <TabsTrigger value="members">Membres</TabsTrigger>
          <TabsTrigger value="facility">Établissement</TabsTrigger>
          <TabsTrigger value="integrations">Intégrations</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres du Compte</CardTitle>
              <CardDescription>Gérez les informations de votre compte.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <UserNameForm user={{ id: user.id, name: user.name || "" }} />
              <UserRoleForm user={{ id: user.id, role: user.role }} />
              <div className="mt-6">
                <DeleteAccountSection />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Membres de l'Équipe</CardTitle>
              <CardDescription>Gérez les membres de votre équipe et leurs rôles.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Example member list - replace with actual data */}
                {[
                  { name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
                  { name: "Bob Smith", email: "bob@example.com", role: "Editor" },
                  { name: "Carol Williams", email: "carol@example.com", role: "Viewer" },
                ].map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${member.name}`} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Select defaultValue={member.role.toLowerCase()}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="editor">Éditeur</SelectItem>
                          <SelectItem value="viewer">Spectateur</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm">Supprimer</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Dialog open={isInviteDialogOpen} onOpenChange={handleInviteDialogOpenChange}>
                <DialogTrigger asChild>
                  <Button onClick={() => handleInviteDialogOpenChange(true)}>Inviter un Nouveau Membre</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Inviter un Nouveau Membre</DialogTitle>
                    <DialogDescription>Entrez les détails du nouveau membre que vous souhaitez inviter.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="invite-name">Nom</Label>
                      <Input id="invite-name" placeholder="Nom Complet" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invite-email">Email</Label>
                      <Input id="invite-email" placeholder="Adresse Email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invite-role">Rôle</Label>
                      <Select>
                        <SelectTrigger id="invite-role">
                          <SelectValue placeholder="Sélectionnez un rôle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="editor">Éditeur</SelectItem>
                          <SelectItem value="viewer">Spectateur</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => handleInviteDialogOpenChange(false)}>Annuler</Button>
                    <Button>Inviter</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Intégrations</CardTitle>
              <CardDescription>Gérez vos intégrations de services externes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* WhatsApp Business Integration */}
              <Collapsible>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Intégration WhatsApp Business</CardTitle>
                    <CardDescription>Configurez les identifiants de l'API WhatsApp Business.</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="whatsapp-integration">Activer</Label>
                    <Switch id="whatsapp-integration" />
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <span className="sr-only">Basculer</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                <CollapsibleContent className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp-phone">Numéro de Téléphone WhatsApp</Label>
                    <PhoneInput defaultCountry="BF" id="whatsapp-phone" placeholder="+1234567890" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp-api-key">Clé API</Label>
                    <Input id="whatsapp-api-key" placeholder="Votre Clé API WhatsApp" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp-business-id">ID de Compte Business</Label>
                    <Input id="whatsapp-business-id" placeholder="Votre ID de Compte Business" />
                  </div>
                  <Button>Enregistrer les Paramètres WhatsApp</Button>
                </CollapsibleContent>
              </Collapsible>

              {/* Twilio SMS Integration */}
              <Collapsible>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Intégration Twilio SMS</CardTitle>
                    <CardDescription>Configurez les identifiants de l'API Twilio pour les notifications SMS.</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="twilio-integration">Activer</Label>
                    <Switch id="twilio-integration" />
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <span className="sr-only">Basculer</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                <CollapsibleContent className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="twilio-account-sid">SID du Compte</Label>
                    <Input id="twilio-account-sid" placeholder="Votre SID de Compte Twilio" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twilio-auth-token">Jeton d'Authentification</Label>
                    <Input id="twilio-auth-token" placeholder="Votre Jeton d'Authentification Twilio" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twilio-phone-number">Numéro de Téléphone Twilio</Label>
                    <PhoneInput defaultCountry="BF" id="twilio-phone-number" placeholder="+1234567890" />
                  </div>
                  <Button>Enregistrer les Paramètres Twilio</Button>
                </CollapsibleContent>
              </Collapsible>

              {/* Paystack Integration */}
              <Collapsible>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Intégration Paystack</CardTitle>
                    <CardDescription>Configurez Paystack pour le traitement des paiements.</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="paystack-integration">Activer</Label>
                    <Switch id="paystack-integration" />
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <span className="sr-only">Basculer</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                <CollapsibleContent className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="paystack-secret-key">Clé Secrète</Label>
                    <Input id="paystack-secret-key" placeholder="Votre Clé Secrète Paystack" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paystack-public-key">Clé Publique</Label>
                    <Input id="paystack-public-key" placeholder="Votre Clé Publique Paystack" />
                  </div>
                  <Button>Enregistrer les Paramètres Paystack</Button>
                </CollapsibleContent>
              </Collapsible>

              {/* CinetPay Integration */}
              <Collapsible>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Intégration CinetPay</CardTitle>
                    <CardDescription>Configurez CinetPay pour le traitement des paiements.</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="cinetpay-integration">Activer</Label>
                    <Switch id="cinetpay-integration" />
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <span className="sr-only">Basculer</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                <CollapsibleContent className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="cinetpay-api-key">Clé API</Label>
                    <Input id="cinetpay-api-key" placeholder="Votre Clé API CinetPay" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cinetpay-site-id">ID du Site</Label>
                    <Input id="cinetpay-site-id" placeholder="Votre ID de Site CinetPay" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cinetpay-environment">Environnement</Label>
                    <Select>
                      <SelectTrigger id="cinetpay-environment">
                        <SelectValue placeholder="Sélectionnez l'environnement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sandbox">Sandbox</SelectItem>
                        <SelectItem value="production">Production</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Enregistrer les Paramètres CinetPay</Button>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de Sécurité</CardTitle>
              <CardDescription>Gérez la sécurité de votre compte.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Changer le Mot de Passe</h3>
                <div className="space-y-2">
                  <Label htmlFor="current-password">Mot de Passe Actuel</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nouveau Mot de Passe</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmer le Nouveau Mot de Passe</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button>Mettre à Jour le Mot de Passe</Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Authentification à Deux Facteurs</h3>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="two-factor-auth"
                    checked={twoFactorEnabled}
                    onCheckedChange={handleTwoFactorChange}
                  />
                  <Label htmlFor="two-factor-auth">
                    Activer l'Authentification à Deux Facteurs
                  </Label>
                </div>
                {twoFactorEnabled && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">
                      L'authentification à deux facteurs est maintenant activée. Utilisez une application d'authentification pour scanner le code QR ci-dessous.
                    </p>
                    {/* Placeholder for QR code */}
                    <div className="w-40 h-40 bg-gray-200 flex items-center justify-center">
                      Espace réservé pour le code QR
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="2fa-code">Code de Vérification</Label>
                      <Input id="2fa-code" placeholder="Entrez le code à 6 chiffres" />
                    </div>
                    <Button>Activer</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}