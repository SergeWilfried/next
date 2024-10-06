"use client";

import React from 'react';
import { CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

interface CheckEmailStepProps {
  onPrevious: () => void;
}

const CheckEmailStep = React.memo(({ onPrevious }: CheckEmailStepProps) => (
  <>
    <CardTitle>Vérifiez votre e-mail</CardTitle>
    <div className="mt-4 grid w-full items-center gap-4">
      <p className="text-sm text-gray-500">
        Nous vous avons envoyé un e-mail avec des instructions supplémentaires. Veuillez vérifier votre boîte de réception.
      </p>
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onPrevious}>Retour</Button>
        <Button>Ouvrir l'application e-mail</Button>
      </div>
    </div>
  </>
))

CheckEmailStep.displayName = 'CheckEmailStep';

export default CheckEmailStep;