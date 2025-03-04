import { configureStore } from '@reduxjs/toolkit'

import userReducer from "./slice/user/user.slice";
import messageReducer from "./slice/message/message.slice";
import socketReducer from "./slice/socket/socket.slice"

export default configureStore({
  reducer: {
    user:userReducer,
    messageReducer,
    socketReducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({
      serializableCheck: {
        ignoredPaths: ["socketReducer.socket"],
      },
    }),
})