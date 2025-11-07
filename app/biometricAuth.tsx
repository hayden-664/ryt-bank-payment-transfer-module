import { AppText } from '@/components/Typography'
import { COLORS } from '@/constants/theme'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'

const BiometricAuth: React.FC = () => {
  const router = useRouter()
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const authenticateWithBiometrics = async () => {
    setIsAuthenticating(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      router.push('/transactionConfirmation')
    } catch (error) {
      console.error(error)
      Alert.alert('Authentication Error', 'Failed to authenticate')
    } finally {
      setIsAuthenticating(false)
    }
  }

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Secure Authentication</AppText>
      <AppText style={styles.subtitle}>
        Please authenticate using your biometrics to proceed with the payment
      </AppText>

      <TouchableOpacity
        style={[styles.button, isAuthenticating && styles.buttonDisabled]}
        onPress={authenticateWithBiometrics}
        disabled={isAuthenticating}
      >
        <AppText style={styles.buttonText}>
          {isAuthenticating ? 'Authenticating...' : 'Authenticate'}
        </AppText>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.primary
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
    lineHeight: 22
  },
  button: {
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    width: '80%'
  },
  buttonDisabled: {
    backgroundColor: '#cccccc'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default BiometricAuth
