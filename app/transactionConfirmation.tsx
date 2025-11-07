import { AppText, Heading } from '@/components/Typography'
import { useTransactionStore } from '@/stores/useTransactionStore'
import { COLORS, RADIUS } from '@/constants/theme'
import { useRouter } from 'expo-router'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Button from '@/components/Button'

const TransactionConfirmation: React.FC = () => {
  const router = useRouter()
  const { transactionDetails } = useTransactionStore()

  const handleBackToHome = () => {
    router.push('/')
  }

  return (
    <View style={styles.container}>
      <Heading weight='regular' style={styles.title}>
        Transaction Confirmed
      </Heading>

      <View style={styles.detailsContainer}>
        <View style={styles.detailsWrapper}>
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
            <AppText style={styles.detailLabel}>Balance:</AppText>
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
        </View>
      </View>
      <Button
        title='Back to Home'
        onPress={handleBackToHome}
        variant='secondary'
      />
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
    textAlign: 'center',
    color: COLORS.primary
  },
  detailsContainer: {
    flex: 1,
    marginBottom: 30
  },
  detailsWrapper: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: RADIUS.default,
    display: 'flex',
    gap: 15,
    overflowY: 'auto'
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detailLabel: {
    fontSize: 16,
    color: '#666'
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  }
})

export default TransactionConfirmation
