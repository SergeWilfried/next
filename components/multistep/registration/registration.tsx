'use client'

import React, { useState, useMemo } from 'react'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { PasswordField } from '@/components/input/password'
import { FormProvider, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CountrySelect } from '@/components/input/country'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"


// Define the Zod schema
const formSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters."),
    lastName: z.string().min(2, "Last name must be at least 2 characters."),
    email: z.string().email("Invalid email address."),
    schoolName: z.string().min(2, "School name must be at least 2 characters."),
    schoolType: z.enum(['elementary', 'middle', 'high', 'college']),
    studentCount: z.number().min(1, "Number of students must be at least 1."),
    streetAddress: z.string().min(5, "Please enter a valid street address."),
    city: z.string().min(2, "City must be at least 2 characters."),
    state: z.string().min(2, "State must be at least 2 characters."),
    zipCode: z.string().min(5, "Please enter a valid zip code."),
    country: z.string().min(2, "Country must be at least 2 characters."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
    agreeTerms: z.boolean().refine(val => val === true, "You must agree to the terms."),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
  
  type RegistrationFormData = z.infer<typeof formSchema>;

  const BasicInfoStep = React.memo(({ form }: { form: UseFormReturn<RegistrationFormData> }) => (
    <>
      <CardTitle>Informations de base</CardTitle>
      <div className="mt-4 grid w-full items-center gap-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="firstName">Prénom</FormLabel>
                <FormControl>
                  <Input {...field} id="firstName" aria-describedby="firstName-error" />
                </FormControl>
                <FormMessage id="firstName-error" aria-live="polite" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="lastName">Nom</FormLabel>
                <FormControl>
                  <Input {...field} id="lastName" aria-describedby="lastName-error" />
                </FormControl>
                <FormMessage id="lastName-error" aria-live="polite" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Adresse e-mail</FormLabel>
              <FormControl>
                <Input {...field} type="email" id="email" aria-describedby="email-error" />
              </FormControl>
              <FormMessage id="email-error" aria-live="polite" />
            </FormItem>
          )}
        />
      </div>
    </>
  ))
  BasicInfoStep.displayName = 'BasicInfoStep'
