"use client";

import React from 'react';
import { CardTitle } from "@/components/ui/card";

interface CheckEmailStepProps {
  onPrevious: () => void;
}

const CheckEmailStep = React.memo(({ }: CheckEmailStepProps) => (
  <>
    <CardTitle>Vérifiez votre e-mail</CardTitle>
    <div className="mt-4 grid w-full items-center gap-4">
      <p className="text-sm text-gray-500">
        Nous vous avons envoyé un e-mail avec des instructions supplémentaires. Veuillez vérifier votre boîte de réception.
      </p>
    </div>
  </>
))

CheckEmailStep.displayName = 'CheckEmailStep';

export default CheckEmailStep;