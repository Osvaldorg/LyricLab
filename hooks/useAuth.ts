// hooks/useAuth.ts
import { AuthState, User } from '@/app/types/auth';
import { auth } from '@/firebaseConfig';
import { getPrivacyAccepted, setPrivacyAccepted } from '@/lib/storage/LocalStorage';
import {
  createUserWithEmailAndPassword,
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { useEffect, useState } from 'react';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    privacyAccepted: false,
    loading: true
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const user: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName
        };

        const privacyAccepted = await getPrivacyAccepted(firebaseUser.uid);
        
        setAuthState({
          user,
          privacyAccepted,
          loading: false
        });
      } else {
        setAuthState({
          user: null,
          privacyAccepted: false,
          loading: false
        });
      }
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error: any) {
      let errorMessage = 'Error al iniciar sesión';
      
      // Manejo de errores específicos de Firebase
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'El email no es válido';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No existe una cuenta con este email';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Contraseña incorrecta';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Demasiados intentos. Intenta más tarde';
      }
      
      return { success: false, error: errorMessage };
    }
  };

  const register = async (email: string, password: string, displayName: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name
      await updateProfile(result.user, {
        displayName: displayName
      });

      return { success: true, user: result.user };
    } catch (error: any) {
      let errorMessage = 'Error al crear la cuenta';
      
      // Manejo de errores específicos de Firebase
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Ya existe una cuenta con este email';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'El email no es válido';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'La contraseña es muy débil';
      }
      
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const acceptPrivacyPolicy = async (userId: string) => {
    await setPrivacyAccepted(userId, true);
    setAuthState(prev => ({ ...prev, privacyAccepted: true }));
  };

  return {
    ...authState,
    login,
    register,
    logout,
    acceptPrivacyPolicy
  };
}