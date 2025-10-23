// app/(auth)/privacy-policy.tsx
import { useAuthContext } from '@/contexts/AuthContext';
import { useAuth } from '@/hooks/useAuth';
import { Redirect } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

export default function PrivacyPolicy() {
  const { user, acceptPrivacyPolicy: acceptFromContext } = useAuthContext();
  const authHook = useAuth();
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleAccept = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // persistir local en el provider/context
      if (acceptFromContext) await acceptFromContext();

      // si el hook tiene una función que requiere userId, llámala también
      if (authHook.acceptPrivacyPolicy) {
        // la función del hook espera userId según tu implementación
        await authHook.acceptPrivacyPolicy(user.uid);
      }

      setAccepted(true);
    } catch (e) {
      console.warn('Error aceptando política', e);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  if (accepted) {
    return <Redirect href="/(app)/projects" />;
  }

  return (
    <View className="justify-center flex-1 p-6 bg-gray-900">
      <Text className="mb-6 text-2xl font-bold text-center text-white">Política de Privacidad</Text>

      <View className="mb-6">
        <Text className="mb-6 text-2xl font-bold text-center text-white">
          Política de Privacidad
        </Text>

        <Text className="mb-4 text-lg text-white">
          Última actualización: {new Date().getFullYear()}
        </Text>

        <Text className="mb-4 text-white">
          En LyricLab, valoramos tu privacidad y nos comprometemos a proteger tus datos personales. 
          Esta política explica cómo recopilamos, usamos y compartimos tu información.
        </Text>

        <Text className="mb-2 text-lg font-semibold text-white">
          1. Información que Recopilamos
        </Text>
        <Text className="mb-4 text-white">
          - Información de cuenta (email, nombre)
          - Contenido que creas (letras, grabaciones de audio)
          - Datos de uso de la aplicación
          - Información técnica del dispositivo
        </Text>

        <Text className="mb-2 text-lg font-semibold text-white">
          2. Uso de la Información
        </Text>
        <Text className="mb-4 text-white">
          - Proporcionar y mejorar nuestros servicios
          - Personalizar tu experiencia
          - Mantener la seguridad de la aplicación
          - Cumplir con obligaciones legales
        </Text>

        <Text className="mb-2 text-lg font-semibold text-white">
          3. Almacenamiento de Datos
        </Text>
        <Text className="mb-4 text-white">
          Tus datos se almacenan de forma segura en Firebase. Los archivos de audio 
          utilizan los 5GB de almacenamiento proporcionados por Firebase Storage.
        </Text>

        <Text className="mb-2 text-lg font-semibold text-white">
          4. Tus Derechos
        </Text>
        <Text className="mb-6 text-white">
          Tienes derecho a acceder, corregir y eliminar tus datos personales. 
          Puedes contactarnos en cualquier momento para ejercer estos derechos.
        </Text>

        <Text className="mb-8 text-sm italic text-white">
          Al hacer clic en Aceptar, confirmas que has leído y comprendido 
          esta política de privacidad y aceptas el procesamiento de tus datos 
          según lo descrito anteriormente.
        </Text>
      </View>

      <TouchableOpacity
        className="p-4 mb-4 bg-green-600 rounded-lg"
        onPress={handleAccept}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="font-semibold text-center text-white">Aceptar y continuar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity className="p-4 bg-gray-700 rounded-lg" onPress={() => {/* abrir detalle si hace falta */}}>
        <Text className="text-center text-white">Leer más</Text>
      </TouchableOpacity>
    </View>
  );
}