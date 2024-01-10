import { InvoiceEntity } from '@/models/Invoice.entity';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InvoiceState {
  invoice: InvoiceEntity | null;
}

const initialState: InvoiceState = {
  invoice: null,
};

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    selected: (state, action: PayloadAction<InvoiceEntity>) => {
      state.invoice = action.payload;
    },
    clear: () => initialState,
  },
});

export const invoiceActions = invoiceSlice.actions;

export default invoiceSlice;
