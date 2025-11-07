import React from 'react'
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  TextInput
} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useFonts, Fraunces_700Bold } from '@expo-google-fonts/fraunces'
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'
import PaymentTransferModule from './src/PaymentTransferModule'

export default function App() {
  const [fontsLoaded] = useFonts({
    Fraunces_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <PaymentTransferModule accountBalance={1500.0} />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' }
})
