"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useWatch } from "react-hook-form"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Button } from "../ui/button"

const FormSchema = z.object({
  whatsapp_integration: z.object({
    enabled: z.boolean().default(false),
    apiKey: z.string().optional(),
    phoneNumber: z.string().optional(),
  }),
  twilio_integration: z.object({
    enabled: z.boolean().default(false),
    accountSid: z.string().optional(),
    authToken: z.string().optional(),
  }),
  paystack_integration: z.object({
    enabled: z.boolean().default(false),
    secretKey: z.string().optional(),
  }),
  cinetpay_integration: z.object({
    enabled: z.boolean().default(false),
    apiKey: z.string().optional(),
    siteId: z.string().optional(),
  }),
})

export function IntegrationsForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      whatsapp_integration: { enabled: false },
      twilio_integration: { enabled: false },
      paystack_integration: { enabled: false },
      cinetpay_integration: { enabled: false },
    },
  })

  const formValues = useWatch({ control: form.control })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="space-y-4">
          {[
            {
              key: "whatsapp_integration",
              label: "Intégration WhatsApp Business",
              fields: [
                { name: "apiKey", label: "Clé API" },
                { name: "phoneNumber", label: "Numéro de téléphone" },
              ],
            },
            {
              key: "twilio_integration",
              label: "Intégration SMS Twilio",
              fields: [
                { name: "accountSid", label: "SID du compte" },
                { name: "authToken", label: "Jeton d'authentification" },
              ],
            },
            {
              key: "paystack_integration",
              label: "Intégration Paystack",
              fields: [{ name: "secretKey", label: "Clé secrète" }],
            },
            {
              key: "cinetpay_integration",
              label: "Intégration CinetPay",
              fields: [
                { name: "apiKey", label: "Clé API" },
                { name: "siteId", label: "ID du site" },
              ],
            },
          ].map(({ key, label, fields }) => (
            <div key={key} className="space-y-4">
              <FormField
                control={form.control}
                name={`${key}.enabled` as any}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>{label}</FormLabel>
                      <FormDescription>
                        Activer/désactiver l&apos;intégration
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {formValues[key as keyof typeof formValues]?.enabled &&
                fields.map((field) => (
                  <FormField
                    key={field.name}
                    control={form.control}
                    name={`${key}.${field.name}` as any}
                    render={({ field: inputField }) => (
                      <FormItem>
                        <FormLabel>{field.label}</FormLabel>
                        <FormControl>
                          <input
                            {...inputField}
                            className="w-full rounded-md border p-2"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
            </div>
          ))}
        </div>
        <Button type="submit" className="w-full">
          Enregistrer les modifications
        </Button>
      </form>
    </Form>
  )
}
