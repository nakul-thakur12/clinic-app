import { configureStore } from "@reduxjs/toolkit";
import Slice from "./Slice";
import Clinicslice from "./Clinicslice";
import Patientslice from "./Patientslice";

const store = configureStore({
  reducer: {
    authInfo: Slice,
    clincInfo: Clinicslice,
    patientInfo: Patientslice,
  },
});
export default store;
