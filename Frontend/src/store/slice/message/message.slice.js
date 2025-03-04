import { createSlice } from "@reduxjs/toolkit";
import { userSlice } from "../user/user.slice";

// import { getMessageThunk, sendMessageThunk } from "./message.thunk";

const initialState = {
    buttonLoading:false,
    screenLoading:false,
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
        }
    },
    // extraReducers: (builder) =>{
    //     //sendMessage
    //     builder.addCase(sendMessageThunk.pending, (state, action) =>{
    //         state.buttonLoading = true;
    //     });
    //     builder.addCase(sendMessageThunk.fulfilled, (state, action) =>{
    //         const oldMessages = state.messages;
    //         state.messages = [...oldMessages, action.payload?.responseData];
    //         state.buttonLoading  = false;
    //     });
    //     builder.addCase(sendMessageThunk.rejected, (state, action) =>{
    //         state.buttonLoading  = false;
    //     });

    //     //getMessage
    //     builder.addCase(getMessageThunk.pending, (state, action) =>{
    //         state.buttonLoading = true;
    //     });
    //     builder.addCase(getMessageThunk.fulfilled, (state, action) =>{
    //         state.messages = action.payload?.responseData?.messages
    //         state.buttonLoading = false;
    //     });
    //     builder.addCase(getMessageThunk.rejected, (state, action) =>{
    //         state.buttonLoading = false;
    //     });
    // }
})

export const {setMessages, setNewMessage} = messageSlice.actions
export default messageSlice.reducer