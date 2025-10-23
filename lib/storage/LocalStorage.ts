// lib/storage/LocalStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const PRIVACY_KEY = 'privacy_accepted';

export const getPrivacyAccepted = async (userId: string): Promise<boolean> => {
  try {
    const key = `${PRIVACY_KEY}_${userId}`;
    const value = await AsyncStorage.getItem(key);
    return value === 'true';
  } catch (error) {
    console.error('Error getting privacy acceptance:', error);
    return false;
  }
};

export const setPrivacyAccepted = async (userId: string, accepted: boolean): Promise<void> => {
  try {
    const key = `${PRIVACY_KEY}_${userId}`;
    await AsyncStorage.setItem(key, accepted.toString());
  } catch (error) {
    console.error('Error setting privacy acceptance:', error);
    throw error;
  }
};

// Funciones adicionales que podrías necesitar
export const clearAuthData = async (userId: string): Promise<void> => {
  try {
    const key = `${PRIVACY_KEY}_${userId}`;
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }
};