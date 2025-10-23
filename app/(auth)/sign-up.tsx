// app/(auth)/sign-up.tsx
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUp() {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!formData.displayName || !formData.email || !formData.password || !formData.confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    const result = await register(formData.email, formData.password, formData.displayName);
    setLoading(false);

    if (result.success) {
      // La redirección se maneja automáticamente en index.tsx
    } else {
      Alert.alert('Error', result.error || 'Error al registrar usuario');
    }
  };

  return (
    <View className="justify-center flex-1 px-6 bg-gray-900">
      <Text className="mb-8 text-3xl font-bold text-center text-white">
        LyricLab
      </Text>
      
      <Text className="mb-6 text-xl font-semibold text-center text-white">
        Crear Cuenta
      </Text>

      <TextInput
        className="p-4 mb-4 text-white bg-gray-800 rounded-lg"
        placeholder="Nombre completo"
        placeholderTextColor="#9CA3AF"
        value={formData.displayName}
        onChangeText={(text) => setFormData({ ...formData, displayName: text })}
      />

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
        className="p-4 mb-4 text-white bg-gray-800 rounded-lg"
        placeholder="Contraseña"
        placeholderTextColor="#9CA3AF"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry
      />

      <TextInput
        className="p-4 mb-6 text-white bg-gray-800 rounded-lg"
        placeholder="Confirmar contraseña"
        placeholderTextColor="#9CA3AF"
        value={formData.confirmPassword}
        onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
        secureTextEntry
      />

      <TouchableOpacity
        className="p-4 mb-4 bg-blue-500 rounded-lg"
        onPress={handleRegister}
        disabled={loading}
      >
        <Text className="text-lg font-semibold text-center text-white">
          {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
        </Text>
      </TouchableOpacity>

      <Link href="/(auth)/sign-in" asChild>
        <TouchableOpacity>
          <Text className="text-center text-blue-400">
            ¿Ya tienes cuenta? Inicia sesión
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}