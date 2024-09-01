import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "patientDetails",
  initialState: {
    value: [],
    upData: undefined,
  },
  reducers: {
    listPatientReducer: (state, action) => {
      state.value = action.payload;
      console.log(action.payload);
    },
    deletePatientcReducer: (state, action) => {
      state.value = action.payload;
      console.log(action.payload);
    },
    updatePatientReducer: (state, action) => {
      state.upData = action.payload;
      console.log(action.payload);
    },
  },
});

export const {
  listPatientReducer,
  deletePatientcReducer,
  updatePatientReducer,
} = slice.actions;
export default slice.reducer;
