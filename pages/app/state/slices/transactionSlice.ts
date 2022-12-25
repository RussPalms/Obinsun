import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Transaction = { [id: string]: ISyncTransaction };
export interface TransactionState {
  transacions: Transactions;
}

const currentState: TransactionState;
