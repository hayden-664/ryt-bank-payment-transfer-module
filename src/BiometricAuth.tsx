import React, { useState } from 'react'
import { View, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import * as LocalAuthentication from 'expo-local-authentication'
import { AppText } from './components/Typography'
import { COLORS } from '@/theme'

interface BiometricAuthProps {
  onAuthSuccess: () => void
  onAuthFailure: () => void
}

const BiometricAuth: React.FC<BiometricAuthProps> = ({
  onAuthSuccess,
  onAuthFailure
}) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const authenticateWithBiometrics = async () => {
    setIsAuthenticating(true)

    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync()
      if (!hasHardware) {
        Alert.alert('Error', 'Biometric hardware not available')
        onAuthFailure()
        setIsAuthenticating(false)
        return
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync()
      if (!isEnrolled) {
        Alert.alert('Error', 'No biometrics enrolled')
        onAuthFailure()
        setIsAuthenticating(false)
        return
      }

      const authResult = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate',
        cancelLabel: 'Use PIN',
        fallbackLabel: 'Use PIN'
      })

      if (authResult.success) {
        onAuthSuccess()
      } else {
        onAuthFailure()
      }
    } catch (error) {
      console.error('Authentication error:', error)
      Alert.alert('Authentication Error', 'Failed to authenticate')
      onAuthFailure()
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
