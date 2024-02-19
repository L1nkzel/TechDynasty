import { createSlice} from "@reduxjs/toolkit";

interface AuthState {
    userInfo: any
  }

const initialState: AuthState = {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage
        .getItem("userInfo") as string) : null,
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        registerUser: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.clear();
        },
    },
});

export const { setUserInfo, logout, registerUser } = authSlice.actions;
export default authSlice.reducer