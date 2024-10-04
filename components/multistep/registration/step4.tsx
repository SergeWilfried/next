"use client";

import { Button } from '@/components/ui/button';
import React from 'react';

interface Step4Props {
  onPrevious: () => void;
}

const Step4: React.FC<Step4Props> = ({ onPrevious }) => {
  return (
    <div>
      <h2>Check Your Email</h2>
      <p>We sent you an email with further instructions.</p>
      <Button onClick={onPrevious}>Back</Button>
      <Button>Open Email App</Button>
    </div>
  );
};

export default Step4;