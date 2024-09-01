import { createSlice } from "@reduxjs/toolkit";

const localValue = JSON.parse(localStorage.getItem("userInfo"));
console.log(localValue);

const initialState = {
  value: localValue || {
    id: undefined,
    token: undefined,
    name: undefined,
    type: undefined,
    isLogin: false,
  },
};

const slice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    authReducer: (state, action) => {
      state.value = action.payload;
      console.log(action.payload);
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },
});

export const { authReducer } = slice.actions;
export default slice.reducer;