const SchoolDetailsSetupStep = React.memo(({ form }: { form: UseFormReturn<RegistrationFormData> }) => (
    <>
      <CardTitle>Détails de l&apos;école</CardTitle>
      <div className="mt-4 grid w-full items-center gap-4">
        <FormField
          control={form.control}
          name="schoolName"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="schoolName">Nom de l&apos;école</FormLabel>
              <FormControl>
                <Input {...field} id="schoolName" aria-describedby="schoolName-error" />
              </FormControl>
              <FormMessage id="schoolName-error" aria-live="polite" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="schoolType"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="schoolType">Type d&apos;école</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger id="schoolType" aria-describedby="schoolType-error">
                    <SelectValue placeholder="Sélectionnez le type d'école" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="elementary">École primaire</SelectItem>
                  <SelectItem value="middle">Collège</SelectItem>
                  <SelectItem value="high">Lycée</SelectItem>
                  <SelectItem value="college">Université</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage id="schoolType-error" aria-live="polite" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="studentCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="studentCount">Nombre approximatif d&apos;élèves</FormLabel>
              <FormControl>
                <Input {...field} id="studentCount" type="number" min="1" aria-describedby="studentCount-error" />
              </FormControl>
              <FormMessage id="studentCount-error" aria-live="polite" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="streetAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="streetAddress">Adresse</FormLabel>
              <FormControl>
                <Textarea {...field} id="streetAddress" aria-describedby="streetAddress-error" />
              </FormControl>
              <FormMessage id="streetAddress-error" aria-live="polite" />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="city">Ville</FormLabel>
                <FormControl>
                  <Input {...field} id="city" aria-describedby="city-error" />
                </FormControl>
                <FormMessage id="city-error" aria-live="polite" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="state">Province</FormLabel>
                <FormControl>
                  <Input {...field} id="state" aria-describedby="state-error" />
                </FormControl>
                <FormMessage id="state-error" aria-live="polite" />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="zipCode">Code postal</FormLabel>
                <FormControl>
                  <Input {...field} id="zipCode" aria-describedby="zipCode-error" />
                </FormControl>
                <FormMessage id="zipCode-error" aria-live="polite" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="country">Pays</FormLabel>
                <FormControl>
                  <CountrySelect
                    control={form.control}
                    setValue={form.setValue}
                    name="country"
                  />
                </FormControl>
                <FormMessage id="country-error" aria-live="polite" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </>
  ))
  SchoolDetailsSetupStep.displayName = 'SchoolDetailsSetupStep'
  const AccountSetupStep = React.memo(({ form }: { form: UseFormReturn<RegistrationFormData> }) => (
    <>
      <CardTitle>Protegez votre compte</CardTitle>
      <div className="mt-4 grid w-full items-center gap-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Mot de passe</FormLabel>
              <FormControl>
                <PasswordField
                  {...field}
                  aria-describedby="password-error"
                  placeholder="Entrez le mot de passe"
                />
              </FormControl>
              <FormMessage id="password-error" aria-live="polite" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="confirmPassword">Confirmez le mot de passe</FormLabel>
              <FormControl>
                <PasswordField
                  {...field}
                  aria-describedby="confirmPassword-error"
                  placeholder="Confirmez le mot de passe"
                />
              </FormControl>
              <FormMessage id="confirmPassword-error" aria-live="polite" />
            </FormItem>
          )}
        />
      </div>
    </>
  ))
  AccountSetupStep.displayName = 'AccountSetupStep'

  const ConfirmationStep = React.memo(({ form }: { form: UseFormReturn<RegistrationFormData> }) => (
    <>
      <CardTitle>Confirmation</CardTitle>
      <div className="mt-4 grid w-full items-center gap-4">
        <FormField
          control={form.control}
          name="agreeTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="agreeTerms"
                  aria-describedby="agreeTerms-error"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor="agreeTerms">
                  J&apos;accepte les conditions d&apos;utilisation et la politique de confidentialité
                </FormLabel>
                <FormMessage id="agreeTerms-error" aria-live="polite" />
              </div>
            </FormItem>
          )}
        />
        <div className="text-sm text-gray-500" aria-label="Vérifiez vos informations">
          <p>Veuillez vérifier vos informations avant de soumettre :</p>
          <ul className="mt-2 list-inside list-disc">
            <li>Nom : {form.getValues('firstName')} {form.getValues('lastName')}</li>
            <li>E-mail : {form.getValues('email')}</li>
            <li>École : {form.getValues('schoolName')}</li>
            <li>Type d&apos;école : {form.getValues('schoolType')}</li>
            <li>Nombre d&apos;élèves : {form.getValues('studentCount')}</li>
            <li>Adresse : {form.getValues('streetAddress')}, {form.getValues('city')}, {form.getValues('state')} {form.getValues('zipCode')}, {form.getValues('country')}</li>
          </ul>
        </div>
      </div>
    </>
  ))
  ConfirmationStep.displayName = 'ConfirmationStep'

const RegistrationForm: React.FC = () => {
  const [step, setStep] = useState(1)

  
 // Initialize the form
 const form = useForm<RegistrationFormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      schoolName: '',
      schoolType: undefined,
      studentCount: 0,
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false
    }
  });

  
  const renderStepContent = useMemo(() => {
    switch (step) {
      case 1:
        return <BasicInfoStep form={form} />
      case 2:
        return <SchoolDetailsSetupStep form={form} />
      case 3:
        return <AccountSetupStep form={form} />
      case 4:
        return <ConfirmationStep form={form} />
      default:
        return null
    }
  }, [step, form])

  const onSubmit: SubmitHandler<RegistrationFormData> = (data) => {
    console.log('Form submitted:', data)
    // Here you would typically send the data to your backend
    alert('Account created successfully! Welcome to our School Management SaaS.')
  }

  return (
    <FormProvider {...form}>
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Créez votre compte Gesco</CardTitle>
      </CardHeader>
      <CardContent>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      {renderStepContent}
        </form>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setStep(prev => Math.max(prev - 1, 1))}
          disabled={step === 1}
        >
          Précédent
        </Button>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`size-3 rounded-full ${
                s === step ? 'bg-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        {step < 4 ? (
          <Button 
          onClick={async () => {
            const isValid = await form.trigger();
            if (isValid) {
              setStep(prev => Math.min(prev + 1, 4));
            }
          }}
          disabled={!form.formState.isValid}
        >
          Suivant
          </Button>
        ) : (
          <Button onClick={form.handleSubmit(onSubmit)} disabled={!form.formState.isValid}>
            Créer le compte
          </Button>
        )}
      </CardFooter>
    </Card>
    </FormProvider>
  )
}

RegistrationForm.displayName = 'RegistrationForm'

export default RegistrationForm