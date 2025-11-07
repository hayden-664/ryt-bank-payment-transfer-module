import { create } from 'zustand'

interface TransactionDetails {
  recipient: string
  amount: string
  note: string
  balance: number
}

interface TransactionStore {
  currentBalance: number
  transactionDetails: TransactionDetails
  setCurrentBalance: (balance: number) => void
  setTransactionDetails: (details: TransactionDetails) => void
  resetTransactionDetails: () => void
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  currentBalance: 1500.0,
  transactionDetails: { recipient: '', amount: '', note: '', balance: 0 },
  setCurrentBalance: (balance) => set({ currentBalance: balance }),
  setTransactionDetails: (details) => set({ transactionDetails: details }),
  resetTransactionDetails: () =>
    set({
      transactionDetails: { recipient: '', amount: '', note: '', balance: 0 }
    })
}))
