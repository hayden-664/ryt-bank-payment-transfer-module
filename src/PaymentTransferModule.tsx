import React, { useState } from 'react'
import { View, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { COLORS, RADIUS } from '@/theme'
import { AppInput, AppText, Heading } from './components/Typography'
import BiometricAuth from './BiometricAuth'

interface PaymentTransferModuleProps {
  accountBalance: number
}

const PaymentTransferModule: React.FC<PaymentTransferModuleProps> = ({
  accountBalance
}) => {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showAuth, setShowAuth] = useState(false)

  const handleTransfer = () => {
    if (!recipient.trim()) {
      Alert.alert('Error', 'Please enter a recipient')
      return
    }

    if (!amount.trim()) {
      Alert.alert('Error', 'Please enter an amount')
      return
    }

    const amountValue = parseFloat(amount)
    if (isNaN(amountValue) || amountValue <= 0) {
      Alert.alert('Error', 'Please enter a valid amount')
      return
    }

    if (amountValue > accountBalance) {
      Alert.alert('Error', 'Insufficient funds')
      return
    }

    setShowAuth(true)
  }

  const handleAuthSuccess = () => {
    setIsProcessing(true)
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false)
      Alert.alert('Success', 'Payment transferred successfully')
      setRecipient('')
      setAmount('')
      setNote('')
    }, 1500)
  }

  const handleAuthFailure = () => {
    setShowAuth(false)
  }

  const handleCancelAuth = () => {
    setShowAuth(false)
  }

  if (showAuth) {
    return (
      <View style={styles.container}>
        <BiometricAuth
          onAuthSuccess={handleAuthSuccess}
          onAuthFailure={handleAuthFailure}
        />
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancelAuth}
        >
          <AppText style={styles.cancelButtonText}>Cancel</AppText>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Heading style={styles.title}>Payment Transfer</Heading>

      <View style={styles.form}>
        <View style={styles.balanceContainer}>
          <AppText style={styles.balanceLabel}>Total Balance</AppText>
          <AppText weight='bold' style={styles.balanceAmount}>
            ${accountBalance.toFixed(2)}
          </AppText>
        </View>

        <AppInput
          style={styles.input}
          placeholder='Recipient'
          value={recipient}
          onChangeText={setRecipient}
        />

        <AppInput
          style={styles.input}
          placeholder='Amount'
          value={amount}
          onChangeText={setAmount}
          keyboardType='numeric'
        />

        <AppInput
          style={styles.input}
          placeholder='Note (Optional)'
          value={note}
          onChangeText={setNote}
        />

        <TouchableOpacity
          style={[styles.button, isProcessing && styles.buttonDisabled]}
          onPress={handleTransfer}
          disabled={isProcessing}
        >
          <AppText style={styles.buttonText}>
            {isProcessing ? 'Processing...' : 'Transfer Payment'}
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: COLORS.primary
  },
  form: {
    flex: 1
  },
  balanceContainer: {
    backgroundColor: '#e6e6ff',
    padding: 15,
    borderRadius: RADIUS.default,
    marginBottom: 30,
    alignItems: 'center'
  },
  balanceLabel: {
    fontSize: 16,
    color: COLORS.primary
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 5
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.default,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: RADIUS.default,
    padding: 15,
    alignItems: 'center'
  },
  buttonDisabled: {
    backgroundColor: '#cccccc'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  cancelButton: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.default,
    padding: 15,
    alignItems: 'center'
  },
  cancelButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default PaymentTransferModule
