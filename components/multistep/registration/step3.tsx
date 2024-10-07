'use client'
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegistrationFormData } from './registration';
import { CountrySelect } from '@/components/input/country';


const BasicInfoStep = React.memo(({ form }: { form: UseFormReturn<RegistrationFormData> }) => (
    <>
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

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
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
    </>
  ))
  BasicInfoStep.displayName = 'BasicInfoStep'

  export default BasicInfoStep;