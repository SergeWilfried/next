"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Step3Props {
  formData: {
    phoneNumber: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  onChange: (data: Partial<Step3Props['formData']>) => void;
  onPrevious: () => void;
  onNext: () => void;
}

const Step3: React.FC<Step3Props> = ({ formData, onChange }) => {
  const handleAddressChange = (field: keyof Step3Props['formData']['address'], value: string) => {
    onChange({ address: { ...formData.address, [field]: value } });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => onChange({ phoneNumber: e.target.value })}
          placeholder="Phone Number"
        />
      </div>
      <div>
        <Label htmlFor="street">Street</Label>
        <Input
          id="street"
          type="text"
          value={formData.address.street}
          onChange={(e) => handleAddressChange('street', e.target.value)}
          placeholder="Street"
        />
      </div>
      <div>
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          type="text"
          value={formData.address.city}
          onChange={(e) => handleAddressChange('city', e.target.value)}
          placeholder="City"
        />
      </div>
      <div>
        <Label htmlFor="state">State</Label>
        <Input
          id="state"
          type="text"
          value={formData.address.state}
          onChange={(e) => handleAddressChange('state', e.target.value)}
          placeholder="State"
        />
      </div>
      <div>
        <Label htmlFor="zipCode">Zip Code</Label>
        <Input
          id="zipCode"
          type="text"
          value={formData.address.zipCode}
          onChange={(e) => handleAddressChange('zipCode', e.target.value)}
          placeholder="Zip Code"
        />
      </div>
      <div>
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          type="text"
          value={formData.address.country}
          onChange={(e) => handleAddressChange('country', e.target.value)}
          placeholder="Country"
        />
      </div>
    </div>
  );
};

export default Step3;