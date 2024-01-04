import { UserEntity } from '@/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessageState {
  partner: UserEntity | null;
}

const initialState: MessageState = {
  partner: null,
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    selectPartner: (state, action: PayloadAction<UserEntity>) => {
      state.partner = action.payload;
    },
    clearPartner: (state) => {
      state.partner = null;
    },
  },
});

export const messageActions = messageSlice.actions;

export default messageSlice;
