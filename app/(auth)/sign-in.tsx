// app/(auth)/sign-in.tsx
// ...existing code...
import { useAuth } from '@/hooks/useAuth';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      // navegar a la raíz para que el index evalúe el estado (y redirija a projects o privacy)
      router.replace('../(app)/projects/');
    } else {
      Alert.alert('Error', result.error || 'Error al iniciar sesión');
    }
  };

  return (
    <View className="justify-center flex-1 px-6 bg-gray-900">
      <Text className="mb-8 text-3xl font-bold text-center text-white">
        LyricLab
      </Text>
      
      <Text className="mb-6 text-xl font-semibold text-center text-white">
        Iniciar Sesión
      </Text>

      <TextInput
        className="p-4 mb-4 text-white bg-gray-800 rounded-lg"
        placeholder="Email"
        placeholderTextColor="#9CA3AF"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        className="p-4 mb-6 text-white bg-gray-800 rounded-lg"
        placeholder="Contraseña"
        placeholderTextColor="#9CA3AF"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry
      />

      <TouchableOpacity
        className="p-4 mb-4 bg-blue-500 rounded-lg"
        onPress={handleLogin}
        disabled={loading}
      >
        <Text className="text-lg font-semibold text-center text-white">
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Text>
      </TouchableOpacity>

      <Link href="/(auth)/sign-up" asChild>
        <TouchableOpacity>
          <Text className="text-center text-blue-400">
            ¿No tienes cuenta? Regístrate
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
// ...existing code...