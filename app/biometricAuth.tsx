import { AppText } from '@/components/Typography'
import { COLORS } from '@/constants/theme'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import * as LocalAuthentication from 'expo-local-authentication'
import { useTransactionStore } from '@/stores/useTransactionStore'
import Button from '@/components/Button'

const BiometricAuth: React.FC = () => {
  const router = useRouter()
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const currentBalance = useTransactionStore((state) => state.currentBalance)
  const setCurrentBalance = useTransactionStore(
    (state) => state.setCurrentBalance
  )
  const pendingTransaction = useTransactionStore(
    (state) => state.pendingTransaction
  )
  const addTransaction = useTransactionStore((state) => state.addTransaction)

  const handleBackToHome = () => {
    router.push('/')
  }

  const authenticateWithBiometrics = async () => {
    if (!pendingTransaction) {
      Alert.alert('Error', 'No pending transaction found.')
      return
    }
    setIsAuthenticating(true)

    try {
      // const hasHardware = await LocalAuthentication.hasHardwareAsync()
      // if (!hasHardware) {
      //   Alert.alert('Error', 'Biometric hardware not available')
      //   return
      // }

      // const isEnrolled = await LocalAuthentication.isEnrolledAsync()
      // if (!isEnrolled) {
      //   Alert.alert('Error', 'No biometrics enrolled')
      //   return
      // }

      // const authResult = await LocalAuthentication.authenticateAsync({
      //   promptMessage: 'Authenticate',
      //   cancelLabel: 'Cancel',
      //   fallbackLabel: 'Use PIN'
      // })

      // if (authResult.success) {
      //   await new Promise((resolve) => setTimeout(resolve, 2000))

      //   if (!pendingTransaction) {
      //     Alert.alert('Error', 'No pending transaction found.')
      //     return
      //   }

      //   const amountValue = parseFloat(pendingTransaction.amount)
      //   const newBalance = currentBalance - amountValue

      //   setCurrentBalance(newBalance)
      //   addTransaction({
      //     ...pendingTransaction,
      //     balance: newBalance
      //   })

      //   router.push('/transactionConfirmation')
      // } else {
      //   Alert.alert('Authentication Failed', 'Could not verify your identity')
      // }

      // For testing
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const simulatedSuccess = true

      if (simulatedSuccess) {
        const amountValue = parseFloat(pendingTransaction.amount)
        const newBalance = currentBalance - amountValue

        setCurrentBalance(newBalance)
        addTransaction({
          ...pendingTransaction,
          balance: newBalance
        })
        router.push('/transactionConfirmation')
      } else {
        Alert.alert('Authentication Failed', 'Could not verify your identity')
      }
    } catch (error) {
      console.error('Authentication error:', error)
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

      <View style={styles.buttonContainer}>
        <Button
          title={isAuthenticating ? 'Authenticating...' : 'Authenticate'}
          onPress={authenticateWithBiometrics}
          variant='primary'
          disabled={isAuthenticating}
        />
        <Button title='Cancel' onPress={handleBackToHome} variant='secondary' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offwhite,
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
  buttonContainer: {
    width: '100%',
    gap: 15
  }
})

export default BiometricAuth
