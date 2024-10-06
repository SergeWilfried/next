'use client';
import { UseFormReturn } from "react-hook-form"
import React from "react"
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RegistrationFormData } from "./registration";

const SchoolDetailsSetupStep = React.memo(({ form }: { form: UseFormReturn<RegistrationFormData> }) => (
    <>
      <div className="mt-4 grid w-full items-center gap-4">
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
      </div>
    </>
  ))
  SchoolDetailsSetupStep.displayName = 'SchoolDetailsSetupStep'

  export default SchoolDetailsSetupStep;