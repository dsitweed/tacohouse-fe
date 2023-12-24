import { initLanguage } from '@/locales/i18n';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface LanguageState {
  key: I18nType.Language;
}

const initialState: LanguageState = {
  key: initLanguage,
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<I18nType.Language>) => {
      state.key = action.payload;
    },
  },
});

export const languageActions = languageSlice.actions;

export default languageSlice;
