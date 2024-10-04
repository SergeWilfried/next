"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordField } from '@/components/input/password';

interface Step1Props {
  formData: {
    name: string;  // Changed from 'email' to 'name'
    email: string;
    password: string;
  };
  onChange: (data: Partial<Step1Props['formData']>) => void;
  onNext: () => void;
}

const Step1: React.FC<Step1Props> = ({ formData, onChange, onNext }) => {
  // Add this to handle password changes
  const handlePasswordChange = (value: string) => {
    onChange({ password: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Full Name"
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onChange({ email: e.target.value })}
          placeholder="Email"
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <PasswordField
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handlePasswordChange}
        />
      </div>
    </div>
  );
};

export default Step1;