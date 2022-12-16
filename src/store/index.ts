import { configureStore } from "@reduxjs/toolkit";
import conversationReducer from "./slices/conversationSlice";
import messageReducer from "./slices/messageSlice";
import selectedTypeReducer from "./slices/selectedSlice";
import groupReducer from "./slices/groupSlice";
import groupMessageReducer from "./slices/groupMessageSlice";
import messageContainerReducer from "./slices/messageContainerSlice";
import groupSidebarReducer from "./slices/groupRecipientsSidebarSlice";

export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
    message: messageReducer,
    selectedConversationType: selectedTypeReducer,
    group: groupReducer,
    groupMessage: groupMessageReducer,
    messageContainer: messageContainerReducer,
    groupSidebar: groupSidebarReducer,
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
