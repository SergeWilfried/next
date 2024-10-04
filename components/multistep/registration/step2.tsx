"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Step2Props {
  formData: {
    schoolName: string;
    schoolCategory: string;
    schoolType: string;
  };
  onChange: (data: Partial<Step2Props['formData']>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Step2: React.FC<Step2Props> = ({ formData, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="schoolName">School Name</Label>
        <Input
          id="schoolName"
          type="text"
          value={formData.schoolName}
          onChange={(e) => onChange({ schoolName: e.target.value })}
          placeholder="School Name"
        />
      </div>
      <div>
        <Label htmlFor="schoolCategory">School Category</Label>
        <Select
          value={formData.schoolCategory}
          onValueChange={(value) => onChange({ schoolCategory: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PRIVATE">Private</SelectItem>
            <SelectItem value="PUBLIC">Public</SelectItem>
            <SelectItem value="CHARTER">Charter</SelectItem>
            <SelectItem value="RELIGIOUS">Religious</SelectItem>
            <SelectItem value="NON_PROFIT">Non-Profit</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="schoolType">School Type</Label>
        <Select
          value={formData.schoolType}
          onValueChange={(value) => onChange({ schoolType: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="HIGH_SCHOOL">High School</SelectItem>
            <SelectItem value="MIDDLE_SCHOOL">Middle School</SelectItem>
            <SelectItem value="ELEMENTARY_SCHOOL">Elementary School</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Step2;