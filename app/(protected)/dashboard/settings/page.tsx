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

export const metadata = constructMetadata({
  title: "Settings – Gesco",
  description: "Configure your account and website settings.",
})

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user?.id) redirect("/login")

  return (
    <>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Members</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="facility">Facility</TabsTrigger>
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

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Members</CardTitle>
              <CardDescription>Manage your notification settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/01.png" alt="Member 1" />
                    <AvatarFallback>M1</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-gray-500">john.doe@example.com</p>
                  </div>
                </div>
                <Badge>Admin</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/02.png" alt="Member 2" />
                    <AvatarFallback>M2</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Jane Smith</p>
                    <p className="text-sm text-gray-500">jane.smith@example.com</p>
                  </div>
                </div>
                <Badge>Member</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/03.png" alt="Member 3" />
                    <AvatarFallback>M3</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Bob Johnson</p>
                    <p className="text-sm text-gray-500">bob.johnson@example.com</p>
                  </div>
                </div>
                <Badge>Member</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Invite</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Business Integration</CardTitle>
              <CardDescription>Configure WhatsApp Business API credentials.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="whatsapp-phone">WhatsApp Phone Number</Label>
                <Input id="whatsapp-phone" placeholder="+1234567890" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp-api-key">API Key</Label>
                <Input id="whatsapp-api-key" placeholder="Your WhatsApp API Key" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp-business-id">Business Account ID</Label>
                <Input id="whatsapp-business-id" placeholder="Your Business Account ID" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save WhatsApp Settings</Button>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Twilio SMS Integration</CardTitle>
              <CardDescription>Configure Twilio API credentials for SMS notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <Input id="twilio-phone-number" placeholder="+1234567890" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Twilio Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
            <CardFooter>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Member Management</CardTitle>
              <CardDescription>Manage your organization&apos;`s members.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add member management content here */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facility">
          <Card>
            <CardHeader>
              <CardTitle>Facility Settings</CardTitle>
              <CardDescription>Configure your facility settings.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add facility settings content here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}