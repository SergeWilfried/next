'use client'

import React, { useState, useMemo } from 'react'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardDescription } from "@/components/ui/card"
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import SchoolDetailsSetupStep from './step1'
import AccountSetupStep from './step2'
import BasicInfoStep from './step3'
import ConfirmationStep from './step4'
import CheckEmailStep from './step5'


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
  
  export type RegistrationFormData = z.infer<typeof formSchema>;



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
      case 5:
        return <CheckEmailStep onPrevious={() => setStep(prev => prev - 1)} />
      default:
        return null
    }
  }, [step, form])

  const onSubmit: SubmitHandler<RegistrationFormData> = (data) => {
    console.log('Form submitted:', data)
    // Here you would typically send the data to your backend
    alert('Account created successfully! Welcome to our School Management SaaS.')
  }

  const handleNext = async () => {
    let fieldsToValidate: (keyof RegistrationFormData)[] = [];
    switch (step) {
      case 1:
        fieldsToValidate = ['schoolName', 'firstName', 'lastName', 'email', 'country'];
        break;
      case 2:
        fieldsToValidate = ['schoolType', 'studentCount', 'streetAddress', 'city', 'state', 'zipCode'];
        break;
      case 3:
        fieldsToValidate = ['password', 'confirmPassword'];
        break;
    }
  
    const isStepValid = await form.trigger(fieldsToValidate);
    if (isStepValid) {
      setStep(prev => Math.min(prev + 1, 4));
    } else {
      // Focus on the first invalid field
      const firstInvalidField = fieldsToValidate.find(field => form.formState.errors[field]);
      if (firstInvalidField) {
        form.setFocus(firstInvalidField);
      }
    }
  };

  return (
    <FormProvider {...form}>
      <Card className="mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl">
      <CardHeader>
        <CardDescription>Créez votre compte Gesco</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      {renderStepContent}
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
      <Button
          variant="outline"
          onClick={() => setStep(prev => Math.max(prev - 1, 1))}
          disabled={step === 1}
          className="w-full sm:w-auto"

        >
          Précédent
        </Button>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4].map((s) => (
            <div
            key={s}
            className={`size-2 rounded-full sm:size-3 ${
              s === step ? 'bg-primary' : 'bg-gray-300'
            }`}
          />
          ))}
        </div>
        {step < 4 ? (
            <Button onClick={handleNext} className="w-full sm:w-auto">
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