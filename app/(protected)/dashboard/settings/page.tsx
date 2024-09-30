import { redirect } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import { getCurrentUser } from "@/lib/session"
import { constructMetadata } from "@/lib/utils"
import { DeleteAccountSection } from "@/components/dashboard/delete-account"
import { DashboardHeader } from "@/components/dashboard/header"
import { UserNameForm } from "@/components/forms/user-name-form"
import { UserRoleForm } from "@/components/forms/user-role-form"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Badge } from "lucide-react"
import { IntegrationCollapsible } from "@/components/collapsible/integration"
import { Checkbox } from "@/components/ui/checkbox"

export const metadata = constructMetadata({
  title: "Paramètres – Gesco",
  description: "Configurez les paramètres de votre compte et du site web.",
})

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user?.id) redirect("/login")

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
          <TabsTrigger value="integrations">Intégrations</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="facility">Établissement</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres du compte</CardTitle>
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
              <CardTitle>Membres</CardTitle>
              <CardDescription>Gérez les membres de votre établissement.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "John Doe", email: "john.doe@example.com", role: "Administrateur", avatar: "01" },
                { name: "Jane Smith", email: "jane.smith@example.com", role: "Enseignant", avatar: "02" },
                { name: "Bob Johnson", email: "bob.johnson@example.com", role: "Étudiant", avatar: "03" },
                { name: "Alice Cooper", email: "alice.cooper@example.com", role: "Comptable", avatar: "04" },
              ].map((member, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={`/avatars/${member.avatar}.png`} alt={`Member ${index + 1}`} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                  </div>
                  <Badge>{member.role}</Badge>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button>Inviter un nouveau membre</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Intégrations</CardTitle>
              <CardDescription>Gérez vos intégrations et paramètres API.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <IntegrationCollapsible
                title="Intégration WhatsApp Business"
                description="Configurez les identifiants de l&apos;API WhatsApp Business."
                switchId="whatsapp-integration"
              >
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-phone">Numéro de téléphone WhatsApp</Label>
                  <Input id="whatsapp-phone" placeholder="+1234567890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-api-key">Clé API</Label>
                  <Input id="whatsapp-api-key" placeholder="Votre clé API WhatsApp" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-business-id">ID du compte professionnel</Label>
                  <Input id="whatsapp-business-id" placeholder="Votre ID de compte professionnel" />
                </div>
                <Button className="mt-4">Enregistrer les paramètres WhatsApp</Button>
              </IntegrationCollapsible>

              <IntegrationCollapsible
                title="Intégration SMS Twilio"
                description="Configurez les identifiants de l&apos;API Twilio pour les notifications SMS."
                switchId="twilio-integration"
              >
                <div className="space-y-2">
                  <Label htmlFor="twilio-account-sid">ID du compte</Label>
                  <Input id="twilio-account-sid" placeholder="Votre ID de compte Twilio" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twilio-auth-token">Jeton d&apos;authentification</Label>
                  <Input id="twilio-auth-token" placeholder="Votre jeton d&apos;authentification Twilio" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twilio-phone-number">Numéro de téléphone Twilio</Label>
                  <Input id="twilio-phone-number" placeholder="+1234567890" />
                </div>
                <Button className="mt-4">Enregistrer les paramètres Twilio</Button>
              </IntegrationCollapsible>

              <IntegrationCollapsible
                title="Intégration Paystack"
                description="Configurez les identifiants de l&apos;API Paystack pour le traitement des paiements."
                switchId="paystack-integration"
              >
                <div className="space-y-2">
                  <Label htmlFor="paystack-secret-key">Clé secrète</Label>
                  <Input id="paystack-secret-key" placeholder="Votre clé secrète Paystack" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paystack-public-key">Clé publique</Label>
                  <Input id="paystack-public-key" placeholder="Votre clé publique Paystack" />
                </div>
                <Button className="mt-4">Enregistrer les paramètres Paystack</Button>
              </IntegrationCollapsible>

              <IntegrationCollapsible
                title="Intégration CinetPay"
                description="Configurez les identifiants de l&apos;API CinetPay pour le traitement des paiements."
                switchId="cinetpay-integration"
              >
                <div className="space-y-2">
                  <Label htmlFor="cinetpay-api-key">Clé API</Label>
                  <Input id="cinetpay-api-key" placeholder="Votre clé API CinetPay" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cinetpay-site-id">ID du site</Label>
                  <Input id="cinetpay-site-id" placeholder="Votre ID de site CinetPay" />
                </div>
                <Button className="mt-4">Enregistrer les paramètres CinetPay</Button>
              </IntegrationCollapsible>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de sécurité</CardTitle>
              <CardDescription>Gérez la sécurité de votre compte.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Mot de passe actuel</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmer le nouveau mot de passe</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Mettre à jour le mot de passe</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="facility">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de l&apos;établissement</CardTitle>
              <CardDescription>Configurez les paramètres de votre établissement.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="facility-name">Nom de l&apos;établissement</Label>
                    <Input id="facility-name" placeholder="Entrez le nom de l&apos;établissement" />
                  </div>
                  <div>
                    <Label htmlFor="facility-type">Type d&apos;établissement</Label>
                    <select id="facility-type" className="w-full rounded border p-2">
                      <option value="">Sélectionnez un type</option>
                      <option value="primary">École primaire</option>
                      <option value="secondary">École secondaire</option>
                      <option value="university">Université</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="facility-status">Statut</Label>
                    <select id="facility-status" className="w-full rounded border p-2">
                      <option value="">Sélectionnez un statut</option>
                      <option value="public">Public</option>
                      <option value="private-secular">Privé laïc</option>
                      <option value="private-religious">Privé confessionnel</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="facility-founded">Année de fondation</Label>
                    <Input id="facility-founded" type="number" placeholder="AAAA" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="facility-address">Adresse</Label>
                    <Input id="facility-address" placeholder="Adresse de l&apos;établissement" />
                  </div>
                  <div>
                    <Label htmlFor="facility-region">Région</Label>
                    <Input id="facility-region" placeholder="Ex: Centre" />
                  </div>
                  <div>
                    <Label htmlFor="facility-province">Province</Label>
                    <Input id="facility-province" placeholder="Ex: KADIOGO" />
                  </div>
                  <div>
                    <Label htmlFor="facility-commune">Commune</Label>
                    <Input id="facility-commune" placeholder="Ex: OUAGADOUGOU" />
                  </div>
                  <div>
                    <Label htmlFor="facility-ceb">C.E.B</Label>
                    <Input id="facility-ceb" placeholder="Ex: OUAGA 13" />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <Label htmlFor="facility-phone">Numéro de téléphone</Label>
                  <Input id="facility-phone" placeholder="+1234567890" />
                </div>
                <div>
                  <Label htmlFor="facility-email">Email</Label>
                  <Input id="facility-email" type="email" placeholder="contact@etablissement.com" />
                </div>
                <div>
                  <Label htmlFor="facility-website">Site web</Label>
                  <Input id="facility-website" placeholder="https://www.etablissement.com" />
                </div>
              </div>

              <div>
                <Label htmlFor="facility-capacity">Capacité d&apos;accueil</Label>
                <Input id="facility-capacity" type="number" placeholder="Nombre d&apos;étudiants" />
              </div>

              <div>
                <Label>Options de l&apos;établissement</Label>
                <div className="mt-2 grid grid-cols-2 gap-4 md:grid-cols-3">
                  {['Cafétéria', 'Bibliothèque', 'Installations sportives', 'Dortoirs', 'Laboratoires', 'Service de transport'].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox id={`option-${option.toLowerCase()}`} />
                      <Label htmlFor={`option-${option.toLowerCase()}`}>{option}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="facility-active" />
                <Label htmlFor="facility-active">Établissement actif</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Enregistrer les paramètres</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}