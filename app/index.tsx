import { AppInput, AppText, Heading } from '@/components/Typography'
import { useTransactionStore } from '@/stores/useTransactionStore'
import { COLORS, RADIUS } from '@/constants/theme'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import Button from '@/components/Button'

const PaymentTransferModule = () => {
  const router = useRouter()
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const currentBalance = useTransactionStore((state) => state.currentBalance)
  const setTransactionDetails = useTransactionStore(
    (state) => state.setTransactionDetails
  )

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

    if (amountValue > currentBalance) {
      Alert.alert('Error', 'Insufficient funds')
      return
    }

    setTransactionDetails({
      recipient,
      amount,
      note,
      balance: currentBalance
    })

    router.push('/biometricAuth')
  }

  return (
    <View style={styles.container}>
      <Heading weight='regular' style={styles.title}>
        Transfer
      </Heading>

      <View style={styles.form}>
        <View style={styles.balanceContainer}>
          <AppText style={styles.balanceLabel}>Total Balance</AppText>
          <AppText weight='bold' style={styles.balanceAmount}>
            ${currentBalance.toFixed(2)}
          </AppText>
        </View>

        <AppInput
          style={styles.input}
          placeholder='Recipient'
          placeholderTextColor='#9299a1'
          value={recipient}
          onChangeText={setRecipient}
        />

        <AppInput
          style={styles.input}
          placeholder='Amount'
          placeholderTextColor='#9299a1'
          value={amount}
          onChangeText={setAmount}
          keyboardType='numeric'
        />

        <AppInput
          style={styles.input}
          placeholder='Note (Optional)'
          placeholderTextColor='#9299a1'
          value={note}
          onChangeText={setNote}
        />

        <Button title='Transfer' onPress={handleTransfer} variant='primary' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offwhite,
    padding: 20
  },
  title: {
    marginBottom: 30,
    textAlign: 'center'
  },
  form: {
    padding: 15,
    borderRadius: RADIUS.default,
    backgroundColor: 'white'
  },
  balanceContainer: {
    backgroundColor: '#e6e6ff',
    paddingVertical: 40,
    paddingHorizontal: 15,
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
    borderColor: COLORS.offwhite,
    borderRadius: RADIUS.default,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff'
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
