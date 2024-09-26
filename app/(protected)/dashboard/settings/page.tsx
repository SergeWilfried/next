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
import { useState } from "react"

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
  title: "Settings – Gesco",
  description: "Configure your account and website settings.",
})

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user?.id) redirect("/login")

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [isInviteDialogOpen, setInviteDialogOpen] = useState(false)

  return (
    <>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="facility">Facility</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account information.</CardDescription>
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
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your team members and their roles.</CardDescription>
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
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Dialog open={isInviteDialogOpen} onOpenChange={setInviteDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setInviteDialogOpen(true)}>Invite New Member</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Invite New Member</DialogTitle>
                    <DialogDescription>Enter the details of the new member you want to invite.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="invite-name">Name</Label>
                      <Input id="invite-name" placeholder="Full Name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invite-email">Email</Label>
                      <Input id="invite-email" placeholder="Email Address" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invite-role">Role</Label>
                      <Select>
                        <SelectTrigger id="invite-role">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => setInviteDialogOpen(false)}>Cancel</Button>
                    <Button>Send Invite</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Manage your external service integrations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* WhatsApp Business Integration */}
              <Collapsible>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">WhatsApp Business Integration</CardTitle>
                    <CardDescription>Configure WhatsApp Business API credentials.</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="whatsapp-integration">Enable</Label>
                    <Switch id="whatsapp-integration" />
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <span className="sr-only">Toggle</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                <CollapsibleContent className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp-phone">WhatsApp Phone Number</Label>
                    <PhoneInput defaultCountry="BF" id="whatsapp-phone" placeholder="+1234567890" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp-api-key">API Key</Label>
                    <Input id="whatsapp-api-key" placeholder="Your WhatsApp API Key" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp-business-id">Business Account ID</Label>
                    <Input id="whatsapp-business-id" placeholder="Your Business Account ID" />
                  </div>
                  <Button>Save WhatsApp Settings</Button>
                </CollapsibleContent>
              </Collapsible>

              {/* Twilio SMS Integration */}
              <Collapsible>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Twilio SMS Integration</CardTitle>
                    <CardDescription>Configure Twilio API credentials for SMS notifications.</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="twilio-integration">Enable</Label>
                    <Switch id="twilio-integration" />
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <span className="sr-only">Toggle</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                <CollapsibleContent className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="twilio-account-sid">Account SID</Label>
                    <Input id="twilio-account-sid" placeholder="Your Twilio Account SID" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twilio-auth-token">Auth Token</Label>
                    <Input id="twilio-auth-token" placeholder="Your Twilio Auth Token" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twilio-phone-number">Twilio Phone Number</Label>
                    <PhoneInput defaultCountry="BF" id="twilio-phone-number" placeholder="+1234567890" />
                  </div>
                  <Button>Save Twilio Settings</Button>
                </CollapsibleContent>
              </Collapsible>

              {/* Paystack Integration */}
              <Collapsible>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Paystack Integration</CardTitle>
                    <CardDescription>Configure Paystack for payment processing.</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="paystack-integration">Enable</Label>
                    <Switch id="paystack-integration" />
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <span className="sr-only">Toggle</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                <CollapsibleContent className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="paystack-secret-key">Secret Key</Label>
                    <Input id="paystack-secret-key" placeholder="Your Paystack Secret Key" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paystack-public-key">Public Key</Label>
                    <Input id="paystack-public-key" placeholder="Your Paystack Public Key" />
                  </div>
                  <Button>Save Paystack Settings</Button>
                </CollapsibleContent>
              </Collapsible>

              {/* CinetPay Integration */}
              <Collapsible>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">CinetPay Integration</CardTitle>
                    <CardDescription>Configure CinetPay for payment processing.</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="cinetpay-integration">Enable</Label>
                    <Switch id="cinetpay-integration" />
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <span className="sr-only">Toggle</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                <CollapsibleContent className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="cinetpay-api-key">API Key</Label>
                    <Input id="cinetpay-api-key" placeholder="Your CinetPay API Key" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cinetpay-site-id">Site ID</Label>
                    <Input id="cinetpay-site-id" placeholder="Your CinetPay Site ID" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cinetpay-environment">Environment</Label>
                    <Select>
                      <SelectTrigger id="cinetpay-environment">
                        <SelectValue placeholder="Select environment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sandbox">Sandbox</SelectItem>
                        <SelectItem value="production">Production</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Save CinetPay Settings</Button>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button>Update Password</Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="two-factor-auth"
                    checked={twoFactorEnabled}
                    onCheckedChange={setTwoFactorEnabled}
                  />
                  <Label htmlFor="two-factor-auth">
                    Enable Two-Factor Authentication
                  </Label>
                </div>
                {twoFactorEnabled && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">
                      Two-factor authentication is now enabled. Use an authenticator app to scan the QR code below.
                    </p>
                    {/* Placeholder for QR code */}
                    <div className="w-40 h-40 bg-gray-200 flex items-center justify-center">
                      QR Code Placeholder
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="2fa-code">Verification Code</Label>
                      <Input id="2fa-code" placeholder="Enter the 6-digit code" />
                    </div>
                    <Button>Verify and Enable 2FA</Button>
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
