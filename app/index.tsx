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
import * as Contacts from 'expo-contacts'
import { Ionicons } from '@expo/vector-icons'

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

  const pickContact = async () => {
    const { status } = await Contacts.requestPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Please grant contact permissions in your device settings.'
      )
      return
    }

    try {
      const contact = await Contacts.presentContactPickerAsync()

      if (contact) {
        if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
          const phoneNumber = contact.phoneNumbers[0].number
          if (phoneNumber) {
            const cleanedNumber = phoneNumber.replace(/[\s-()]/g, '')
            setRecipient(cleanedNumber)
          } else {
            Alert.alert('Error', 'Could not retrieve the phone number.')
          }
        } else {
          Alert.alert(
            'No Phone Number',
            'The selected contact does not have a phone number.'
          )
        }
      }
    } catch (error) {
      console.error('Error picking contact:', error)
      Alert.alert('Error', 'An error occurred while selecting a contact.')
    }
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

        <View style={styles.inputWrapper}>
          <AppInput
            style={[styles.input, { flex: 1 }]}
            placeholder='Recipient'
            placeholderTextColor='#9299a1'
            value={recipient}
            onChangeText={setRecipient}
          />
          <TouchableOpacity onPress={pickContact} style={styles.iconButton}>
            <Ionicons
              name='person-circle-outline'
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>

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
      {transactionDetails.length > 0 && (
        <View style={styles.card}>
          <AppText
            style={{
              color: COLORS.primary,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.primary,
              textAlign: 'center',
              fontSize: 14,
              paddingBottom: 5
            }}
          >
            Recent
          </AppText>
          <ScrollView style={styles.scrollView}>
            {[...transactionDetails].reverse().map((txn, index) => (
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
            ))}
          </ScrollView>
        </View>
      )}
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
    borderRadius: RADIUS.default,
    flex: 1
  },
  scrollView: {
    flex: 1
  },
  transactionItem: {
    paddingVertical: 15,
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
    fontSize: 14,
    color: '#333'
  },
  iconButton: { padding: 10 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default PaymentTransferModule
