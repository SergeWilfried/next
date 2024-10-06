"use client";

import React from 'react';
import { UseFormReturn } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form"
import { PasswordField } from '@/components/input/password'
import { RegistrationFormData } from './registration'


export const AccountSetupStep = React.memo(({ form }: { form: UseFormReturn<RegistrationFormData> }) => (
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
      </div>
    </>
  ))
  AccountSetupStep.displayName = 'AccountSetupStep'