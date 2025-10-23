// ...existing code...
import { AuthState } from '@/app/types/auth';
import { useAuth } from '@/hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, displayName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<{ success: boolean; error?: string }>;
  acceptPrivacyPolicy: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth();
  const [localPrivacyAccepted, setLocalPrivacyAccepted] = useState<boolean | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const v = await AsyncStorage.getItem('privacyAccepted');
        if (v !== null) {
          setLocalPrivacyAccepted(v === 'true');
        } else {
          // fallback a lo que el hook pueda tener
          setLocalPrivacyAccepted(!!auth.privacyAccepted);
        }
      } catch (e) {
        setLocalPrivacyAccepted(!!auth.privacyAccepted);
      }
    };
    load();
  }, [auth.privacyAccepted]);

  const acceptPrivacyPolicy = async () => {
    try {
      await AsyncStorage.setItem('privacyAccepted', 'true');
      setLocalPrivacyAccepted(true);
      // si tu hook tiene una función para actualizar, podrías llamarla aquí
      // ejemplo: auth.setPrivacyAccepted?.(true);
    } catch (e) {
      // silenciar/registrar según prefieras
      console.warn('Error guardando privacyAccepted', e);
    }
  };

  const value: AuthContextType = {
    ...auth,
    privacyAccepted: localPrivacyAccepted ?? !!auth.privacyAccepted,
    acceptPrivacyPolicy,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
// ...existing code...