'use client';

import React from "react"
import { CardTitle } from "@/components/ui/card"
import { FormField } from "@/components/ui/form"
import { FormItem } from "@/components/ui/form"
import { FormControl } from "@/components/ui/form"
import { FormLabel } from "@/components/ui/form"
import { FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

import { RegistrationFormData } from "./registration";
import { UseFormReturn } from "react-hook-form";

const ConfirmationStep = React.memo(({ form }: { form: UseFormReturn<RegistrationFormData> }) => (
  <>
    <CardTitle>Confirmation</CardTitle>
    <div className="mt-4 grid w-full items-center gap-4">
  
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

export default ConfirmationStep;