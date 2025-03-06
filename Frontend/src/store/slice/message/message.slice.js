import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages:null,
}

const messageSlice = createSlice({
    name:"message",
    initialState,
    reducers:{
        setMessages: (state, action) => {
            state.messages = action.payload; // ✅ Set messages from backend
          },
        setNewMessage:(state, action) =>{
            const oldMessages = state.messages ?? [];
            state.messages = [...oldMessages, action.payload]
        },
        deleteSingleMessage: (state, action) => {
            state.messages = state.messages?.filter(
                (msg) => msg._id !== action.payload // Remove deleted message
            );
        },
        deleteChat: (state, action) => {
            state.messages = []; 
        },
    }
})

export const {setMessages, setNewMessage, deleteSingleMessage, deleteChat} = messageSlice.actions
export default messageSlice.reducer