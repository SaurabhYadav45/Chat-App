import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  userDetails:localStorage?.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : null,
  token : localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")) : "",
  onlineUser : [],
  selectedUser: JSON.parse(localStorage.getItem("selectedUser")) || null,
}
// socketConnection : null
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails : (state,action)=>{
        state.userDetails = action.payload
    },
    setToken : (state,action)=>{
        localStorage.setItem("token", JSON.stringify(action.payload))
        state.token = action.payload
    },
    setSelectedUser:(state, action)=>{
      localStorage.setItem("selectedUser", JSON.stringify(action.payload))
      state.selectedUser = action.payload
    },
    logout : (state,action)=>{
        state.userDetails = null
        state.token = ""
        state.selectedUser = null
        localStorage.removeItem("userDetails")
        localStorage.removeItem("token");
        localStorage.removeItem("selectedUser");
        state.socketConnection = null
    },
    setOnlineUser : (state,action)=>{
      state.onlineUser = action.payload
    },
    setDeleteAccount: (state) => {
      state.userDetails = null;
      state.token = "";
      state.selectedUser = null;
      state.onlineUser = [];
      
      // Remove from localStorage
      localStorage.removeItem("userDetails");
      localStorage.removeItem("token");
      localStorage.removeItem("selectedUser");
  },
  },
})

// Action creators are generated for each case reducer function
export const { setUserDetails, setSelectedUser, setToken ,logout, setOnlineUser, setDeleteAccount } = userSlice.actions

export default userSlice.reducer



















