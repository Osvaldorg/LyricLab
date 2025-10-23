// ...existing code...
import { useAuthContext } from '@/contexts/AuthContext';
import { Redirect } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';

export default function Index() {
  const { user, privacyAccepted, loading } = useAuthContext();

  if (loading) {
    return (
      <View className="items-center justify-center flex-1 bg-gray-900">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-lg text-white">Cargando...</Text>
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  if (!privacyAccepted) {
    return <Redirect href="/(auth)/privacy-policy" />;
  }

  return <Redirect href="/(app)/projects" />;
}
// ...existing code...