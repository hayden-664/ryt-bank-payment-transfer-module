import { create } from 'zustand'

interface TransactionDetails {
  recipient: string
  amount: string
  note: string
  balance: number
}

interface TransactionStore {
  currentBalance: number
  transactionDetails: TransactionDetails[]
  pendingTransaction: TransactionDetails | null
  setCurrentBalance: (balance: number) => void
  setPendingTransaction: (details: TransactionDetails) => void
  addTransaction: (details: TransactionDetails) => void
  resetTransactionDetails: () => void
  resetPendingTransaction: () => void
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  currentBalance: 1500.0,
  transactionDetails: [],
  pendingTransaction: null,
  setCurrentBalance: (balance) => set({ currentBalance: balance }),
  setPendingTransaction: (details) => set({ pendingTransaction: details }),
  addTransaction: (details) =>
    set((state) => ({
      transactionDetails: [...state.transactionDetails, details]
    })),
  resetTransactionDetails: () => set({ transactionDetails: [] }),
  resetPendingTransaction: () => set({ pendingTransaction: null })
}))
