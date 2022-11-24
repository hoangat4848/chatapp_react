import { configureStore } from "@reduxjs/toolkit";
import conversationReducer from "./slices/conversationSlice";

export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: {
    serialize: {
      options: {
        map: true,
      },
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;