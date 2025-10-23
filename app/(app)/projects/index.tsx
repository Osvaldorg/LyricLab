// app/(app)/projects/index.tsx
// ...existing code...
import { useAuthContext } from '@/contexts/AuthContext';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Projects() {
  const { user, logout } = useAuthContext();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View className="flex-1 p-6 bg-gray-900">
      <Text className="mb-4 text-2xl font-bold text-white">Bienvenido a LyricLab</Text>

      <Text className="mb-2 text-white">Hola, {user?.displayName || user?.email}</Text>

      <Text className="mb-8 text-gray-400">
        Esta es la pantalla principal de la aplicación. Aquí irá la lista de tus proyectos.
      </Text>

      <TouchableOpacity className="p-4 mt-auto bg-red-500 rounded-lg" onPress={handleLogout}>
        <Text className="font-semibold text-center text-white">Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
// ...existing code...