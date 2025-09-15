import type React from 'react';
import '@bnbr/design-tokens/css';

interface ProviderProps {
  children: React.ReactNode;
}

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  return <>{children}</>;
};
