import React from 'react';
import RegistrationFlow from '@/components/multistep/registration/registration-flow';
const RegistrationPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      {/* Render the RegistrationFlow component */}
      <RegistrationFlow />
    </div>
  );
};

export default RegistrationPage;