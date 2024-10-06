"use client";

import { Button } from '@/components/ui/button';
import React from 'react';

interface CheckEmailStepProps {
  onPrevious: () => void;
}

const CheckEmailStep: React.FC<CheckEmailStepProps> = ({ onPrevious }) => {
  return (
    <div>
      <h2>Check Your Email</h2>
      <p>We sent you an email with further instructions.</p>
      <Button onClick={onPrevious}>Back</Button>
      <Button>Open Email App</Button>
    </div>
  );
};

export default CheckEmailStep;