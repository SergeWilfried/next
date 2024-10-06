"use client";

import { Button } from '@/components/ui/button';
import React from 'react';

interface Step5Props {
  onPrevious: () => void;
}

export const Step5: React.FC<Step5Props> = ({ onPrevious }) => {
  return (
    <div>
      <h2>Check Your Email</h2>
      <p>We sent you an email with further instructions.</p>
      <Button onClick={onPrevious}>Back</Button>
      <Button>Open Email App</Button>
    </div>
  );
};

export default Step5;