// /hooks/useForgotPassword.ts

import { useState } from 'react';

export const useForgotPassword = () => {
  const [email, setEmail] = useState<string>('');

  const handleResetPassword = () => {
    // Here you can add logic to handle password reset (e.g., API call)
    console.log(`Password reset link sent to ${email}`);
  };

  return { email, setEmail, handleResetPassword };
};
