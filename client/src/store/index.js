import { configureStore } from "@reduxjs/toolkit";
import fleet from "./slice";

export default configureStore({
  reducer: {
    getAllData: fleet,
  },
});
