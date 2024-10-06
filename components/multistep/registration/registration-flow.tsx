"use client";

import React, { useState, createContext, useContext } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';

// Create a context for the form data
const FormContext = createContext<any>(null);

// Create a custom hook to use the form context
export const useFormContext = () => useContext(FormContext);

const RegistrationFlow = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    schoolName: "",
    schoolCategory: "",
    schoolType: "",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);

  const updateFormData = (newData: Partial<typeof formData>) => {
    setFormData(prevData => ({ ...prevData, ...newData }));
  };

  // Create the context value
  const contextValue = {
    formData,
    updateFormData,
  };

  return (
    <FormContext.Provider value={contextValue}>
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <h2 className="text-center text-2xl font-bold">Registration</h2>
        </CardHeader>
        <CardContent className="p-6">
          {step === 1 && <Step1 formData={formData} onChange={updateFormData} onNext={handleNextStep} />}
          {step === 2 && <Step2 formData={formData} onChange={updateFormData} onNext={handleNextStep} onPrevious={handlePreviousStep} />}
          {step === 3 && <Step3 formData={formData} onChange={updateFormData} onNext={handleNextStep} onPrevious={handlePreviousStep} />}
          {step === 4 && <Step4 onPrevious={handlePreviousStep} />}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button onClick={handlePreviousStep} variant="outline">
              Previous
            </Button>
          )}
          {step < 3 && (
            <Button onClick={handleNextStep} className="ml-auto">
              Next
            </Button>
          )}
        </CardFooter>
      </Card>
    </FormContext.Provider>
  );
};

export default RegistrationFlow;