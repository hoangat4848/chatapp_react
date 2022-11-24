import { configureStore } from "@reduxjs/toolkit";
import conversationReducer from "./slices/conversationSlice";
import messageReducer from "./slices/messageSlice";

export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
    message: messageReducer,
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
