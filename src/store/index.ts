import { configureStore } from "@reduxjs/toolkit";
import conversationReducer from "./slices/conversationSlice";
import messageReducer from "./messages/messageSlice";
import selectedTypeReducer from "./slices/selectedSlice";
import groupReducer from "./slices/groupSlice";
import groupMessageReducer from "./slices/groupMessageSlice";
import messageContainerReducer from "./slices/messageContainerSlice";
import groupSidebarReducer from "./slices/groupRecipientsSidebarSlice";
import friendReducer from "./friends/friendSlice";
import rateLimitReducer from "./rate-limit/rateLimitSlice";

export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
    message: messageReducer,
    selectedConversationType: selectedTypeReducer,
    group: groupReducer,
    groupMessage: groupMessageReducer,
    messageContainer: messageContainerReducer,
    groupSidebar: groupSidebarReducer,
    friend: friendReducer,
    rateLimit: rateLimitReducer,
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
