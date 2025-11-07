import { AppText, Heading } from '@/components/Typography'
import { useTransactionStore } from '@/stores/useTransactionStore'
import { COLORS, RADIUS } from '@/constants/theme'
import { useRouter } from 'expo-router'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

const TransactionConfirmation: React.FC = () => {
  const router = useRouter()
  const { transactionDetails } = useTransactionStore()

  const handleBackToHome = () => {
    router.push('/')
  }

  return (
    <View style={styles.container}>
      <Heading style={styles.title}>Transaction Confirmed</Heading>

      <ScrollView style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <AppText style={styles.detailLabel}>Recipient:</AppText>
          <AppText style={styles.detailValue}>
            {transactionDetails.recipient}
          </AppText>
        </View>

        <View style={styles.detailRow}>
          <AppText style={styles.detailLabel}>Amount:</AppText>
          <AppText style={styles.detailValue}>
            ${transactionDetails.amount}
          </AppText>
        </View>

        <View style={styles.detailRow}>
          <AppText style={styles.detailLabel}>Note:</AppText>
          <AppText style={styles.detailValue}>
            {transactionDetails.note || 'None'}
          </AppText>
        </View>

        <View style={styles.detailRow}>
          <AppText style={styles.detailLabel}>New Balance:</AppText>
          <AppText style={styles.detailValue}>
            ${transactionDetails.balance.toFixed(2)}
          </AppText>
        </View>

        <View style={styles.detailRow}>
          <AppText style={styles.detailLabel}>Transaction ID:</AppText>
          <AppText style={styles.detailValue}>
            TXN-{Math.floor(Math.random() * 1000000)}
          </AppText>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <AppText style={styles.buttonText} onPress={handleBackToHome}>
          Back to Home
        </AppText>
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
  detailsContainer: {
    flex: 1,
    marginBottom: 30
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  detailLabel: {
    fontSize: 16,
    color: '#666'
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  buttonContainer: {
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.default
  },
  buttonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default TransactionConfirmation
