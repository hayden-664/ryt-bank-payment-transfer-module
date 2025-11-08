import { AppInput, AppText, Heading } from '@/components/Typography'
import { useTransactionStore } from '@/stores/useTransactionStore'
import { COLORS, RADIUS } from '@/constants/theme'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  Alert,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import Button from '@/components/Button'

const PaymentTransferModule = () => {
  const router = useRouter()
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const currentBalance = useTransactionStore((state) => state.currentBalance)
  const transactionDetails = useTransactionStore(
    (state) => state.transactionDetails
  )
  const setPendingTransaction = useTransactionStore(
    (state) => state.setPendingTransaction
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

    setPendingTransaction({
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
      <View style={styles.card}>
        <AppText
          style={{
            color: COLORS.primary,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.primary,
            textAlign: 'center',
            fontSize: 12,
            paddingBottom: 5
          }}
        >
          Recent
        </AppText>
        <ScrollView style={{ flexGrow: 1 }}>
          {transactionDetails.length > 0 ? (
            [...transactionDetails].reverse().map((txn, index) => (
              <View key={index} style={styles.transactionItem}>
                <TouchableOpacity
                  style={styles.transactionDetail}
                  onPress={() => {
                    setRecipient(txn.recipient)
                    setAmount(txn.amount)
                    setNote(txn.note)
                  }}
                >
                  <AppText style={styles.transactionText}>
                    {txn.recipient}
                  </AppText>
                  <AppText style={styles.transactionText}>
                    ${txn.amount}
                  </AppText>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <AppText
              style={{ fontSize: 12, textAlign: 'center', color: '#9299a1', paddingVertical: 30 }}
            >
              No transactions yet
            </AppText>
          )}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offwhite,
    gap: 30,
    padding: 20
  },
  title: {
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    gap: 20,
    padding: 15,
    borderRadius: RADIUS.default,
    backgroundColor: 'white'
  },
  balanceContainer: {
    backgroundColor: '#e6e6ff',
    paddingVertical: 40,
    paddingHorizontal: 15,
    borderRadius: RADIUS.default,
    alignItems: 'center'
  },
  balanceLabel: {
    fontSize: 16,
    color: COLORS.primary
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.offwhite,
    borderRadius: RADIUS.default,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#fff'
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: RADIUS.default
  },
  transactionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: 'transparent'
  },
  transactionDetail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  transactionText: {
    fontSize: 12,
    color: '#333'
  }
})

export default PaymentTransferModule
