import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth.slice';
import languageSlice from './slices/language.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    language: languageSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
