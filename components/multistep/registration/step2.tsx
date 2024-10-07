"use client";

import React from 'react';
import { UseFormReturn } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form"
import { PasswordField } from '@/components/input/password'
import { RegistrationFormData } from './registration'
import { Checkbox } from '@/components/ui/checkbox';


const AccountSetupStep = React.memo(({ form }: { form: UseFormReturn<RegistrationFormData> }) => (
    <>
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
              <FormLabel
                htmlFor="agreeTerms"
                className={field.value ? "text-green-600" : "text-gray-500"}
              >
                J&apos;accepte les conditions d&apos;utilisation et la politique de confidentialité
              </FormLabel>
              <FormMessage id="agreeTerms-error" aria-live="polite" />
            </div>
          </FormItem>
        )}
      />
      </div>
    </>
  ))
  AccountSetupStep.displayName = 'AccountSetupStep'

  export default AccountSetupStep;