import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

const initialState = {
  socket: null,
  onlineUsers: null,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    initializeSocket: (state, action) => {
      if (!state.socket) { // Prevent multiple connections
        const socket = io(import.meta.env.VITE_BACKEND_URL, {
          query: {
            userId: action.payload,
          },
        });

        socket.on("connect", () => {
          console.log("✅ Socket Connected:", socket.id);
        });

        state.socket = socket; // Store socket instance in state
      }
    },

    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },

    disconnectSocket: (state) => {
      if (state.socket) {
        state.socket.disconnect();
        console.log("❌ Socket Disconnected");
        state.socket = null;
      }
    },
  },
});

export const { initializeSocket, setOnlineUsers, disconnectSocket } = socketSlice.actions;

export default socketSlice.reducer;
