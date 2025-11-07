import React from 'react'
import { Stack } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useFonts, Fraunces_700Bold } from '@expo-google-fonts/fraunces'
import {
  Poppins_400Regular,
  Poppins_500Medium
} from '@expo-google-fonts/poppins'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { COLORS } from '@/constants/theme'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Fraunces_700Bold,
    Poppins_400Regular,
    Poppins_500Medium
  })

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.overlay}>
          <ActivityIndicator size='large' color={COLORS.primary} />
        </View>
      </View>
    )
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <Stack
          screenOptions={{
            headerShown: false
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loadingContainer: {
    flex: 1
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
